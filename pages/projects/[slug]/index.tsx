import getNotion from "@/lib/getNotion";
import getProperties, { getPropertyIdByValue } from "@/lib/getProperties";
import { NotionAPI } from "notion-client";
import { NotionRenderer } from "react-notion-x";
import { uuidToId } from "notion-utils";

export default function ProjectPage({ data }: any) {
  return (
    <div>
      <NotionRenderer
        recordMap={data}
        fullPage={true}
        darkMode={true}
        disableHeader
      />
    </div>
  );
}

export async function getServerSideProps(context: any) {
  const slug = context.query.slug;

  const response = await getNotion();

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

  pageBlock.forEach((x) => {
    pages.push({
      id: uuidToId(x[0]),
      title: x[1].value.properties.title[0][0],
      slug: x[1].value.properties[slugId][0][0],
      repository: x[1].value.properties[repositoryId]?.[0][0] ?? "",
      site: x[1].value.properties[siteId]?.[0][0] ?? "",
      category: x[1].value.properties[categoryId][0][0],
      tools: x[1].value.properties[toolsId][0][0],
      status: x[1].value.properties[statusId][0][0],
    });
  });

  const project = pages.find((item) => item.slug == slug);

  const notion = new NotionAPI();
  const data = await notion.getPage(project.id);
  return {
    props: {
      data,
    },
  };
}
