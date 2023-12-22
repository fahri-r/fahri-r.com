import ThumbnailProps from "@/types/thumbnail";
import { BaseBlock } from "notion-types";

interface mapImageProps {
  block: BaseBlock;
  width?: number;
}

const mapImage = ({ block, width = 400 }: mapImageProps): ThumbnailProps => {
  const { properties, space_id, id } = block;

  const srcUrl = encodeURIComponent(properties.source[0][0]);

  const urlObj = new URL(`${process.env.NOTION_HOST}/image/${srcUrl}`);

  urlObj.searchParams.set("table", "block");
  urlObj.searchParams.set("id", id);
  urlObj.searchParams.set("spaceId", space_id!);
  urlObj.searchParams.set("width", width.toString());
  urlObj.searchParams.set("cache", "v2");

  return {
    title: properties.title[0][0],
    url: urlObj.toString(),
  };
};

export default mapImage;
