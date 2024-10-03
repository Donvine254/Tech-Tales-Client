"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import parse from "html-react-parser";
import axios from "axios";
import { UserImage, ShareButton, Bookmark } from "@/components";
import { formatDate, formatViews } from "@/lib/utils";
import { calculateReadingTime, baseUrl } from "@/lib";
import { Graph, Comment, Like } from "@/assets";
import { getCookie, setCookie } from "@/lib/utils";

export default function Recommendations({ tags, id }) {
  const [blogs, setBlogs] = useState(null);

  useEffect(() => {
    let history = getCookie("history");
    let historySet = [];
    if (!history) {
      historySet.push(id);
      setCookie("history", JSON.stringify(historySet));
    } else {
      historySet = JSON.parse(history);
      if (Array.isArray(historySet) && !historySet.includes(id)) {
        historySet.push(id);
      }
      setCookie("history", JSON.stringify(historySet));
    }
    (async () => {
      try {
        const response = await axios.post(`${baseUrl}/recommendations`, {
          tags: tags,
          blogId: id,
          viewedBlogs: historySet,
        });
        const data = response.data;
        setBlogs(data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [tags, id]);

  return (
    <div className="my-2">
      {blogs && blogs.length > 0 && (
        <>
          <h1 className="md:text-xl my-2">Recommended from Tech Tales</h1>

          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="my-4 p-4 rounded-md border shadow bg-gray-50 hover:bg-[#FEFEFE] ">
              <div className="">
                <div className="flex gap-2 xsm:items-center">
                  <UserImage url={blog.author.picture} />
                  <div className="">
                    <p className=" text-base capitalize font-medium ">
                      {blog.author.username}
                    </p>
                    <p className="text-base xsm:text-sm xsm:mb-0">
                      <span className="xsm:hidden">Published on </span>{" "}
                      <time dateTime={blog?.createdAt}>
                        {formatDate(blog.createdAt)} {""}
                      </time>
                      &#x2022; &#128337;{calculateReadingTime(blog.body)} min
                    </p>
                  </div>
                </div>
                <hr className="h-2 mt-1" />
                <Link
                  href={`/blogs/${blog.slug}`}
                  className="space-y-3 xl:col-span-3"
                  prefetch>
                  <h1 className="font-bold  py-2 ">{blog.title}</h1>
                </Link>
                {/* div for blog tags */}
                <div className="py-1">
                  {blog.tags ? (
                    <div className="flex gap-2 flex-wrap text-sm xsm:text-xs">
                      {blog.tags.split(",").map((tag, index) => (
                        <Link
                          key={index}
                          href={`/search?search=${tag.trim()}`}
                          className={` text-blue-500  highlight-tag-${index}`}>
                          <span>#</span>
                          {tag.trim()}
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
                <article className="text-sm md:text-base leading-8 md:pb-1 line-clamp-2  overflow-hidden trimmed-blog-body ">
                  {blog ? parse(blog.body) : blog.body}
                </article>
              </div>
              <div className="flex items-center justify-between xsm:gap-2 md:gap-4 py-2 ">
                <Link
                  href={`/blogs/${blog.slug}`}
                  className="text-base xsm:text-xs inline-flex items-center gap-x-1 ">
                  <Comment size={20} className="stroke-none fill-gray-400" />
                  <span>{blog?._count?.comments}</span>
                </Link>
                <Link
                  href={`/blogs/${blog.slug}`}
                  prefetch
                  className="inline-flex items-center gap-x-0.5  ">
                  <Like className="stroke-gray-400 fill-none" size={20} />
                  <span className="text-base xsm:text-xs">{blog.likes}</span>
                </Link>
                <Link
                  href={`/blogs/${blog.slug}`}
                  prefetch
                  className="inline-flex xsm:items-center  sm:items-start gap-x-0.5 ">
                  <Graph className="stroke-gray-500 fill-none " size={20} />
                  <p className="text-base xsm:text-xs sm:align-text-bottom  xsm:pt-1.5">
                    {formatViews(blog.views)}
                  </p>
                </Link>
                <ShareButton
                  size={20}
                  className="h-[20px] w-[20px] text-gray-500"
                  title={blog.title}
                  slug={blog.slug}
                />
                <Bookmark blogId={blog.id} size={20} />
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}
