"use client";
import { calculateReadingTime } from "@/lib";
import Link from "next/link";
import { useEffect, useState } from "react";
import { GoClock, GoTrash, GoGraph } from "react-icons/go";
import { useRouter } from "next/navigation";
import { getCurrentUser, deleteBlog } from "@/lib";
import Axios from "axios";
import parse from "html-react-parser";
import { Avatar } from "@/components";
import SkeletonBlog from "@/components/SkeletonBlog";
//check for the current user
const user = getCurrentUser();

export default function MyBlogsComponent() {
  const navigate = useRouter();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate.replace("/login");
    } else if (user) {
      const fetchBlogs = async () => {
        try {
          const url = `https://techtales.up.railway.app/blogs/user/${user.id}`;
          const response = await Axios.get(url);
          setBlogs(response.data);
          setLoading(false);
        } catch (error) {
          setLoading(false);
          console.error("Error fetching blogs:", error);
        }
      };

      fetchBlogs();
    }
  }, [user, navigate]);

  function handleDelete(blogId) {
    deleteBlog(blogId, setBlogs);
  }

  return (
    <div className="w-full mx-auto m-4 px-8 md:w-2/3 relative font-poppins">
      {loading && (
        <div>
          {Array(2)
            .fill(0)
            .map((item, i) => (
              <SkeletonBlog key={i} />
            ))}
        </div>
      )}
      {blogs && blogs.length > 0 ? (
        blogs.map((blog) => (
          <div key={blog.id} className="p-2">
            <article className="">
              <div className="flex xsm:block gap-5 items-center">
                <div className="flex gap-0 items-center">
                  <Avatar name={blog.author} />
                  <p className="font-bold xsm:text-base text-xl md:text-2xl">
                    {blog.author}
                  </p>
                </div>

                <p className="text-base font-medium xsm:px-14 xsm:mb-0">
                  {blog.created_at}
                </p>
              </div>
              <Link
                href={`/blogs/${blog.slug}?id=${blog.id}`}
                className="space-y-3 xl:col-span-3">
                <h1 className="font-bold text-xl md:text-3xl dark:text-blue-500 py-4">
                  {blog.title}
                </h1>
              </Link>
              <p className="text-xl leading-8 line-clamp-2 py-2">
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
          {!loading && (
            <div>
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
      )}
    </div>
  );
}
