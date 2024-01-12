import { getTextContent, getDateValue } from "notion-utils";
import { NotionAPI } from "notion-client";
import BLOG from "@/blog.config";
import formatDate from "../formatDate";
import md5 from "js-md5";
import { mapImgUrl } from "./mapImage";

export default async function getPageProperties(
  id,
  block,
  schema,
  authToken,
  toolOptions
) {
  const rawProperties = Object.entries(block?.[id]?.value?.properties || []);
  const excludeProperties = ["date", "select", "multi_select", "person"];
  const value = block[id]?.value;
  const properties = {};
  for (let i = 0; i < rawProperties.length; i++) {
    const [key, val] = rawProperties[i];
    properties.id = id;
    if (schema[key]?.type && !excludeProperties.includes(schema[key].type)) {
      properties[schema[key].name] = getTextContent(val);
    } else {
      switch (schema[key]?.type) {
        case "date": {
          const dateProperty = getDateValue(val);
          delete dateProperty.type;
          properties[schema[key].name] = dateProperty;
          break;
        }
        case "select":
        case "multi_select": {
          const selects = getTextContent(val);
          if (selects[0]?.length) {
            properties[schema[key].name] = selects.split(",");
          }
          break;
        }
        case "person": {
          const rawUsers = val.flat();
          const users = [];
          const api = new NotionAPI({ authToken });

          for (let i = 0; i < rawUsers.length; i++) {
            if (rawUsers[i][0][1]) {
              const userId = rawUsers[i][0];
              const res = await api.getUsers(userId);
              const resValue =
                res?.recordMapWithRoles?.notion_user?.[userId[1]]?.value;
              const user = {
                id: resValue?.id,
                first_name: resValue?.given_name,
                last_name: resValue?.family_name,
                profile_photo: resValue?.profile_photo,
              };
              users.push(user);
            }
          }
          properties[schema[key].name] = users;
          break;
        }
        default:
          break;
      }
    }
  }

  const fieldNames = BLOG.NOTION_PROPERTY_NAME;
  if (fieldNames) {
    Object.keys(fieldNames).forEach((key) => {
      if (fieldNames[key] && properties[fieldNames[key]])
        properties[key] = properties[fieldNames[key]];
    });
  }

  properties.status = properties.status?.[0] || "";
  properties.category = properties.category?.[0] || "";

  mapProperties(properties);

  properties.publishDate = new Date(
    properties?.date?.start_date || value.created_time
  ).getTime();
  properties.publishDay = formatDate(properties.publishDate, BLOG.LANG);
  properties.lastEditedDate = new Date(value?.last_edited_time);
  properties.lastEditedDay = formatDate(
    new Date(value?.last_edited_time),
    BLOG.LANG
  );
  properties.fullWidth = value.format?.page_full_width ?? false;
  properties.pageIcon =
    mapImgUrl(block[id].value?.format?.page_icon, block[id].value) ?? "";
  properties.pageCover =
    mapImgUrl(block[id].value?.format?.page_cover, block[id].value) ?? "";
  properties.pageCoverThumbnail =
    mapImgUrl(
      block[id].value?.format?.page_cover,
      block[id].value,
      "block",
      "pageCoverThumbnail"
    ) ?? "";
  properties.content = value.content ?? [];
  properties.toolItems =
    properties?.tools?.map((tool) => {
      return {
        name: tool,
        color: toolOptions?.find((t) => t.value === tool)?.color || "gray",
      };
    }) || [];
  delete properties.content;

  // if (properties.type === BLOG.NOTION_PROPERTY_NAME.type_post) {
  //   properties.slug = BLOG.POST_URL_PREFIX
  //     ? generateCustomizeUrl(properties)
  //     : properties.slug ?? properties.id;
  // } else if (properties.type === BLOG.NOTION_PROPERTY_NAME.type_page) {
  //   properties.slug = properties.slug ?? properties.id;
  // } else if (
  //   properties.type === BLOG.NOTION_PROPERTY_NAME.type_menu ||
  //   properties.type === BLOG.NOTION_PROPERTY_NAME.type_sub_menu
  // ) {
  //   properties.to = properties.slug ?? "#";
  //   properties.name = properties.title ?? "";
  // }

  if (JSON.parse(BLOG.PSEUDO_STATIC)) {
    if (
      !properties?.slug?.endsWith(".html") &&
      !properties?.slug?.startsWith("http")
    ) {
      properties.slug += ".html";
    }
  }

  properties.password = properties.password
    ? md5(properties.slug + properties.password)
    : "";
  return properties;
}

function mapProperties(properties) {
  if (properties?.status === BLOG.NOTION_PROPERTY_NAME.status_publish) {
    properties.status = "Published";
  }
  if (properties?.status === BLOG.NOTION_PROPERTY_NAME.status_draft) {
    properties.status = "Draft";
  }
}

function generateCustomizeUrl(postProperties) {
  let fullPrefix = "";
  const allSlugPatterns = BLOG.POST_URL_PREFIX.split("/");
  allSlugPatterns.forEach((pattern, idx) => {
    if (pattern === "%year%" && postProperties?.publishDay) {
      const formatPostCreatedDate = new Date(postProperties?.publishDay);
      fullPrefix += formatPostCreatedDate.getUTCFullYear();
    } else if (pattern === "%month%" && postProperties?.publishDay) {
      const formatPostCreatedDate = new Date(postProperties?.publishDay);
      fullPrefix += String(formatPostCreatedDate.getUTCMonth() + 1).padStart(
        2,
        0
      );
    } else if (pattern === "%day%" && postProperties?.publishDay) {
      const formatPostCreatedDate = new Date(postProperties?.publishDay);
      fullPrefix += String(formatPostCreatedDate.getUTCDate()).padStart(2, 0);
    } else if (pattern === "%slug%") {
      fullPrefix += postProperties.slug ?? postProperties.id;
    } else if (!pattern.includes("%")) {
      fullPrefix += pattern;
    } else {
      return;
    }
    if (idx !== allSlugPatterns.length - 1) {
      fullPrefix += "/";
    }
  });
  if (fullPrefix.startsWith("/")) {
    fullPrefix = fullPrefix.substring(1);
  }
  if (fullPrefix.endsWith("/")) {
    fullPrefix = fullPrefix.substring(0, fullPrefix.length - 1);
  }
  return `${fullPrefix}/${postProperties.slug ?? postProperties.id}`;
}
