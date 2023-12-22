import getNotion from "./getNotion";
import getProperties from "./getProperties";
import { uuidToId } from "notion-utils";
import mapImage from "./mapImage";
import getBlockByType from "./getBlockByType";
import ProjectProps from "@/types/project";

const getPages = async (): Promise<ProjectProps[]> => {
  const response = await getNotion();

  const properties = getProperties({ response });
  const [repository, site, tools, slug, status, date, category, content] =
    properties;

  const getPageProperty = (id: string, property: any) => {
    return property[1].value.properties[id]?.[0][0];
  };

  const pages: ProjectProps[] = [];

  const pageBlock = getBlockByType({ block: response.block, type: "page" });
  const imageBlock = getBlockByType({
    block: response.block,
    type: "image",
  });

  pageBlock.forEach((block) => {
    const pageId = block[1].value.content;

    const imageById = imageBlock.find((block) => pageId!.includes(block[0]))![1]
      .value;

    const image = mapImage({ block: imageById });

    pages.push({
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

  return pages;
};

export default getPages;
