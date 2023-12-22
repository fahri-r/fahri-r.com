import { NotionAPI } from "notion-client";
import { NotionRenderer } from "react-notion-x";
import { ExtendedRecordMap } from "notion-types";
import getPages from "@/lib/notion/getPages";
import Image from "next/image";
import Link from "next/link";
import { AnimateEnter } from "@/components/utils/AnimateEnter";

interface ProjectDetailPageProps {
  project: ExtendedRecordMap;
}

export default function ProjectDetailPage({ project }: ProjectDetailPageProps) {
  return (
    <AnimateEnter className="max-w-[854px] max-lg:py-8 lg:w-4/5 lg:pt-8">
      <NotionRenderer
        components={{ nextImage: Image, nextLink: Link }}
        recordMap={project}
        fullPage={true}
        darkMode={true}
        disableHeader
      />
    </AnimateEnter>
  );
}

export async function getServerSideProps(context: any) {
  const slug = context.query.slug;

  const pages = await getPages();

  const data = pages.find((item) => item.slug == slug);

  if (!data) {
    return {
      notFound: true,
    };
  }

  const notion = new NotionAPI();
  const project = await notion.getPage(data.id);
  return {
    props: {
      project,
    },
  };
}
