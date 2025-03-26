import React from "react";
import { ExtendedRecordMap } from "notion-types";
import { NotionRenderer } from "react-notion-x";
import Image from "next/image";
import Link from "next/link";
import { getPageTitle } from "notion-utils";
import BlurFade from "@/common/components/elements/blur-fade";

function TheUntoldStoryDetail({ recordMap }: { recordMap: ExtendedRecordMap }) {
  const title = getPageTitle(recordMap);

  return (
    <BlurFade className="max-lg:py-8 lg:pt-8">
      <NotionRenderer
        className="text-black dark:text-white text-pretty text-base bg-background"
        pageTitle={<h1>{title}</h1>}
        components={{ nextImage: Image, nextLink: Link }}
        recordMap={recordMap}
        fullPage={true}
        darkMode={true}
        disableHeader
      />
    </BlurFade>
  );
}

export default TheUntoldStoryDetail;
