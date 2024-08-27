import React from "react";
import { formatViews } from "@/lib/utils";
import { Comment, IconEdit, IconEye } from "@/assets";
export default function UserStats({ blogs }) {
  const totalBlogs = blogs.length;
  const totalViews = blogs.reduce((sum, blog) => sum + blog.views, 0);
  const totalComments = blogs.reduce(
    (sum, blog) => sum + blog._count.comments,
    0
  );
  const totalLikes = blogs.reduce((sum, blog) => sum + blog.likes, 0);

  return (
    <div className="flex items-center justify-between gap-4 flex-wrap mb-4 ">
      {/* Total Blogs */}
      <div className="rounded-lg border shadow-sm flex-1 px-6 py-4 min-w-[200px] bg-white">
        <p className="text-2xl font-bold">{totalBlogs}</p>
        <p className="text-extralight text-gray-500 inline-flex items-center ">
          <IconEdit />
          Total Authored Blogs
        </p>
      </div>

      {/* Total Views */}
      <div
        className={`rounded-lg border shadow-sm flex-1 px-6 py-4 min-w-[200px] bg-white ${
          totalViews > 1000
            ? "bg-[url('https://res.cloudinary.com/dipkbpinx/image/upload/v1724713816/cxf2dejkjxn2qk3ss2wr.avif')] bg-no-repeat bg-cover"
            : ""
        }`}>
        <p className="text-2xl font-bold">{formatViews(totalViews)}</p>
        <p className="text-extralight text-gray-500 inline-flex items-center gap-1">
          <IconEye size={16} />
          Total Blogs Views
        </p>
      </div>

      {/* Total Comments */}
      <div className="rounded-lg border shadow-sm flex-1 px-6 py-4 min-w-[200px] bg-white">
        <p className="text-2xl font-bold">{formatViews(totalComments)}</p>
        <p className="text-extralight text-gray-500 inline-flex items-center gap-1">
          <Comment size={16} />
          Total blog comments
        </p>
      </div>

      {/* Total Likes */}
      <div className="rounded-lg border shadow-sm flex-1 px-6 py-4 min-w-[200px] bg-white">
        <p className="text-2xl font-bold">{formatViews(totalLikes)}</p>
        <p className="text-extralight text-gray-500 inline-flex items-center gap-1">
          {" "}
          <svg
            viewBox="0 0 512 512"
            fill="#ef4444"
            height="1.5em"
            width="1.5em">
            <path
              fill="none"
              stroke="currentColor"
              strokeMiterlimit={10}
              strokeWidth={2}
              d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z"
            />
            <path d="M256 360a16 16 0 01-9-2.78c-39.3-26.68-56.32-45-65.7-56.41-20-24.37-29.58-49.4-29.3-76.5.31-31.06 25.22-56.33 55.53-56.33 20.4 0 35 10.63 44.1 20.41a6 6 0 008.72 0c9.11-9.78 23.7-20.41 44.1-20.41 30.31 0 55.22 25.27 55.53 56.33.28 27.1-9.31 52.13-29.3 76.5-9.38 11.44-26.4 29.73-65.7 56.41A16 16 0 01256 360z" />
          </svg>
          Total blog Likes
        </p>
      </div>
    </div>
  );
}
