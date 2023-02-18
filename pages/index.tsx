import { Inter } from "@next/font/google";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Foldaway</title>
        <meta name="description" content="Pursuing pointlessness" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${inter.className} m-auto max-w-screen-sm py-32 px-8`}>
        <span className="block pb-4 text-5xl">⌅</span>
        <h1 className="font-medium text-neutral-900">Foldaway</h1>

        <h2 className="pt-12 text-neutral-400">About</h2>
        <p className="pt-4 leading-relaxed text-neutral-900">
          It all started from the foldaway table in Duncan&apos;s room. Back
          then, on the occasional weekend, we&apos;ll all cram in his room,
          assemble the foldaway table, and start hacking at silly projects that
          are, more often than not, just plain pointless.
          <br />
          <br />
          Pointless yes, but also fun. It&apos;s been a while since we&apos;ve
          all gathered at our foldaway table, but its spirit lives on in the
          silly pointless projects we continue hacking on.
        </p>
        <h2 className="pt-12 text-neutral-400">People</h2>
        <p className="pt-4 leading-relaxed text-neutral-900">
          Amos Tan, Chester How, Daniel Lee, Duncan Leo, Elcoms Khang, Ivan Tan
          & Jurvis Tan.
        </p>
      </main>
    </>
  );
}
