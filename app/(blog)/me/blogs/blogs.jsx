"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Clock, Clipboard, Comment, Graph, Like } from "@/assets";
import {
  deleteBlog,
  baseUrl,
  calculateReadingTime,
  handleUpdateStatus,
} from "@/lib";
import {
  SideNav,
  UserImage,
  SkeletonBlog,
  ActionsButton,
  ShareButton,
} from "@/components";
import { formatDate, formatViews } from "@/lib/utils";
import parse from "html-react-parser";
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

  //filter between published and unpublished blogs
  const publishedBlogs = blogs.filter((blog) => blog.status === "PUBLISHED");
  const unpublishedBlogs = blogs.filter(
    (blog) => blog.status === "UNPUBLISHED"
  );

  return (
    <div className="w-full min-h-[400px] mx-auto px-4 md:px-8 md:w-2/3 relative font-poppins">
      <SideNav />
      {/* section for published blogs */}
      <section>
        <h1 className="font-bold   md:text-xl">
          <span className="underline">Your Published Blogs</span>{" "}
          {!loading && <span>&#x28;{publishedBlogs.length}&#x29;</span>}
        </h1>
        {/* <hr className="my-2  border border-blue-500" /> */}
        {loading && (
          <div>
            {Array(2)
              .fill(0)
              .map((item, i) => (
                <SkeletonBlog key={i} />
              ))}
          </div>
        )}
        {blogs && publishedBlogs.length > 0 ? (
          publishedBlogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-gray-50 my-4 p-4 rounded-md border shadow hover:bg-[#fefefe]">
              <div className="">
                <div className="flex gap-2 xsm:items-center">
                  <UserImage url={blog.author.picture} />
                  <div className="">
                    <p className=" text-base md:text-xl capitalize font-medium ">
                      {blog.author.username}
                    </p>
                    <p className="text-base xsm:text-sm xsm:mb-0">
                      <span className="xsm:hidden">Published on </span>{" "}
                      <time dateTime={blog?.createdAt}>
                        {formatDate(blog.createdAt)} {""}
                      </time>
                      &#x2022; &#128337;{calculateReadingTime(blog.body ?? "")} min
                    </p>
                  </div>
                </div>
                <hr className="mt-2 h-[2px] bg-gray-200" />
                <Link
                  href={`/blogs/${blog?.slug}`}
                  className="space-y-3 xl:col-span-3"
                  prefetch>
                  <h1 className="font-bold md:text-xl  py-2">{blog?.title ?? ""}</h1>
                </Link>
                {/* div for blog tags */}
                <div className="py-1">
                  {blog.tags ? (
                    <div className="flex gap-1 md:gap-2 flex-wrap text-sm xsm:text-xs">
                      {blog?.tags?.split(",").map((tag, index) => (
                        <Link
                          key={index}
                          href={`/search?search=${tag.trim()}`}
                          className={` text-blue-500  highlight-tag-${index}`}>
                          <span>#</span>
                          {tag.trim()}
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
                <article className="text-sm sm:text-base md:text-[18px] leading-8 line-clamp-2 md:pb-1 trimmed-blog-body ">
                  {blog?.body ? parse(blog.body.substring(0, 400)) : "Your blog body appears here"}
                </article>
              </div>
              {/* beginning div for actions buttons */}
              <div className="flex items-center justify-between xsm:gap-2 md:gap-4  py-2">
                <Link
                  href={`/blogs/${blog?.slug}`}
                  className="text-base  inline-flex items-center gap-1">
                  <Comment size={20} className="stroke-none fill-gray-400" />
                  <span className="xsm:text-xs">{blog?._count?.comments}</span>
                </Link>
                <Link
                  href={`/blogs/${blog?.slug ?? 0}`}
                  prefetch
                  className="inline-flex items-center gap-0.5 ">
                  <Like className="stroke-gray-400 fill-none" size={20} />
                  <span className="xsm:text-xs">{blog?.likes ?? 0}</span>
                </Link>
                <Link
                  href={`/blogs/${blog.slug}`}
                  prefetch
                  className="inline-flex xsm:items-center  sm:items-start gap-x-0.5 ">
                  <Graph className="stroke-gray-500 fill-none " size={20} />
                  <p className="text-base xsm:text-xs sm:align-text-bottom  xsm:pt-1.5">
                    {formatViews(blog.views)}
                  </p>
                </Link>
                <ShareButton
                  size={20}
                  className="h-[20px] w-[20px] text-gray-500"
                  title={blog?.title}
                  slug={blog?.slug}
                  blogId={blog.id}
                  image={blog?.image?.secure_url ?? "/placeholder-image.webp"}
                />
                <ActionsButton
                  onDelete={() => handleDelete(blog.id, blog.slug)}
                  onEdit={() => handleEdit(blog.slug)}
                  onUpdate={handleUpdateStatus}
                  setBlogs={setBlogs}
                  blog={blog}
                />
              </div>
              {/* end of actions button div */}
            </div>
          ))
        ) : (
          <>
            {!loading && (
              <div className="py-6 my-4 px-2 h-full bg-white border rounded-md text-center">
                <div className="flex items-center justify-center py-1">
                  <Clipboard />
                </div>
                <h3 className="font-semibold text-lg leading-loose tracking-wide ">
                  Looks like you have not authored any blogs yet
                </h3>
                <p className="font-medium xsm:mx-2 text-center leading-loose tracking-wide ">
                  Let&apos;s fix that!{" "}
                  <span>
                    <Link
                      href="/create"
                      className="text-blue-500 hover:underline hover:bg-gray-200 ">
                      &nbsp; Create your first blog&#8599;
                    </Link>
                  </span>
                </p>
                <p>
                  Your published content will be visible to other website users
                  and visitors.{" "}
                  <a href="/privacy" className="hover:underline text-blue-500">
                    Learn More
                  </a>
                </p>
              </div>
            )}
          </>
        )}
      </section>
      {/* section for unpublished blogs */}
      <h1 className="font-bold  md:text-xl">
        <span className="underline">Your Unpublished Blogs</span>{" "}
        {!loading && <span>&#x28;{unpublishedBlogs.length}&#x29;</span>}
      </h1>
      {/* <hr className="my-2  border border-blue-500" /> */}
      {loading && (
        <div>
          {Array(1)
            .fill(0)
            .map((item, i) => (
              <SkeletonBlog key={i} />
            ))}
        </div>
      )}
      {blogs && unpublishedBlogs.length > 0 ? (
        unpublishedBlogs.map((blog) => (
          <div
            key={blog.id}
            className="bg-gray-100 my-4 p-4 rounded-md border shadow hover:bg-slate-200">
            <div className="">
              <div className="flex gap-2 xsm:items-center">
                <UserImage url={blog.author?.picture} />
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
                href="#"
                className="space-y-3 xl:col-span-3 pointer-events-none"
                title="disabled-link">
                <h1 className="font-bold md:text-xl  py-2">{blog?.title}</h1>
              </Link>
              {/* div for blog tags */}
              <div className="py-1">
                {blog?.tags ? (
                  <div className="flex gap-1 md:gap-2 flex-wrap text-sm xsm:text-xs">
                    {blog.tags.split(",").map((tag, index) => (
                      <Link
                        key={index}
                        href={`/search?search=${tag.trim()}`}
                        className={` text-blue-500  highlight-tag-${index}`}>
                        <span>#</span>
                        {tag.trim()}
                      </Link>
                    ))}
                  </div>
                ) : (
                  <></>
                )}
              </div>
              <article className="text-sm sm:text-base md:text-xl leading-8 line-clamp-2 md:pb-1 trimmed-blog-body ">
                {blog.body ? parse(blog.body.substring(0, 400)) : "Your blog body here"}
              </article>
            </div>
            <div className="flex items-center justify-between py-2 ">
              <Link
                href="#"
                className="inline-flex items-center gap-1 hover:underline hover:text-blue-500 pointer-events-none"
                title="disabled">
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
                <span>{calculateReadingTime(blog?.body ?? "")} min</span>
                <span className="xsm:hidden">read</span>
              </p>
              <p className="text-base  inline-flex items-center gap-1">
                <Comment />
                <span>{blog?._count?.comments}</span>
              </p>

              <ActionsButton
                onDelete={() => handleDelete(blog.id, blog.slug)}
                onEdit={() => handleEdit(blog.slug)}
                onUpdate={handleUpdateStatus}
                blog={blog}
                setBlogs={setBlogs}
              />
            </div>
          </div>
        ))
      ) : (
        <>
          {!loading && (
            <div className="py-6 mt-4 px-2 h-full bg-white border rounded-md text-center">
              <div className="flex items-center justify-center py-1">
                <Clipboard />
              </div>
              <h3 className="font-semibold text-lg leading-loose tracking-wide ">
                Your have no unpublished articles
              </h3>
              <p className="font-medium xsm:mx-2 text-center leading-loose tracking-wide ">
                Your unpublished content is not visible to other website users
                and visitors.{" "}
                <a href="/privacy" className="hover:underline text-blue-500">
                  Learn More
                </a>
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
