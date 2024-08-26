import React, { useState } from "react";
import Image from "next/image";
export default function ImageWithFallback({ src, fallbackSrc }) {
  const [imgSrc, setImgSrc] = useState(src);
  return (
    <Image
      src={src}
      alt="blog-image"
      height={450}
      width={900}
      priority
      className="blog-cover-image italic h-auto max-h-full object-contain w-full  mt-2 border-2 "
      onError={() => {
        setImgSrc(fallbackSrc);
      }}
    />
  );
}
