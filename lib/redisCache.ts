import ProjectProps from "@/types/project";
import Redis from "ioredis";
import { performance } from "perf_hooks";

export const redisConnect = new Redis(process.env.REDIS_URL!);

export const fetchCache = async (
  key: string,
  fetchData: () => Promise<ProjectProps[]>,
  expiresIn: number
) => {
  // startPerfTimer();
  const cachedData: ProjectProps[] | null = await getKey(key);
  if (cachedData) {
    // console.log("Fetched from cache");
    // calculatePerformance(startPerfTimer(), endPerfTimer());
    return cachedData;
  }
  //   console.log("Fetched from API");
  //   calculatePerformance(startPerfTimer(), endPerfTimer());
  return setValue(key, fetchData, expiresIn);
};

const getKey = async <T>(key: string): Promise<T | null> => {
  const result = await redisConnect.get(key);
  if (result) return JSON.parse(result);
  //   endPerfTimer();
  return null;
};

const setValue = async <T>(
  key: string,
  fetchData: () => Promise<T>,
  expiresIn: number
): Promise<T> => {
  const setValue = await fetchData();
  await redisConnect.set(key, JSON.stringify(setValue), "EX", expiresIn);
  //   endPerfTimer();
  return setValue;
};

const startPerfTimer = (): number => {
  return performance.now();
};

const endPerfTimer = (): number => {
  return performance.now();
};

const calculatePerformance = (startTime: number, endTime: number): void => {
  console.log(`Response took ${endTime - startTime} milliseconds`);
};
