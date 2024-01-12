import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
const GlobalContext = createContext();

/**
 * 定义全局变量，包括语言、主题、深色模式、加载状态
 * @param children
 * @returns {JSX.Element}
 * @constructor
 */
export function GlobalContextProvider(props) {
  const { post, children, siteInfo, categoryOptions, toolOptions } = props;
  const router = useRouter();
  const [onLoading, setOnLoading] = useState(false); // 抓取文章数据

  // 是否全屏
  const fullWidth = post?.fullWidth ?? false;

  // 加载进度条
  useEffect(() => {
    const handleStart = (url) => {
      const { theme } = router.query;
      if (theme && !url.includes(`theme=${theme}`)) {
        const newUrl = `${url}${url.includes("?") ? "&" : "?"}theme=${theme}`;
        router.push(newUrl);
      }
      setOnLoading(true);
    };
    const handleStop = () => {
      setOnLoading(false);
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeError", handleStop);
    router.events.on("routeChangeComplete", handleStop);
    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleStop);
      router.events.off("routeChangeError", handleStop);
    };
  }, [router]);

  return (
    <GlobalContext.Provider
      value={{
        fullWidth,
        onLoading,
        setOnLoading,
        siteInfo,
        categoryOptions,
        toolOptions,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export const useGlobal = () => useContext(GlobalContext);
