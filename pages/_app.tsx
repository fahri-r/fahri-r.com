import "react-notion-x/src/styles.css";
import "@/common/styles/globals.css";

import type { AppProps } from "next/app";
import { Poppins, Kanit } from "next/font/google";
import { cn } from "@/common/libs/utils";
import Provider from "@/common/context/Provider";
import Texture from "@/common/components/elements/Texture";
import AnimateEnter from "@/common/components/elements/AnimateEnter";
import FirebaseProvider from "@/common/context/FirebaseProvider";
import { SessionProvider } from "next-auth/react";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-default",
});

const kanit = Kanit({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-mono",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <body
      className={cn(
        "bg-background font-poppins outline-none",
        poppins.variable,
        kanit.variable
      )}
    >
      <AnimateEnter className="mx-auto flex max-w-6xl flex-col px-8 py-5 lg:flex-row lg:gap-10 lg:py-24 min-h-screen">
        <Provider>
          <SessionProvider session={pageProps.session}>
            <FirebaseProvider>
              <Component {...pageProps} />
            </FirebaseProvider>
          </SessionProvider>
        </Provider>
      </AnimateEnter>
      <Texture />
    </body>
  );
}
