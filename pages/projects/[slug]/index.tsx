import BLOG from "@/blog.config";
import NotionPage from "@/common/components/notion/notion-page";
import { getPostBlocks } from "@/common/libs/notion";
import { getGlobalData } from "@/common/libs/notion/get-notion-data";
import { getNotion } from "@/common/libs/notion/get-notion";
import { idToUuid } from "notion-utils";
import NotionPageDetailProps from "@/common/types/notion/notion-page-detail";
import PostProps from "@/common/types/notion/post";
import { NextSeo } from "next-seo";
import profile from "@/common/constant/profile";
import { useRouter } from "next/router";

export default function ProjectDetailPage(props: NotionPageDetailProps) {
  const router = useRouter();
  const { post } = props;

  // if (router.isFallback) {
  //   return (
  //     <>
  //       <NextSeo title={`${profile.name} - Personal Website`} />
  //       <AnimateEnter className="max-w-[854px] max-lg:py-8 lg:w-4/5 lg:pt-8">
  //         <ProjectSkeleton />
  //       </AnimateEnter>
  //     </>
  //   );
  // }

  return (
    <>
      <NextSeo title={`${post.title} - ${profile.name}`} />
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
