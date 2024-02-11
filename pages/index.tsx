import BLOG from "@/blog.config";
import profile from "@/common/constant/profile";
import { getGlobalData } from "@/common/libs/notion/getNotionData";
import NotionPageProps from "@/common/types/notion/notion-posts";
import PostProps from "@/common/types/notion/post";
import Home from "@/modules/home";
import { NextSeo } from "next-seo";

export default function HomePage(props: NotionPageProps) {
  const { posts } = props;

  return (
    <>
      <NextSeo title={`${profile.name} - Personal Website`} />
      <Home projects={posts} />
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
