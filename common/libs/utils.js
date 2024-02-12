import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function isIterable(obj) {
  return obj != null && typeof obj[Symbol.iterator] === "function";
}

export function deepClone(obj) {
  if (Array.isArray(obj)) {
    // If obj is an array, create a new array and deep clone each element
    return obj.map((item) => deepClone(item));
  } else if (obj && typeof obj === "object") {
    const newObj = {};
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        if (obj[key] instanceof Date) {
          newObj[key] = new Date(obj[key].getTime()).toISOString();
        } else {
          newObj[key] = deepClone(obj[key]);
        }
      }
    }
    return newObj;
  } else {
    return obj;
  }
}

export const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
