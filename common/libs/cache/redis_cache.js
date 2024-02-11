import Redis from "ioredis";

export const redis = new Redis(process.env.REDIS_URL);

export async function getCache(key) {
  const result = await redis.get(key).catch((err) => {
    console.error(err);
  });

  if (result) return JSON.parse(result);

  return null;
}

export async function setCache(key, data) {
  data.block_id = key;
  const jsonObj = JSON.stringify(data);
  const insertRes = await redis.set(key, jsonObj, "EX", 100000).catch((err) => {
    console.error(err);
  });
  console.log("Insert cache: ", key, insertRes);

  return data;
}

export async function delCache(key) {
  const res = await redis.del(key).catch((err) => {
    console.error(err);
  });

  console.log("Delete cache: ", key, res);
  return null;
}

export default { getCache, setCache, delCache };
