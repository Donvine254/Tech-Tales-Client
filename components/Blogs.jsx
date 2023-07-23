"use client";
import { fetchBlogs, calculateReadingTime } from "@/lib";
import Link from "next/link";
import { useEffect, useState } from "react";
import { GoClock } from "react-icons/go";
import { MdOutlineBookmarkAdd } from "react-icons/md";


const trimBlogBody = (body, numSentences = 2) => {
  const sentences = body.split(".").map((sentence) => sentence.trim());
  return sentences.slice(0, numSentences).join(". ") + "...";
};

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
  }, []);
  return (
    <div className="w-full mx-auto m-4 px-8 md:w-2/3 relative">
      {blogs.map((blog) => (
        <div key={blog.id} className="p-2">
          <article className="">
            <div className="flex xsm:block gap-5 items-center">
              <div className="flex gap-0 items-center">
                <picture className="avatar">
                  <source
                    media="(min-width:1280px )"
                    srcSet="https://d2win24dv6pngl.cloudfront.net/media/generated/profile-photos/profile-1298663/60cc7564d4a37d90.af828114ed82.jpg"
                  />
                  <img
                    src="https://d2win24dv6pngl.cloudfront.net/media/generated/profile-photos/profile-1298663/60cc7564d4a37d90.af828114ed82.jpg"
                    className="avatar md:mr-8 "
                    alt="user-avatar"
                  />
                </picture>
                <p className="font-bold xsm:text-base text-xl md:text-2xl">Donvine Mugendi</p>
              </div>

              <p className="text-base font-medium xsm:px-14 xsm:mb-0">
                2022-07-24
              </p>
            </div>
            <Link
              href="/my-first-blog"
              prefetch
              className="space-y-3 xl:col-span-3">
              <h1 className="font-bold text-xl md:text-2xl dark:text-blue-500 py-4">
                {blog.title}
              </h1>
            </Link>
            <p className="text-base leading-8">{trimBlogBody(blog.body, 2)}</p>
          </article>
          <div className="flex items-center justify-between pt-2">
            <Link href="/my-first-blog">Read &#8599;</Link>
            <p className="text-base flex items-center gap-1 md:gap-2 bg-slate-300 rounded-full text-black px-2">
              <GoClock />
              {calculateReadingTime(blog.body)} min <span className="xsm:hidden">read</span>
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
