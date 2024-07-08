"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import parse from "html-react-parser";
import { UserImage } from "./Avatar";

export default function MoreFromAuthor({ author, id, blogId }) {
  const [blogs, setBlogs] = useState();
  useEffect(() => {
    (async () => {
      const data = await fetch(
        `https://techtales.up.railway.app/blogs/user/${id}`,
        {
          next: { cache: "force-cache", revalidate: 600 },
        }
      ).then((response) => response.json());

      if (data.length > 1) {
        const filteredBlogs = data.filter(
          (blog) => blog.id.toString() !== blogId.toString()
        );
        setBlogs(filteredBlogs);
      } else {
        setBlogs([]);
      }
    })();
  }, [id, blogId]);

  return (
    <div>
      {blogs && blogs.length > 0 && (
        <>
          <h1 className="font-bold text-xl">View More From {author}</h1>
          <div className="sm:flex sm:gap-2 sm:overflow-x-auto">
            {blogs.map((blog) => (
              <div
                key={blog.id}
                className="bg-gray-200 my-4 p-4 rounded-md border shadow hover:bg-slate-200 sm:flex-shrink-0 sm:w-1/2">
                <div className="">
                  <div className="flex gap-2 xsm:items-center">
                    <UserImage url={blog.user_avatar} />
                    <div className="">
                      <p className=" text-base  ">
                        Written by{" "}
                        <span className="capitalize font-bold">
                          {blog.author}
                        </span>
                      </p>
                      <p className="text-sm font-medium md:text-base ">
                        <span className="xsm:hidden sm:hidden">&mdash;</span>{" "}
                        Published on {blog.created_at_date}
                      </p>
                    </div>
                  </div>
                  <Link
                    href={`/blogs/${blog.slug}`}
                    className="space-y-3 xl:col-span-3">
                    <h1 className="font-bold  py-2 ">{blog.title}</h1>
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
                  <article className="text-sm md:text-base leading-8 md:pb-1 line-clamp-2  overflow-hidden trimmed-blog-body ">
                    {blog ? parse(blog.body) : blog.body}
                  </article>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
