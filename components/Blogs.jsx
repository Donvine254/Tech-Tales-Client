"use client";
import { fetchBlogs, calculateReadingTime } from "@/lib";
import Link from "next/link";
import { useEffect, useState } from "react";
import { GoClock } from "react-icons/go";
import { MdOutlineBookmarkAdd } from "react-icons/md";
import Image from "next/image";
import parse from 'html-react-parser';

export default function BlogsComponent({ blogsUrl }) {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetchBlogs(blogsUrl)
      .then((fetchedBlogs) => {
        setBlogs(fetchedBlogs);
      })
      .catch((error) => {
        console.error("Error fetching blogs:", error);
      });
  }, [blogsUrl]);
  return (
    <div className="w-full mx-auto m-4 px-8 md:w-2/3 relative">
      {blogs.map((blog) => (
        <div key={blog.id} className="p-2">
          <article className="">
            <div className="flex xsm:block gap-5 items-center">
              <div className="flex gap-0 items-center">
              <Image
                src="https://d2win24dv6pngl.cloudfront.net/media/generated/profile-photos/profile-1298663/60cc7564d4a37d90.af828114ed82.jpg"
                className="avatar"
                width={32}
                height={32}
                alt="user-avatar"
              />
                <p className="font-bold xsm:text-base text-xl md:text-2xl">
                  {blog.user.username}
                </p>
              </div>

              <p className="text-base font-medium xsm:px-14 xsm:mb-0">
               {new Date(blog.created_at).toISOString().split('T')[0]}
              </p>
            </div>
            <Link
              href={`/blogs/${blog.slug}`}
              className="space-y-3 xl:col-span-3">
              <h1 className="font-bold text-xl md:text-2xl dark:text-blue-500 py-4">
                {blog.title}
              </h1>
            </Link>
            <p className="text-base leading-8 line-clamp-2 py-2">{parse(blog.body)}</p>
          </article>
          <div className="flex items-center justify-between py-2">
            <Link href={`/blogs/${blog.slug}`}>Read &#8599;</Link>
            <p className="text-base flex items-center gap-1 md:gap-2 bg-slate-300 rounded-full text-black px-2">
              <GoClock />
              {calculateReadingTime(blog.body)} min{" "}
              <span className="xsm:hidden">read</span>
            </p>
            <p className="tex-base hidden md:block">
              Based on your reading history
            </p>
            <MdOutlineBookmarkAdd className="md:text-xl cursor-pointer hover:scale-125" />
          </div>
        </div>
      ))}
    </div>
  );
}
