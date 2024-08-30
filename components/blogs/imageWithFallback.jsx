import React, { useState } from "react";
import Image from "next/image";
export default function ImageWithFallback({ image, fallbackSrc }) {
  const [error, setError] = useState(null);
  console.log(image);
  return (
    <Image
      src={error ? fallbackSrc : image.secure_url}
      alt={image.original_filename}
      height={720}
      width={1280}
      priority
      className="blog-cover-image italic h-auto max-h-[450px] object-cover rounded-md w-full  mt-2 border-2 "
      onContextMenu={(e) => e.preventDefault()}
      onError={() => setError(true)}
    />
  );
}
