"use client";
import { calculateReadingTime } from "@/lib";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Graph, Clock } from "@/assets";
import { useRouter } from "next/navigation";
import { getCurrentUser, deleteBlog } from "@/lib";
import parse from "html-react-parser";
import { UserImage } from "@/components/Avatar";
import SkeletonBlog from "@/components/SkeletonBlog";
import toast from "react-hot-toast";
import ActionsButton from "@/components/ActionsButton";
import { Bookmark, SideNav } from "@/components";
import Axios from "axios";
//check for the current user
const user = getCurrentUser();

export default function MyBlogsComponent({ id }) {
  const navigate = useRouter();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user && !id) {
      toast.error("kindly login first!");
      navigate.replace("/login");
    } else if (user || id) {
      const fetchBlogs = async () => {
        try {
          let fetchId;
          if (id) {
            fetchId = id;
          } else {
            fetchId = user.id;
          }
          const response = await Axios.get(
            `https://techtales.up.railway.app/blogs/user/${fetchId}`
          );
          const data = await response.data;
          setBlogs(data);
          setLoading(false);
        } catch (error) {
          setLoading(false);
          console.error("Error fetching blogs:", error);
        }
      };

      fetchBlogs();
    }
  }, [navigate]);

  function handleDelete(blogId) {
    deleteBlog(blogId, setBlogs);
  }
  function handleEdit(id) {
    navigate.push(`/create/${id}?action=edit&&referror=user`);
  }

  return (
    <div className="w-full min-h-[400px] mx-auto px-8 md:w-2/3 relative font-poppins">
      <SideNav />
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
                <h1 className="font-bold text-xl md:text-2xl  py-2">
                  {blog.title}
                </h1>
              </Link>
              <p className="text-xl leading-8 line-clamp-2 md:pb-1 trimmed-blog-body ">
                {blog.body ? parse(blog.body) : blog.body}
              </p>
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
              <p
                className="flex items center gap-2 hover:text-blue-500 cursor-pointer xsm:hidden"
                onClick={() =>
                  toast.error("This feature is not supported yet")
                }>
                <Graph />
                <span>View Blog Statistics</span>
              </p>
              {blog.user_id === user.id ? (
                <ActionsButton
                  onDelete={() => handleDelete(blog.id)}
                  onEdit={() => handleEdit(blog.id)}
                  id={blog.id}
                  slug={blog.slug}
                />
              ) : (
                <Bookmark blogId={blog.id} />
              )}
            </div>
            <hr className="my-2 border-1 border-slate-300" />
          </div>
        ))
      ) : (
        <div className="p-2">
          {!loading && user && (
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
