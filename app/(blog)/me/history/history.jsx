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
          console.log(data);
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
    <div className="w-full min-h-screen mx-auto px-4 md:px-8 lg:w-2/3 relative font-poppins">
      <SideNav />
      <h3 className="px-6 py-1 font-bold my-2 bg-gray-300 hover:bg-blue-100 hover:text-blue-500 max-w-fit border hover:border-blue-500 rounded-md xsm:text-sm">
        Reading History
      </h3>
      {/* <button className="px-6 py-1 font-bold my-2  bg-transparent hover:bg-blue-500 hover:text-white rounded-md xsm:text-sm">
          Search History
        </button> */}

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
              className="hover:bg-blue-100 p-1 border-b border-slate-300  ">
              <div className="flex items-center gap-x-4 gap-y-1 py-2 flex-wrap md:flex-nowrap">
                <a
                  href={`/blogs/${blog.slug}`}
                  rel="noopener noreferrer"
                  className="relative">
                  <img
                    src={blog.image.secure_url}
                    alt={blog.slug}
                    loading="lazy"
                    title="read blog"
                    width={160}
                    height={90}
                    className="object-contain object-center xsm:w-full xsm:h-auto h-[90px] w-[160px] italic"
                  />
                  <img
                    src={blog.author.picture}
                    alt={blog.author.username}
                    title={blog.author.username}
                    height="24"
                    width="24"
                    className="rounded-full h-6 w-6 absolute left-0 right-0 mx-auto bottom-[-10px] cursor-pointer object-center align-middle ring-2 "
                  />
                </a>
                <div className="flex-grow">
                  <Link href={`/blogs/${blog.slug}`} prefetch>
                    <h3 className="break-words xsm:text-xs">{blog.title}</h3>
                  </Link>
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
                  <div className="flex items-center justify-between xsm:gap-2 md:gap-4 py-2 text-sm xsm:text-xs">
                    <div className="flex justify-between gap-4">
                      <p className="">
                        {calculateReadingTime(blog.body)} min{" "}
                        <span className="xsm:hidden">read</span>
                      </p>
                      <p>
                        &#x2022; {formatViews(blog.views)}{" "}
                        <span className="xsm:hidden">views</span>
                      </p>
                    </div>
                    <div className="flex justify-end items-center gap-4">
                      <ShareButton
                        size={16}
                        className="h-[16px] w-[16px] text-gray-500 hover:text-blue-500"
                        title={blog.title}
                        slug={blog.slug}
                      />
                      <Bookmark size={16} blogId={blog.id} />
                      <svg
                        fill="none"
                        viewBox="0 0 24 24"
                        height="24"
                        width="24"
                        className="text-gray-500 hover:text-red-500  rounded-full p-0.5 hover:bg-red-100">
                        <title>Remove Post</title>
                        <path
                          fill="currentColor"
                          d="M15.964 4.634h-12v2h12v-2zM15.964 8.634h-12v2h12v-2zM3.964 12.634h8v2h-8v-2zM12.964 13.71l1.415-1.415 2.121 2.121 2.121-2.12 1.415 1.413-2.122 2.122 2.122 2.12-1.415 1.415-2.121-2.121-2.121 2.121-1.415-1.414 2.122-2.122-2.122-2.12z"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
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
