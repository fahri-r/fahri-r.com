import "react-notion-x/src/styles.css";
import "@/styles/globals.css";

import type { AppProps } from "next/app";
import { Poppins, Kanit } from "next/font/google";
import { cn } from "@/lib/utils";
import Provider from "@/context/Provider";
import Texture from "@/components/ui/Texture";
import Sidebar from "@/components/sidebar/Sidebar";
import { AnimateEnter } from "@/components/utils/AnimateEnter";
import { Toast } from "@/components/utils/Toast";
import Command from "@/components/ui/Command";

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
      <AnimateEnter className="mx-auto flex max-w-6xl flex-col px-8 lg:flex-row lg:gap-10 lg:py-24">
        <Provider>
          <Command />
          <Sidebar />
          <Component {...pageProps} />
        </Provider>
      </AnimateEnter>
      <Toast />
      <Texture />
    </body>
  );
}
