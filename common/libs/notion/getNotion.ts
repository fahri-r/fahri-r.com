import { NotionAPI } from "notion-client";
import { ExtendedRecordMap } from "notion-types";

const getNotion = async (): Promise<ExtendedRecordMap> => {
  const pageId = process.env.NOTION_PAGE_ID!;
  const notion = new NotionAPI();
  const response = await notion.getPage(pageId);

  return response;
};

export default getNotion;
