import "react-notion-x/src/styles.css";
import "@/common/styles/globals.css";

import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import { cn } from "@/common/libs/utils";
import Provider from "@/common/context/Provider";
import FirebaseProvider from "@/common/context/FirebaseProvider";
import { SessionProvider } from "next-auth/react";
import { TooltipProvider } from "@/common/components/elements/tooltip";
import Navbar from "@/common/components/elements/navbar";
import { ThemeProvider } from "@/common/context/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <body className={cn(inter.className, "max-w-4xl mx-auto")}>
      <Provider>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <SessionProvider session={pageProps.session}>
            <FirebaseProvider>
              <TooltipProvider delayDuration={0}>
                <Component {...pageProps} />
                <Navbar />
              </TooltipProvider>
            </FirebaseProvider>
          </SessionProvider>
        </ThemeProvider>
      </Provider>
    </body>
  );
}
