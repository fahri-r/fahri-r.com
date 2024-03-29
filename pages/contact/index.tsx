import profile from "@/common/constant/profile";
import { NextSeo } from "next-seo";
import Contact from "@/modules/contact";

const PAGE_TITLE = "Contact";
const PAGE_DESCRIPTION =
  "Feel free to get in touch and let's have a discussion about how we can work together.";

export default function ContactPage() {
  return (
    <>
      <NextSeo
        title={`${PAGE_TITLE} - ${profile.name}`}
        description={PAGE_DESCRIPTION}
      />
      <Contact />
    </>
  );
}
