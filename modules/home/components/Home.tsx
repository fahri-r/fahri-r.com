import React from "react";
import PostProps from "@/common/types/notion/post";
import HeroSection from "./hero-section";
import AboutSection from "./about-section";
import WorkSection from "./work-section";
import EducationSection from "./education-section";
import ProjectSection from "./project-section";

const BLUR_FADE_DELAY = 0.04;

function Home({ projects }: { projects: PostProps[] }) {
  return (
    <main className="flex flex-col min-h-[100dvh] space-y-10">
      <HeroSection delay={BLUR_FADE_DELAY} />
      <AboutSection delay={BLUR_FADE_DELAY} />
      <WorkSection delay={BLUR_FADE_DELAY} />
      <EducationSection delay={BLUR_FADE_DELAY} />
      <ProjectSection delay={BLUR_FADE_DELAY} projects={projects} />
    </main>
  );
}

export default Home;
