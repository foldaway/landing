import { Inter } from "@next/font/google";
import classNames from "classnames";
import { InferGetStaticPropsType } from "next";
import Head from "next/head";
import Image from "next/image";
import { Octokit } from "octokit";

import { Paragraph } from "@/components/Paragraph";
import { Section } from "@/components/Section";

const inter = Inter({ subsets: ["latin"] });

export default function Home(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  console.log(props);

  return (
    <>
      <Head>
        <title>Foldaway</title>
        <meta name="description" content="Pursuing pointlessness" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${inter.className} h-full w-full overflow-y-auto`}>
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
            <div className="flex flex-wrap items-start gap-4">
              {props.users.map((user) => (
                <div
                  key={user.id}
                  className={classNames(
                    "flex items-center gap-x-2 rounded-full",
                    "text-neutral-900 dark:text-neutral-50"
                  )}
                >
                  <Image
                    src={user.avatar_url}
                    alt={user.login}
                    height={28}
                    width={28}
                    className="rounded-full"
                  />
                  {user.name}
                </div>
              ))}
            </div>
          </Section>
        </div>
      </main>
    </>
  );
}

export async function getStaticProps() {
  const octokit = new Octokit({ auth: process.env.GITHUB_API_TOKEN });

  const orgResponse = await octokit.request("GET /orgs/{org}/members", {
    org: "fourthclasshonours",
  });

  const users = [];
  for (const { login } of orgResponse.data) {
    // Guard: Ignore bots
    if (login.endsWith("-bot")) continue;

    const userResponse = await octokit.request("GET /users/{username}", {
      username: login,
    });
    users.push(userResponse.data);
  }

  return {
    props: {
      users: users,
    },
  };
}
