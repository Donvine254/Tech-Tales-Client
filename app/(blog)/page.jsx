import { UserImage } from "@/components/Avatar";

import { Clipboard, Clock } from "@/assets";
import parse from "html-react-parser";
import { Bookmark, SideNav } from "@/components";
import Link from "next/link";

export const metadata = {
  title: "Home Page - Tech Tales",
  description:
    "Tech Tales is a simple blog for tech students and professionals who would like to share their solutions to various coding problems or practice blogging as a way of learning",
};

export default async function HomePage() {
  const blogs = await fetch("https://techtales.up.railway.app/blogs", {
    next: { revalidate: 3600 },
  }).then((response) => response.json());

  function calculateReadingTime(blog) {
    const words = blog.trim().split(/\s+/).length;
    const readingTime = Math.ceil(words / 300);
    return readingTime;
  }

  return (
    <section className="relative md:min-h-[350px] md:mt-10 font-poppins">
      <SideNav />
      <div className="w-full mx-auto  px-8 md:w-2/3 relative ">
        {blogs && blogs.length > 0 ? (
          blogs?.map((blog) => (
            <div key={blog.id} className="">
              <article className="">
                <div className="flex gap-2  xsm:items-center">
                  <UserImage url={blog.user_avatar} />
                  <div className="flex items-center xsm:flex-col gap-2 xsm:gap-0 xsm:items-start">
                    <p className=" text-base md:text-xl ">
                      Written By{" "}
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
                  href={`/blogs/${blog.id}?title=${blog.slug}`}
                  className="space-y-3 xl:col-span-3">
                  <h1 className="font-bold text-xl md:text-2xl  py-2">
                    {blog.title}
                  </h1>
                </Link>
                {/* div for blog tags */}
                <div className="py-1">
                  {blog.tags ? (
                    <div className="flex gap-1 flex-wrap">
                      {blog.tags.split(",").map((tag, index) => (
                        <Link
                          key={index}
                          href={`/search?search=${tag.trim()}`}
                          className="px-2 py-0.5 bg-blue-200  border hover:border-blue-200 hover:bg-gray-100 h-8 rounded-md transition-all cursor-pointer ">
                          #{tag.trim()}
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
                <div className="text-sm md:text-xl leading-8 line-clamp-2 md:pb-1 overflow-hidden trimmed-blog-body ">
                  {blog ? parse(blog.body) : blog.body}
                </div>
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
                <p className="text-base hidden md:block">
                  Based on your reading history
                </p>
                <Bookmark blogId={blog.id} />
              </div>
              <hr className="my-2 border-1 border-slate-300" />
            </div>
          ))
        ) : (
          <div className="flex flex-row items-center justify-center gap-1">
            <Clipboard />
            <h1>No Blogs Found</h1>
          </div>
        )}
      </div>
    </section>
  );
}
