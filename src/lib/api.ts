const API_URL = 'https://api.github.com/graphql';

async function fetchAPI(query: string) {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (process.env.GITHUB_API_TOKEN) {
    headers['Authorization'] = `Bearer ${process.env.GITHUB_API_TOKEN}`;
  }
  const res = await fetch(API_URL, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      query,
    }),
  });

  const json = await res.json();
  if (json.errors) {
    console.error(json.errors);
    throw new Error('Failed to fetch API');
  }
  return json.data;
}

const repoFields = `
fragment repoFields on Repository {
  id
  name
  createdAt
  description
  url
}
`;

const homePageQuery =
  repoFields +
  `
query {
  organization(login: "fourthclasshonours") {
    itemShowcase {
      items(first: 10) {
      	edges {
          node {
    ... on Repository {
			...repoFields
            }
          }
        }
      }
    },
    membersWithRole(first: 20) {
      edges {
        node {
          name
          location
        	login
          url
          websiteUrl
          avatarUrl
        } 
      }
    }
  }
}
`;

const projectsPageQuery =
  repoFields +
  `
query {
  organization(login: "fourthclasshonours") {
    createdAt
    repositories(first: 100, privacy: PUBLIC, orderBy: {direction: ASC, field: NAME}) {
      edges {
        node {
					...repoFields
        }
        cursor
      },
    }
  }
}
`;

export async function getHomePageContent() {
  const data = (await fetchAPI(homePageQuery))['organization'];

  const itemShowcaseEdges = data['itemShowcase']['items']['edges'];
  const itemShowcaseSanitized: Array<GraphQL.Project> = itemShowcaseEdges.map(
    (edge: GraphQL.Edge) => edge['node']
  );

  const membersWithRoleEdges = data['membersWithRole']['edges'];
  const membersWithRoleSanitized: Array<GraphQL.Member> = membersWithRoleEdges.map(
    (edge: GraphQL.Edge) => edge['node']
  );

  return {
    itemShowcase: itemShowcaseSanitized,
    members: membersWithRoleSanitized,
  };
}

export async function getAllProjects() {
  const data = (await fetchAPI(projectsPageQuery))['organization'];
  const projectsEdges = data['repositories']['edges'];
  const projectsSanitized: Array<GraphQL.Project> = projectsEdges.map(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (edge: { [x: string]: any }) => edge['node']
  );

  return {
    projects: projectsSanitized,
  };
}
