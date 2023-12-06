// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { NotionAPI } from "notion-client";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const pageId = process.env.NOTION_PAGE_ID!;
  const notion = new NotionAPI();
  const data = await notion.getPage(pageId);
  res.status(200).json(data);
}
