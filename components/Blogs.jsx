import Link from "next/link";
import { Clipboard } from "@/assets";
import { Clock } from "@/assets";
import parse from "html-react-parser";
import Bookmark from "./Bookmark";
import { UserImage } from "./Avatar";
import SideNav from "./SideNav";
import { calculateReadingTime } from "@/lib";

export default async function BlogsComponent({ blogs }) {
  return (
    <div className="w-full mx-auto px-4 md:px-8 md:w-2/3 relative font-poppins">
      <SideNav />
      {blogs && blogs.length > 0 ? (
        blogs.map((blog) => (
          <div
            key={blog.id}
            className="bg-gray-100 my-4 p-4 rounded-md border shadow hover:bg-slate-200">
            <article className="">
              <div className="flex gap-2 xsm:items-center">
                <UserImage url={blog.user_avatar} />
                <div className="">
                  <p className=" text-base md:text-xl ">
                    Written by{" "}
                    <span className="capitalize font-bold">{blog.author}</span>
                  </p>
                  <p className="text-sm font-medium md:text-base ">
                    <span className="xsm:hidden sm:hidden">&mdash;</span>{" "}
                    Published on {blog.created_at_date}
                  </p>
                </div>
              </div>
              <Link
                href={`/blogs/${blog.id}?title=${blog.slug}`}
                className="space-y-3 xl:col-span-3">
                <h1 className="font-bold text-xl md:text-2xl  py-2 ">
                  {blog.title}
                </h1>
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
              <div className="text-sm md:text-xl leading-8 md:pb-1 line-clamp-2  overflow-hidden trimmed-blog-body ">
                {blog ? parse(blog.body) : blog.body}
              </div>
            </article>
            <div className="flex items-center justify-between py-2">
              <Link href={`/blogs/${blog.id}?title=${blog.slug}`}>
                Read &#8599;
              </Link>
              <p className="text-base flex items-center gap-1 md:gap-2 bg-gray-300 border rounded-full text-black px-2">
                <Clock />
                {calculateReadingTime(blog.body)} min{" "}
                <span className="xsm:hidden">read</span>
              </p>
              <p className="text-base hidden md:block">
                Based on your reading history
              </p>
              <Bookmark blogId={blog.id} />
            </div>
            {/* <hr className="my-2 border-1 border-slate-300" /> */}
          </div>
        ))
      ) : (
        <div className="flex flex-col py-1 items-center justify-center gap-2">
          <Clipboard />
          <h1>No Blogs Found</h1>
        </div>
      )}
    </div>
  );
}
