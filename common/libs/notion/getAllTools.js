import BLOG from "@/blog.config";
import { isIterable } from "../utils";

export function getAllTools({ allPages, sliceCount = 0, toolOptions }) {
  const allPosts = allPages?.filter(
    (page) => page.status === BLOG.NOTION_PROPERTY_NAME.status_publish
  );

  if (!allPosts || !toolOptions) {
    return [];
  }

  let tools = allPosts?.map((p) => p.tools);
  tools = [...tools.flat()];
  const toolObj = {};
  tools.forEach((tool) => {
    if (tool in toolObj) {
      toolObj[tool]++;
    } else {
      toolObj[tool] = 1;
    }
  });
  const list = [];
  if (isIterable(toolOptions)) {
    toolOptions.forEach((c) => {
      const count = toolObj[c.value];
      if (count) {
        list.push({ id: c.id, name: c.value, color: c.color, count });
      }
    });
  }

  if (sliceCount && sliceCount > 0) {
    return list.slice(0, sliceCount);
  } else {
    return list;
  }
}
