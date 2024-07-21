"use client";
import { calculateReadingTime } from "@/lib";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Clock, Clipboard, Comment } from "@/assets";
import { useRouter } from "next/navigation";
import { deleteBlog, baseUrl } from "@/lib";
import parse from "html-react-parser";
import { UserImage } from "@/components/Avatar";
import SkeletonBlog from "@/components/SkeletonBlog";
import ActionsButton from "@/components/ActionsButton";
import { SideNav } from "@/components";
import { formatDate } from "@/lib/utils";
//check for the current user

export default function MyBlogsComponent() {
  const navigate = useRouter();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch(`${baseUrl}/my-blogs`);
        const data = await res.json();
        setBlogs(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  function handleDelete(blogId, slug) {
    deleteBlog(blogId, slug, setBlogs);
  }
  function handleEdit(slug) {
    navigate.push(`/create/${slug}?action=edit`);
  }

  return (
    <div className="w-full min-h-[400px] mx-auto px-4 md:px-8 md:w-2/3 relative font-poppins">
      <SideNav />
      <h1 className="font-bold   md:text-xl">Your Published Blogs</h1>
      <hr className="my-2  border border-blue-500" />
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
          <div
            key={blog.id}
            className="bg-gray-100 my-4 p-4 rounded-md border shadow hover:bg-slate-200">
            <div className="">
              <div className="flex gap-2 xsm:items-center">
                <UserImage url={blog.author.picture} />
                <div className="">
                  <p className=" text-base md:text-xl capitalize">
                    Written By{" "}
                    <span className="font-bold">{blog.author.username}</span>
                  </p>
                  <p className="text-sm font-medium md:text-base">
                    Published on {formatDate(blog.createdAt)}
                  </p>
                </div>
              </div>
              <hr className="mt-2 h-[2px] bg-gray-200" />
              <Link
                href={`/blogs/${blog.slug}`}
                className="space-y-3 xl:col-span-3"
                prefetch>
                <h1 className="font-bold md:text-xl  py-2">{blog.title}</h1>
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
              <article className="text-sm sm:text-base md:text-xl leading-8 line-clamp-2 md:pb-1 trimmed-blog-body ">
                {blog.body ? parse(blog.body) : blog.body}
              </article>
            </div>
            <div className="flex items-center justify-between py-2">
              <Link
                href={`/blogs/${blog.slug}`}
                prefetch
                className="inline-flex items-center gap-1 hover:underline hover:text-blue-500">
                <span>Read</span>
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                  height="1em"
                  width="1em">
                  <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
                </svg>
              </Link>
              <p className="text-base flex items-center gap-1 md:gap-2 bg-gray-300 border rounded-full text-black px-2">
                <Clock />
                {calculateReadingTime(blog.body)} min{" "}
                <span className="xsm:hidden">read</span>
              </p>
              <p className="text-base  inline-flex items-center gap-1">
                <Comment />
                <span>{blog?._count?.comments}</span>
              </p>

              <ActionsButton
                onDelete={() => handleDelete(blog.id, blog.slug)}
                onEdit={() => handleEdit(blog.slug)}
                blog={blog}
              />
            </div>
          </div>
        ))
      ) : (
        <div className="p-2">
          {!loading && (
            <div>
              <div className="flex items-center justify-center py-1">
                <Clipboard />
              </div>
              <p className=" font-medium md:text-center leading-loose tracking-wide ">
                Looks like you have not authored any blogs yet, Let&apos;s fix
                that!
                <span>
                  <Link href="/create" className="text-sky-500 hover:underline">
                    &nbsp; Create your first blog&#8599;
                  </Link>
                </span>
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
