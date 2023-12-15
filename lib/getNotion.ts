import { NotionAPI } from "notion-client";

const getNotion = async () => {
  const pageId = process.env.NOTION_PAGE_ID!;
  const notion = new NotionAPI();
  const response = await notion.getPage(pageId);

  return response;
};

export default getNotion;
