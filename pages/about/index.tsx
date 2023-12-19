import Divider from "@/components/utils/Divider";
import Title from "@/components/utils/Title";
import Typography from "@/components/utils/Typography";
import profile from "@/data/profile";
import { Code2, Github } from "lucide-react";
import Image from "next/image";
import GitHubCalendar from "react-github-calendar";

const AboutPage = () => {
  return (
    <>
      <section className="w-full">
        <Title variant="title">About</Title>
        <div className="my-6">
          <div className="space-y-3">
            <Typography className="leading-relaxed">Description</Typography>
          </div>
        </div>
        <div className="w-fit">{/* <DownloadButton /> */}</div>
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
              <Image
                src={src}
                width={18}
                alt={name}
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAIAAAAmkwkpAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAP0lEQVQImQE0AMv/AFBQUJKSkqmpqaOjowCurq7v7+/Jycm5ubkA////jIyMn5+fg4ODADAwMD09PWlpaQAAAApRGnEHblMWAAAAAElFTkSuQmCC"
              />
              <Typography size="sm" className="font-medium">
                {name}
              </Typography>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
};

export default AboutPage;