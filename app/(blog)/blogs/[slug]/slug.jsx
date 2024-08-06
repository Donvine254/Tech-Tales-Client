"use client";
import { useEffect, useState, useRef } from "react";
import { Comment, Share } from "@/assets";
import {
  Bookmark,
  UserCard,
  MoreFromAuthor,
  AudioPlayer,
  Loader,
  UserImage,
  AnimatedLikeBtn,
} from "@/components";
import parse from "html-react-parser";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";
import { calculateReadingTime } from "@/lib";
import { formatDate, handleSharing } from "@/lib/utils";
import { Like, Graph } from "@/assets";
import hljs from "highlight.js";
import "highlight.js/styles/github.css";
import dynamic from "next/dynamic";
import BlogSummary from "@/components/blogSummary";
import { useUserContext } from "@/providers";
import { Tooltip } from "react-tooltip";

const NoSSRComments = dynamic(() => import("@/components/Comments"), {
  loading: () => (
    <div className="flex items-center justify-center gap-2 text-xl my-2">
      <Loader size={60} />
      <span>Loading Comments...</span>
    </div>
  ),
});
export default function Slug({ blog }) {
  const [likes, setLikes] = useState(blog?.likes ?? 0);
  const [isCardVisible, setIsCardVisible] = useState(false);
  const [commentData, setCommentData] = useState(blog?.comments ?? []);
  const [commentCount, setCommentCount] = useState(blog?.comments.length ?? 0);
  const [copied, setCopied] = useState(false);
  const [showPlayButton, setShowPlayButton] = useState(false);
  const printRef = useRef(null);
  const router = useRouter();

  const user = useUserContext();

  useEffect(() => {
    if (!blog) {
      router.replace("/not-found?referrer=blog-not-found");
    }
  }, [blog, router]);

  useEffect(() => {
    hljs.highlightAll();
    document.querySelectorAll(".ql-syntax").forEach((el) => {
      el.classList.add("language-javascript");
      hljs.highlightElement(el);
    });
  }, []);
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

  //function to copy blog link
  async function handleCopying() {
    setCopied(true);
    try {
      navigator.clipboard.writeText(
        `https://techtales.vercel.app/blogs/${blog.slug}`
      );
      setTimeout(() => {
        setCopied(false);
      }, 3000);
    } catch (err) {
      console.error("Copy to clipboard failed:", err);
      setCopied(false);
      toast.error("Failed to copy link to clipboard");
    }
  }

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
                <h1 className="font-semibold md:text-xl xsm:hidden">Tags:</h1>
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
          <div className="flex items-center justify-between xsm:gap-2 md:gap-4  py-2 border-y border-gray-100 shadow-sm my-1">
            <Link
              href="#comments"
              className="text-base  inline-flex items-center gap-1"
              data-tooltip-id="comments">
              <Comment size={20} className="stroke-none fill-gray-400" />
              <span> {commentCount}</span>
              <Tooltip
                id="comments"
                content="Number of comments in this blog"
                variant="info"
                float="true"
              />
            </Link>
            <Link
              className="inline-flex items-center gap-0.5 "
              href="#actions"
              data-tooltip-id="blog-likes">
              <Like
                className="stroke-gray-400 fill-none"
                size={20}
                title="likes"
              />
              <span className="">{blog.likes}</span>
              <Tooltip
                id="blog-likes"
                content="Number of times this blog has been favorited by readers"
                variant="info"
                float="true"
              />
            </Link>
            <p
              className="inline-flex items-center gap-0.5"
              data-tooltip-id="blog-views">
              <Graph className="stroke-gray-500 fill-none" size={20} />
              <Tooltip
                id="blog-views"
                content="Number of times this blog has been seen by readers"
                variant="info"
                float="true"
              />
              <span className="">{blog.views}</span>
            </p>
            <svg
              fill="none"
              viewBox="0 0 24 24"
              height="20"
              width="20"
              onClick={() => setShowPlayButton(!showPlayButton)}
              className="stroke-gray-300 fill-none"
              data-tooltip-id="play-blog">
              <path
                fill="currentColor"
                fillRule="evenodd"
                d="M12 21a9 9 0 100-18 9 9 0 000 18zm0 2c6.075 0 11-4.925 11-11S18.075 1 12 1 1 5.925 1 12s4.925 11 11 11z"
                clipRule="evenodd"
              />
              <title>Listen to this blog</title>
              <path fill="currentColor" d="M16 12l-6 4.33V7.67L16 12z" />
            </svg>
            <Tooltip
              id="play-blog"
              content="Listen to this blog narration"
              variant="info"
              float="true"
            />
            <button
              onClick={() => handleSharing(blog.title, blog.slug)}
              data-tooltip-id="share-blog">
              <Share size={20} />
              <Tooltip
                id="share-blog"
                content="Share this blog with others"
                variant="info"
                float="true"
              />
            </button>
            <Bookmark blogId={blog.id} size={20} />
          </div>
          {/* div for playing the blog */}
          {showPlayButton &&
            (blog && blog.audio ? (
              <div className="border-2 border-dotted bg-gray-200 rounded-md border-blue-500 py-2 mt-4 mx-auto relative">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  onClick={() => setShowPlayButton(false)}
                  className="hover:fill-red-500 hover:bg-gray-100 p-1 rounded-full hover:text-red-500 cursor-pointer z-50 absolute top-0 right-0">
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                  <title>Close</title>
                </svg>
                <div className="bg-zinc-100 my-2 px-4 rounded-full flex items-center gap-2 text-gray-500 mx-auto w-fit whitespace-nowrap min-w-[60%] xsm:w-full sm:w-[80%] md:w-[60%]">
                  <audio controls src={blog.audio} type="audio"></audio>
                </div>
              </div>
            ) : (
              <AudioPlayer handleClick={() => setShowPlayButton(false)} />
            ))}

          {/* div for generating blog summary */}
          <BlogSummary body={blog.body} show={!showPlayButton} id={blog.id} />
          {/* article body */}
          <article
            className="text-base md:text-[18px] leading-8 md:leading-10 mt-3 subpixel-antialiased blog-body"
            id="blog-body">
            {blog.body ? parse(blog?.body) : blog.body}
          </article>
          {/* div for sharing */}
          <div className="bg-cyan-200 bg-opacity-40 border py-5 px-2 flex flex-col md:flex-row items-center justify-between rounded-md my-2 font-roboto">
            <h1 className="font-semibold text-base text-gray-600 md:text-xl">
              Like what you see? Share with a Friend
            </h1>
            <div className="flex items-center xsm:justify-between xsm:w-full  xsm:gap-2 xsm:py-2 gap-4">
              <button
                onClick={() => handleSharing(blog.title, blog.slug)}
                className="bg-[#f3f6f9]  rounded-md flex items-center justify-center h-8 px-1 py-0  border-2 border-blue-300 focus:outline-none hover:bg-[#e4ebf2;] hover:shadow gap-1 hover:-translate-y-1 transition-transform duration-300"
                title="more">
                <Share size={20} /> share
              </button>
              <button
                onClick={handleCopying}
                title="copy link"
                className="bg-[#f3f6f9]  rounded-md flex items-center justify-center h-8  w-fit md:w-28 px-1 py-0  border-2 border-blue-300 focus:outline-none hover:bg-[#e4ebf2;] hover:shadow gap-1 hover:-translate-y-1 transition-transform duration-300">
                {copied ? (
                  <>
                    {" "}
                    <svg
                      fill="none"
                      viewBox="0 0 15 15"
                      height="1em"
                      width="1em"
                      className="fill-green-400">
                      <path
                        fill="#4ade80"
                        fillRule="evenodd"
                        d="M0 7.5a7.5 7.5 0 1115 0 7.5 7.5 0 01-15 0zm7.072 3.21l4.318-5.398-.78-.624-3.682 4.601L4.32 7.116l-.64.768 3.392 2.827z"
                        clipRule="evenodd"
                      />
                    </svg>
                    copied!
                  </>
                ) : (
                  <>
                    {" "}
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      height="24"
                      width="24">
                      <path d="M8.465 11.293c1.133-1.133 3.109-1.133 4.242 0l.707.707 1.414-1.414-.707-.707c-.943-.944-2.199-1.465-3.535-1.465s-2.592.521-3.535 1.465L4.929 12a5.008 5.008 0 000 7.071 4.983 4.983 0 003.535 1.462A4.982 4.982 0 0012 19.071l.707-.707-1.414-1.414-.707.707a3.007 3.007 0 01-4.243 0 3.005 3.005 0 010-4.243l2.122-2.121z" />
                      <path d="M12 4.929l-.707.707 1.414 1.414.707-.707a3.007 3.007 0 014.243 0 3.005 3.005 0 010 4.243l-2.122 2.121c-1.133 1.133-3.109 1.133-4.242 0L10.586 12l-1.414 1.414.707.707c.943.944 2.199 1.465 3.535 1.465s2.592-.521 3.535-1.465L19.071 12a5.008 5.008 0 000-7.071 5.006 5.006 0 00-7.071 0z" />
                    </svg>
                    copy link
                  </>
                )}
              </button>
              <button
                // modify the function to only print the blog
                onClick={handlePrint}
                className="bg-[#f3f6f9]  rounded-md flex items-center justify-center h-8 px-1 py-0  border-2 border-blue-300 focus:outline-none hover:bg-[#e4ebf2;] hover:shadow gap-1 hover:-translate-y-1 transition-transform duration-300"
                title="print">
                <svg
                  viewBox="0 0 1024 1024"
                  fill="currentColor"
                  height="20"
                  width="20"
                  strokeWidth="1">
                  <path d="M820 436h-40c-4.4 0-8 3.6-8 8v40c0 4.4 3.6 8 8 8h40c4.4 0 8-3.6 8-8v-40c0-4.4-3.6-8-8-8zm32-104H732V120c0-4.4-3.6-8-8-8H300c-4.4 0-8 3.6-8 8v212H172c-44.2 0-80 35.8-80 80v328c0 17.7 14.3 32 32 32h168v132c0 4.4 3.6 8 8 8h424c4.4 0 8-3.6 8-8V772h168c17.7 0 32-14.3 32-32V412c0-44.2-35.8-80-80-80zM360 180h304v152H360V180zm304 664H360V568h304v276zm200-140H732V500H292v204H160V412c0-6.6 5.4-12 12-12h680c6.6 0 12 5.4 12 12v292z" />
                </svg>
                print
              </button>
            </div>
          </div>
          {/* div for actions buttons */}
          <div className="flex items-center justify-between mt-2" id="actions">
            <p className="blog__icons">
              <Comment size={30} />
              <span className="text-base xsm:text-base ">
                {commentCount}{" "}
                <Link href="#write-comment" className="xsm:hidden">
                  Comments
                </Link>
              </span>
            </p>
            <AnimatedLikeBtn
              blogId={blog.id}
              setLikes={setLikes}
              likes={likes}
            />
            {user && user.id === blog.authorId && (
              <Link
                href={`/create/${blog.slug}`}
                className="text-gray-500 hover:text-blue-400"
                title="edit this blog">
                <svg
                  viewBox="0 0 1024 1024"
                  fill="currentColor"
                  height="26"
                  width="26">
                  <path d="M880 836H144c-17.7 0-32 14.3-32 32v36c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-36c0-17.7-14.3-32-32-32zm-622.3-84c2 0 4-.2 6-.5L431.9 722c2-.4 3.9-1.3 5.3-2.8l423.9-423.9a9.96 9.96 0 000-14.1L694.9 114.9c-1.9-1.9-4.4-2.9-7.1-2.9s-5.2 1-7.1 2.9L256.8 538.8c-1.5 1.5-2.4 3.3-2.8 5.3l-29.5 168.2a33.5 33.5 0 009.4 29.8c6.6 6.4 14.9 9.9 23.8 9.9z" />
                </svg>
              </Link>
            )}
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
            user={user}
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
          author={blog?.author.username}
          id={blog?.authorId}
          blogId={blog?.id}
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
