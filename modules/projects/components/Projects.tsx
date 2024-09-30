"use client";

import AnimateEnter from "@/common/components/elements/AnimateEnter";
import Title from "@/common/components/elements/Title";
import Typography from "@/common/components/elements/Typography";
import React from "react";
import { ProjectItem } from "./ProjectItem";
import NotionPageProps from "@/common/types/notion/notion-page";
import BlurFade from "@/common/components/elements/blur-fade";
import Link from "next/link";
import { ProjectCard } from "@/common/components/elements/project-card";
import moment from "moment";

const BLUR_FADE_DELAY = 0.04;

function Projects(props: NotionPageProps) {
  const { posts } = props;

  return (
    <>
      <section>
        <BlurFade delay={BLUR_FADE_DELAY}>
          <Title variant="title" className="font-sans text-xl font-bold">Projects</Title>
        </BlurFade>
        <BlurFade delay={BLUR_FADE_DELAY * 2}>
          <Typography className="leading-relaxed text-muted-foreground mb-4 text-sm">
            Several projects that I have worked on, both private and open source.
          </Typography>
        </BlurFade>
      </section>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 max-w-[800px] mx-auto">
        {posts.map((x, id) => (
          <BlurFade
            key={x.title}
            delay={BLUR_FADE_DELAY * 3 + id * 0.05}
          >
            <ProjectCard
              href={x.slug}
              key={x.title}
              title={x.title}
              description={x.description}
              dates={moment(x.date.start_date).format("LL")}
              tags={x.tools}
              image={x.pageCoverThumbnail}
            />
          </BlurFade>
        ))}
      </div>
    </>
  );
}

export default Projects;
