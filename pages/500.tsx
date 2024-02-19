import Link from "next/link";

import { MoveLeft } from "lucide-react";
import Typography from "@/common/components/elements/Typography";
import Button from "@/common/components/elements/Button";
import AnimateEnter from "@/common/components/elements/AnimateEnter";

export default function InternalServerError() {
  return (
    <AnimateEnter className="max-w-[854px] max-lg:py-8 lg:w-4/5 lg:pt-8">
      <section className="flex flex-col items-center justify-center p-8">
        <div className="flex flex-col gap-4 text-center">
          <Typography>
            Whoops, something went wrong!
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
    </AnimateEnter>
  );
}
