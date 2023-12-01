import { NotionAPI } from "notion-client";
import { NotionRenderer } from "react-notion-x";

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
  const notion = new NotionAPI();
  const data = await notion.getPage(slug);
  return {
    props: {
      data,
    },
  };
}
