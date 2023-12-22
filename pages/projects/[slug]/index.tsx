import { NotionAPI } from "notion-client";
import { NotionRenderer } from "react-notion-x";
import { ExtendedRecordMap } from "notion-types";
import getPages from "@/lib/notion/getPages";
import { notFound } from "next/navigation";

interface ProjectDetailPageProps {
  project: ExtendedRecordMap;
}

export default function ProjectDetailPage({ project }: ProjectDetailPageProps) {
  return (
    <NotionRenderer
      recordMap={project}
      fullPage={true}
      darkMode={true}
      disableHeader
    />
  );
}

export async function getServerSideProps(context: any) {
  const slug = context.query.slug;

  const pages = await getPages();

  const data = pages.find((item) => item.slug == slug);

  if (!data) {
    notFound();
  }

  const notion = new NotionAPI();
  const project = await notion.getPage(data.id);
  return {
    props: {
      project,
    },
  };
}
