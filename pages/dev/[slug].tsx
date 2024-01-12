import BLOG from "@/blog.config";
import NotionPage from "@/common/components/dev/NotionPage";
import { getPostBlocks } from "@/common/libs/dev/notion";
import { getGlobalData } from "@/common/libs/dev/notion/getNotionData";
import getNotion from "@/common/libs/notion/getNotion";
import { idToUuid } from "notion-utils";

const PrefixSlug = (props) => {
  return <NotionPage post={props.post} className={""} />;
};

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
      ?.filter(
        (row) => row.slug.indexOf("/") > 0 && row.type.indexOf("Menu") < 0
      )
      .map((row) => ({
        params: {
          prefix: row.slug.split("/")[0],
          slug: row.slug.split("/")[1],
        },
      })),
    fallback: true,
  };
}

export async function getStaticProps({ params: { slug } }) {
  const from = `slug-props-${slug}`;
  const props = await getGlobalData({ from });

  props.post = props?.allPages?.find((p) => {
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
    return { props, revalidate: parseInt(BLOG.NEXT_REVALIDATE_SECOND) };
  }

  if (!props?.posts?.blockMap) {
    props.post.blockMap = await getPostBlocks(props.post.id, from);
  }

  const allPosts = props.allPages?.filter(
    (page) => page.type === "Post" && page.status === "Published"
  );
  if (allPosts && allPosts.length > 0) {
    const index = allPosts.indexOf(props.post);
    props.prev = allPosts.slice(index - 1, index)[0] ?? allPosts.slice(-1)[0];
    props.next = allPosts.slice(index + 1, index + 2)[0] ?? allPosts[0];
  } else {
    props.prev = null;
    props.next = null;
    props.recommendPosts = [];
  }

  delete props.allPages;
  return {
    props,
    revalidate: parseInt(BLOG.NEXT_REVALIDATE_SECOND),
  };
}

export default PrefixSlug;
