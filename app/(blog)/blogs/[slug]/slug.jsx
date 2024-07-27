"use client";
import { useEffect, useState } from "react";
import {
  Like,
  Comment,
 
} from "@/assets";
import {
  Bookmark,
  UserCard,
  MoreFromAuthor,
  AudioPlayer,
  Loader,
  UserImage,
  SlugShareButtons,
} from "@/components";

import parse from "html-react-parser";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { calculateReadingTime } from "@/lib";
import { formatDate } from "@/lib/utils";
import dynamic from "next/dynamic";

const NoSSRComments = dynamic(() => import("@/components/Comments"), {
  loading: () => (
    <div className="flex items-center justify-center gap-2 text-xl my-2">
      <Loader size={60} />
      <span>Loading Comments...</span>
    </div>
  ),
});
export default function Slug({ blog }) {
  const [likes, setLikes] = useState(blog.likes);
  const [liked, setLiked] = useState(false);
  const [isCardVisible, setIsCardVisible] = useState(false);
  const [commentData, setCommentData] = useState(blog.comments ?? []);
  const [commentCount, setCommentCount] = useState(blog.comments.length ?? 0);
  
  const router = useRouter();
  function handleLikeClick() {
    setLiked(!liked);
    if (!liked) {
      setLikes((prev) => (prev += 1));
      //update function to update blog likes count and add blog to user liked array
    } else {
      setLikes((prev) => (prev -= 1));
      //update function to update blog likes count and remove blog to user liked array
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
          <SlugShareButtons
            slug={blog.slug}
            title={blog.title}
            body={blog.body}
            author={blog.author.username}
            createdAt={blog.createdAt}
          />
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
              <span className="text-base xsm:text-sm">
                {likes} <span className="xsm:hidden">Likes</span>
              </span>
            </p>
            <p className="blog__icons">
              <Comment size={30} />
              <span className="text-base xsm:text-base ">
                {commentCount}{" "}
                <Link href="#write-comment" className="xsm:hidden">
                  Comments
                </Link>
              </span>
            </p>
            <Bookmark blogId={blog?.id} size={30} />
          </div>
          {/* beginning of comment section */}

          <NoSSRComments
            blogId={blog.id}
            slug={blog.slug}
            blogAuthorId={blog.authorId}
            comments={commentData}
            setComments={setCommentData}
            commentCount={commentCount}
            setCommentCount={setCommentCount}
          />
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
