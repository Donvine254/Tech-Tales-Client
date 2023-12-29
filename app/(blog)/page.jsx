"use client";
import { useState, useEffect } from "react";
import { calculateReadingTime } from "@/lib";
import SkeletonBlog from "@/components/SkeletonBlog";
import { UserImage } from "@/components/Avatar";
import { useSearchParams } from "next/navigation";
import Axios from "axios";
import { Clock } from "@/assets";
import parse from "html-react-parser";
import { Bookmark, SideNav } from "@/components";
import Link from "next/link";

export default function Page() {
  const [blogs, setBlogs] = useState("");
  const [isLoading, setIsLoading] = useState(true);
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
          setBlogs(response.data);
        }

        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    })();
  }, [search]);
  return (
    <section className="relative md:min-h-[350px]">
      <div className="w-full !z-0 mx-auto md:my-4 px-8 md:w-2/3 relative font-poppins">
        <SideNav />
        {isLoading && (
          <div>
            {Array(5)
              .fill(0)
              .map((item, i) => (
                <SkeletonBlog key={i} />
              ))}
          </div>
        )}
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
                  href={`/blogs/${blog.slug}?id=${blog.id}`}
                  className="space-y-3 xl:col-span-3">
                  <h1 className="font-bold text-xl md:text-3xl  py-4">
                    {blog.title}
                  </h1>
                </Link>
                <div className="text-sm md:text-xl leading-8 line-clamp-2 py-2 overflow-x-hidden">
                  {blog ? parse(blog.body) : blog.body}
                </div>
              </article>
              <div className="flex items-center justify-between py-2">
                <Link href={`/blogs/${blog.slug}?id=${blog.id}`}>
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
          <div>{!isLoading && <h1>No Blogs Found</h1>}</div>
        )}
      </div>
    </section>
  );
}
