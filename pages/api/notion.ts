// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import getNotion from "@/lib/getNotion";
import getProperties, { getPropertyIdByValue } from "@/lib/getProperties";
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
  res.status(200).json(response);

  const pages: any[] = [];
  const pageBlock = Object.entries(response.block).filter(
    (x) => x[1].value.type === "page"
  );

  const properties = getProperties(response);

  const slugId = getPropertyIdByValue("Slug", properties);
  const repositoryId = getPropertyIdByValue("Repository", properties);
  const siteId = getPropertyIdByValue("Site", properties);
  const categoryId = getPropertyIdByValue("Category", properties);
  const toolsId = getPropertyIdByValue("Tools", properties);
  const statusId = getPropertyIdByValue("Status", properties);
  const contentId = getPropertyIdByValue("Content", properties);

  const getPageProperty = (id: string, property: any) => {
    return property[1].value.properties[id]?.[0][0];
  };

  pageBlock.forEach((x) => {
    pages.push({
      id: uuidToId(x[0]),
      title: getPageProperty(contentId, x),
      slug: getPageProperty(slugId, x),
      repository: getPageProperty(repositoryId, x),
      site: getPageProperty(siteId, x),
      category: getPageProperty(categoryId, x),
      tools: getPageProperty(toolsId, x),
      status: getPageProperty(statusId, x),
    });
  });

  res.status(200).json(response);
}
