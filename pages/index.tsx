import { Inter } from "@next/font/google";
import classNames from "classnames";
import { InferGetStaticPropsType } from "next";
import Head from "next/head";
import { Octokit } from "octokit";

import { ArrowRightIcon } from "@/components/icons/ArrowRightIcon";
import { Logo } from "@/components/logo/Logo";
import { Paragraph } from "@/components/Paragraph";
import Project from "@/components/Project";
import { Section } from "@/components/Section";
import ThemePicker from "@/components/ThemePicker";
import { User } from "@/components/User";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export default function Home(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  return (
    <>
      <Head>
        <title>Foldaway</title>
        <meta name="description" content="Pursuing pointlessness" />

        {/* Open graph */}
        <meta property="og:title" content="Foldaway" />
        <meta property="og:description" content="Pursuing pointlessness" />
        <meta
          property="og:image"
          content={`${
            process.env.VERCEL_URL ? "https://" + process.env.VERCEL_URL : ""
          }/og.png`}
        />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Foldaway" />
        <meta
          property="og:url"
          content={
            process.env.VERCEL_URL ? "https://" + process.env.VERCEL_URL : ""
          }
        />

        {/* twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Foldaway" />
        <meta name="twitter:description" content="Pursuing pointlessness" />
        <meta
          name="twitter:image"
          content={`${
            process.env.VERCEL_URL ? "https://" + process.env.VERCEL_URL : ""
          }/og.png`}
        />

        {/* Favicon */}
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#000000" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="theme-color" content="#ffffff" />

        {/* Others */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main
        className={`${inter.variable} h-full w-full overflow-y-auto font-sans`}
      >
        <div className="m-auto max-w-screen-sm px-8 pt-12 sm:pt-32">
          <nav className="flex items-end justify-between">
            <div className="flex flex-col gap-y-4">
              <Logo />
              <h1 className="font-medium text-neutral-900 dark:text-neutral-50">
                Foldaway
              </h1>
            </div>
            <ThemePicker />
          </nav>

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
                <Project
                  key={pinnableItemEdge.cursor}
                  project={pinnableItemEdge}
                  contributors={
                    props.repoContributorsMap[pinnableItemEdge.node.name]
                  }
                />
              ))}
              <div className="pt-4 text-center">
                <a
                  href={props.organization.url}
                  target="_blank"
                  rel="noreferrer"
                  className={classNames(
                    "inline-flex items-center gap-x-2 rounded-xl px-4 py-2 shadow ",
                    "text-white dark:text-black",
                    "bg-black hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-100"
                  )}
                >
                  More projects
                  <ArrowRightIcon />
                </a>
              </div>
            </div>
          </Section>

          <footer className="flex justify-center pt-12 pb-16 text-neutral-400 dark:text-neutral-500 sm:pt-32">
            <Logo width={16} height={16} />
          </footer>
        </div>
      </main>
    </>
  );
}

export async function getStaticProps() {
  if (process.env.NEXT_PUBLIC_ORG_NAME === undefined) return;

  const octokit = new Octokit({ auth: process.env.GITHUB_API_TOKEN });

  const { organization } = await octokit.graphql<{
    organization: GitHub.GraphQL.API.Organization;
  }>(`
    query PinnedReposQuery {
      organization(login: "${process.env.NEXT_PUBLIC_ORG_NAME}") {
        url
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
        owner: process.env.NEXT_PUBLIC_ORG_NAME,
        repo,
      }
    );

    const repoContributors: GitHub.GraphQL.API.User[] = [];

    for (const contributor of contributorsResponse.data) {
      /**
       * Filter out non-user contributors such as dependabot
       */
      if (contributor.type !== "User") continue;

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
