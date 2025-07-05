"use client";
import React, { useState } from "react";
import Script from "next/script";
import parse from "html-react-parser";
import BlogImage from "@/components/ui/blog-image";
import { calculateReadingTime, formatViews } from "@/lib/utils";
import {
  Calendar,
  ChartNoAxesColumn,
  CircleUserRound,
  Clock,
  Eye,
  Heart,
  LockIcon,
  MessageSquare,
  MessageSquareText,
  MoreHorizontal,
  Printer,
  ShieldAlertIcon,
  ShieldBan,
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import AnimatedLikeButton from "@/components/custom/like-button";
type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  blog: Record<string, any>;
};

export default function Slug({ blog }: Props) {
  const [showPlayButton, setShowPlayButton] = useState(false);
  //function to print contents
  const handlePrint = async () => {
    //eslint-disable-next-line
    const print = (window as any).inkHtml;
    if (typeof print === "function") {
      print(document.getElementById("print-div"));
    } else {
      console.error("inkHtml is not loaded.");
    }
  };
  return (
    <div className="w-full mx-auto m-2 min-h-[75%] px-8 xsm:px-4 max-w-4xl md:mt-4 blog">
      <Script src="https://unpkg.com/ink-html/dist/index.js"></Script>
      <BlogImage image={blog.image} title={blog.title} />
      {/* Author Information - Moved to top */}
      <TooltipProvider>
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
        <div className="flex items-center justify-between xsm:gap-2 md:gap-4  py-2 border-y border-border my-2">
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
              <p>{blog?.comments?.length ?? 0} Comments</p>
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
        {showPlayButton && <AudioPlayer audioUrl={blog?.audio} />}
        {/* summary button */}
        <Button
          variant="outline"
          className="text-green-500 bg-green-50 border border-green-500 py-1 text-xs md:text-sm mt-2 hover:bg-green-500 hover:text-white">
          ✨ Generate a summary of this story
        </Button>
        {/* blog body */}
        <article
          className="leading-8 prose lg:prose-lg prose-headings:mt-8 prose-p:mt-4 md:leading-10 subpixel-antialiased blog-body max-w-none mt-4 prose-slate dark:prose-invert prose-headings:font-semibold prose-headings:text-gray-900 dark:prose-headings:text-gray-50 prose-a:text-blue-600 hover:prose-a:text-blue-800 prose-a:underline-offset-4 prose-img:rounded-lg prose-img:shadow-lg prose-img:border prose-img:border-gray-200 dark:prose-img:border-gray-700 prose-pre:bg-gray-100 dark:prose-pre:bg-gray-800 prose-pre:rounded-lg prose-pre:p-4"
          id="blog-body">
          <PrismLoader />
          {blog.body ? parse(blog.body) : "Loading..."}
        </article>
        {/* Bottom buttons */}

        <div className="flex items-center justify-between border-b border-border">
          <div className="flex items-center gap-2 xsm:gap-2 md:gap-4">
            <Tooltip>
              <TooltipTrigger asChild>
                <a
                  href="#comments"
                  className="flex items-center space-x-1 hover:text-cyan-600 transition-colors cursor-pointer"
                  title="jump to comments">
                  <MessageSquareText className="h-4 w-4" />
                  <span className="text-sm">{blog?.comments?.length ?? 0}</span>
                </a>
              </TooltipTrigger>
              <TooltipContent className="max-w-72 text-sm" side="bottom">
                <p>{blog?.comments?.length ?? 0} Comments</p>
              </TooltipContent>
            </Tooltip>
            <AnimatedLikeButton initialLikes={blog.likes} size={30} />
          </div>
          {/* second div */}
          <div className="flex items-center gap-2 xsm:gap-2 md:gap-4">
            <ShareModal
              slug={blog.slug}
              title={blog.title}
              image={blog.image?.secure_url ?? "/placeholder-image.webp"}
            />
            <Bookmark blogId={blog.id} />
            {/* More actions dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="cursor-pointer"
                  title="more actions">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-popover space-y-2">
                <DropdownMenuItem
                  className="cursor-pointer bg-secondary"
                  onClick={handlePrint}>
                  {" "}
                  <Printer className="h-4 w-4 mr-2" /> Print this blog
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center cursor-pointer">
                  <Eye className="h-4 w-4 mr-2" /> View more from author
                </DropdownMenuItem>
                {/* TODO: Only show edit to admin or blog author */}
                {/* <DropdownMenuItem className="flex items-center cursor-pointer">
                  <Pencil className="h-4 w-4 mr-2" /> Edit blog
                </DropdownMenuItem> */}
                <DropdownMenuItem className="flex items-center cursor-pointer text-destructive hover:bg-destructive hover:text-destructive-foreground group">
                  <ShieldBan className="h-4 w-4 mr-2 text-destructive group-hover:text-destructive-foreground" />{" "}
                  Report this blog
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        {/* comments section */}
        <div className="my-2">
          <div className="py-2 md:py-4 flex items-center justify-between gap-4">
            <h2 className="text-muted-foreground text-lg md:text-2xl lg:text-3xl font-serif font-bold">
              Comments ({blog?.comments?.length ?? 0})
            </h2>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/community"
                  target="_blank"
                  className="hover:text-cyan-600 transition-colors cursor-pointer">
                  <ShieldAlertIcon className="h-6 w-6" />
                </Link>
              </TooltipTrigger>
              <TooltipContent className="max-w-72 text-sm" side="bottom">
                view community guidelines
              </TooltipContent>
            </Tooltip>
          </div>
          {/* Not logged in state */}
          <div className="flex flex-col items-center justify-center gap-4 border rounded-xl h-fit min-h-16 px-6 py-8 my-4 bg-card shadow-lg dark:shadow-gray-900/20">
            {/* Lock Icon with improved styling */}
            <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-500/50">
              <LockIcon />
            </div>
            {/* Heading with better typography */}
            <div className="text-center space-y-2">
              <h2 className="font-bold text-xl md:text-2xl text-gray-900 dark:text-white">
                Login Required
              </h2>
              <p className="text-muted-foreground text-sm max-w-2xl">
              Login to share your thoughts, ask questions, and engage with other readers in the comments.
              </p>
            </div>

            {/* Single Login Button */}
            <Button
              variant="secondary"
              size="sm"
              asChild
              className="flex gap-1 items-center bg-gradient-to-r from-cyan-600 to-blue-600 text-white">
              <Link href="/login" scroll>
                <CircleUserRound className="h-4 w-4 " /> Login/Register
              </Link>
            </Button>
          </div>
        </div>
      </TooltipProvider>

      {/* print div: hidden */}
      <div id="print-div" style={{ display: "none" }} className="blog prose">
        <h1 className="text-xl font-bold">{blog.title}</h1>
        <p className="italic">
          By {blog.author.username} published on{" "}
          {new Date(blog.createdAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </p>
        <div className="blog-body">{parse(blog.body)}</div>
      </div>
    </div>
  );
}
