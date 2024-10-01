import BLOG from "@/blog.config";
import profile from "@/common/constant/profile";
import { getGlobalData } from "@/common/libs/notion/get-notion-data";
import NotionPageProps from "@/common/types/notion/notion-page";
import PostProps from "@/common/types/notion/post";
import { NextSeo } from "next-seo";
import Home from "@/modules/home";

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
  ).slice(0, 4);

  return {
    props,
    revalidate: parseInt(BLOG.NEXT_REVALIDATE_SECOND as string),
  };
}
