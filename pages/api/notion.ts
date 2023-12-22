// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import getNotion from "@/lib/notion/getNotion";
import getProperties from "@/lib/notion/getProperties";
import type { NextApiRequest, NextApiResponse } from "next";
import { uuidToId } from "notion-utils";
import { NotionMap, Block, BaseBlock } from "notion-types";

interface getBlockByTypeProps {
  block: NotionMap<Block>;
  type: string;
}

const getBlockByType = ({ block, type }: getBlockByTypeProps) => {
  return Object.entries(block).filter((x) => x[1].value.type === type);
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const response = await getNotion();

  const pages: any[] = [];
  const pageBlock = getBlockByType({ block: response.block, type: "page" });
  const imageBlock = getBlockByType({
    block: response.block,
    type: "image",
  });

  const properties = getProperties({ response });
  const [repository, site, tools, slug, status, date, category, content] =
    properties;

  const getPageProperty = (id: string, property: any) => {
    return property[1].value.properties[id]?.[0][0];
  };

  pageBlock.forEach((block) => {
    const blockId = block[1].value.content;

    const imageById = imageBlock.find((block) =>
      blockId!.includes(block[0])
    )![1].value;

    const image = mapImage({ block: imageById });

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

  res.status(200).json(pages);
}

const mapImage = ({
  block,
  width = 400,
}: {
  block: BaseBlock;
  width?: number;
}) => {
  const { properties, space_id, id } = block;

  const srcUrl = encodeURIComponent(properties.source[0][0]);

  const urlObj = new URL(`${process.env.NOTION_HOST}/image/${srcUrl}`);

  urlObj.searchParams.set("table", "block");
  urlObj.searchParams.set("id", id);
  urlObj.searchParams.set("spaceId", space_id!);
  urlObj.searchParams.set("width", width.toString());
  urlObj.searchParams.set("cache", "v2");

  return {
    title: properties.title[0][0],
    url: urlObj.toString(),
  };
};
