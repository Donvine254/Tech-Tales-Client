"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { calculateReadingTime, baseUrl } from "@/lib";
import { formatDate, formatViews } from "@/lib/utils";
import { UserImage } from "@/components/ui/Avatar";
import { Bookmark, SideNav, ShareButton } from "@/components";
import { Comment, Like, Graph } from "@/assets";
import parse from "html-react-parser";
import Axios from "axios";

export default function SearchPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const search = searchParams.get("search");

  useEffect(() => {
    (async () => {
      try {
        const response = await Axios.post(`${baseUrl}/search`, {
          search: search,
        });
        setBlogs(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    })();
  }, [search]);
  return (
    <section className="relative min-h-[400px] h-fit">
      <div className="w-full !z-0 mx-auto md:my-4 px-4 md:px-8 md:w-2/3 relative font-poppins">
        <SideNav />
        <h1 className="font-bold font-crimson  md:text-xl my-1">
          Search results for {search}
        </h1>
        <hr className="my-2  border border-blue-500" />
        {loading && (
          <div className="bg-[url('https://cdn.dribbble.com/users/46425/screenshots/1799682/media/f5cb1a59acb2f7ca5782b6ddae1f0a66.gif')] bg-auto bg-center h-[400px] mt-5"></div>
        )}
        {!loading && blogs && blogs.length > 0
          ? blogs.map((blog) => (
              <div
                key={blog.id}
                className="bg-gray-50 my-4 p-4 rounded-md border shadow hover:bg-[#fefefe]">
                <div className="">
                  <div className="flex gap-4 xsm:gap-2 xsm:items-center">
                    <UserImage url={blog.author.picture} />
                    <div className="">
                      <p className=" text-base md:text-xl capitalize font-medium">
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
                  <hr className="mt-2 h-[2px] bg-gray-200" />

                  <Link
                    href={`/blogs/${blog.slug}`}
                    className="space-y-3 xl:col-span-3"
                    prefetch>
                    <h1 className="font-bold  md:text-xl  py-2">
                      {blog.title}
                    </h1>
                  </Link>
                  {/* div for blog tags */}
                  <div className="py-1">
                    {blog.tags ? (
                      <div className="flex gap-1 flex-wrap text-sm xsm:text-xs">
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
                  <article className="text-sm sm:text-base md:text-[18px] leading-8 line-clamp-2 md:py-1 overflow-hidden trimmed-blog-body ">
                    {blog ? parse(blog.body.substring(0, 400)) : blog.body}
                  </article>
                </div>
                {/* beginning of actions button */}
                <div className="flex items-center justify-between xsm:gap-2 md:gap-4 py-2 ">
                  <Link
                    href={`/blogs/${blog.slug}`}
                    className="text-base xsm:text-xs inline-flex items-center gap-x-1 group hover:text-blue-500 hover:bg-blue-100 px-1 rounded-md ">
                    <Comment
                      size={20}
                      className="stroke-none fill-gray-400 group-hover:fill-blue-500"
                    />
                    <span>{blog?._count?.comments}</span>
                  </Link>
                  <Link
                    href={`/blogs/${blog.slug}`}
                    prefetch
                    className="inline-flex items-center gap-x-0.5 group hover:text-red-500 hover:bg-red-100 px-1 rounded-md  ">
                    <Like
                      className="stroke-gray-400 fill-none group-hover:stroke-red-500 "
                      size={20}
                    />
                    <span className="text-base xsm:text-xs">{blog.likes}</span>
                  </Link>
                  <Link
                    href={`/blogs/${blog.slug}`}
                    prefetch
                    className="inline-flex xsm:items-center  sm:items-start gap-x-0.5 group hover:text-green-500 hover:bg-green-100 px-1 rounded-md">
                    <Graph
                      className="stroke-gray-500 fill-none group-hover:stroke-green-500"
                      size={20}
                    />
                    <p className="text-base xsm:text-xs sm:align-text-bottom  xsm:pt-1.5">
                      {formatViews(blog.views)}
                    </p>
                  </Link>
                  <ShareButton
                    size={20}
                    className="h-[20px] w-[20px] fill-gray-500 "
                    title={blog.title}
                    blogId={blog.id}
                    image={blog.image.secure_url}
                    slug={blog.slug}
                  />
                  <Bookmark blogId={blog.id} size={20} />
                </div>
                {/* end of actions buttons */}
              </div>
            ))
          : !loading && (
              <div className="flex flex-col items-center justify-center gap-2 my-2">
                <div>
                  <svg
                    viewBox="0 0 64 64"
                    fill="currentColor"
                    height="240"
                    width="300">
                    <path
                      fill="none"
                      stroke="currentColor"
                      strokeMiterlimit={10}
                      strokeWidth={2}
                      d="M1 7h62v50H1zM1 15h62M10 11H6M18 11h-4M26 11h-4"
                    />
                    <g
                      fill="none"
                      stroke="currentColor"
                      strokeMiterlimit={10}
                      strokeWidth={2}>
                      <path d="M35 33 A6 6 0 0 1 29 39 A6 6 0 0 1 23 33 A6 6 0 0 1 35 33 z" />
                      <path d="M33 37l8 8" />
                    </g>
                  </svg>
                </div>

                <h1 className="text-gray-800 font-semibold sm:text-xl md:text-2xl ">
                  Well, this is awkward{" "}
                </h1>
                <p className=" xsm:text-sm sm:text-xl sm:text-center leading-loose">
                  Nothing is turning up based on your search phrase{" "}
                  <span className="underline font-bold italic">
                    &quot;{search}&quot;
                  </span>
                  . Try using a different search word or check out our{" "}
                  <a
                    className="text-blue-600 font-medium hover:underline"
                    href="/relevant">
                    blogs
                  </a>
                </p>
              </div>
            )}
      </div>
    </section>
  );
}
