import profile from "@/common/constant/profile";
import { NextSeo } from "next-seo";
import About from "@/modules/about";

const PAGE_TITLE = "About";
const PAGE_DESCRIPTION = "A short story of me.";

export default function AboutPage() {
  return (
    <>
      <NextSeo
        title={`${PAGE_TITLE} - ${profile.name}`}
        description={PAGE_DESCRIPTION}
      />
      <About />
    </>
  );
}
