"use client";
import React, { useState } from "react";
import Script from "next/script";
import parse from "html-react-parser";
import BlogImage from "@/components/ui/blog-image";
import { calculateReadingTime, formatViews } from "@/lib/utils";
import {
  Calendar,
  ChartNoAxesColumn,
  Clock,
  Heart,
  MessageSquare,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { ShareModal } from "@/components/modals/share-modal";
import PrismLoader from "@/components/custom/prism-loader";
import Bookmark from "@/components/custom/bookmark";
import AudioPlayer from "@/components/custom/audio-player";
import {
  Tooltip,
  TooltipProvider,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  blog: Record<string, any>;
};

export default function Slug({ blog }: Props) {
  const [showPlayButton, setShowPlayButton] = useState(false);
  return (
    <div className="w-full mx-auto m-2 min-h-[75%] px-8 xsm:px-4 max-w-4xl md:mt-4 blog">
      <Script src="https://unpkg.com/ink-html/dist/index.js"></Script>
      <BlogImage image={blog.image} title={blog.title} />
      {/* Author Information - Moved to top */}
      <div className="flex items-center space-x-3 mb-4 mt-4">
        <Avatar className="h-12 w-12 ring-2 ring-cyan-500 ring-offset-2">
          <AvatarImage
            src={blog.author.picture ?? "/placeholder-image.webp"}
            alt={blog.author.username}
          />
          <AvatarFallback className="bg-gradient-to-r from-cyan-100 to-blue-100 text-cyan-700 text-sm">
            {blog.author.username
              .split(" ")
              .map((n: string) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-accent-foreground text-base md:text-xl capitalize">
              {blog.author.username}
            </span>
            <div className="text-[#08a0f8] font-bold px-1 text-sm xsm:text-xs flex items-center">
              <svg
                viewBox="0 0 693 1000"
                fill="currentColor"
                height="1em"
                width="1em">
                <path d="M55 988c-4 13.333-12.667 16-26 8-12-5.333-17.333-16.667-16-34 2.667-66.667 19.333-142 50-226-66.667-102.667-84-208-52-316 6.667 21.333 17.333 47.333 32 78 14.667 30.667 29.333 57.333 44 80 14.667 22.667 25.333 32.667 32 30 5.333-2.667 5.333-30.333 0-83s-9-108-11-166 6.333-110.333 25-157c14.667-29.333 41.333-60.667 80-94s73.333-56.667 104-70c-16 30.667-27 62-33 94s-7.333 58-4 78 10.333 30.667 21 32c8 0 36-40 84-120S468.333 1.333 491 0c30.667-2.667 68.667 7 114 29s72.667 43.667 82 65c8 16 8 42.333 0 79s-21.333 64.333-40 83c-29.333 29.333-78 50-146 62s-106 20-114 24c-10.667 6.667-6.667 18 12 34 36 32 94.667 38.667 176 20-37.333 53.333-82.667 91.333-136 114s-97.333 35.333-132 38c-34.667 2.667-52.667 6-54 10-2.667 16 13.667 34 49 54s69 24.667 101 14c-20 37.333-41 65.333-63 84s-40 30.333-54 35c-14 4.667-39.333 8.333-76 11s-65 5.333-85 8L55 988" />
              </svg>{" "}
              Author
            </div>
          </div>

          <div className="flex items-center space-x-3 text-sm md:text-base text-accent-foreground">
            <div className="flex items-center space-x-1">
              <Calendar className="h-3 w-3 md:h-4 md:w-4" />
              <span>
                {" "}
                {new Date(blog.createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>
            <div className="flex items-center space-x-1 capitalize">
              <Clock className="h-3 w-3 md:h-4 md:w-4" />
              <span>{calculateReadingTime(blog.body)} min read</span>
            </div>
          </div>
        </div>
      </div>
      {/* Blog title */}
      <h1 className="text-xl md:text-2xl lg:text-3xl font-bold mb-2">
        {blog.title}{" "}
      </h1>
      {/* blog tags */}
      <div className="py-1">
        {blog.tags ? (
          <div className="flex space-x-2 items-center flex-wrap">
            {blog.tags.split(",").map((tag: string, index: number) => (
              <Link
                key={index}
                href={`/search?q=${tag.trim()}`}
                title={tag}
                className={`md:px-2 md:py-0 text-blue-500 dark:text-cyan-500 md:bg-transparent    md:border border-transparent md:rounded-full  text-sm  highlight-link-${index}`}>
                <span>#</span>
                {tag.trim()}
              </Link>
            ))}
          </div>
        ) : (
          <></>
        )}
      </div>
      {/* Actions buttons */}
      <div className="flex items-center justify-between xsm:gap-2 md:gap-4  py-2 border-y border-slate-300 my-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <a
                href="#comments"
                className="flex items-center space-x-1 hover:text-cyan-600 transition-colors cursor-pointer"
                title="jump to comments">
                <MessageSquare className="h-4 w-4" />
                <span className="text-sm">{blog?.comments?.length ?? 0}</span>
              </a>
            </TooltipTrigger>
            <TooltipContent className="max-w-72 text-sm" side="bottom">
              <p>Blog Comments</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                className="flex items-center space-x-1 hover:text-red-500 transition-colors cursor-pointer group"
                title="blog likes">
                <Heart className="h-4 w-4 group-hover:fill-red-500" />
                <span className="text-sm">{blog.likes}</span>
              </button>
            </TooltipTrigger>
            <TooltipContent className="max-w-72 text-sm" side="bottom">
              <p>Blog Likes</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                className="flex items-center space-x-1 hover:text-cyan-600 transition-colors cursor-pointer"
                title="blog views">
                <ChartNoAxesColumn className="h-4 w-4" />
                <span className="text-sm">{formatViews(blog.views)}</span>
              </button>
            </TooltipTrigger>
            <TooltipContent className="max-w-72 text-sm" side="bottom">
              <p>Blog Views</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                className="p-1 hover:text-cyan-600 transition-colors"
                onClick={() => setShowPlayButton(!showPlayButton)}>
                <svg
                  fill="none"
                  viewBox="0 0 24 24"
                  height="1rem"
                  width="1rem"
                  className="fill-none  hover:-translate-y-1 transition-transform duration-300 h-4 w-4"
                  data-tooltip-id="play-blog">
                  <path
                    fill="currentColor"
                    fillRule="evenodd"
                    d="M12 21a9 9 0 100-18 9 9 0 000 18zm0 2c6.075 0 11-4.925 11-11S18.075 1 12 1 1 5.925 1 12s4.925 11 11 11z"
                    clipRule="evenodd"
                  />
                  <path fill="currentColor" d="M16 12l-6 4.33V7.67L16 12z" />
                </svg>
              </button>
            </TooltipTrigger>
            <TooltipContent className="max-w-72 text-sm" side="bottom">
              <p>Listen to this blog</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <ShareModal
          slug={blog.slug}
          title={blog.title}
          image={blog.image?.secure_url ?? "/placeholder-image.webp"}
        />
        <Bookmark blogId={blog.id} />
      </div>
      {/* summary button */}
      {/* <Button className="text-green-500 bg-green-50 py-1 text-xs md:text-sm">
        ✨ Generate a summary of this story
      </Button> */}
      {/* Audio Player */}
      {showPlayButton && <AudioPlayer audioUrl={blog?.audio} />}
      {/* blog body */}
      <article
        className="leading-8 prose lg:prose-lg prose-headings:mt-8 prose-p:mt-4 md:leading-10 subpixel-antialiased blog-body max-w-none mt-4 prose-slate dark:prose-invert prose-headings:font-semibold prose-headings:text-gray-900 dark:prose-headings:text-gray-50 prose-a:text-blue-600 hover:prose-a:text-blue-800 prose-a:underline-offset-4 prose-img:rounded-lg prose-img:shadow-lg prose-img:border prose-img:border-gray-200 dark:prose-img:border-gray-700 prose-pre:bg-gray-100 dark:prose-pre:bg-gray-800 prose-pre:rounded-lg prose-pre:p-4"
        id="blog-body">
        <PrismLoader />
        {blog.body ? parse(blog.body) : "Loading..."}
      </article>
    </div>
  );
}
