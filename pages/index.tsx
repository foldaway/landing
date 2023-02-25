import { Inter } from "@next/font/google";
import classNames from "classnames";
import { InferGetStaticPropsType } from "next";
import Head from "next/head";
import Image from "next/image";
import { useTheme } from "next-themes";
import { Octokit } from "octokit";

import { Paragraph } from "@/components/Paragraph";
import { Section } from "@/components/Section";
import { User } from "@/components/User";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export default function Home(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { setTheme } = useTheme();
  return (
    <>
      <Head>
        <title>Foldaway</title>
        <meta name="description" content="Pursuing pointlessness" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main
        className={`${inter.variable} h-full w-full overflow-y-auto font-sans`}
      >
        <div className="m-auto max-w-screen-sm py-32 px-8">
          <span className="block pb-4 text-5xl text-black dark:text-white">
            ⌅
          </span>
          <h1 className="font-medium text-neutral-900 dark:text-neutral-50">
            Foldaway
          </h1>

          <Section heading="About">
            <Paragraph>
              It all started from the foldaway table in Duncan&apos;s room. Back
              then, on the occasional weekend, we&apos;ll all cram in his room,
              assemble the foldaway table, and start hacking at silly projects
              that are, more often than not, just plain pointless.
              <br />
              <br />
              Pointless yes, but also fun. It&apos;s been a while since
              we&apos;ve all gathered at our foldaway table, but its spirit
              lives on in the silly pointless projects we continue hacking on.
            </Paragraph>
          </Section>

          <Section heading="People">
            <div className="flex flex-wrap items-start gap-y-4 gap-x-3">
              {props.organization.membersWithRole.edges
                .filter((edge) => !edge.node.login.endsWith("-bot"))
                .map((edge) => (
                  <User key={edge.cursor} user={edge.node} />
                ))}
            </div>
          </Section>

          <Section heading="Projects">
            <div className="flex flex-col gap-y-3">
              {props.organization.pinnedItems.edges.map((pinnableItemEdge) => (
                <div
                  key={pinnableItemEdge.cursor}
                  className="group transition-transform hover:-translate-y-0.5"
                >
                  <a
                    className={classNames(
                      "flex justify-between rounded-md py-4 px-6",
                      "transition-shadow dark:transition-colors",
                      // Background
                      "bg-white dark:bg-gradient-to-b dark:from-neutral-700 dark:to-neutral-800",
                      // Light mode: shadows
                      "shadow-skeuo group-hover:shadow-skeuo-lg dark:shadow-none",
                      // Dark mode: borders
                      "dark:border dark:border-neutral-600 dark:group-hover:border-neutral-500"
                    )}
                    href={pinnableItemEdge.node.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <div className="flex flex-col gap-1">
                      <h3>
                        <span className="group-hover:underline">
                          {pinnableItemEdge.node.name}
                        </span>
                        <span className="opacity-0 transition-opacity group-hover:opacity-100 group-focus:opacity-100">
                          &nbsp;↗
                        </span>
                      </h3>
                      <p className="text-sm text-neutral-400 line-clamp-1">
                        {pinnableItemEdge.node.description}
                      </p>
                    </div>
                    <div className="flex items-center">
                      {props.repoContributorsMap[
                        pinnableItemEdge.node.name
                      ].map((user) => (
                        <Image
                          key={user.login}
                          src={user.avatarUrl}
                          alt={user.login}
                          height={24}
                          width={24}
                          className="-ml-1 rounded-full first:ml-0"
                        />
                      ))}
                    </div>
                  </a>
                </div>
              ))}
            </div>
          </Section>

          <Section heading="Debug">
            <button onClick={() => setTheme("light")}>Light</button>
            <button onClick={() => setTheme("dark")}>Dark</button>
          </Section>
        </div>
      </main>
    </>
  );
}

export async function getStaticProps() {
  const octokit = new Octokit({ auth: process.env.GITHUB_API_TOKEN });

  const { organization } = await octokit.graphql<{
    organization: GitHub.GraphQL.API.Organization;
  }>(`
    query PinnedReposQuery {
      organization(login: "fourthclasshonours") {
        membersWithRole(first: 50) {
          edges {
            node {
              name
              login
              avatarUrl
              websiteUrl
              url
            }
            cursor
          }
        }
        pinnedItems(types: [REPOSITORY], first: 10) {
          edges {
            node {
              ... on Repository {
                name
                description
                url
              }
            }
            cursor
          }
        }
      }
    }
  `);

  /**
   * Map of org member login (a.k.a. handle) to {@link GitHub.GraphQL.API.User}
   */
  const orgMembersMap: Record<string, GitHub.GraphQL.API.User> = {};

  for (const orgMemberEdge of organization.membersWithRole.edges) {
    orgMembersMap[orgMemberEdge.node.login] = orgMemberEdge.node;
  }

  /**
   * Map of repo name to its contributors
   */
  const repoContributorsMap: Record<string, GitHub.GraphQL.API.User[]> = {};

  for (const pinnableItemEdge of organization.pinnedItems.edges) {
    const repo = pinnableItemEdge.node.name;

    /**
     * Use REST API to query for {@link repo}'s contributors
     */
    const contributorsResponse = await octokit.request(
      "GET /repos/{owner}/{repo}/contributors",
      {
        owner: "fourthclasshonours",
        repo,
      }
    );

    const repoContributors: GitHub.GraphQL.API.User[] = [];

    for (const contributor of contributorsResponse.data) {
      /**
       * Filter out non-user contributors such as dependabot
       */
      if (contributor.type !== "User") {
        continue;
      }

      /**
       * Attempt to retrieve GraphQL user information from Organisation members
       */
      const orgMember = orgMembersMap[contributor.login!];

      if (orgMember != null) {
        repoContributors.push(orgMember);
        continue;
      }

      /**
       * Put together a shell GraphQL user for outside contributor
       */
      repoContributors.push({
        login: contributor.login!,
        name: contributor.name ?? contributor.login!,
        avatarUrl: contributor.avatar_url!,
        websiteUrl: contributor.url!,
        url: "",
      });
    }

    repoContributorsMap[repo] = repoContributors;
  }

  return {
    props: {
      organization,
      repoContributorsMap,
    },
  };
}
