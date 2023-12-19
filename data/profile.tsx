import ProfileProps from "@/types/profile";
import { Github, Instagram, Linkedin, Mail } from "lucide-react";
import html from "@/public/images/skills/html.svg";
import css from "@/public/images/skills/css.svg";
import nextjs from "@/public/images/skills/nextjs.svg";
import react from "@/public/images/skills/react.svg";
import typescript from "@/public/images/skills/typescript.svg";
import javascript from "@/public/images/skills/javascript.svg";
import node from "@/public/images/skills/nodejs.svg";
import tailwind from "@/public/images/skills/tailwindcss.svg";
import mui from "@/public/images/skills/mui.svg";
import mysql from "@/public/images/skills/mysql.svg";

const profile: ProfileProps = {
  name: "Fahri Ramadhan",
  description:
    "Organized and self-motivated software engineer graduate with 1 years combined freelance and professional experience. Fluent in SQL, Javascript, and PHP programming languages. Possess practical working knowledge of relational databases using PostgreSQL and SQL Server. Constantly updating personal and professional technical skills with complementary collegiate courses and online bootcamps. Reliable and responsible team player.",
  job: "Software Engineer",
  dob: "12/07/2000",
  location: "Indonesia",
  socials: [
    {
      href: "https://github.com/fahri-r",
      name: "GitHub",
      username: "fahri-r",
      icon: <Github size={16} />,
    },
    {
      href: "https://www.linkedin.com/in/fahri-r",
      name: "LinkedIn",
      icon: <Linkedin size={16} />,
    },
    {
      href: "https://www.instagram.com/fahriramadhannnn",
      name: "Instagram",
      icon: <Instagram size={16} />,
    },
    {
      href: "mailto:00.fahri.r@gmail.com",
      name: "Email",
      icon: <Mail size={16} />,
    },
  ],
  skills: [
    {
      src: nextjs,
      name: "Next.js",
    },
    {
      src: react,
      name: "React",
    },
    {
      src: typescript,
      name: "TypeScript",
    },
    {
      src: javascript,
      name: "JavaScript",
    },
    {
      src: node,
      name: "Node.js",
    },
    {
      src: mysql,
      name: "MySQL",
    },
    {
      src: tailwind,
      name: "Tailwind CSS",
    },
    {
      src: mui,
      name: "MUI",
    },
    {
      src: html,
      name: "HTML",
    },
    {
      src: css,
      name: "CSS",
    },
  ],
  imgUrl: "/images/avatar.jpg",
};

export default profile;
