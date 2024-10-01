import BLOG from "@/blog.config";
import {
  getDataFromCache,
  setDataToCache,
} from "@/common/libs/cache/cache-manager";
import { getPostBlocks } from "@/common/libs/notion";
import { idToUuid } from "notion-utils";
import { deepClone } from "../utils";
import { getAllCategories } from "./get-all-categories";
import getAllPageIds from "./get-all-page-ids";
import { getAllTools } from "./get-all-tools";
import getPageProperties from "./get-page-properties";
import { mapImgUrl, compressImage } from "./map-image";

export async function getGlobalData({ pageId = BLOG.NOTION_PAGE_ID, from }) {
  const data = await getNotionPageData({ pageId, from });
  const db = deepClone(data);

  delete db.block;
  delete db.schema;
  delete db.rawMetadata;
  delete db.pageIds;
  delete db.viewIds;
  delete db.collection;
  delete db.collectionQuery;
  delete db.collectionId;
  delete db.collectionView;
  return db;
}

function getLatestPosts({ allPages, from, latestPostCount }) {
  const allPosts = allPages?.filter(
    (page) => page.status === BLOG.NOTION_PROPERTY_NAME.status_publish
  );

  const latestPosts = Object.create(allPosts).sort((a, b) => {
    const dateA = new Date(a?.lastEditedDate || a?.publishDate);
    const dateB = new Date(b?.lastEditedDate || b?.publishDate);
    return dateB - dateA;
  });
  return latestPosts.slice(0, latestPostCount);
}

export async function getNotionPageData({ pageId, from }) {
  const cacheKey = "page_block_" + pageId;
  const data = await getDataFromCache(cacheKey);
  if (data && data.pageIds?.length > 0) {
    console.log("[Cache]:", `from:${from}`, `root-page-id:${pageId}`);
    return data;
  }
  const db = await getDataBaseInfoByNotionAPI({ pageId, from });
  if (db) {
    await setDataToCache(cacheKey, db);
  }
  return db;
}

function getToolOptions(schema) {
  if (!schema) return {};
  const toolSchema = Object.values(schema).find(
    (e) => e.name === BLOG.NOTION_PROPERTY_NAME.tools
  );
  return toolSchema?.options || [];
}

function getCategoryOptions(schema) {
  if (!schema) return {};
  const categorySchema = Object.values(schema).find(
    (e) => e.name === BLOG.NOTION_PROPERTY_NAME.category
  );
  return categorySchema?.options || [];
}

function getSiteInfo({ collection, block }) {
  const title = collection?.name?.[0][0];
  const pageCover = collection?.cover
    ? mapImgUrl(collection?.cover, block[idToUuid(BLOG.NOTION_PAGE_ID)]?.value)
    : "";
  return { title, pageCover };
}

const EmptyData = (pageId) => {
  const empty = {
    notice: null,
    siteInfo: getSiteInfo({}),
    allPages: [
      {
        id: 1,
        title: `无法获取Notion数据，请检查Notion_ID： \n 当前 ${pageId}`,
        summary:
          "访问文档获取帮助→ https://tangly1024.com/article/vercel-deploy-notion-next",
        status: "Published",
        type: "Post",
        slug: "13a171332816461db29d50e9f575b00d",
        date: {
          start_date: "2023-04-24",
          lastEditedDay: "2023-04-24",
          tagItems: [],
        },
      },
    ],
    allNavPages: [],
    collection: [],
    collectionQuery: {},
    collectionId: null,
    collectionView: {},
    viewIds: [],
    block: {},
    schema: {},
    tagOptions: [],
    categoryOptions: [],
    rawMetadata: {},
    customNav: [],
    customMenu: [],
    postCount: 1,
    pageIds: [],
    latestPosts: [],
  };
  return empty;
};

async function getDataBaseInfoByNotionAPI({ pageId, from }) {
  const pageRecordMap = await getPostBlocks(pageId, from);
  if (!pageRecordMap) {
    console.error("can`t get Notion Data ; Which id is: ", pageId);
    return {};
  }
  pageId = idToUuid(pageId);
  const block = pageRecordMap.block || {};
  const rawMetadata = block[pageId]?.value;

  if (
    rawMetadata?.type !== "collection_view_page" &&
    rawMetadata?.type !== "collection_view"
  ) {
    console.error(`pageId "${pageId}" is not a database`);
    return EmptyData(pageId);
  }
  const collection = Object.values(pageRecordMap.collection)[0]?.value || {};
  const siteInfo = getSiteInfo({ collection, block });
  const collectionId = rawMetadata?.collection_id;
  const collectionQuery = pageRecordMap.collection_query;
  const collectionView = pageRecordMap.collection_view;
  const schema = collection?.schema;

  const viewIds = rawMetadata?.view_ids;
  const collectionData = [];
  const pageIds = getAllPageIds(
    collectionQuery,
    collectionId,
    collectionView,
    viewIds
  );
  if (pageIds?.length === 0) {
    console.error(
      "获取到的文章列表为空，请检查notion模板",
      collectionQuery,
      collection,
      collectionView,
      viewIds,
      pageRecordMap
    );
  }
  for (let i = 0; i < pageIds.length; i++) {
    const id = pageIds[i];
    const value = block[id]?.value;
    if (!value) {
      continue;
    }
    const properties =
      (await getPageProperties(
        id,
        block,
        schema,
        null,
        getToolOptions(schema)
      )) || null;
    if (properties) {
      collectionData.push(properties);
    }
  }

  let postCount = 0;

  const allPages = collectionData.filter((post) => {
    if (post.status === BLOG.NOTION_PROPERTY_NAME.status_publish) {
      postCount++;
    }
    return (
      post &&
      post?.slug &&
      !post?.slug?.startsWith("http") &&
      (post?.status === "Invisible" ||
        post?.status === BLOG.NOTION_PROPERTY_NAME.status_publish)
    );
  });

  if (BLOG.POSTS_SORT_BY === "date") {
    allPages.sort((a, b) => {
      return b?.publishDate - a?.publishDate;
    });
  }

  const categoryOptions = getAllCategories({
    allPages,
    categoryOptions: getCategoryOptions(schema),
  });
  const toolOptions = getAllTools({
    allPages,
    toolOptions: getToolOptions(schema),
  });
  const latestPosts = getLatestPosts({ allPages, from, latestPostCount: 6 });

  return {
    siteInfo,
    allPages,
    collection,
    collectionQuery,
    collectionId,
    collectionView,
    viewIds,
    block,
    schema,
    toolOptions,
    categoryOptions,
    rawMetadata,
    postCount,
    pageIds,
    latestPosts,
  };
}
