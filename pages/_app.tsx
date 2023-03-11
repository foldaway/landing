import "@/styles/globals.css";

import * as RadixTooltip from "@radix-ui/react-tooltip";
import { Analytics } from "@vercel/analytics/react";
import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class">
      <RadixTooltip.Provider delayDuration={100}>
        <Component {...pageProps} />
        <Analytics />
      </RadixTooltip.Provider>
    </ThemeProvider>
  );
}
