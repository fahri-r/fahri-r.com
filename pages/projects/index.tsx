import { NotionAPI } from "notion-client";
import getNotion from "@/lib/getNotion";
import getProperties from "@/lib/getProperties";
import { uuidToId } from "notion-utils";
import { ProjectItem } from "@/components/ui/ProjectItem";
import { AnimateEnter } from "@/components/utils/AnimateEnter";
import Title from "@/components/utils/Title";
import Typography from "@/components/utils/Typography";

export default function ProjectPage({ pages }: any) {
  return (
    <AnimateEnter className="max-w-[854px] max-lg:py-8 lg:w-4/5 lg:pt-8">
      <section>
        <Title variant="title">Projects</Title>
        <Typography className="my-6 leading-relaxed">
          Several projects that I have worked on, both private and open source.
        </Typography>
      </section>
      <ul className="grid place-items-center gap-4 md:grid-cols-2">
        {pages.map((props) => (
          <li key={props.id} className="w-full">
            <ProjectItem {...props} />
          </li>
        ))}
      </ul>
    </AnimateEnter>
  );
}

export async function getServerSideProps() {
  const response = await getNotion();

  const pages: any[] = [];
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

    pages.push({
      id: uuidToId(block[0]) ?? null,
      title: getPageProperty(content.id, block) ?? null,
      slug: getPageProperty(slug.id, block) ?? null,
      repository: getPageProperty(repository.id, block) ?? null,
      site: getPageProperty(site.id, block) ?? null,
      category: getPageProperty(category.id, block) ?? null,
      tools: getPageProperty(tools.id, block) ?? null,
      status: getPageProperty(status.id, block) ?? null,
      thumbnail: image,
    });
  });

  return {
    props: {
      pages,
    },
  };
}
