import { Html, Head, Main, NextScript } from "next/document";

import Sidebar from "@/components/sidebar/Sidebar";
import Texture from "@/components/ui/Texture";
import Provider from "@/context/Provider";
import { Kanit, Poppins } from "next/font/google";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
