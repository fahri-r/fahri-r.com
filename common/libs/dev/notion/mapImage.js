import BLOG from "@/blog.config";

const compressImage = (image, width = 800, quality = 50, fmt = "webp") => {
  if (!image) {
    return null;
  }

  if (
    image.indexOf(BLOG.NOTION_HOST) === 0 &&
    image.indexOf("amazonaws.com") > 0
  ) {
    return `${image}&width=${width}`;
  }

  if (image.indexOf("https://images.unsplash.com/") === 0) {
    const urlObj = new URL(image);
    const params = new URLSearchParams(urlObj.search);
    params.set("q", quality);
    params.set("width", width);
    params.set("fmt", fmt);
    params.set("fm", fmt);

    urlObj.search = params.toString();
    return urlObj.toString();
  }

  if (image.indexOf("https://your_picture_bed") === 0) {
    return "do_somethin_here";
  }

  return image;
};

const mapImgUrl = (img, block, type = "block", from) => {
  if (!img) {
    return null;
  }
  let ret = null;

  if (img.startsWith("/")) {
    ret = BLOG.NOTION_HOST + img;
  } else {
    ret = img;
  }

  const isNotionImg =
    ret.indexOf("secure.notion-static.com") > 0 ||
    ret.indexOf("prod-files-secure") > 0;
  const isImgBlock = BLOG.IMG_URL_TYPE === "Notion" || type !== "block";
  if (isNotionImg && isImgBlock) {
    ret =
      BLOG.NOTION_HOST +
      "/image/" +
      encodeURIComponent(ret) +
      "?table=" +
      type +
      "&id=" +
      block.id;
  }

  if (!isEmoji(ret) && ret.indexOf("notion.so/images/page-cover") < 0) {
    if (BLOG.RANDOM_IMAGE_URL) {
      const texts = BLOG.RANDOM_IMAGE_REPLACE_TEXT;
      let isReplace = false;
      if (texts) {
        const textArr = texts.split(",");

        textArr.forEach((text) => {
          if (ret.indexOf(text) > -1) {
            isReplace = true;
          }
        });
      } else {
        isReplace = true;
      }
      if (isReplace) {
        ret = BLOG.RANDOM_IMAGE_URL;
      }
    }

    if (ret && ret.length > 4) {
      const separator = ret.includes("?") ? "&" : "?";
      ret = `${ret.trim()}${separator}t=${block.id}`;
    }
  }

  if (from === "pageCoverThumbnail") {
    ret = compressImage(ret);
  }

  return ret;
};

function isEmoji(str) {
  const emojiRegex =
    /[\u{1F300}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F900}-\u{1F9FF}\u{1F018}-\u{1F270}\u{238C}\u{2B06}\u{2B07}\u{2B05}\u{27A1}\u{2194}-\u{2199}\u{2194}\u{21A9}\u{21AA}\u{2934}\u{2935}\u{25AA}\u{25AB}\u{25FE}\u{25FD}\u{25FB}\u{25FC}\u{25B6}\u{25C0}\u{1F200}-\u{1F251}]/u;
  return emojiRegex.test(str);
}

export { mapImgUrl, compressImage };
