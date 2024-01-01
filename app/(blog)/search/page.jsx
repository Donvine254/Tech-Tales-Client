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

export default function Page() {
  const [blogs, setBlogs] = useState("");
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
            blog.title.toLowerCase().includes(search.toLowerCase())
          );
          setBlogs(filteredBlogs);
        } else {
          setBlogs(null);
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
        {blogs && blogs.length > 0 ? (
          blogs.map((blog) => (
            <div key={blog.id} className="">
              <article className="">
                <div className="flex gap-4 xsm:gap-2 xsm:items-center">
                  <UserImage url={blog.user_avatar} />
                  <div className="flex items-center xsm:flex-col gap-2 xsm:gap-0 xsm:items-start">
                    <p className="font-bold text-base md:text-2xl capitalize">
                      {blog.author}
                    </p>
                    <p className="text-base font-medium md:text-xl">
                      {blog.created_at_date}
                    </p>
                  </div>
                </div>
                <Link
                  href={`/blogs/${blog.id}?title=${blog.slug}`}
                  className="space-y-3 xl:col-span-3">
                  <h1 className="font-bold text-xl md:text-3xl  py-4">
                    {blog.title}
                  </h1>
                </Link>
                <div className="text-sm md:text-xl leading-8 line-clamp-2 md:py-1 overflow-hidden">
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
        ) : (
          <div className="flex flex-col items-center justify-center gap-2 my-2">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="240"
                height="180"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="my-2">
                <path d="M4 22h14a2 2 0 0 0 2-2V7.5L14.5 2H6a2 2 0 0 0-2 2v3" />
                <polyline points="14 2 14 8 20 8" />
                <g
                  className="animate-spin 3s text-gray-600 ease-out"
                  transform="rotate(15 15 45)">
                  {/* animate the search icon alone */}
                  <path d="M5 17a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                  <path d="m9 18-1.5-1.5" />
                </g>
              </svg>
            </div>
            <p></p>
            <h1 className="text-gray-800 font-semibold text-2xl md:text-3xl flex items-center gap-1">
              Well, this is awkward{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M16 16s-1.5-2-4-2-4 2-4 2" />
                <line x1="9" x2="9.01" y1="9" y2="9" />
                <line x1="15" x2="15.01" y1="9" y2="9" />
              </svg>
              .
            </h1>
            <p className="text-xl text-center leading-loose">
              Nothing is turning up based on your search phrase{" "}
              <span className="underline font-bold italic">
                &quot;{search}&quot;
              </span>
              . Try using a different search word our check out our{" "}
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
