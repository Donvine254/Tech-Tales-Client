"use client";
import { useEffect, useState, useRef } from "react";
import {
  Like,
  Comment,
  NewTwitterIcon,
  Facebook,
  Whatsapp,
  Copy,
} from "@/assets";
import {
  Bookmark,
  UserCard,
  MoreFromAuthor,
  AudioPlayer,
  Comments,
} from "@/components";
import { UserImage } from "@/components/Avatar";
import parse from "html-react-parser";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";
import { calculateReadingTime } from "@/lib";
import { formatDate } from "@/lib/utils";

export default function Slug({ blog }) {
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const [isCardVisible, setIsCardVisible] = useState(false);
  const [commentData, setCommentData] = useState(blog.comments ?? []);
  const printRef = useRef(null);
  const router = useRouter();

  function handleLikeClick() {
    setLiked(!liked);
    if (!liked) {
      setLikes(likes + 1);
    } else {
      setLikes(likes - 1);
    }
  }

  useEffect(() => {
    if (!blog) {
      router.replace("/not-found?referrer=blog-not-found");
    }
  }, [blog, router]);

  //function to pop-up user card
  function handleMouseEnter() {
    setIsCardVisible(true);
  }

  function handleMouseLeave() {
    setIsCardVisible(false);
  }

  //function to print contents
  const handlePrint = async () => {
    const printContents = printRef.current.innerHTML;
    const originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
  };
  return (
    <div>
      {blog ? (
        <div key={blog.id}>
          {blog.image && (
            <Image
              src={blog.image}
              alt="blog-image"
              height={450}
              width={900}
              priority
              className="italic h-full w-full  mt-2 border-2 "
            />
          )}

          <div className="block gap-5 items-center py-4">
            <div className="flex gap-2 md:gap-2 lg:gap-3 items-center">
              <div
                className="relative"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}>
                <UserImage
                  url={blog.author.picture}
                  className="ring-2 ring-offset-2  ring-cyan-500 italic"
                />
                {isCardVisible && <UserCard author={blog.author} />}
              </div>
              <div>
                <div className="flex items-center gap-2 ">
                  <span className="text-base md:text-xl capitalize font-bold">
                    {blog.author.username ?? ""}
                  </span>
                  <button className="bg-cyan-100 text-cyan-600 font-light rounded-md px-1 text-sm pointer-events-none border border-cyan-500">
                    Author
                  </button>
                </div>
                <p className="text-base xsm:text-sm font-medium  xsm:mb-0">
                  <span className="xsm:hidden">Published on </span>{" "}
                  <time dateTime={blog?.createdAt}>
                    {formatDate(blog.createdAt)} {""}
                  </time>
                  &#x2022; &#128337;{calculateReadingTime(blog.body)} min read
                </p>
              </div>
            </div>
          </div>
          <h1 className="font-bold  xsm:text-xl text-2xl lg:text-3xl">
            {blog?.title}
          </h1>
          {/* div for blog tags */}
          <div className="py-1">
            {blog.tags ? (
              <div className="flex gap-2 flex-wrap">
                {blog.tags.split(",").map((tag, index) => (
                  <Link
                    key={index}
                    href={`/search?search=${tag.trim()}`}
                    className="md:px-2 md:py-0.5 text-blue-600 md:bg-transparent md:hover:bg-blue-600 md:hover:text-white cursor-pointer md:border md:border-blue-600 md:rounded-xl">
                    #{tag.trim()}
                  </Link>
                ))}
              </div>
            ) : (
              <></>
            )}
          </div>
          {/* div for playing the blog */}
          <AudioPlayer blog={blog} />
          <article
            className="text-base md:text-xl leading-8 md:leading-10 mt-3 subpixel-antialiased blog-body"
            id="blog-body">
            {blog.body ? parse(blog?.body) : blog.body}
          </article>
          {/* div for sharing */}
          <div className="bg-blue-100 bg-opacity-40 border py-5 px-2 flex xsm:flex-col items-center justify-between rounded-md my-2 font-sans">
            <h1 className="font-semibold text-base text-gray-600 md:text-xl">
              Like what you see? Share with a Friend
            </h1>
            <div className="flex items-center xsm:justify-between  xsm:w-full xsm:p-3 md:gap-4">
              <Link
                href={`https://twitter.com/share?url=https://techtales.vercel.app/blogs/${blog.slug}&text=${blog.title}`}
                target="_blank"
                className="h-10 w-10 flex items-center justify-center p-1 border rounded-full hover:bg-blue-300 bg-blue-200">
                <NewTwitterIcon
                  size={20}
                  className="hover:animate-spin transition ease-in-out duration-300"
                />
              </Link>
              <Link
                href={`https://facebook.com/sharer.php?u=https://techtales.vercel.app/blogs/${blog.slug}`}
                target="_blank"
                className="h-10 w-10 flex items-center justify-center p-1 rounded-full border hover:bg-blue-300 bg-blue-200">
                <Facebook className="hover:animate-spin transition ease-in-out duration-300" />
              </Link>
              <button
                onClick={() => {
                  const whatsappUrl = `whatsapp://send?text=${encodeURIComponent(
                    `https://techtales.vercel.app/blogs/${blog.slug}`
                  )}`;
                  window.open(whatsappUrl);
                }}
                className="h-10 w-10 flex items-center justify-center p-1 rounded-full border hover:bg-green-300 bg-blue-200">
                <Whatsapp className="hover:animate-spin transition ease-in-out duration-300" />
              </button>

              <button
                onClick={() => {
                  try {
                    navigator.clipboard.writeText(
                      `https://techtales.vercel.app/blogs/${blog.slug}`
                    );
                    toast.success("Link copied to clipboard");
                  } catch (err) {
                    console.error("Copy to clipboard failed:", err);
                    toast.error("Failed to copy link to clipboard");
                  }
                }}
                title="copy"
                className="h-10 w-10 flex items-center justify-center p-1 border rounded-full hover:bg-blue-300 bg-blue-200 group">
                <Copy
                  size={20}
                  className="hover:animate-spin transition ease-in-out duration-300"
                />
              </button>
              <button
                // modify the function to only print the blog
                onClick={handlePrint}
                className="h-10 w-10 flex items-center justify-center p-1 border rounded-full hover:bg-blue-300 bg-blue-200 group"
                title="print">
                <svg
                  viewBox="0 0 1024 1024"
                  fill="currentColor"
                  height="24"
                  width="24"
                  strokeWidth="1"
                  className="hover:animate-spin transition ease-in-out duration-300">
                  <path d="M820 436h-40c-4.4 0-8 3.6-8 8v40c0 4.4 3.6 8 8 8h40c4.4 0 8-3.6 8-8v-40c0-4.4-3.6-8-8-8zm32-104H732V120c0-4.4-3.6-8-8-8H300c-4.4 0-8 3.6-8 8v212H172c-44.2 0-80 35.8-80 80v328c0 17.7 14.3 32 32 32h168v132c0 4.4 3.6 8 8 8h424c4.4 0 8-3.6 8-8V772h168c17.7 0 32-14.3 32-32V412c0-44.2-35.8-80-80-80zM360 180h304v152H360V180zm304 664H360V568h304v276zm200-140H732V500H292v204H160V412c0-6.6 5.4-12 12-12h680c6.6 0 12 5.4 12 12v292z" />
                </svg>
              </button>
            </div>
          </div>
          {/* div for actions buttons */}
          <div className="flex items-center justify-between mt-2">
            <p className="blog__icons">
              {!liked ? (
                <Like
                  handleClick={handleLikeClick}
                  className="cursor-pointer font-bold"
                />
              ) : (
                <Like
                  handleClick={handleLikeClick}
                  className="text-red-500 cursor-pointer fill-red-500 font-bold"
                />
              )}
              <span className="text-base  xsm:hidden">
                {likes ? likes : null} {!liked ? "Add Reaction" : "likes"}
              </span>
            </p>
            <p className="blog__icons">
              <Comment size={30} />
              <span className="text-base ">
                {blog.comments.length ?? 0}{" "}
                <Link href="#write-comment" className="xsm:hidden">
                  Comments
                </Link>
              </span>
            </p>
            <Bookmark blogId={blog?.id} size={30} />
          </div>
          {/* beginning of comment section */}

          <Comments
            blogId={blog.id}
            slug={blog.slug}
            blogAuthorId={blog.authorId}
            comments={commentData}
            setComments={setCommentData}
          />
          <div ref={printRef} style={{ display: "none" }}>
            <h1 className="text-xl font-bold">{blog.title}</h1>
            <p className="italic">
              By {blog.author.username} published on{" "}
              {formatDate(blog.createdAt)}
            </p>
            <div className="blog-body">{parse(blog.body)}</div>
          </div>
        </div>
      ) : null}
      <div className="my-2">
        <hr className="my-2" />

        <MoreFromAuthor
          author={blog.author.username}
          id={blog.authorId}
          blogId={blog.id}
        />
      </div>
      <div className="my-2">
        <hr className="my-2" />
        <h1 className="font-bold text-xl">Explore Related Topics</h1>

        {blog.tags && (
          <div className="flex flex-wrap gap-2 py-2">
            {blog.tags.split(",").map((tag, index) => (
              <Link
                key={index}
                href={`/search?search=${tag.trim()}`}
                className="px-6 py-0.5  bg-gray-200 hover:bg-blue-600 hover:text-white cursor-pointer border w-fit rounded-md">
                {tag.trim()}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
