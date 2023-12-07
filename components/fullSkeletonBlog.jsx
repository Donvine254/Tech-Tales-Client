import React from "react";
export default function FullSkeletonBlog() {
  return (
    <div className="my-2 py-2 h-[400px] w-full overflow-hidden">
      <div className="flex gap-4 items-center w-full">
        <div className="rounded-full h-10 w-10 skeleton"></div>
        <div className="mt-2 flex-1 h-3 rounded-md skeleton my-2"></div>
      </div>
      <div className="mt-2 w-full h-[250px] rounded-md skeleton my-2"></div>
      <div id="contents" className="py-2">
        <div className=" w-full h-2 rounded-md skeleton my-2"></div>
        <div className=" w-full h-2 rounded-md skeleton my-2"></div>
        <div className=" w-full h-2 rounded-md skeleton my-2"></div>
        <div className=" w-full h-2 rounded-md skeleton my-2"></div>
        <div className=" w-1/3 h-2 rounded-md skeleton my-2"></div>
      </div>
    </div>
  );
}
