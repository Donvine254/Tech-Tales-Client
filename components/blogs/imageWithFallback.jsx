import React, { useState } from "react";
import Image from "next/image";
export default function ImageWithFallback({ image, title }) {
  const [error, setError] = useState(null);
  const fallbackSrc = `https://dummyimage.com/1280x720/cccccc/000000.png&text=${title}`;
  const keyStr =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

  const triplet = (e1, e2, e3) =>
    keyStr.charAt(e1 >> 2) +
    keyStr.charAt(((e1 & 3) << 4) | (e2 >> 4)) +
    keyStr.charAt(((e2 & 15) << 2) | (e3 >> 6)) +
    keyStr.charAt(e3 & 63);
  const rgbDataURL = (r, g, b) =>
    `data:image/gif;base64,R0lGODlhAQABAPAA${
      triplet(0, r, g) + triplet(b, 255, 255)
    }/yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==`;
  return (
    <Image
      src={error ? fallbackSrc : image.secure_url}
      alt={image.original_filename}
      height={720}
      width={1280}
      placeholder="blur"
      blurDataURL={rgbDataURL(204, 204, 204)}
      quality={100}
      priority
      className="blog-cover-image italic h-auto max-h-[450px] object-cover rounded-md w-full  mt-2 border-2 border-cyan-500 "
      onContextMenu={(e) => e.preventDefault()}
      onError={() => setError(true)}
    />
  );
}
