import profile from "@/common/constant/profile";
import { NextSeo } from "next-seo";
import Chat from "@/modules/chat";

const PAGE_TITLE = "Chat";
const PAGE_DESCRIPTION =
  "Leave whatever you like to say, suggestions, questions or anything!";

export default function ContactPage() {
  return (
    <>
      <NextSeo
        title={`${PAGE_TITLE} - ${profile.name}`}
        description={PAGE_DESCRIPTION}
      />
      <Chat />
    </>
  );
}
