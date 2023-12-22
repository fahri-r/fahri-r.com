import { ProjectItem } from "@/components/ui/ProjectItem";
import Title from "@/components/utils/Title";
import Typography from "@/components/utils/Typography";
import ProjectProps from "@/types/project";
import getPages from "@/lib/notion/getPages";
import { AnimateEnter } from "@/components/utils/AnimateEnter";
import { fetchCache } from "@/lib/redisCache";
import { NextSeo } from "next-seo";
import profile from "@/data/profile";

interface ProjectPageProps {
  projects: ProjectProps[];
}

const PAGE_TITLE = "Projects";
const PAGE_DESCRIPTION =
  "Several projects that I have worked on, both private and open source.";

export default function ProjectPage({ projects }: ProjectPageProps) {
  return (
    <>
      <NextSeo
        title={`${PAGE_TITLE} - ${profile.name}`}
        description={PAGE_DESCRIPTION}
      />
      <AnimateEnter className="max-w-[854px] max-lg:py-8 lg:w-4/5 lg:pt-8">
        <section>
          <Title variant="title">Projects</Title>
          <Typography className="my-6 leading-relaxed">
            Several projects that I have worked on, both private and open
            source.
          </Typography>
        </section>
        <ul className="grid place-items-center gap-4 md:grid-cols-2">
          {projects.map((props: ProjectProps) => (
            <li key={props.id} className="w-full">
              <ProjectItem {...props} />
            </li>
          ))}
        </ul>
      </AnimateEnter>
    </>
  );
}

export async function getServerSideProps() {
  const fetchData = async () => {
    const response = await getPages();
    return response;
  };

  const projects = await fetchCache("projects", fetchData, 60 * 60 * 24);

  return {
    props: {
      projects,
    },
  };
}
