import BLOG from "@/blog.config";
import { NotionAPI } from "notion-client";
import {
  getDataFromCache,
  setDataToCache,
} from "@/common/libs/cache/cache-manager";
import { deepClone, delay } from "../utils";

export async function getPostBlocks(id, from, slice) {
  const cacheKey = "page_block_" + id;
  let pageBlock = await getDataFromCache(cacheKey);
  if (pageBlock) {
    console.log("[Cache]:", `from:${from}`, cacheKey);
    return filterPostBlocks(id, pageBlock, slice);
  }

  const start = new Date().getTime();
  pageBlock = await getPageWithRetry(id, from);
  const end = new Date().getTime();
  console.log("[API took]", `${end - start}ms`);

  if (pageBlock) {
    await setDataToCache(cacheKey, pageBlock);
    return filterPostBlocks(id, pageBlock, slice);
  }
  return pageBlock;
}

export async function getPageWithRetry(id, from, retryAttempts = 3) {
  if (retryAttempts && retryAttempts > 0) {
    console.log(
      "[Request API]",
      `from:${from}`,
      `id:${id}`,
      retryAttempts < 3 ? `Retry remaining: ${retryAttempts}` : ""
    );
    try {
      const authToken = BLOG.NOTION_ACCESS_TOKEN || null;
      const api = new NotionAPI({
        authToken,
        userTimeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      });
      const pageData = await api.getPage(id);
      console.info("[Success]:", `from:${from}`);
      return pageData;
    } catch (e) {
      console.warn("[Warn]:", e);
      await delay(1000);
      const cacheKey = "page_block_" + id;
      const pageBlock = await getDataFromCache(cacheKey);
      if (pageBlock) {
        console.log("[Retry cache]", `from:${from}`, `id:${id}`);
        return pageBlock;
      }
      return await getPageWithRetry(id, from, retryAttempts - 1);
    }
  } else {
    console.error("[Fail]:", `from:${from}`, `id:${id}`);
    return null;
  }
}

function filterPostBlocks(id, pageBlock, slice) {
  const clonePageBlock = deepClone(pageBlock);
  let count = 0;

  for (const i in clonePageBlock?.block) {
    const b = clonePageBlock?.block[i];
    if (slice && slice > 0 && count > slice) {
      delete clonePageBlock?.block[i];
      continue;
    }

    if (b?.value?.id === id) {
      delete b?.value?.properties;
      continue;
    }

    count++;

    if (b?.value?.type === "code") {
      if (b?.value?.properties?.language?.[0][0] === "C++") {
        b.value.properties.language[0][0] = "cpp";
      }
      if (b?.value?.properties?.language?.[0][0] === "C#") {
        b.value.properties.language[0][0] = "csharp";
      }
      if (b?.value?.properties?.language?.[0][0] === "Assembly") {
        b.value.properties.language[0][0] = "asm6502";
      }
    }

    if (
      (b?.value?.type === "file" ||
        b?.value?.type === "pdf" ||
        b?.value?.type === "video" ||
        b?.value?.type === "audio") &&
      b?.value?.properties?.source?.[0][0] &&
      b?.value?.properties?.source?.[0][0].indexOf("amazonaws.com") > 0
    ) {
      const oldUrl = b?.value?.properties?.source?.[0][0];
      const newUrl = `https://notion.so/signed/${encodeURIComponent(
        oldUrl
      )}?table=block&id=${b?.value?.id}`;
      b.value.properties.source[0][0] = newUrl;
    }

    delete b?.role;
    delete b?.value?.version;
    delete b?.value?.created_by_table;
    delete b?.value?.created_by_id;
    delete b?.value?.last_edited_by_table;
    delete b?.value?.last_edited_by_id;
    delete b?.value?.space_id;
  }

  if (id === BLOG.NOTION_PAGE_ID) {
    return clonePageBlock;
  }
  return clonePageBlock;
}
