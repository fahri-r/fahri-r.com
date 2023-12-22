import { Metadata } from "next";
import Link from "next/link";

import { MoveLeft } from "lucide-react";
import Typography from "@/components/utils/Typography";
import { Button } from "@/components/utils/Button";
import { AnimateEnter } from "@/components/utils/AnimateEnter";

export const metadata: Metadata = {
  title: "Not Found",
  description: "A página que você está tentando acessar não existe.",
};

export default function NotFound() {
  return (
    <AnimateEnter className="max-w-[854px] max-lg:py-8 lg:w-4/5 lg:pt-8">
      <section className="flex flex-col items-center justify-center p-8">
        <div className="flex flex-col gap-4 text-center">
          <Typography>
            Whoops, there doesn't seem to be anything here!
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
