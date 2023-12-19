import ProfileProps from "@/types/profile";
import { Github, Instagram, Linkedin, Mail } from "lucide-react";

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
  imgUrl: "/images/avatar.jpg",
};

export default profile;
