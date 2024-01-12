import dynamic from "next/dynamic";
import "katex/dist/katex.min.css";
import { mapImgUrl } from "@/common/libs/dev/notion/mapImage";
import { NotionRenderer } from "react-notion-x";
import NotionPageTitle from "./NotionPageTitle";
import Title from "../elements/Title";
import Link from "next/link";
import { Eye, Github } from "lucide-react";

const Code = dynamic(
  () =>
    import("react-notion-x/build/third-party/code").then(async (m) => {
      return m.Code;
    }),
  { ssr: false }
);

// 公式
const Equation = dynamic(
  () =>
    import("@/common/components/dev/Equation").then(async (m) => {
      // 化学方程式
      await import("@/common/libs/dev/mhchem");
      return m.Equation;
    }),
  { ssr: false }
);

const Pdf = dynamic(
  () => import("react-notion-x/build/third-party/pdf").then((m) => m.Pdf),
  {
    ssr: false,
  }
);

/**
 * tweet嵌入
 */
const TweetEmbed = dynamic(() => import("react-tweet-embed"), {
  ssr: false,
});

const Modal = dynamic(
  () => import("react-notion-x/build/third-party/modal").then((m) => m.Modal),
  { ssr: false }
);

const Tweet = ({ id }) => {
  return <TweetEmbed tweetId={id} />;
};

const NotionPage = ({ post, className }) => {
  if (!post || !post.blockMap) {
    return <>{post?.summary || ""}</>;
  }

  return (
    <div
      id="notion-article"
      className={`mx-auto overflow-hidden ${className || ""}`}
    ><div className="flex flex-col space-y-4">
    <Title variant="title" className="space-y-2 font-normal">
      {post.title}
    </Title>

    {(post.site || post.repository) && (
      <div className="flex text-base font-normal font-mono gap-2 items-center">
        {post.repository && (
          <Link href={post.repository} legacyBehavior>
            <a
              className="flex items-center gap-2"
              target="_blank"
              rel="noreferrer"
            >
              <Github size={18} />
              <span className="text-emerald-500 duration-300 hover:text-emerald-400">
                Source code
              </span>
            </a>
          </Link>
        )}

        {post.site && post.repository && (
          <div className="mx-1 h-4 w-px bg-neutral-800" />
        )}

        {post.site && (
          <Link href={post.site} legacyBehavior>
            <a
              className="flex items-center gap-2"
              target="_blank"
              rel="noreferrer"
            >
              <Eye size={18} />
              <span className="text-emerald-500 duration-300 hover:text-emerald-400">
                Site
              </span>
            </a>
          </Link>
        )}
      </div>
    )}
  </div>
      <NotionRenderer
        recordMap={post.blockMap}
        mapPageUrl={mapPageUrl}
        mapImageUrl={mapImgUrl}
        components={{
          Code,
          Equation,
          Modal,
          Pdf,
          Tweet,
        }}
      />
    </div>
  );
};

const mapPageUrl = (id) => {
  // return 'https://www.notion.so/' + id.replace(/-/g, '')
  return "/" + id.replace(/-/g, "");
};

export default NotionPage;
