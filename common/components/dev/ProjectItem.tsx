"use client";

import Link from "next/link";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import Typography from "../../../common/components/elements/Typography";
import { ArrowRight } from "lucide-react";
import ProjectProps from "@/common/types/project";
import LazyImage from "./LazyImage";

export function ProjectItem(props: any) {
  const { pageCoverThumbnail, slug, tools, title } = props.post;

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  return (
    <Link
      href={`/projects/${slug}`}
      onMouseMove={(e) => {
        const { left, top } = e.currentTarget.getBoundingClientRect();

        mouseX.set(e.clientX - left);
        mouseY.set(e.clientY - top);
      }}
      className="group relative flex flex-col items-center rounded-xl border border-zinc-800 p-2 w-full"
    >
      <div className="absolute right-5 top-0 h-px w-80 bg-gradient-to-l from-transparent via-primary/30 via-10% to-transparent" />
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(255,255,255,0.1),
              transparent 80%
            )
          `,
        }}
      />
      <div className="relative flex flex-col w-full">
        <figure className="relative w-full h-44 xl:h-56 overflow-clip rounded-md">
          <Typography
            variant="primary"
            className="absolute z-10 top-0 left-0 text-center w-full h-full group-hover:opacity-100 opacity-0 duration-500 flex items-center justify-center"
          >
            View Project
            <ArrowRight
              size={16}
              className="transition-transform duration-150 group-hover:delay-200 group-hover:translate-x-2 ease-in"
            />
          </Typography>
          <LazyImage
            src={pageCoverThumbnail}
            className="object-cover object-top group-hover:scale-110 group-hover:brightness-50 duration-500 ease-in-out text-primary h-fit"
            alt={title}
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAIAAAAmkwkpAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAP0lEQVQImQE0AMv/AFBQUJKSkqmpqaOjowCurq7v7+/Jycm5ubkA////jIyMn5+fg4ODADAwMD09PWlpaQAAAApRGnEHblMWAAAAAElFTkSuQmCC"
            priority
            fill
          />
        </figure>
        <div className="flex w-full flex-col space-y-4 px-3 py-4">
          <div className="flex flex-col justify-center space-y-2">
            <h3 className="font-mono text-xl text-primary">{title}</h3>
          </div>
          <div className="flex flex-wrap gap-3">
            {tools?.map((tool, i) => (
              <Typography
                key={i}
                variant="muted"
                className="select-none text-sm duration-300"
              >
                {tool}
              </Typography>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
