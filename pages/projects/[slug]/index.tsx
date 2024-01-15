import BLOG from "@/blog.config";
import NotionPage from "@/common/components/notion/NotionPage";
import { getPostBlocks } from "@/common/libs/dev/notion";
import { getGlobalData } from "@/common/libs/dev/notion/getNotionData";
import { getNotion } from "@/common/libs/dev/notion/getNotion";
import { idToUuid } from "notion-utils";
import NotionPageDetailProps from "@/common/types/notion/notion-post-detail";
import PostProps from "@/common/types/notion/post";
import { NextSeo } from "next-seo";
import profile from "@/common/constant/profile";

export default function ProjectDetailPage(props: NotionPageDetailProps) {
  const { post } = props;
  return (
    <>
      <NextSeo
        title={`${post.title} - ${profile.name}`}
        // description={PAGE_DESCRIPTION}
      />
      <NotionPage {...props} />
    </>
  );
}

export async function getStaticPaths() {
  if (!BLOG.isProd) {
    return {
      paths: [],
      fallback: true,
    };
  }

  const from = "slug-paths";
  const { allPages } = await getGlobalData({ from });
  return {
    paths: allPages
      ?.filter((row: PostProps) => row.slug.indexOf("/") > 0)
      .map((row: PostProps) => ({
        params: {
          prefix: row.slug.split("/")[0],
          slug: row.slug.split("/")[1],
        },
      })),
    fallback: true,
  };
}

export async function getStaticProps({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const from = `slug-props-${slug}`;
  const props = await getGlobalData({ from });

  props.post = props?.allPages?.find((p: PostProps) => {
    return p.slug === slug || p.id === idToUuid(slug);
  });

  if (!props?.post) {
    const pageId = slug.slice(-1)[0];
    if (pageId.length >= 32) {
      const post = await getNotion(pageId);
      props.post = post;
    }
  }

  if (!props?.post) {
    props.post = null;
    return {
      props,
      revalidate: parseInt(BLOG.NEXT_REVALIDATE_SECOND as string),
    };
  }

  if (!props?.posts?.blockMap) {
    props.post.blockMap = await getPostBlocks(props.post.id, from);
  }

  delete props.allPages;

  return {
    props,
    revalidate: parseInt(BLOG.NEXT_REVALIDATE_SECOND as string),
  };
}
