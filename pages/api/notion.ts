// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import getNotion from "@/lib/getNotion";
import getProperties from "@/lib/getProperties";
import type { NextApiRequest, NextApiResponse } from "next";
import { uuidToId } from "notion-utils";

interface PageProps {
  id: string;
  title: string;
  slug: string;
  repository?: string;
  site?: string;
  tools: string;
  status: string;
  category: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const response = await getNotion();

  const pages: any[] = [];
  const pageBlock = Object.entries(response.block).filter(
    (x) => x[1].value.type === "page"
  );

  const properties = getProperties(response);
  console.log(properties);
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
    console.log(imageBlock);

    const image = {
      title: imageBlock[0][1].value.properties.title[0][0],
      url: `${process.env.NOTION_HOST}/image/${encodeURIComponent(
        imageBlock[0][1].value.properties.source[0][0]
      )}?table=block&id=${imageBlock[0][0]}&spaceId=${
        imageBlock[0][1].value.space_id
      }&width=2000&userId=&cache=v2`,
    };

    pages.push({
      id: uuidToId(block[0]),
      title: getPageProperty(content.id, block),
      slug: getPageProperty(slug.id, block),
      repository: getPageProperty(repository.id, block),
      site: getPageProperty(site.id, block),
      category: getPageProperty(category.id, block),
      tools: getPageProperty(tools.id, block),
      status: getPageProperty(status.id, block),
      thumbnail: image,
    });
  });

  res
    .status(200)
    .json(
      Object.entries(response.block).filter((x) => x[1].value.type === "image")
    );
}
