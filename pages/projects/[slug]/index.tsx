import { NotionAPI } from "notion-client";
import { ExtendedRecordMap } from "notion-types";
import getPages from "@/common/libs/notion/getPages";
import { fetchCache } from "@/common/libs/redisCache";
import { NextSeo } from "next-seo";
import profile from "@/common/constant/profile";
import ProjectProps from "@/common/types/project";
import { GetServerSidePropsContext } from "next";
import ProjectDetail from "@/modules/projects/components/ProjectDetail";

type ProjectDetailPageProps = {
  recordMap: ExtendedRecordMap;
  project: ProjectProps;
};

export default function ProjectDetailPage({
  recordMap,
  project,
}: ProjectDetailPageProps) {
  return (
    <>
      <NextSeo title={`${project.title} - ${profile.name}`} />
      <ProjectDetail recordMap={recordMap} project={project} />
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const slug = context.query.slug as string;

  const fetchData = async () => {
    const response = await getPages();
    return response;
  };

  const pages = await fetchCache("projects", fetchData, 60 * 60 * 24);

  const project = pages.find((item) => item.slug == slug);

  if (!project) {
    return {
      notFound: true,
    };
  }

  const notion = new NotionAPI();
  const recordMap = await notion.getPage(project.id);
  return {
    props: {
      recordMap,
      project,
    },
  };
}
