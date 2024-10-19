"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Comment, Graph, Like } from "@/assets";
import { baseUrl, calculateReadingTime } from "@/lib";
import {
  SideNav,
  UserImage,
  SkeletonBlog,
  ShareButton,
  Bookmark,
} from "@/components";
import { formatDate, formatViews } from "@/lib/utils";
import parse from "html-react-parser";
import { Tooltip } from "react-tooltip";
import toast from "react-hot-toast";
import Image from "next/image";
import { getCookie, setCookie } from "@/lib/utils";

export default function History() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const readingHistory = getCookie("history");
    const historyArray = JSON.parse(readingHistory);
    if (!historyArray) {
      setHistory(null);
      return;
    }
    (async () => {
      try {
        if (readingHistory && readingHistory.length > 0) {
          const response = await fetch(`${baseUrl}/my-blogs`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ blogIds: historyArray }),
          });
          const data = await response.json();
          setHistory(data);
          setLoading(false);
        } else {
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching reading history:", error);
        setLoading(false);
      }
    })();
  }, []);
  function clearHistory() {
    //setcookie without the history
  }

  return (
    <div className="w-full min-h-screen mx-auto px-4 md:px-8 md:w-2/3 relative font-poppins">
      <SideNav />
      <div className="flex items-center gap-4">
        <button className="px-6 py-1 font-bold my-2 bg-gray-300 hover:bg-blue-100 hover:text-blue-500 border hover:border-blue-500 rounded-md">
          Reading History
        </button>
        <button className="px-6 py-1 font-bold my-2  bg-transparent hover:bg-blue-500 hover:text-white rounded-md">
          Search History
        </button>
      </div>
      <section>
        {loading && (
          <div>
            {Array(2)
              .fill(0)
              .map((item, i) => (
                <SkeletonBlog key={i} />
              ))}
          </div>
        )}
        {history && history.length > 0 ? (
          history.map((blog) => (
            <div
              key={blog.id}
              className="bg-gray-50 my-4 p-4 rounded-md border shadow hover:bg-[#fefefe]">
              <div className="">
                <div className="flex gap-2 xsm:items-center">
                  <UserImage url={blog.author.picture} />
                  <div className="">
                    <p className="text-sm sm:text-base md:text-xl font-medium capitalize">
                      {blog.author.username}
                    </p>
                    <p className="text-base xsm:text-xs xsm:mb-0">
                      <span className="xsm:hidden">Published on </span>{" "}
                      <time dateTime={blog?.createdAt}>
                        {formatDate(blog.createdAt)} {""}
                      </time>
                      &#x2022; &#128337;{calculateReadingTime(blog.body)} min
                    </p>
                  </div>
                </div>
                <hr className="mt-2 h-[2px] bg-gray-200" />
                <Link
                  href={`/blogs/${blog.slug}`}
                  className="space-y-3 xl:col-span-3"
                  prefetch>
                  <h1 className="font-bold md:text-xl  py-2 ">{blog.title}</h1>
                </Link>
                {/* div for blog tags */}
                <div className="py-1">
                  {blog.tags ? (
                    <div className="flex gap-1 md:gap-2 flex-wrap text-sm xsm:text-xs">
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
                <article className="text-sm sm:text-base md:text-[18px] leading-8 md:pb-1 line-clamp-2  overflow-hidden trimmed-blog-body ">
                  {blog ? parse(blog.body.substring(0, 400)) : blog.body}
                </article>
              </div>
              {/* start of flex div for actions */}
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
                <Bookmark />
              </div>
              {/* end of flex div */}
            </div>
          ))
        ) : (
          <>
            {!loading && (
              <div className="py-6 px-2 h-full bg-white border rounded-md text-center">
                <div className="flex items-center justify-center py-1">
                  <Image
                    src="https://res.cloudinary.com/dipkbpinx/image/upload/v1724795120/illustrations/autumn-reading-male-svgrepo-com_jtp0oc.svg"
                    width="200"
                    height="200"
                    alt="reading illustration"
                    title="reading illustration"
                    priority
                    className=" italic align-middle my-2"
                  />
                </div>
                <h3 className="font-semibold text-lg leading-loose tracking-wide ">
                  Your reading history is empty
                </h3>
                <p className="font-medium  leading-loose max-w-md text-center mx-auto ">
                  Go back to your feed and read posts that spark your interest.
                  Each post you read will be listed here.
                </p>
                <Link
                  href="/top"
                  className="px-6 mt-2 py-1.5 rounded-md bg-gray-200 border-blue-500 text-blue-500 hover:bg-blue-100">
                  Read Blogs
                </Link>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
}
