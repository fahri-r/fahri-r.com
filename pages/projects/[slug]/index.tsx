import { NotionAPI } from "notion-client";
import { NotionRenderer } from "react-notion-x";
import { ExtendedRecordMap } from "notion-types";
import getPages from "@/lib/notion/getPages";
import Image from "next/image";
import Link from "next/link";
import { AnimateEnter } from "@/components/utils/AnimateEnter";
import { fetchCache } from "@/lib/redisCache";
import { NextSeo } from "next-seo";
import profile from "@/data/profile";
import { Eye, Github } from "lucide-react";
import ProjectProps from "@/types/project";
import Title from "@/components/utils/Title";

interface ProjectDetailPageProps {
  recordMap: ExtendedRecordMap;
  project: ProjectProps;
}

export default function ProjectDetailPage({
  recordMap,
  project,
}: ProjectDetailPageProps) {
  const pageTitle = (
    <div className="flex flex-col space-y-4">
      <Title variant="title" className="space-y-2 font-normal">{project.title}</Title>

      {(project.site || project.repository) && (
        <div className="flex text-base font-normal font-mono gap-2 items-center">
          {project.repository && (
            <Link href={project.repository} legacyBehavior>
              <a
                className="flex items-center gap-2"
                target="_blank"
                rel="noreferrer"
              >
                <Github size={18} />
                <span className="text-emerald-500 duration-300 hover:text-emerald-400">
                  Source code
                </span>
              </a>
            </Link>
          )}

          {project.site && project.repository && (
            <div className="mx-1 h-4 w-px bg-neutral-800" />
          )}

          {project.site && (
            <Link href={project.site} legacyBehavior>
              <a
                className="flex items-center gap-2"
                target="_blank"
                rel="noreferrer"
              >
                <Eye size={18} />
                <span className="text-emerald-500 duration-300 hover:text-emerald-400">
                  Site
                </span>
              </a>
            </Link>
          )}
        </div>
      )}
    </div>
  );

  return (
    <>
      <NextSeo title={`${project.title} - ${profile.name}`} />
      <AnimateEnter className="max-w-[854px] max-lg:py-8 lg:w-4/5 lg:pt-8">
        <NotionRenderer
          pageTitle={pageTitle}
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
  const slug = context.query.slug;

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
