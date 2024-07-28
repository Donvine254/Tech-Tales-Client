import { Comment, Like, Graph } from "@/assets";
import parse from "html-react-parser";
import { Bookmark, ShareButton, SideNav, UserImage } from "@/components";
import Link from "next/link";
import { baseUrl, calculateReadingTime } from "@/lib";
import Image from "next/image";
import { formatDate } from "@/lib/utils";
export const metadata = {
  title: "Home Page - Tech Tales",
  description:
    "Tech Tales is a simple blog for tech students and professionals who would like to share their solutions to various coding problems or practice blogging as a way of learning",
};

async function getBlogs() {
  try {
    const res = await fetch(`${baseUrl}/blogs`, {
      next: { revalidate: 3600 },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(`Failed to fetch`, error);
  }
}

export default async function HomePage() {
  const blogs = (await getBlogs()) || [];
  return (
    <section className="relative md:min-h-[350px] md:mt-10 font-poppins">
      <SideNav />
      <div className="w-full mx-auto  px-4 md:px-8 md:w-2/3 relative ">
        {blogs && blogs.length > 0 ? (
          blogs?.map((blog) => (
            <div
              key={blog.id}
              className="bg-gray-50 my-4 p-4 rounded-md border shadow hover:bg-[#fefefe]">
              <div className="">
                <div className="flex gap-2  xsm:items-center">
                  <UserImage url={blog.author.picture} />
                  <div className="">
                    <p className=" text-sm sm:text-base md:text-xl capitalize font-medium">
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
                <article className="text-sm sm:text-base md:text-[18px] leading-8 line-clamp-2 md:pb-1 overflow-hidden trimmed-blog-body ">
                  {blog ? parse(blog.body) : blog.body}
                </article>
              </div>

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
