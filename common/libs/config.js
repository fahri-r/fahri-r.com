"use client";

import BLOG from "@/blog.config";
import { useGlobal } from "./global";
import { deepClone } from "./utils";

export const siteConfig = (key, defaultVal = null, extendConfig = null) => {
  let global = null;
  try {
    global = useGlobal();
  } catch (error) {}

  let val = null;
  let siteInfo = null;

  if (global) {
    siteInfo = global.siteInfo;
  }

  if (!val && extendConfig) {
    val = extendConfig[key];
  }

  if (!val) {
    val = BLOG[key];
  }

  if (!val) {
    return defaultVal;
  } else {
    if (typeof val === "string") {
      if (val === "true" || val === "false") {
        return JSON.parse(val);
      }
      return val;
    } else {
      try {
        return JSON.parse(val);
      } catch (error) {
        return val;
      }
    }
  }
};

export const siteConfigMap = () => {
  const val = deepClone(BLOG);
  for (const key in val) {
    val[key] = siteConfig(key);
    // console.log('site', key, val[key], siteConfig(key))
  }
  return val;
};
