import MemoryCache from "./memory_cache";
import FileCache from "./local_file_cache";
import RedisCache from "./redis_cache";
import BLOG from "@/blog.config";
import { CacheProps } from "@/common/types/notion/cache";

export async function getDataFromCache(key: string, force: boolean) {
  if (BLOG.ENABLE_CACHE || force) {
    const dataFromCache = await getApi().getCache(key);
    if (JSON.stringify(dataFromCache) === "[]") {
      return null;
    }
    return getApi().getCache(key);
  } else {
    return null;
  }
}

export async function setDataToCache(key: string, data: CacheProps) {
  if (!data) {
    return;
  }
  await getApi().setCache(key, data);
}

export async function delCacheData(key: string) {
  if (!BLOG.ENABLE_CACHE) {
    return;
  }
  await getApi().delCache(key);
}

function getApi() {
  if (process.env.REDIS_URL as string) {
    return RedisCache;
  } else if (process.env.ENABLE_FILE_CACHE as string) {
    return FileCache;
  } else {
    return MemoryCache;
  }
}
