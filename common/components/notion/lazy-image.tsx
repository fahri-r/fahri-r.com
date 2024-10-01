import { siteConfig } from "@/common/libs/config";
import Head from "next/head";
import React, { CSSProperties, useEffect, useRef, useState } from "react";

type LazyImageProps = {
  priority: boolean;
  id?: string;
  src: string;
  alt: string;
  placeholderSrc?: string;
  className?: string;
  width?: string | number;
  height?: string | number;
  title?: string;
  style?: CSSProperties;
  onLoad?: () => void;
};
export default function LazyImage({
  priority,
  id,
  src,
  alt,
  placeholderSrc,
  className,
  width,
  height,
  title,
  style,
  onLoad,
}: LazyImageProps) {
  const imageRef = useRef(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  if (!placeholderSrc) {
    placeholderSrc = siteConfig("IMG_LAZY_LOAD_PLACEHOLDER");
  }

  const handleImageLoad = () => {
    setImageLoaded(true);
    if (typeof onLoad === "function") {
      onLoad();
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const lazyImage = entry.target as HTMLImageElement;
            lazyImage.src = src;
            observer.unobserve(lazyImage);
          }
        });
      },
      { rootMargin: "50px 0px" }
    );

    if (imageRef.current) {
      observer.observe(imageRef.current);
    }

    return () => {
      if (imageRef.current) {
        observer.unobserve(imageRef.current);
      }
    };
  }, [src]);

  const imgProps = {
    ref: imageRef,
    src: imageLoaded ? src : placeholderSrc,
    alt: alt,
    onLoad: handleImageLoad,
    id,
    title,
    width,
    height,
    className,
    style,
  };

  if (id) {
    imgProps.id = id;
  }

  if (title) {
    imgProps.title = title;
  }

  if (width && width !== "auto") {
    imgProps.width = width;
  }

  if (height && height !== "auto") {
    imgProps.height = height;
  }
  if (className) {
    imgProps.className = className;
  }
  if (style) {
    imgProps.style = style;
  }
  return (
    <>
      <img {...imgProps} placeholder="blur" />
      {priority && (
        <Head>
          <link rel="preload" as="image" href={src} />
        </Head>
      )}
    </>
  );
}
