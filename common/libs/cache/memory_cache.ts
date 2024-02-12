import cache from "memory-cache";
import { CacheProps } from "@/common/types/notion/cache";

const cacheTime = parseInt(process.env.CACHE_EXPIRED_TIME as string);

export async function getCache(key: string) {
  return await cache.get(key);
}

export async function setCache(key: string, data: CacheProps) {
  await cache.put(key, data, cacheTime);
}

export async function delCache(key: string) {
  await cache.del(key);
}

export default { getCache, setCache, delCache };
