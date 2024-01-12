import dynamic from "next/dynamic";
import "katex/dist/katex.min.css";
import { mapImgUrl } from "@/common/libs/dev/notion/mapImage";
import { NotionRenderer } from "react-notion-x";
import NotionPageTitle from "./NotionPageTitle";

// Notion渲染
// const NotionRenderer = dynamic(() => import('react-notion-x').then(async (m) => {
//   return m.NotionRenderer
// }), {
//   ssr: false
// })

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

const Collection = dynamic(
  () =>
    import("react-notion-x/build/third-party/collection").then(
      (m) => m.Collection
    ),
  { ssr: true }
);

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
    >
      <NotionRenderer
        pageTitle={<NotionPageTitle post={post} />}
        recordMap={post.blockMap}
        mapPageUrl={mapPageUrl}
        mapImageUrl={mapImgUrl}
        components={{
          Code,
          Collection,
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
