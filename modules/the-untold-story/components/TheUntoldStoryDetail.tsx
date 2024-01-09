import React from "react";
import { ExtendedRecordMap } from "notion-types";
import AnimateEnter from "@/common/components/elements/AnimateEnter";
import { NotionRenderer } from "react-notion-x";
import Title from "@/common/components/elements/Title";
import Image from "next/image";
import Link from "next/link";
import { getPageTitle } from "notion-utils";

function TheUntoldStoryDetail({ recordMap }: { recordMap: ExtendedRecordMap }) {
  const title = getPageTitle(recordMap);

  return (
    <AnimateEnter className="max-w-[854px] max-lg:py-8 lg:w-4/5 lg:pt-8">
      <NotionRenderer
        pageTitle={<Title variant="title">{title} - The Untold Story</Title>}
        components={{ nextImage: Image, nextLink: Link }}
        recordMap={recordMap}
        fullPage={true}
        darkMode={true}
        disableHeader
      />
    </AnimateEnter>
  );
}

export default TheUntoldStoryDetail;
