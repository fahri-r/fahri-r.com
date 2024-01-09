import AnimateEnter from "@/common/components/elements/AnimateEnter";
import Divider from "@/common/components/elements/Divider";
import Title from "@/common/components/elements/Title";
import Typography from "@/common/components/elements/Typography";
import profile from "@/common/constant/profile";
import { CareerItem } from "@/modules/about/components/CareerItem";
import { DownloadButton } from "@/modules/about/components/DownloadButton";
import { Briefcase, Code2, Github } from "lucide-react";
import Image from "next/image";
import React from "react";
import GitHubCalendar from "react-github-calendar";
import { EducationItem } from "./EducationItem";

function About() {
  return (
    <AnimateEnter className="max-w-[854px] max-lg:py-8 lg:w-4/5 lg:pt-8">
      <section className="w-full">
        <Title variant="title">About</Title>
        <div className="my-6">
          <div className="space-y-3">
            <Typography className="leading-relaxed">
              Hi there! Thanks for visiting my personal website.
            </Typography>
            <Typography className="leading-relaxed">
              I&apos;m Fahri. I&apos;m{" "}
              {Math.floor(
                (new Date().valueOf() - new Date(profile.dob).valueOf()) /
                  1000 /
                  (60 * 60 * 24) /
                  365.25
              ).toString()}{" "}
              years old software engineer living in South Jakarta. I have a
              degree in Informatics Engineering from Universitas Logistik dan
              Bisnis Internasional.
            </Typography>
            <Typography className="leading-relaxed">
              Over more than four years of study in the field of software
              development, I&apos;ve gained significant experience in creating
              digital solutions. My current focus is on the exploration of
              design systems, the elaboration of innovative interfaces and the
              ability to transform code into truly exceptional user experiences.
            </Typography>
            <Typography className="leading-relaxed">
              I constantly strive to keep up to date with the latest market
              trends, demonstrating a commitment to making a difference in every
              project I&apos;m involved in.
            </Typography>
            <Typography className="leading-relaxed">
              Looking forward to the possibility of collaboration!
            </Typography>
          </div>
        </div>
        <div className="w-fit">
          <DownloadButton />
        </div>
      </section>
      <Divider />
      <section>
        <Title variant="title" size="xl" className="flex items-center gap-2">
          <Github size={18} />
          GitHub Contributions
        </Title>
        <div className="mt-6 text-white">
          <GitHubCalendar
            username={
              profile.socials.find((social) => social.name == "GitHub")
                ?.username!
            }
            colorScheme="dark"
            hideTotalCount
          />
        </div>
      </section>
      <Divider />
      <section>
        <div className="space-y-2">
          <Title variant="title" size="xl" className="flex items-center gap-2">
            <Briefcase size={18} />
            Career
          </Title>
          <Typography>My professional career journey.</Typography>
        </div>
        <ul className="mt-4 grid place-items-center gap-4 md:grid-cols-2">
          {profile.experiences.map((props, i) => (
            <li key={i} className="w-full">
              <CareerItem {...props} />
            </li>
          ))}
        </ul>
      </section>
      <Divider />
      <section>
        <div className="space-y-2">
          <Title variant="title" size="xl" className="flex items-center gap-2">
            <Code2 size={18} />
            Skills
          </Title>
          <Typography>My professional skills.</Typography>
        </div>
        <ul className="mt-4 flex flex-wrap items-center gap-3">
          {profile.skills.map(({ src, name }, i) => (
            <li
              key={i}
              className="flex items-center gap-2 rounded-lg border border-neutral-800 bg-neutral-900 px-3 py-2"
            >
              <Image src={src} width={18} alt={name} />
              <Typography size="sm" className="font-medium">
                {name}
              </Typography>
            </li>
          ))}
        </ul>
      </section>
      <Divider />
      <section>
        <div className="space-y-2">
          <Title variant="title" size="xl" className="flex items-center gap-2">
            <Briefcase size={18} />
            Education
          </Title>
          <Typography>My educational journey.</Typography>
        </div>
        <ul className="mt-4 grid place-items-center gap-4">
          {profile.education.map((props, i) => (
            <li key={i} className="w-full">
              <EducationItem {...props} />
            </li>
          ))}
        </ul>
      </section>
    </AnimateEnter>
  );
}

export default About;
