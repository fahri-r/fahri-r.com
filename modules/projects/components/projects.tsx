"use client";

import React from "react";
import NotionPageProps from "@/common/types/notion/notion-page";
import BlurFade from "@/common/components/elements/blur-fade";
import { ProjectCard } from "@/common/components/project-card";
import moment from "moment";

const BLUR_FADE_DELAY = 0.04;

function Projects(props: NotionPageProps) {
  const { posts } = props;

  return (
    <>
      <section>
        <BlurFade delay={BLUR_FADE_DELAY}>
          <h1 className="font-sans text-xl font-bold">Projects</h1>
        </BlurFade>
        <BlurFade delay={BLUR_FADE_DELAY * 2}>
          <p className="leading-relaxed text-muted-foreground mb-4 text-sm">
            Several projects that I have worked on, both private and open source.
          </p>
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
