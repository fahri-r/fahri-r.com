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
    <BlurFade className="max-w-[854px] max-lg:py-8 lg:w-4/5 lg:pt-8">
      <NotionRenderer
        pageTitle={<h1>{title} - The Untold Story</h1>}
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
