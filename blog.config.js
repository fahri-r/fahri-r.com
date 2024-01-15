const BLOG = {
  NOTION_PAGE_ID: "7141a90c9d0e4f52a8cf88361fc7c2aa",
  NEXT_REVALIDATE_SECOND: process.env.NEXT_PUBLIC_REVALIDATE_SECOND || 5 ,

  NOTION_HOST: process.env.NEXT_PUBLIC_NOTION_HOST || "https://www.notion.so",

  BLOG_FAVICON: process.env.NEXT_PUBLIC_FAVICON || "/favicon.ico",

  RANDOM_IMAGE_URL: process.env.NEXT_PUBLIC_RANDOM_IMAGE_URL || "",
  RANDOM_IMAGE_REPLACE_TEXT:
    process.env.NEXT_PUBLIC_RANDOM_IMAGE_NOT_REPLACE_TEXT ||
    "images.unsplash.com",

  POSTS_SORT_BY: process.env.NEXT_PUBLIC_POST_SORT_BY || "notion",

  NOTION_PROPERTY_NAME: {
    title: "content",
    slug: "slug",
    repository: "repository",
    site: "site",
    tools: "tools",
    category: "category",
    status: "status",
    date: "date",
    status_publish: "Published",
    status_draft: "Draft",
  },

  IMG_LAZY_LOAD_PLACEHOLDER:
    process.env.NEXT_PUBLIC_IMG_LAZY_LOAD_PLACEHOLDER ||
    "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==",
  IMG_URL_TYPE: process.env.NEXT_PUBLIC_IMG_TYPE || "Notion",
  IMG_SHADOW: process.env.NEXT_PUBLIC_IMG_SHADOW || false,
  IMG_COMPRESS_WIDTH: process.env.NEXT_PUBLIC_IMG_COMPRESS_WIDTH || 800,

  NOTION_ACCESS_TOKEN: process.env.NOTION_ACCESS_TOKEN || "",
  DEBUG: process.env.NEXT_PUBLIC_DEBUG || false,
  ENABLE_CACHE:
    process.env.ENABLE_CACHE || process.env.npm_lifecycle_event === "build",
  isProd: process.env.VERCEL_ENV === "production",
};

module.exports = BLOG;
