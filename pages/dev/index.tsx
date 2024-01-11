import { getPostBlocks } from "@/common/libs/dev/notion";
import { getGlobalData } from "@/common/libs/dev/notion/getNotionData";
import { generateRss } from "@/common/libs/dev/rss";
import { generateRobotsTxt } from "@/common/libs/dev/robots.txt";
import { siteConfig } from "@/common/libs/dev/config";
import { useRouter } from "next/router";
import BlogPostCard from "@/common/components/dev/components/BlogPostCard";
import BLOG from "@/blog.config";
import Link from "next/link";

/**
 * 首页布局
 * @param {*} props
 * @returns
 */
const Index = (props) => {
  // 根据页面路径加载不同Layout文件
  const { posts, postCount } = props;
  const router = useRouter();
  const totalPage = Math.ceil(
    postCount / parseInt(siteConfig("POSTS_PER_PAGE"))
  );

  const pagePrefix = router.asPath
    .split("?")[0]
    .replace(/\/page\/[1-9]\d*/, "")
    .replace(/\/$/, "");

  const meta = {
    title: `${siteConfig("TITLE")} | ${siteConfig("DESCRIPTION")}`,
    description: siteConfig("DESCRIPTION"),
    image: siteConfig("HOME_BANNER_IMAGE"),
    slug: "",
    type: "website",
  };
  return (
    <div className={`w-full md:pr-12 mb-12`}>
      <div id="posts-wrapper">
        {posts?.map((post) => (
          <BlogPostCard key={post.id} post={post} />
        ))}
      </div>

      <div className="flex justify-between text-xs">
        {/* <Link
          href={{
            pathname: `${pagePrefix}/`,
            query: router.query.s ? { s: router.query.s } : {},
          }}
          className={
            "bg-gray pointer-events-none text-white no-underline py-2 px-3 rounded"
          }
        >
          Prev
        </Link> */}
        {/* <Link
          href={{
            pathname: `${pagePrefix}/page/${currentPage + 1}`,
            query: router.query.s ? { s: router.query.s } : {},
          }}
          className={`${
            showNext ? "bg-black " : "bg-gray pointer-events-none "
          } text-white no-underline py-2 px-3 rounded`}
        >
          Next
        </Link> */}
      </div>
    </div>
  );
};

/**
 * SSG 获取数据
 * @returns
 */
export async function getStaticProps() {
  const from = "index";
  const props = await getGlobalData({ from });

  props.posts = props.allPages?.filter(
    (page) => page.type === "Post" && page.status === "Published"
  );

  // 处理分页
  if (BLOG.POST_LIST_STYLE === "scroll") {
    // 滚动列表默认给前端返回所有数据
  } else if (BLOG.POST_LIST_STYLE === "page") {
    props.posts = props.posts?.slice(0, BLOG.POSTS_PER_PAGE);
  }

  // 预览文章内容
  if (BLOG.POST_LIST_PREVIEW === "true") {
    for (const i in props.posts) {
      const post = props.posts[i];
      if (post.password && post.password !== "") {
        continue;
      }
      post.blockMap = await getPostBlocks(
        post.id,
        "slug",
        BLOG.POST_PREVIEW_LINES
      );
    }
  }

  // 生成robotTxt
  generateRobotsTxt();
  // 生成Feed订阅
  if (JSON.parse(BLOG.ENABLE_RSS)) {
    generateRss(props?.latestPosts || []);
  }

  // 生成全文索引 - 仅在 yarn build 时执行 && process.env.npm_lifecycle_event === 'build'

  delete props.allPages;

  return {
    props,
    revalidate: parseInt(BLOG.NEXT_REVALIDATE_SECOND),
  };
}

export default Index;
