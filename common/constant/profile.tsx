import ProfileProps from "@/common/types/common/profile";
import { Github, Instagram, Linkedin, Mail } from "lucide-react";

const profile: ProfileProps = {
  name: "Fahri Ramadhan",
  description:
    "Organized and self-motivated software engineer graduate with 1 years combined freelance and professional experience. Fluent in SQL, Javascript, and PHP programming languages. Possess practical working knowledge of relational databases using PostgreSQL and SQL Server. Constantly updating personal and professional technical skills with complementary collegiate courses and online bootcamps. Reliable and responsible team player.",
  job: "Software Engineer",
  dob: "12/07/2000",
  location: "Indonesia",
  education: [
    {
      institution: "Universitas Logistik dan Bisnis Internasional",
      degree: "Bachelor's degree",
      major: "Informatics Engineering, (S.Tr.Kom)",
      entry: 2019,
      resign: 2023,
      logo: "/images/education/ulbi.png",
      site: "https://www.ulbi.ac.id/",
    },
    {
      institution: "SMA Negeri 1 Sumedang",
      degree: "Senior High School",
      major: "Science",
      entry: 2016,
      resign: 2019,
      logo: "/images/education/sma1.png",
      site: "https://www.smansasumedang.sch.id/",
    },
  ],
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
  experiences: [
    {
      name: "CODE.ID",
      role: "Fullstack Developer",
      entry: {
        month: 2,
        year: 2024,
      },
    },
    {
      name: "PT. Ever Green Hans",
      role: "Software Developer",
      entry: {
        month: 6,
        year: 2023,
      },
      resign: {
        month: 12,
        year: 2023,
      },
    },
    {
      name: "PT. Bhairawa Tantra Nusantara",
      role: "Website Developer",
      entry: {
        month: 8,
        year: 2022,
      },
      resign: {
        month: 6,
        year: 2023,
      },
    },
    {
      name: "HIPMI Kabupaten Bekasi (Freelance)",
      role: "Frontend Developer",
      entry: {
        month: 3,
        year: 2023,
      },
      resign: {
        month: 3,
        year: 2023,
      },
    },
    {
      name: "Injabar UNPAD (Freelance)",
      role: "Fullstack Developer",
      entry: {
        month: 12,
        year: 2022,
      },
      resign: {
        month: 2,
        year: 2023,
      },
    },
  ],
  imgUrl: "/images/avatar.jpg",
};

export default profile;
