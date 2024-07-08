import Link from "next/link";
import { Clock } from "@/assets";
import parse from "html-react-parser";
import Bookmark from "./Bookmark";
import { UserImage } from "./Avatar";
import { calculateReadingTime } from "@/lib";

export default async function MoreFromAuthor({ author, id, blogId }) {
  const blogs = await fetch(
    `https://techtales.up.railway.app/blogs/user/${id}`,
    {
      next: { revalidate: 600 },
    }
  ).then((response) => response.json());
  const filteredBlogs = blogs.filter((blog) => blog.id !== blogId);
  return (
    <div>
      <h1 className="text-xl font-bold">More from {author}</h1>
      <div>
        <div className="sm:flex sm:gap-2 sm:overflow-x-auto">
          {filteredBlogs && blogs.length > 0
            ? blogs.map((blog) => (
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
              ))
            : null}
        </div>
        {!blogs &&
          filteredBlogs.length <
            1(
              <div className="flex flex-col py-1 items-center justify-center gap-2">
                <h1>This author has no other blogs</h1>
              </div>
            )}
      </div>
    </div>
  );
}
