import React, { useState } from "react";
import Image from "next/image";
export default function ImageWithFallback({ src, fallbackSrc }) {
  const [error, setError] = useState(null);
  return (
    <Image
      src={error ? fallbackSrc : src}
      alt="blog cover image"
      height={720}
      width={1280}
      priority
      className="blog-cover-image italic h-auto max-h-[450px] object-cover rounded-md w-full  mt-2 border-2 "
      onContextMenu={(e) => e.preventDefault()}
      onError={() => setError(true)}
    />
  );
}
