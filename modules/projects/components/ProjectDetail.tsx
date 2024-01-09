import AnimateEnter from "@/common/components/elements/AnimateEnter";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { NotionRenderer } from "react-notion-x";
import { ExtendedRecordMap } from "notion-types";
import Title from "@/common/components/elements/Title";
import ProjectProps from "@/common/types/project";
import { Eye, Github } from "lucide-react";

function ProjectDetail({
  recordMap,
  project,
}: {
  recordMap: ExtendedRecordMap;
  project: ProjectProps;
}) {
  const pageTitle = (
    <div className="flex flex-col space-y-4">
      <Title variant="title" className="space-y-2 font-normal">
        {project.title}
      </Title>

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
  );
}

export default ProjectDetail;
