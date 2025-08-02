"use client";
import React, { useState } from "react";
import Image, { ImageProps } from "next/image";
interface BlogImageProps extends ImageProps {
  title?: string;
}
export default function BlogImage({
  src,
  alt,
  title,
  ...props
}: BlogImageProps) {
  const [error, setError] = useState<boolean>(false);
  const bgColor = "3399ff";
  const textColor = "ffffff";

  const fallbackSrc = `https://dummyimage.com/1280x720/${bgColor}/${textColor}.png&text=${encodeURIComponent(
    title || "Image"
  )}`;
  const keyStr =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

  const triplet = (e1: number, e2: number, e3: number) =>
    keyStr.charAt(e1 >> 2) +
    keyStr.charAt(((e1 & 3) << 4) | (e2 >> 4)) +
    keyStr.charAt(((e2 & 15) << 2) | (e3 >> 6)) +
    keyStr.charAt(e3 & 63);
  const rgbDataURL = (r: number, g: number, b: number) =>
    `data:image/gif;base64,R0lGODlhAQABAPAA${
      triplet(0, r, g) + triplet(b, 255, 255)
    }/yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==`;
  return (
    <Image
      src={error ? fallbackSrc : src ?? fallbackSrc}
      alt={alt || title || "blog image"}
      placeholder="blur"
      blurDataURL={rgbDataURL(204, 204, 204)}
      quality={100}
      priority
      style={{
        backgroundImage: "url('/placeholder.svg')",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
      onContextMenu={(e) => e.preventDefault()}
      onError={() => setError(true)}
      {...props}
    />
  );
}
