import { memo } from "react";

export const isBrowser = typeof window !== "undefined";

export const isSearchEngineBot = () => {
  if (typeof navigator === "undefined") {
    return false;
  }

  const userAgent = navigator.userAgent;

  return /Googlebot|bingbot|Baidu/.test(userAgent);
};

export const memorize = (Component) => {
  const MemoizedComponent = (props) => {
    return <Component {...props} />;
  };
  return memo(MemoizedComponent);
};

export function loadExternalResource(url, type) {
  const elements =
    type === "js"
      ? document.querySelectorAll(`[src='${url}']`)
      : document.querySelectorAll(`[href='${url}']`);

  return new Promise((resolve, reject) => {
    if (elements.length > 0 || !url) {
      resolve(url);
      return url;
    }

    let tag;

    if (type === "css") {
      tag = document.createElement("link");
      tag.rel = "stylesheet";
      tag.href = url;
    } else if (type === "font") {
      tag = document.createElement("link");
      tag.rel = "preload";
      tag.as = "font";
      tag.href = url;
    } else if (type === "js") {
      tag = document.createElement("script");
      tag.src = url;
    }
    if (tag) {
      tag.onload = () => {
        console.log("Load Success", url);
        resolve(url);
      };
      tag.onerror = () => {
        console.log("Load Error", url);
        reject(url);
      };
      document.head.appendChild(tag);
    }
  });
}

export function getQueryVariable(key) {
  const query = isBrowser ? window.location.search.substring(1) : "";
  const vars = query.split("&");
  for (let i = 0; i < vars.length; i++) {
    const pair = vars[i].split("=");
    if (pair[0] === key) {
      return pair[1];
    }
  }
  return false;
}

export function getQueryParam(url, param) {
  const urlWithoutHash = url.split("#")[0];
  const searchParams = new URLSearchParams(urlWithoutHash.split("?")[1]);
  return searchParams.get(param);
}

export function mergeDeep(target, ...sources) {
  if (!sources.length) return target;
  const source = sources.shift();

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} });
        mergeDeep(target[key], source[key]);
      } else {
        Object.assign(target, { [key]: source[key] });
      }
    }
  }
  return mergeDeep(target, ...sources);
}

export function isObject(item) {
  return item && typeof item === "object" && !Array.isArray(item);
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

export const getListByPage = function (list, pageIndex, pageSize) {
  return list.slice(0, pageIndex * pageSize);
};

export const isMobile = () => {
  let isMobile = false;
  if (!isBrowser) {
    return isMobile;
  }

  if (!isMobile && /Mobi|Android|iPhone/i.test(navigator.userAgent)) {
    isMobile = true;
  }

  if (/Android|iPhone|iPad|iPod/i.test(navigator.platform)) {
    isMobile = true;
  }

  if (typeof window.orientation !== "undefined") {
    isMobile = true;
  }

  return isMobile;
};

export const scanAndConvertToLinks = (node) => {
  if (node.nodeType === Node.TEXT_NODE) {
    const text = node.textContent;
    const urlRegex = /https?:\/\/[^\s]+/g;
    let lastIndex = 0;
    let match;

    const newNode = document.createElement("span");

    while ((match = urlRegex.exec(text)) !== null) {
      const beforeText = text.substring(lastIndex, match.index);
      const url = match[0];

      if (beforeText) {
        newNode.appendChild(document.createTextNode(beforeText));
      }

      const link = document.createElement("a");
      link.href = url;
      link.target = "_blank";
      link.textContent = url;

      newNode.appendChild(link);

      lastIndex = urlRegex.lastIndex;
    }

    if (lastIndex < text.length) {
      newNode.appendChild(document.createTextNode(text.substring(lastIndex)));
    }

    node.parentNode.replaceChild(newNode, node);
  } else if (node.nodeType === Node.ELEMENT_NODE) {
    for (const childNode of node.childNodes) {
      scanAndConvertToLinks(childNode);
    }
  }
};
