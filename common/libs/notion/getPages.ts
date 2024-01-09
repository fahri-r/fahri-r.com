import getNotion from "./getNotion";
import getProperties from "./getProperties";
import { uuidToId } from "notion-utils";
import mapImage from "./mapImage";
import getBlockByType from "./getBlockByType";
import ProjectProps from "@/common/types/project";

const getPages = async (): Promise<ProjectProps[]> => {
  const response = await getNotion();

  const properties = getProperties({ response });
  const [repository, site, tools, slug, status, date, category, content] =
    properties;

  const getPageProperty = (id: string, property: any) => {
    return (
      property[1].value.properties[id]?.[0][1]?.[0][1]?.start_date ??
      property[1].value.properties[id]?.[0][0]
    );
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
      date: getPageProperty(date?.id, block),
      thumbnail: image,
    });
  });

  return pages.sort((a, b) => {
    let da: Date = new Date(a.date),
      db: Date = new Date(b.date);
    return db.getTime() - da.getTime();
  });

  // return pages;
};

export default getPages;
