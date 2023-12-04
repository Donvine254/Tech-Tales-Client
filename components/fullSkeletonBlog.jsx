import React from "react";

export default function fullSkeletonBlog() {
  return (
    <div className="my-2 py-2">
      <div className="mt-2 w-1/3 h-3 rounded-md skeleton my-2"></div>
      <div className="flex gap-4 items-center">
        <div className="rounded-full h-10 w-10 skeleton"></div>
        <div className="mt-2 w-1/3 h-3 rounded-md skeleton my-2"></div>
      </div>
      <div className="mt-2 w-1/2 h-[250px] rounded-md skeleton my-3"></div>
      <div id="contents" className="py-2">
        <div className="mt-2 w-1/2 h-3 rounded-md skeleton my-3"></div>
        <div className="mt-2 w-full h-2 rounded-md skeleton my-2"></div>
        <div className="mt-2 w-full h-2 rounded-md skeleton my-2"></div>
        <div className="mt-2 w-full h-2 rounded-md skeleton my-2"></div>
        <div className="mt-2 w-full h-2 rounded-md skeleton my-2"></div>
        <div className="mt-2 w-1/3 h-2 rounded-md skeleton my-2"></div>
      </div>
    </div>
  );
}
