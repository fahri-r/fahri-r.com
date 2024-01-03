import { NotionAPI } from "notion-client";
import { NotionRenderer } from "react-notion-x";
import { ExtendedRecordMap } from "notion-types";
import Image from "next/image";
import Link from "next/link";
import { AnimateEnter } from "@/components/utils/AnimateEnter";
import { NextSeo } from "next-seo";
import profile from "@/data/profile";
import Title from "@/components/utils/Title";
import { getPageTitle } from "notion-utils";

interface TheUntoldStoryPageProps {
  recordMap: ExtendedRecordMap;
  title: string;
}

export default function TheUntoldStoryPage({
  recordMap,
  title,
}: TheUntoldStoryPageProps) {
  return (
    <>
      <NextSeo title={`The Untold Story - ${profile.name}`} />
      <AnimateEnter className="max-w-[854px] max-lg:py-8 lg:w-4/5 lg:pt-8">
        <NotionRenderer
          pageTitle={<Title variant="title">{title} - The Untold Story</Title>}
          components={{ nextImage: Image, nextLink: Link }}
          recordMap={recordMap}
          fullPage={true}
          darkMode={true}
          disableHeader
        />
      </AnimateEnter>
    </>
  );
}

export async function getServerSideProps(context: any) {
  const pageId = context.query.pageId;

  const notion = new NotionAPI();
  try {
    const recordMap = await notion.getPage(pageId);
    const title = getPageTitle(recordMap);

    return {
      props: {
        recordMap,
        title,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}
