import { getGlobalData } from "@/common/libs/dev/notion/getNotionData";
import BLOG from "@/blog.config";
import NotionPageProps from "@/common/types/notion/notion-posts";
import PostProps from "@/common/types/notion/post";
import { NextSeo } from "next-seo";
import profile from "@/common/constant/profile";
import Projects from "@/modules/projects";

const PAGE_TITLE = "Projects";
const PAGE_DESCRIPTION =
  "Several projects that I have worked on, both private and open source.";

export default function ProjectPage(props: NotionPageProps) {
  return (
    <>
      <NextSeo
        title={`${PAGE_TITLE} - ${profile.name}`}
        description={PAGE_DESCRIPTION}
      />
      <Projects {...props} />
    </>
  );
}

export async function getStaticProps() {
  const from = "index";
  const props = await getGlobalData({ from });

  props.posts = props.allPages?.filter(
    (page: PostProps) =>
      page.status === BLOG.NOTION_PROPERTY_NAME.status_publish
  );

  return {
    props,
    revalidate: parseInt(BLOG.NEXT_REVALIDATE_SECOND as string),
  };
}
