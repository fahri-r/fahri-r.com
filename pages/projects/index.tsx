import { ProjectItem } from "@/components/ui/ProjectItem";
import Title from "@/components/utils/Title";
import Typography from "@/components/utils/Typography";
import ProjectProps from "@/types/project";
import getPages from "@/lib/notion/getPages";

interface ProjectPageProps {
  projects: ProjectProps[];
}

export default function ProjectPage({ projects }: ProjectPageProps) {
  return (
    <>
      <section>
        <Title variant="title">Projects</Title>
        <Typography className="my-6 leading-relaxed">
          Several projects that I have worked on, both private and open source.
        </Typography>
      </section>
      <ul className="grid place-items-center gap-4 md:grid-cols-2">
        {projects.map((props: ProjectProps) => (
          <li key={props.id} className="w-full">
            <ProjectItem {...props} />
          </li>
        ))}
      </ul>
    </>
  );
}

export async function getServerSideProps() {
  const projects = await getPages();

  return {
    props: {
      projects,
    },
  };
}
