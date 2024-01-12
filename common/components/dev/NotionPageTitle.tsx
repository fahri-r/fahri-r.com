import React from "react";
import Title from "../elements/Title";
import Link from "next/link";
import { Eye, Github } from "lucide-react";

function NotionPageTitle({ post }: { post: any }) {
  return (
    <div className="flex flex-col space-y-4">
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
  );
}

export default NotionPageTitle;
