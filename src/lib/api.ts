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
