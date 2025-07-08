import Link from "next/link";
import parse from "html-react-parser";
import { Calendar, Clock } from "lucide-react";
import { MessageSquare, Heart, ChartNoAxesColumn } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { BlogWithUser } from "@/types";
import { calculateReadingTime, formatViews } from "@/lib/utils";
import { ShareModal } from "../modals/share-modal";
import Bookmark from "../custom/bookmark";

interface BlogCardProps extends BlogWithUser {
  _count: {
    comments: number;
  };
}
export default function MinimalBlogCard({ blog }: { blog: BlogCardProps }) {
  const image = blog.image as { secure_url?: string };
  return (
    <div className="flex flex-col md:flex-row border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
      {/* Left content (text) */}
      <div className="flex flex-col p-4 flex-1">
        {/* Author */}
        <div className="flex items-center space-x-3 mb-4">
          <Avatar className="h-8 w-8">
            <AvatarImage
              src={blog.author.picture ?? "/placeholder-image.webp"}
              alt={blog.author.username}
            />
            <AvatarFallback className="bg-gradient-to-r from-cyan-100 to-blue-100 text-cyan-700 text-sm capitalize">
              {blog.author.username
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-bold text-accent-foreground text-sm capitalize">
              {blog.author.username}
            </span>
            <div className="flex items-center space-x-3 text-xs text-accent-foreground">
              <div className="flex items-center space-x-1">
                <Calendar className="h-3 w-3" />
                <span>
                  {new Date(blog.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="h-3 w-3" />
                <span>{calculateReadingTime(blog.body)} min read</span>
              </div>
            </div>
          </div>
        </div>

        {/* Title */}
        <Link href={`/blog/${blog.slug}`} className="group" title={blog.title}>
          <h3 className="mb-2 md:text-lg font-sans tracking-normal font-bold group-hover:text-blue-600 transition-colors line-clamp-2 leading-tight hover:underline hover:underline-offset-4">
            {blog.title}
          </h3>
        </Link>

        {/* Body preview */}
        <article className="text-xs sm:text-sm md:text-base font-serif leading-8 md:pb-1 line-clamp-2 text-accent-foreground overflow-hidden blog-body ">
          {blog ? parse(blog.body.substring(0, 400)) : "Loading..."}
        </article>

        {/* Bottom icons */}
        <div className="mt-auto pt-4 border-t border-gray-300 dark:border-gray-500 flex items-center justify-between text-accent-foreground">
          <div className="flex items-center space-x-4">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button className="flex items-center space-x-1 hover:text-cyan-600 transition-colors cursor-pointer">
                    <MessageSquare className="h-4 w-4" />
                    <span className="text-sm">{blog._count.comments}</span>
                  </button>
                </TooltipTrigger>
                <TooltipContent className="max-w-72 text-sm" side="bottom">
                  <p>{blog._count.comments} Comments</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button className="flex items-center space-x-1 hover:text-red-500 transition-colors cursor-pointer group">
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
                  <button className="flex items-center space-x-1 hover:text-cyan-600 transition-colors cursor-pointer">
                    <ChartNoAxesColumn className="h-4 w-4" />
                    <span className="text-sm">{formatViews(blog.views)}</span>
                  </button>
                </TooltipTrigger>
                <TooltipContent className="max-w-72 text-sm" side="bottom">
                  <p>{formatViews(blog.views)} Views</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="flex items-center space-x-2">
            <ShareModal
              slug={blog.slug}
              title={blog.title}
              image={image.secure_url ?? "/placeholder.svg"}
            />
            <Bookmark blogId={blog.id} />
          </div>
        </div>
      </div>
    </div>
  );
}
