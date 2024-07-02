"use client";
import { useState, useEffect } from "react";
import { calculateReadingTime } from "@/lib";
import { UserImage } from "@/components/Avatar";
import { useSearchParams } from "next/navigation";
import Axios from "axios";
import { Clock } from "@/assets";
import parse from "html-react-parser";
import { Bookmark, SideNav } from "@/components";

import Link from "next/link";

export default function SearchPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const search = searchParams.get("search");
  useEffect(() => {
    (async () => {
      try {
        const response = await Axios.get(
          "https://techtales.up.railway.app/blogs"
        );
        if (search && search.trim() !== "") {
          const filteredBlogs = response.data.filter((blog) =>
            blog.tags.toLowerCase().includes(search.toLowerCase())
          );
          setBlogs(filteredBlogs);
          setLoading(false);
        } else {
          setBlogs(null);
          setLoading(false);
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, [search]);
  return (
    <section className="relative min-h-[400px] h-fit">
      <div className="w-full !z-0 mx-auto md:my-4 px-8 md:w-2/3 relative font-poppins">
        <SideNav />

        {loading && (
          <div className="bg-[url('https://cdn.dribbble.com/users/46425/screenshots/1799682/media/f5cb1a59acb2f7ca5782b6ddae1f0a66.gif')] bg-auto bg-center h-[400px] mt-5"></div>
        )}
        {!loading && blogs && blogs.length > 0
          ? blogs.map((blog) => (
              <div key={blog.id} className="">
                <article className="">
                  <div className="flex gap-4 xsm:gap-2 xsm:items-center">
                    <UserImage url={blog.user_avatar} />
                    <div className="flex items-center xsm:flex-col gap-2 xsm:gap-0 xsm:items-start">
                      <p className=" text-base md:text-xl capitalize">
                        Written By{" "}
                        <span className="font-bold">{blog.author}</span>
                      </p>
                      <p className="text-sm font-medium md:text-base">
                        Published on {blog.created_at_date}
                      </p>
                    </div>
                  </div>
                  <Link
                    href={`/blogs/${blog.id}?title=${blog.slug}`}
                    className="space-y-3 xl:col-span-3">
                    <h1 className="font-bold text-xl md:text-2xl  py-2">
                      {blog.title}
                    </h1>
                  </Link>
                  {/* div for blog tags */}
                  <div className="py-1">
                    {blog.tags ? (
                      <div className="flex gap-2 flex-wrap text-sm">
                        {blog.tags.split(",").map((tag, index) => (
                          <Link
                            key={index}
                            href={`/search?search=${tag.trim()}`}
                            className="md:px-2 md:py-0.5 text-blue-600 md:bg-transparent md:hover:bg-blue-600 md:hover:text-white cursor-pointer md:border md:border-blue-600 md:rounded-xl ">
                            #{tag.trim()}
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                  <div className="text-sm md:text-xl leading-8 line-clamp-2 md:py-1 overflow-hidden trimmed-blog-body ">
                    {blog ? parse(blog.body) : blog.body}
                  </div>
                </article>
                <div className="flex items-center justify-between py-2">
                  <Link href={`/blogs/${blog.id}?title=${blog.slug}`}>
                    Read &#8599;
                  </Link>
                  <p className="text-base flex items-center gap-1 md:gap-2 bg-slate-300 rounded-full text-black px-2">
                    <Clock />
                    {calculateReadingTime(blog.body)} min{" "}
                    <span className="xsm:hidden">read</span>
                  </p>
                  <p className="text-base hidden md:block">
                    Based on your reading history
                  </p>
                  <Bookmark blogId={blog.id} />
                </div>
                <hr className="my-2 border-1 border-slate-300" />
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

                <h1 className="text-gray-800 font-semibold text-2xl xsm:text-xl md:text-3xl ">
                  Well, this is awkward{" "}
                </h1>
                <p className="text-xl sm:text-center leading-loose">
                  Nothing is turning up based on your search phrase{" "}
                  <span className="underline font-bold italic">
                    &quot;{search}&quot;
                  </span>
                  . Try using a different search word or check out our{" "}
                  <a
                    className="text-blue-600 font-medium hover:underline"
                    href="/featured">
                    blogs
                  </a>
                </p>
              </div>
            )}
      </div>
    </section>
  );
}
