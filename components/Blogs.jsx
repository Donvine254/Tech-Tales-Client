import Link from "next/link";
import { Graph, Comment, Like } from "@/assets";
import parse from "html-react-parser";
import Bookmark from "./Bookmark";
import { UserImage } from "./Avatar";
import ShareButton from "./ShareButton";
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
            className="bg-gray-50 my-4 p-4 rounded-md border shadow hover:bg-[#fefefe]">
            <div className="">
              <div className="flex gap-2 xsm:items-center">
                <UserImage url={blog.author.picture} />
                <div className="">
                  <p className="text-sm sm:text-base md:text-xl font-medium">
                  {blog.author.username}
                  </p>
                  <p className="text-base xsm:text-sm xsm:mb-0">
                    <span className="xsm:hidden">Published on </span>{" "}
                    <time dateTime={blog?.createdAt}>
                      {formatDate(blog.createdAt)} {""}
                    </time>
                    &#x2022; &#128337;{calculateReadingTime(blog.body)} min
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
              <article className="text-sm sm:text-base md:text-[18px] leading-8 md:pb-1 line-clamp-2  overflow-hidden trimmed-blog-body ">
                {blog ? parse(blog.body) : blog.body}
              </article>
            </div>
            {/* start of flex div for actions */}
            <div className="flex items-center justify-between xsm:gap-2 md:gap-4  py-2">
              <Link
                href={`/blogs/${blog.slug}`}
                className="text-base  inline-flex items-center gap-1">
                <Comment size={20} className="stroke-none fill-gray-400" />
                <span>{blog?._count?.comments}</span>
              </Link>
              <Link
                href={`/blogs/${blog.slug}`}
                prefetch
                className="inline-flex items-center gap-0.5 ">
                <Like className="stroke-gray-400 fill-none" size={20} />
                <span className="">{blog.likes}</span>
              </Link>
              <Link
                href={`/blogs/${blog.slug}`}
                prefetch
                className="inline-flex items-center gap-0.5">
                <Graph className="stroke-gray-500 fill-none" size={20} />
                <span className="">{blog.views}</span>
              </Link>
              <ShareButton size={20} title={blog.title} slug={blog.slug} />
              <Bookmark blogId={blog.id} size={20} />
            </div>
            {/* end of flex div */}
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
