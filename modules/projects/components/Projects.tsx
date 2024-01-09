"use client";

import AnimateEnter from "@/common/components/elements/AnimateEnter";
import Title from "@/common/components/elements/Title";
import Typography from "@/common/components/elements/Typography";
import ProjectProps from "@/common/types/project";
import React from "react";
import { ProjectItem } from "./ProjectItem";

function Projects({ projects }: { projects: ProjectProps[] }) {
  return (
    <AnimateEnter className="max-w-[854px] max-lg:py-8 lg:w-4/5 lg:pt-8">
      <section>
        <Title variant="title">Projects</Title>
        <Typography className="my-6 leading-relaxed">
          Several projects that I have worked on, both private and open source.
        </Typography>
      </section>
      <ul className="grid place-items-center gap-4 md:grid-cols-2">
        {projects.map((props: ProjectProps) => (
          <li key={props.id} className="w-full">
            <ProjectItem {...props} />
          </li>
        ))}
      </ul>
    </AnimateEnter>
  );
}

export default Projects;
