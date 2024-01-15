"use client";
import { useEffect, useState } from "react";
import {
  Like,
  Comment,
  NewTwitterIcon,
  Facebook,
  Whatsapp,
  Copy,
} from "@/assets";
import { Comments, Bookmark, UserCard } from "@/components";
import { UserImage } from "@/components/Avatar";
import parse from "html-react-parser";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";

export default function Slug({ blog }) {
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const [comments, setComments] = useState(blog?.comments);
  const [isCardVisible, setIsCardVisible] = useState(false);

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
      router.replace("/not-found?referrer=blogs/blogId");
    }
  }, [blog, router]);

  //function to pop-up user card
  function handleMouseEnter() {
    setIsCardVisible(true);
  }

  function handleMouseLeave() {
    setIsCardVisible(false);
  }
  return (
    <div>
      {blog ? (
        <div key={blog.id}>
          <h1 className="font-bold xsm:text-xl text-2xl md:text-4xl">
            {blog?.title}
          </h1>
          <div className="flex xsm:block gap-5 items-center py-4">
            <div className="flex gap-2 md:gap-4 items-center">
              <div
                className="relative"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}>
                <UserImage url={blog.user_avatar} />
                {isCardVisible && (
                  <UserCard
                    avatar={blog.user_avatar}
                    name={blog.author}
                    bio={blog.user_bio}
                    userId={blog.user_id}
                    title={blog.title}
                  />
                )}
              </div>

              <p className="font-bold text-xl md:text-2xl capitalize">
                {blog.author ?? ""}
              </p>
            </div>
            <p className="text-base font-medium xsm:px-10 xsm:mb-0">
              {blog?.created_at_date}
            </p>
          </div>
          {blog.image && (
            <div
              className="h-[300px] md:h-[400px] w-full bg-cover bg-center bg-no-repeat rounded-md"
              style={{ backgroundImage: `url(${blog.image})` }}></div>
          )}
          <article
            className="text-sm md:text-xl leading-8 md:leading-10 mt-3 subpixel-antialiased blog-body"
            id="blog-body">
            {blog.body ? parse(blog?.body) : blog.body}
          </article>
          {/* div for sharing */}
          <div className="bg-blue-100 bg-opacity-40 py-4 px-2 flex xsm:flex-col items-center justify-between rounded-md my-2 ">
            <h1 className="font-bold text-bas text-gray-600 md:text-xl">
              Like what you see? Share with a Friend
            </h1>
            <div className="flex items-center xsm:justify-between  xsm:w-full xsm:p-3 md:gap-4">
              <Link
                href={`https://twitter.com/share?url=https://techtales.vercel.app/blogs/${blog.id}&text=${blog.title}`}
                target="_blank"
                className="h-10 w-10 flex items-center justify-center p-1 border rounded-full hover:bg-blue-300 bg-blue-200">
                <NewTwitterIcon />
              </Link>
              <Link
                href={`https://facebook.com/sharer.php?u=https://techtales.vercel.app/blogs/${blog.id}`}
                target="_blank"
                className="h-10 w-10 flex items-center justify-center p-1 rounded-full border hover:bg-blue-300 bg-blue-200">
                <Facebook />
              </Link>
              <button
                onClick={() => {
                  const whatsappUrl = `whatsapp://send?text=${encodeURIComponent(
                    `https://techtales.vercel.app/blogs/${blog.id}: ${blog.title}`
                  )}`;
                  window.open(whatsappUrl);
                }}
                className="h-10 w-10 flex items-center justify-center p-1 rounded-full border hover:bg-green-300 bg-blue-200">
                <Whatsapp />
              </button>
              <button
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(
                      `https://techtales.vercel.app/blogs/${blog.id}`
                    );
                    toast.success("Link copied to clipboard");
                  } catch (err) {
                    console.error("Copy to clipboard failed:", err);
                    toast.error("Failed to copy link to clipboard");
                  }
                }}
                className="h-10 w-10 flex items-center justify-center p-1 border rounded-full hover:bg-blue-300 bg-blue-200">
                <Copy />
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
              <Comment />
              <span className="text-base ">
                {blog.comments ? blog?.comments?.length : null}{" "}
                <Link href="#write-comment" className="xsm:hidden">
                  Comments
                </Link>
              </span>
            </p>
            {/* <div className="relative">
              <Share
                size={30}
                className="font-bold cursor-pointer"
                handleClick={() => setPopupOpen(true)}
              />
              {isPopupOpen && (
                <div
                  className="absolute right-0 md:left-0  bottom-8 bg-white border shadow-lg rounded-md min-w-[200px] w-fit h-fit py-4 z-50"
                  ref={popupRef}>
                  <ShareModal id={blog.id} slug={blog.slug} />
                </div>
              )}
            </div> */}
            <Bookmark blogId={blog?.id} className="font-bold" size={30} />
          </div>
          {/* beginning of comment section */}

          <Comments
            comments={comments}
            setComments={setComments}
            blogId={blog.id}
          />
        </div>
      ) : null}
    </div>
  );
}
