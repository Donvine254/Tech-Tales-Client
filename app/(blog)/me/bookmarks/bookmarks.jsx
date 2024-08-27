"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Clipboard, Comment, Graph, Like } from "@/assets";
import { baseUrl, calculateReadingTime } from "@/lib";
import { SideNav, UserImage, SkeletonBlog, ShareButton } from "@/components";
import { formatDate, formatViews } from "@/lib/utils";
import secureLocalStorage from "react-secure-storage";
import parse from "html-react-parser";
import { Tooltip } from "react-tooltip";
import toast from "react-hot-toast";

export default function Bookmarks() {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const localStorageData = secureLocalStorage.getItem("bookmarked_blogs");
    const bookmarkedBlogs = localStorageData
      ? JSON.parse(localStorageData)
      : {};
    const bookmarkedBlogIds = Object.keys(bookmarkedBlogs).filter(
      (id) => bookmarkedBlogs[id]
    );
    (async () => {
      try {
        if (bookmarkedBlogs && bookmarkedBlogs.length > 0) {
          const response = await fetch(`${baseUrl}/my-blogs`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ blogIds: bookmarkedBlogIds }),
          });
          const data = await response.json();
          setBookmarks(data);
          setLoading(false);
        } else {
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching bookmarked blogs:", error);
        setLoading(false);
      }
    })();
  }, []);
  function removeBookmark(id) {
    const localStorageData = secureLocalStorage.getItem("bookmarked_blogs");
    const bookmarkedBlogs = localStorageData
      ? JSON.parse(localStorageData)
      : {};
    if (bookmarkedBlogs[id]) {
      delete bookmarkedBlogs[id];
      secureLocalStorage.setItem(
        "bookmarked_blogs",
        JSON.stringify(bookmarkedBlogs)
      );
    }
    setBookmarks((prevBookmarks) =>
      prevBookmarks.filter((bookmark) => bookmark.id !== id)
    );
    toast.success("Bookmark removed");
  }

  return (
    <div className="w-full min-h-screen mx-auto px-4 md:px-8 md:w-2/3 relative font-poppins">
      <SideNav />
      {/* section for published blogs */}
      <h1 className="text-lg md:text-2xl font-bold my-2">
        Reading List ({bookmarks.length})
      </h1>
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
        {bookmarks && bookmarks.length > 0 ? (
          bookmarks.map((blog) => (
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
                  {blog ? parse(blog.body) : blog.body}
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
                <svg
                  fill="#06b6d4"
                  viewBox="0 0 16 16"
                  height="20"
                  width="20"
                  data-tooltip-id="bookmark"
                  onClick={() => removeBookmark(blog.id)}
                  className="hover:scale-115  fill-cyan-500 hover:fill-red-500 focus:outline-none outline-0 transition-all ease-in-out delay-75">
                  <path
                    fillRule="evenodd"
                    d="M2 15.5V2a2 2 0 012-2h8a2 2 0 012 2v13.5a.5.5 0 01-.74.439L8 13.069l-5.26 2.87A.5.5 0 012 15.5zM6.854 5.146a.5.5 0 10-.708.708L7.293 7 6.146 8.146a.5.5 0 10.708.708L8 7.707l1.146 1.147a.5.5 0 10.708-.708L8.707 7l1.147-1.146a.5.5 0 00-.708-.708L8 6.293 6.854 5.146z"
                  />
                </svg>
                <Tooltip
                  id="bookmark"
                  content="Remove this blog from bookmarks"
                  variant="info"
                  style={{ padding: "2px", fontSize: "12px" }}
                />
              </div>
              {/* end of flex div */}
            </div>
          ))
        ) : (
          <>
            {!loading && (
              <div className="py-6 px-2 h-full bg-white border rounded-md">
                <div className="flex items-center justify-center py-1">
                  <Clipboard />
                </div>
                <h3 className="font-semibold text-lg md:text-center leading-loose tracking-wide ">
                  Your reading list is empty
                </h3>
                <p className="font-medium md:text-center leading-loose tracking-wide ">
                  Click the{" "}
                  <span className="font-semibold"> bookmark reaction</span>
                  <span className="inline-block align-middle ">
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      height="1.2em"
                      width="1.2em"
                      className="focus:outline-none font-semibold ">
                      <path d="M16 2H8a3.003 3.003 0 00-3 3v16.5a.5.5 0 00.75.434l6.25-3.6 6.25 3.6A.5.5 0 0019 21.5V5a3.003 3.003 0 00-3-3zm2 18.635l-5.75-3.312a.51.51 0 00-.5 0L6 20.635V5a2.003 2.003 0 012-2h8a2.003 2.003 0 012 2v15.635z" />
                    </svg>
                  </span>
                  when viewing a post to add it to your reading list.
                </p>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
}
