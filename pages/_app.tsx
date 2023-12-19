import "react-notion-x/src/styles.css";
import "@/styles/globals.css";

import type { AppProps } from "next/app";
import { Poppins, Kanit } from "next/font/google";
import { cn } from "@/lib/utils";
import Provider from "@/context/Provider";
import Texture from "@/components/ui/Texture";
import Sidebar from "@/components/sidebar/Sidebar";
import { AnimateEnter } from "@/components/utils/AnimateEnter";

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
      <div className="mx-auto flex max-w-6xl flex-col px-8 lg:flex-row lg:gap-10 lg:py-24">
        <Provider>
          <Sidebar />
          <AnimateEnter className="max-w-[854px] max-lg:py-8 lg:w-4/5 lg:pt-8">
            <Component {...pageProps} />
          </AnimateEnter>
          <Texture />
        </Provider>
      </div>
    </body>
  );
}
