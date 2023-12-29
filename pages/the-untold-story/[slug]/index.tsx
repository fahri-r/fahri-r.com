import { NotionAPI } from "notion-client";
import { NotionRenderer } from "react-notion-x";
import { ExtendedRecordMap } from "notion-types";
import Image from "next/image";
import Link from "next/link";
import { AnimateEnter } from "@/components/utils/AnimateEnter";
import { NextSeo } from "next-seo";
import profile from "@/data/profile";
import Title from "@/components/utils/Title";

interface TheUntoldStoryPageProps {
  project: ExtendedRecordMap;
}

export default function TheUntoldStoryPage({
  project,
}: TheUntoldStoryPageProps) {
  return (
    <>
      <NextSeo title={`The Untold Story - ${profile.name}`} />
      <AnimateEnter className="max-w-[854px] max-lg:py-8 lg:w-4/5 lg:pt-8">
        <Title variant="title">The Untold Story</Title>
        <NotionRenderer
          components={{ nextImage: Image, nextLink: Link }}
          recordMap={project}
          fullPage={true}
          darkMode={true}
          disableHeader
        />
      </AnimateEnter>
    </>
  );
}

export async function getServerSideProps(context: any) {
  const slug = context.query.slug;

  const notion = new NotionAPI();
  try {
    const project = await notion.getPage(slug);

    return {
      props: {
        project,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}
