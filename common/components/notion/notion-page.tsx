import dynamic from "next/dynamic";
import { mapImgUrl } from "@/common/libs/notion/map-image";
import { NotionRenderer } from "react-notion-x";
import Link from "next/link";
import { Eye, Github } from "lucide-react";
import TweetEmbed from "react-tweet-embed";
import Image from "next/image";
import NotionPageDetailProps from "@/common/types/notion/notion-page-detail";
import BlurFade from "../elements/blur-fade";

const Code = dynamic(
  () =>
    import("react-notion-x/build/third-party/code").then(async (m) => {
      return m.Code;
    }),
  { ssr: false }
);

const Equation = dynamic(
  () =>
    import("react-notion-x/build/third-party/equation").then((m) => m.Equation),
  { ssr: false }
);

const Pdf = dynamic(
  () => import("react-notion-x/build/third-party/pdf").then((m) => m.Pdf),
  {
    ssr: false,
  }
);

const Modal = dynamic(
  () => import("react-notion-x/build/third-party/modal").then((m) => m.Modal),
  { ssr: false }
);

const Tweet = ({ id }: { id: string }) => {
  return <TweetEmbed tweetId={id} />;
};

const NotionPage = (props: NotionPageDetailProps) => {
  const { post } = props;

  return (
    <BlurFade className="max-w-2xl lg:pt-8">
      <div id="notion-article" className={`mx-auto overflow-hidden`}>
        <div className="flex flex-col space-y-4">
          <h1 className="text-xl space-y-2 font-sans font-bold">
            {post.title}
          </h1>

          {(post.site || post.repository) && (
            <div className="flex text-base font-sans gap-2 items-center">
              {post.repository && (
                <Link href={post.repository} legacyBehavior>
                  <a
                    className="flex items-center gap-2 text-primary"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Github size={18} />
                    <span className="hover:underline text-sm">
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
                    className="flex items-center gap-2 text-primary"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Eye size={18} />
                    <span className="hover:underline text-sm">
                      Site
                    </span>
                  </a>
                </Link>
              )}
            </div>
          )}
        </div>
        <NotionRenderer
          className="px-0 text-muted-foreground text-sm text-pretty text-base"
          recordMap={post.blockMap}
          mapPageUrl={mapPageUrl}
          mapImageUrl={mapImgUrl}
          components={{
            nextImage: Image,
            nextLink: Link,
            Code,
            Equation,
            Modal,
            Pdf,
            Tweet,
          }}
        />
      </div>
    </BlurFade>
  );
};

const mapPageUrl = (id: string) => {
  // return 'https://www.notion.so/' + id.replace(/-/g, '')
  return "/" + id.replace(/-/g, "");
};

export default NotionPage;
