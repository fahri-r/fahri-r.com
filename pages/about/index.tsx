import { CareerItem } from "@/modules/about/components/CareerItem";
import { DownloadButton } from "@/modules/about/components/DownloadButton";
import { EducationItem } from "@/modules/about/components/EducationItem";
import { AnimateEnter } from "@/common/components/elements/AnimateEnter";
import Divider from "@/common/components/elements/Divider";
import Title from "@/common/components/elements/Title";
import Typography from "@/common/components/elements/Typography";
import profile from "@/common/constant/profile";
import { Briefcase, Code2, Github } from "lucide-react";
import { NextSeo } from "next-seo";
import Image from "next/image";
import GitHubCalendar from "react-github-calendar";
import About from "@/modules/about";

const PAGE_TITLE = "About";
const PAGE_DESCRIPTION = "A short story of me.";

const AboutPage = () => {
  return (
    <>
      <NextSeo
        title={`${PAGE_TITLE} - ${profile.name}`}
        description={PAGE_DESCRIPTION}
      />
      <About />
    </>
  );
};

export default AboutPage;
