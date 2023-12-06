import { NotionAPI } from "notion-client";
import { NotionRenderer } from "react-notion-x";
import dynamic from "next/dynamic";

const Code = dynamic(() =>
  import("react-notion-x/build/third-party/code").then((m) => m.Code)
);
const Collection = dynamic(() =>
  import("react-notion-x/build/third-party/collection").then(
    (m) => m.Collection
  )
);
const Equation = dynamic(() =>
  import("react-notion-x/build/third-party/equation").then((m) => m.Equation)
);
const Pdf = dynamic(
  () => import("react-notion-x/build/third-party/pdf").then((m) => m.Pdf),
  {
    ssr: false,
  }
);
const Modal = dynamic(
  () => import("react-notion-x/build/third-party/modal").then((m) => m.Modal),
  {
    ssr: false,
  }
);

export default function ProjectPage({ data }: any) {
  return (
    <>
      <NotionRenderer
        recordMap={data}
        fullPage={false}
        darkMode={true}
        rootDomain="https://fahri-r.com/projects"
        components={{
          Code,
          Collection,
          Equation,
          Modal,
          Pdf,
        }}
        disableHeader
      />
    </>
  );
}

export async function getServerSideProps() {
  const pageId = process.env.NOTION_PAGE_ID!;
  const notion = new NotionAPI();
  const data = await notion.getPage(pageId);
  return {
    props: {
      data,
    },
  };
}
