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
  Feather,
  Heart,
  MessageSquare,
} from "lucide-react";
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

import { useSession } from "@/providers/session";
import Comments from "../../comments";
import { CommentData } from "@/types";
import BlogSummaryGenerator from "@/components/pages/summary";
import UserCard from "./user-card";
import ActionButtons from "./action-buttons";
type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  blog: Record<string, any>;
};

export default function Slug({ blog }: Props) {
  const { session } = useSession();
  const [showPlayButton, setShowPlayButton] = useState(false);
  const [comments, setComments] = useState<CommentData[]>(blog?.comments ?? []);
  // state for reporting dialog

  return (
    <div className="w-full mx-auto m-2 min-h-[75%] px-4 md:px-8 xsm:px-4 max-w-4xl md:mt-4">
      <Script src="https://unpkg.com/ink-html/dist/index.js"></Script>
      <BlogImage image={blog.image} title={blog.title} />
      {/* Author Information - Moved to top */}
      <TooltipProvider>
        <div className="flex items-center space-x-3 mb-4 mt-4">
          <UserCard author={blog.author} />
          <div className="flex flex-col">
            <div className="flex items-center space-x-2">
              <span className="font-bold text-accent-foreground text-base md:text-xl capitalize">
                {blog.author.username}
              </span>
              <div className="text-[#08a0f8] font-bold px-1 text-sm xsm:text-xs flex items-center">
                <Feather className="h-4 w-4" />
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
          {blog.title}
        </h1>
        {/* blog tags */}
        <div className="py-1">
          {blog.tags ? (
            <div className="flex space-x-2 items-center flex-wrap">
              {blog.tags.split(",").map((tag: string, index: number) => (
                <Link
                  key={index}
                  href={`/search?q=${tag.trim().toLowerCase()}`}
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
        <div className="flex items-center justify-between xsm:gap-2 md:gap-4  py-2 border-y border-border my-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <a
                href="#comments"
                className="flex items-center space-x-1 hover:text-cyan-600 transition-colors cursor-pointer"
                title="jump to comments">
                <MessageSquare className="h-4 w-4" />
                <span className="text-sm">{comments?.length ?? 0}</span>
              </a>
            </TooltipTrigger>
            <TooltipContent className="max-w-72 text-sm" side="bottom">
              <p>{comments.length ?? 0} Comments</p>
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
              <p>{blog.likes} Likes</p>
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
              <p>{formatViews(blog.views)} Views</p>
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
          <ShareModal
            slug={blog.slug}
            title={blog.title}
            image={blog.image?.secure_url ?? "/placeholder-image.webp"}
          />
          <Bookmark blogId={blog.id} />
        </div>

        {/* Audio Player */}
        {showPlayButton && (
          <AudioPlayer
            audioUrl={blog?.audio}
            setShowPlayButton={setShowPlayButton}
          />
        )}
        <BlogSummaryGenerator title={blog.title} blogId={blog.id} />
        {/* blog body */}
        <article
          className="leading-8 prose lg:prose-lg prose-headings:mt-8 prose-p:mt-4 md:leading-10 subpixel-antialiased blog-body max-w-none mt-4 prose-slate dark:prose-invert prose-headings:font-semibold prose-headings:text-gray-900 dark:prose-headings:text-gray-50 prose-a:text-blue-600 hover:prose-a:text-blue-800 prose-a:underline-offset-4 prose-img:rounded-lg prose-img:shadow-lg prose-img:border prose-img:border-gray-200 dark:prose-img:border-gray-700 prose-pre:bg-gray-100 dark:prose-pre:bg-gray-800 prose-pre:rounded-lg prose-pre:p-4 blog"
          id="blog-body">
          <PrismLoader />
          {blog.body ? parse(blog.body) : "Loading..."}
        </article>
        {/* Bottom buttons */}
        <ActionButtons blog={blog} comments={comments} session={session} />
        {/* comments section */}
        <Comments
          comments={comments}
          session={session}
          setComments={setComments}
          blogId={blog.id}
          blogAuthorId={blog.authorId}
          blogStatus={blog.status}
        />
      </TooltipProvider>
      {/* Add recommended blogs */}
    </div>
  );
}
