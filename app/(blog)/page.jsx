import { UserImage } from "@/components/Avatar";

import { Clock } from "@/assets";
import parse from "html-react-parser";
import { Bookmark, SideNav } from "@/components";
import Link from "next/link";
import { baseUrl, calculateReadingTime } from "@/lib";
import Image from "next/image";
export const metadata = {
  title: "Home Page - Tech Tales",
  description:
    "Tech Tales is a simple blog for tech students and professionals who would like to share their solutions to various coding problems or practice blogging as a way of learning",
};

export default async function HomePage() {
  const blogs = await fetch(`${baseUrl}/blogs`, {
    next: { revalidate: 3600 },
  }).then((response) => response.json());

  return (
    <section className="relative md:min-h-[350px] md:mt-10 font-poppins">
      <SideNav />
      <div className="w-full mx-auto  px-4 md:px-8 md:w-2/3 relative ">
        {blogs && blogs.length > 0 ? (
          blogs?.map((blog) => (
            <div
              key={blog.id}
              className="bg-gray-100 my-4 p-4 rounded-md border shadow hover:bg-slate-200">
              <div className="">
                <div className="flex gap-2  xsm:items-center">
                  <UserImage url={blog.user_avatar} />
                  <div className="">
                    <p className=" text-sm sm:text-base md:text-xl ">
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
                <hr className="mt-2 h-[2px] bg-gray-200" />
                <Link
                  href={`/blogs/${blog.slug}`}
                  className="space-y-3 xl:col-span-3"
                  prefetch>
                  <h1 className="font-bold  md:text-xl  py-2">{blog.title}</h1>
                </Link>
                {/* div for blog tags */}
                <div className="py-1">
                  {blog.tags ? (
                    <div className="flex gap-1 flex-wrap text-sm">
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
                <article className="text-sm sm:text-base md:text-xl leading-8 line-clamp-2 md:pb-1 overflow-hidden trimmed-blog-body ">
                  {blog ? parse(blog.body) : blog.body}
                </article>
              </div>
              <div className="flex items-center justify-between py-2">
                <Link href={`/blogs/${blog.slug}`} prefetch>
                  Read &#8599;
                </Link>
                <p className="text-base flex items-center gap-1 md:gap-2 bg-gray-300 rounded-full border text-black px-2">
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
          <div className="sm:h-[400px] w-full flex flex-col items-center">
            <Image
              src="../not-found.svg"
              alt="not-found"
              width={600}
              height={250}
              className="italic w-fit max-h-[85%]"
            />
            <h1 className="font-bold md:text-2xl text-center">
              No Blogs Found
            </h1>
          </div>
        )}
      </div>
    </section>
  );
}
