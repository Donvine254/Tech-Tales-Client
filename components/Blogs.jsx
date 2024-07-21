import Link from "next/link";
import { Clock, Comment } from "@/assets";
import parse from "html-react-parser";
import Bookmark from "./Bookmark";
import { UserImage } from "./Avatar";
import Image from "next/image";
import { calculateReadingTime } from "@/lib";
import { formatDate } from "@/lib/utils";

export default async function BlogsComponent({ blogs }) {
  return (
    <div className=" relative ">
      {blogs && blogs.length > 0 ? (
        blogs.map((blog) => (
          <div
            key={blog.id}
            className="bg-gray-100 my-4 p-4 rounded-md border shadow hover:bg-slate-200">
            <div className="">
              <div className="flex gap-2 xsm:items-center">
                <UserImage url={blog.author.picture} />
                <div className="">
                  <p className="text-sm sm:text-base md:text-xl ">
                    Written by{" "}
                    <span className="capitalize font-bold">
                      {blog.author.username}
                    </span>
                  </p>
                  <p className="text-sm font-medium md:text-base ">
                    Published on {formatDate(blog.createdAt)}
                  </p>
                </div>
              </div>
              <hr className="mt-2 h-[2px] bg-gray-200" />
              <Link
                href={`/blogs/${blog.slug}`}
                className="space-y-3 xl:col-span-3"
                prefetch>
                <h1 className="font-bold md:text-xl  py-2 ">{blog.title}</h1>
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
              <article className="text-sm sm:text-base md:text-xl leading-8 md:pb-1 line-clamp-2  overflow-hidden trimmed-blog-body ">
                {blog ? parse(blog.body) : blog.body}
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
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  height="1em"
                  width="1em">
                  <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
                </svg>
              </Link>
              <p className="text-base flex items-center gap-1 md:gap-2 bg-gray-300 border rounded-full text-black px-2 ">
                <Clock />
                {calculateReadingTime(blog.body)} min{" "}
                <span className="xsm:hidden">read</span>
              </p>
              <p className="text-base  inline-flex items-center gap-1">
                <Comment />
                <span>{blog?._count?.comments}</span>
              </p>
              <Bookmark blogId={blog.id} />
            </div>
          </div>
        ))
      ) : (
        <div className="sm:h-[400px] w-full flex flex-col items-center">
          <Image
            src="../not-found.svg"
            alt="not-found"
            width={600}
            height={250}
            className="italic w-fit max-h-[85%]"
          />
          <h1 className="font-bold md:text-2xl text-center">No Blogs Found</h1>
        </div>
      )}
    </div>
  );
}
