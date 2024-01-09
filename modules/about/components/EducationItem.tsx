"use client";

import Image from "next/image";
import Link from "next/link";
import Typography from "../../../common/components/elements/Typography";
import { Dot } from "lucide-react";

export function EducationItem(props: EducationProps) {
  const { institution, logo, degree, major, entry, resign, site } = props;

  return (
    <Link href={site} legacyBehavior>
      <a
        target="_blank"
        rel="noreferrer"
        className="relative flex flex-col items-center rounded-xl  border border-neutral-800 bg-neutral-900 p-2 hover:brightness-125 duration-300"
      >
        <div className="relative flex w-full">
          <figure className="relative w-1/4 h-32 overflow-clip rounded-md">
            <Image
              src={logo}
              className="object-contain object-top duration-500 ease-in-out p-2"
              alt={institution}
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAIAAAAmkwkpAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAP0lEQVQImQE0AMv/AFBQUJKSkqmpqaOjowCurq7v7+/Jycm5ubkA////jIyMn5+fg4ODADAwMD09PWlpaQAAAApRGnEHblMWAAAAAElFTkSuQmCC"
              priority
              fill
            />
          </figure>
          <div className="flex w-full flex-col space-y-4 px-3 py-4">
            <div className="flex flex-col justify-center space-y-2">
              <h3 className="font-mono text-xl text-primary">{institution}</h3>
            </div>
            <div className="flex gap-1.5 text-neutral-400 items-center">
              <Typography variant="muted" className="text-sm">
                {degree}
              </Typography>
              <Dot />
              <Typography variant="muted" className="text-sm">
                {major}
              </Typography>
            </div>
            <Typography
              variant="muted"
              className="text-sm duration-300 flex items-center"
            >
              {entry} - {resign}
            </Typography>
          </div>
        </div>
      </a>
    </Link>
  );
}
