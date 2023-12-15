"use client";

import Image from "next/image";
import Link from "next/link";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import Typography from "../utils/Typography";

export function ProjectItem(props: any) {
  const {
    id,
    title,
    slug,
    repository,
    site,
    category,
    tools,
    status,
    thumbnail,
  } = props;

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
      className="group relative flex flex-col items-center rounded-xl border border-zinc-800 p-2"
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
        <figure className="relative w-full h-56">
          <Image
            src={thumbnail.url}
            className="rounded-md object-cover object-top"
            alt={thumbnail.title}
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAIAAAAmkwkpAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAP0lEQVQImQE0AMv/AFBQUJKSkqmpqaOjowCurq7v7+/Jycm5ubkA////jIyMn5+fg4ODADAwMD09PWlpaQAAAApRGnEHblMWAAAAAElFTkSuQmCC"
            priority
            fill
          />
        </figure>
        <div className="flex w-full flex-col space-y-4 px-3 py-4">
          <div className="flex flex-col justify-center space-y-2">
            <h3 className="font-mono text-xl text-primary">{title}</h3>
            {/* <Typography size="sm" className="leading-[1.7]">
              {smallDescription}
            </Typography> */}
          </div>
          {/* <div className="flex flex-wrap gap-3">
            {techs.map((tech, index) => (
              <Image
                key={index}
                src={tech.image}
                width={22}
                alt="Techs"
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAIAAAAmkwkpAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAP0lEQVQImQE0AMv/AFBQUJKSkqmpqaOjowCurq7v7+/Jycm5ubkA////jIyMn5+fg4ODADAwMD09PWlpaQAAAApRGnEHblMWAAAAAElFTkSuQmCC"
              />
            ))}
          </div> */}
        </div>
      </div>
    </Link>
  );
}
