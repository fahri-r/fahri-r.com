import getNotion from "@/lib/getNotion";
import getProperties from "@/lib/getProperties";
import { NotionAPI } from "notion-client";
import { NotionRenderer } from "react-notion-x";
import { uuidToId } from "notion-utils";
import { ExtendedRecordMap } from "notion-types";

interface ProjectDetailPageProps {
  project: ExtendedRecordMap;
}

export default function ProjectDetailPage({ project }: ProjectDetailPageProps) {
  return (
      <NotionRenderer
        recordMap={project}
        fullPage={true}
        darkMode={true}
        disableHeader
      />
  );
}

export async function getServerSideProps(context: any) {
  const slugParams = context.query.slug;

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
      tools: getPageProperty(tools.id, block).split(",") ?? null,
      status: getPageProperty(status.id, block) ?? null,
      thumbnail: image,
    });
  });

  const data = pages.find((item) => item.slug == slugParams);

  const notion = new NotionAPI();
  const project = await notion.getPage(data.id);
  return {
    props: {
      project,
    },
  };
}
