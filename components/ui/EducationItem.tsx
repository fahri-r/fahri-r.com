"use client";

import Image from "next/image";
import Link from "next/link";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import Typography from "../utils/Typography";
import { ArrowRight } from "lucide-react";
import ProjectProps from "@/types/project";

export function EducationItem() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  return (
    <Link
      href={`/projects/tes`}
      className="relative flex flex-col items-center rounded-xl  border border-neutral-800 bg-neutral-900 p-2"
    >
      <div className="relative flex w-full">
        <figure className="relative w-1/4 h-32 overflow-clip rounded-md">
          <Image
            src={"/images/education/ulbi.png"}
            className="object-contain object-top duration-500 ease-in-out p-2"
            alt={"tes"}
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAIAAAAmkwkpAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAP0lEQVQImQE0AMv/AFBQUJKSkqmpqaOjowCurq7v7+/Jycm5ubkA////jIyMn5+fg4ODADAwMD09PWlpaQAAAApRGnEHblMWAAAAAElFTkSuQmCC"
            priority
            fill
          />
        </figure>
        <div className="flex w-full flex-col space-y-4 px-3 py-4">
          <div className="flex flex-col justify-center space-y-2">
            <h3 className="font-mono text-xl text-primary">Tes</h3>
          </div>
          <Typography
            variant="muted"
            className="text-sm duration-300 flex items-center"
          >
            Tes
          </Typography>
          <Typography
            variant="muted"
            className="text-sm duration-300 flex items-center"
          >
            Tahun
          </Typography>
        </div>
      </div>
    </Link>
  );
}
