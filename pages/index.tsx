import { ProjectItem } from "@/components/ui/ProjectItem";
import Divider from "@/components/utils/Divider";
import Title from "@/components/utils/Title";
import Typography from "@/components/utils/Typography";
import profile from "@/data/profile";
import getNotion from "@/lib/getNotion";
import getProperties from "@/lib/getProperties";
import ProjectProps from "@/types/project";
import { Globe } from "lucide-react";
import Link from "next/link";
import { uuidToId } from "notion-utils";

export default function Home({ projects }: any) {
  return (
    <>
      <section>
        <Title variant="title">{profile.name}</Title>
        <Typography variant="muted" className="mt-2 flex items-center gap-2">
          <span className="text-emerald-600">
            <Globe size={16} />
          </span>
          {profile.location}
        </Typography>
        <Typography className="mt-4 leading-relaxed">
          {profile.description}
        </Typography>
      </section>
      <Divider />
      <div className="flex items-center justify-between">
        <Title variant="title" size="xl">
          Latest Projects
        </Title>
        <Link
          href="/projects"
          className="flex select-none items-center gap-1 text-xs font-medium text-foreground duration-300 hover:text-primary"
        >
          <span>View All Projects</span>
        </Link>
      </div>
      <ul className="mt-6 grid place-items-center gap-4 md:grid-cols-2">
        {projects.slice(0, 2).map((props: ProjectProps) => (
          <li key={props.id} className="w-full">
            <ProjectItem {...props} />
          </li>
        ))}
      </ul>
      <Divider />
      <section className="flex flex-col gap-4 rounded-lg border border-neutral-800 bg-neutral-900 bg-globe-pattern bg-right bg-no-repeat p-5 max-md:bg-none">
        <Title variant="title" size="xl">
          Let's work together!
        </Title>
        <Typography className="max-w-xl leading-relaxed">
          I'm open for freelance projects, feel free to email me to see how can
          we collaborate.
        </Typography>
        <Link href="/contact" className="w-fit">
          <button className="group relative grid overflow-hidden rounded-lg px-4 py-3.5 shadow-[0_1000px_0_0_hsl(0_0%_20%)_inset]">
            <span>
              <span className="spark mask-gradient animate-flip before:animate-rotate absolute inset-0 h-[100%] w-[100%] overflow-hidden rounded-lg duration-300 [mask:linear-gradient(white,_transparent_50%)] before:absolute before:aspect-square before:w-[200%] before:rotate-[-90deg] before:bg-[conic-gradient(from_0deg,transparent_0_340deg,white_360deg)] before:content-[''] before:[inset:0_auto_auto_50%] before:[translate:-50%_-15%]" />
            </span>
            <span className="backdrop absolute inset-[1px] rounded-lg bg-neutral-700 duration-300 group-hover:bg-neutral-600" />
            <span className="z-10 text-sm font-medium text-primary">
              Contact me
            </span>
          </button>
        </Link>
      </section>
    </>
  );
}

export async function getServerSideProps() {
  const response = await getNotion();

  const projects: ProjectProps[] = [];
  const pageBlock = Object.entries(response.block).filter(
    (x) => x[1].value.type === "page"
  );

  const properties = getProperties(response);
  const [repository, site, tools, slug, status, date, category, content] =
    properties;

  const getPageProperty = (id: string, property: any) => {
    return property[1].value.properties[id]?.[0][0];
  };

  pageBlock.forEach((block) => {
    const contentBlock = block[1].value.content;

    const imageBlock = Object.entries(response.block).filter(
      (x) => contentBlock?.includes(x[0]) && x[1].value.type === "image"
    );

    const image = {
      title: imageBlock[0][1].value.properties.title[0][0],
      url: `${process.env.NOTION_HOST}/image/${encodeURIComponent(
        imageBlock[0][1].value.properties.source[0][0]
      )}?table=block&id=${imageBlock[0][0]}&spaceId=${
        imageBlock[0][1].value.space_id
      }&width=400&userId=&cache=v2`,
    };

    projects.push({
      id: uuidToId(block[0]),
      title: getPageProperty(content.id, block),
      slug: getPageProperty(slug.id, block),
      repository: getPageProperty(repository.id, block) ?? null,
      site: getPageProperty(site.id, block) ?? null,
      category: getPageProperty(category.id, block),
      tools: getPageProperty(tools.id, block).split(","),
      status: getPageProperty(status.id, block),
      thumbnail: image,
    });
  });

  return {
    props: {
      projects,
    },
  };
}
