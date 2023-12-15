"use client";

import Link from "next/link";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";

export function ProjectItem(props: any) {
  const { title, slug } = props;

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
      <div className="relative flex flex-col">
        <div className="flex w-full flex-col space-y-4 px-3 py-4">
          <div className="flex flex-col justify-center space-y-2">
            <h3 className="font-mono text-xl text-primary">{title}</h3>
          </div>
        </div>
      </div>
    </Link>
  );
}
