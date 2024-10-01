import Link from "next/link";

import { MoveLeft } from "lucide-react";
import Typography from "@/common/components/elements/typography";
import { Button } from "@/common/components/elements/button";
import BlurFade from "@/common/components/elements/blur-fade";

export default function NotFound() {
  return (
    <BlurFade className="max-w-[854px] max-lg:py-8 lg:w-4/5 lg:pt-8">
      <section className="flex flex-col items-center justify-center p-8">
        <div className="flex flex-col gap-4 text-center">
          <Typography>
            Whoops, there doesn&apos;t seem to be anything here!
          </Typography>
          <div className="flex items-center justify-center gap-4">
            <Link href="/">
              <Button variant="ghost" className="group">
                <MoveLeft
                  className="transition-transform duration-300 group-hover:-translate-x-0.5"
                  size={20}
                />
                Home
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </BlurFade>
  );
}
