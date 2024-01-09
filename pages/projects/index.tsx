import ProjectProps from "@/common/types/project";
import getPages from "@/common/libs/notion/getPages";
import { fetchCache } from "@/common/libs/redisCache";
import { NextSeo } from "next-seo";
import profile from "@/common/constant/profile";
import Projects from "@/modules/projects";

type ProjectPageProps = {
  projects: ProjectProps[];
};

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
      <Projects projects={projects} />
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
