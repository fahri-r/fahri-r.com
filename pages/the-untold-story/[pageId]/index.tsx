import { NotionAPI } from "notion-client";
import { ExtendedRecordMap } from "notion-types";
import { NextSeo } from "next-seo";
import profile from "@/common/constant/profile";
import TheUntoldStoryDetail from "@/modules/the-untold-story/components/the-untold-story-detail";
import { GetServerSidePropsContext } from "next";

type TheUntoldStoryPageProps = {
  recordMap: ExtendedRecordMap;
};

export default function TheUntoldStoryPage({
  recordMap,
}: TheUntoldStoryPageProps) {
  return (
    <>
      <NextSeo title={`The Untold Story - ${profile.name}`} />
      <TheUntoldStoryDetail recordMap={recordMap} />
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const pageId = context.query.pageId as string;

  const notion = new NotionAPI();
  try {
    const recordMap = await notion.getPage(pageId);

    return {
      props: {
        recordMap,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}
