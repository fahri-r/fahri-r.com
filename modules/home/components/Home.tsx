import { AnimateEnter } from "@/common/components/elements/AnimateEnter";
import Divider from "@/common/components/elements/Divider";
import Title from "@/common/components/elements/Title";
import Typography from "@/common/components/elements/Typography";
import profile from "@/common/constant/profile";
import ProjectProps from "@/common/types/project";
import { Globe } from "lucide-react";
import Link from "next/link";
import React from "react";
import { ProjectItem } from "@/modules/projects/components/ProjectItem";

function Home({ projects }: { projects: any }) {
  return (
    <AnimateEnter className="max-w-[854px] max-lg:py-8 lg:w-4/5 lg:pt-8">
      <section>
        <Title variant="title">{profile.name}</Title>
        <Typography variant="muted" className="mt-2 flex items-center gap-2">
          <span className="text-emerald-600">
            <Globe size={16} />
          </span>
          {profile.location}
        </Typography>
        <Typography className="mt-4 leading-relaxed">
          {profile.description}
        </Typography>
      </section>
      <Divider />
      <div className="flex items-center justify-between">
        <Title variant="title" size="xl">
          Latest Projects
        </Title>
        <Link
          href="/projects"
          className="flex select-none items-center gap-1 text-xs font-medium text-foreground duration-300 hover:text-primary"
        >
          <span>View All Projects</span>
        </Link>
      </div>
      {/* <ul className="mt-6 grid place-items-center gap-4 md:grid-cols-2">
        {projects.slice(0, 2).map((props: ProjectProps) => (
          <li key={props.id} className="w-full">
            <ProjectItem {...props} />
          </li>
        ))}
      </ul> */}
      <Divider />
      <section className="flex flex-col gap-4 rounded-lg border border-neutral-800 bg-neutral-900 bg-globe-pattern bg-right bg-no-repeat p-5 max-md:bg-none">
        <Title variant="title" size="xl">
          Let&apos;s work together!
        </Title>
        <Typography className="max-w-xl leading-relaxed">
          I&apos;m open for freelance projects, feel free to email me to see how
          can we collaborate.
        </Typography>
        <Link href="/contact" className="w-fit">
          <button className="group relative grid overflow-hidden rounded-lg px-4 py-3.5 shadow-[0_1000px_0_0_hsl(0_0%_20%)_inset]">
            <span>
              <span className="spark mask-gradient animate-flip before:animate-rotate absolute inset-0 h-[100%] w-[100%] overflow-hidden rounded-lg duration-300 [mask:linear-gradient(white,_transparent_50%)] before:absolute before:aspect-square before:w-[200%] before:rotate-[-90deg] before:bg-[conic-gradient(from_0deg,transparent_0_340deg,white_360deg)] before:content-[''] before:[inset:0_auto_auto_50%] before:[translate:-50%_-15%]" />
            </span>
            <span className="backdrop absolute inset-[1px] rounded-lg bg-neutral-700 duration-300 group-hover:bg-neutral-600" />
            <span className="z-10 text-sm font-medium text-primary">
              Contact me
            </span>
          </button>
        </Link>
      </section>
    </AnimateEnter>
  );
}

export default Home;
