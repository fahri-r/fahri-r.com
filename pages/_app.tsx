import "react-notion-x/src/styles.css";
import "@/common/styles/globals.css";

import type { AppProps } from "next/app";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/common/libs/utils";
import Provider from "@/common/context/provider";
import FirebaseProvider from "@/common/context/firebase-provider";
import { SessionProvider } from "next-auth/react";
import { TooltipProvider } from "@/common/components/elements/tooltip";
import Navbar from "@/common/components/navbar";
import { ThemeProvider } from "@/common/context/theme-provider";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <body className={cn(fontSans.className, "min-h-screen bg-background antialiased max-w-2xl mx-auto py-12 sm:py-24 px-6")}>
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
