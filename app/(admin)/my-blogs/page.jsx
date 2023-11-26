"use client";
import { calculateReadingTime } from "@/lib";
import Link from "next/link";
import { useEffect, useState } from "react";
import { GoClock, GoTrash, GoGraph } from "react-icons/go";
import Image from "next/image";
import { getCurrentUser, deleteBlog } from "@/lib";
import Axios from "axios";
import parse from "html-react-parser";
//check for the current user
const user = getCurrentUser();

export default function MyBlogsComponent() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    if (user) {
      const fetchBlogs = async () => {
        try {
          const url = `https://techtales.up.railway.app/blogs/user/${user.id}`;
          const response = await Axios.get(url);
          setBlogs(response.data);
        } catch (error) {
          console.error("Error fetching blogs:", error);
        }
      };

      fetchBlogs();
    }
  }, []);

  function handleDelete(blogId) {
    deleteBlog(blogId, setBlogs);
  }

  return (
    <div className="w-full mx-auto m-4 px-8 md:w-2/3 relative">
      {blogs && blogs.length > 0 ? (
        blogs.map((blog) => (
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
                    {blog.author}
                  </p>
                </div>

                <p className="text-base font-medium xsm:px-14 xsm:mb-0">
                  {blog.created_at}
                </p>
              </div>
              <Link
                href={`/blogs/${blog.slug}`}
                className="space-y-3 xl:col-span-3">
                <h1 className="font-bold text-xl md:text-2xl dark:text-blue-500 py-4">
                  {blog.title}
                </h1>
              </Link>
              <p className="text-base leading-8 line-clamp-2 py-2">
                {blog.body ? parse(blog.body) : blog.body}
              </p>
            </article>
            <div className="flex items-center justify-between py-2">
              <Link href={`/blogs/${blog.slug}`}>Read &#8599;</Link>
              <p className="text-base flex items-center gap-1 md:gap-2 bg-slate-300 rounded-full text-black px-2">
                <GoClock />
                {calculateReadingTime(blog.body)} min{" "}
                <span className="xsm:hidden">read</span>
              </p>
              <p className="flex items center gap-2 hover:text-blue-500 cursor-pointer ">
                <GoGraph className="md:text-xl cursor-pointer hover:scale-125" />
                <span className="xsm:hidden">View Blog Statistics</span>
              </p>
              <p
                className="flex items center gap-2  hover:text-red-500"
                onClick={() => handleDelete(blog.id)}>
                {" "}
                <GoTrash className="md:text-xl cursor-pointer hover:scale-125" />
                <span className="xsm:hidden">Delete</span>
              </p>
            </div>
          </div>
        ))
      ) : (
        <div className="p-2">
          <p className="text-xl md:text-2xl font-bold">
            You do not have any blogs yet.
          </p>
          <p className="text-lg md:text-xl py-2">
            <Link href="/create" className="text-blue-500 underline">
              Create your first blog &#8599;
            </Link>
          </p>
        </div>
      )}
    </div>
  );
}
