import { NotionAPI } from "notion-client";
import getNotion from "@/lib/getNotion";
import getProperties, { getPropertyIdByValue } from "@/lib/getProperties";
import { uuidToId } from "notion-utils";
import { ProjectItem } from "@/components/ui/ProjectItem";

export default function ProjectPage({ data, pages }: any) {
  return (
    <>
      <div className="max-w-[854px] max-lg:py-8 lg:w-4/5 lg:pt-8">
        <ul className="grid place-items-center gap-4 md:grid-cols-2">
          {pages.map((props) => (
            <li key={props.id} className="w-full">
              <ProjectItem {...props} />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const pageId = process.env.NOTION_PAGE_ID!;
  const notion = new NotionAPI();
  const data = await notion.getPage(pageId);

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

  return {
    props: {
      data,
      pages,
    },
  };
}
