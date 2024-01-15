"use client";

import AnimateEnter from "@/common/components/elements/AnimateEnter";
import Title from "@/common/components/elements/Title";
import Typography from "@/common/components/elements/Typography";
import React from "react";
import { ProjectItem } from "./ProjectItem";
import NotionPageProps from "@/common/types/notion/notion-posts";

function Projects(props: NotionPageProps) {
  const { posts } = props;

  return (
    <AnimateEnter className="max-w-[854px] max-lg:py-8 lg:w-4/5 lg:pt-8">
      <section>
        <Title variant="title">Projects</Title>
        <Typography className="my-6 leading-relaxed">
          Several projects that I have worked on, both private and open source.
        </Typography>
      </section>
      <ul className="grid place-items-center gap-4 md:grid-cols-2">
        {posts.map((post) => (
          <li key={post.id} className="w-full">
            <ProjectItem {...post} />
          </li>
        ))}
      </ul>
    </AnimateEnter>
  );
}

export default Projects;
