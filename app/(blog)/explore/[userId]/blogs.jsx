import Link from "next/link";
import { Clock } from "@/assets";
import parse from "html-react-parser";
import { UserImage } from "@/components/Avatar";
import { Bookmark, SideNav } from "@/components";

export default async function BlogsComponent({ blogs }) {
  function calculateReadingTime(blog) {
    const words = blog.trim().split(/\s+/).length;
    const readingTime = Math.ceil(words / 300);
    return readingTime;
  }

  return (
    <div className="w-full min-h-[400px] mx-auto px-8 md:w-2/3 relative font-poppins">
      <SideNav />
      {blogs && blogs.length > 0
        ? blogs.map((blog) => (
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
                <p className="text-base hidden md:block">Recommended for you</p>

                <Bookmark blogId={blog.id} />
              </div>
              <hr className="my-2 border-1 border-slate-300" />
            </div>
          ))
        : null}
    </div>
  );
}
