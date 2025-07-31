import {
  Calendar,
  Clock,
  Heart,
  ChartNoAxesColumn,
  MessageSquare,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import parse from "html-react-parser";
import { BlogWithComments } from "@/types";
import Link from "next/link";
import { ShareModal } from "@/components/modals/share-modal";
import Bookmark from "@/components/custom/bookmark";
import {
  Tooltip,
  TooltipProvider,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { formatViews } from "@/lib/utils";
import { ReactNode } from "react";

const BlogCard = ({
  blog,
  children,
}: {
  blog: BlogWithComments;
  children?: ReactNode;
}) => {
  return (
    <article className="group bg-white dark:bg-accent rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden  hover:border-gray-200 hover:-translate-y-1 flex flex-col animate-fade-in-up relative">
      {children && <>{children}</>}
      <div className="aspect-[16/9] bg-gradient-to-br from-cyan-100 to-blue-100 relative overflow-hidden">
        <Link href={`/read/${blog.path}`} className="group" title={blog.title}>
          <Image
            src={
              blog.image?.secure_url
                ? blog.image.secure_url ?? "/placeholder.svg"
                : "/placeholder.svg"
            }
            alt={blog.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
            className="w-full h-full object-cover transition-transform duration-500"
          />
        </Link>

        <div className="absolute top-2 left-2">
          <Link href={`/search?q=${blog.tags?.split(",")[0]}`}>
            {" "}
            <span className="px-3 py-1 bg-blue-500 backdrop-blur-sm text-white text-xs font-semibold rounded-full hover:underline transition-colors capitalize">
              # {blog?.tags?.split(",")[0] || "General"}
            </span>
          </Link>
        </div>
      </div>
      <div className="p-2 sm:p-4 flex flex-col flex-1 ">
        {/* Author Information - Moved to top */}
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
                  {" "}
                  {new Date(blog.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="h-3 w-3" />
                <span>{blog.reading_time} min read</span>
              </div>
            </div>
          </div>
        </div>
        <Link href={`/read/${blog.path}`} className="group" title={blog.title}>
          <h3 className="mb-2 md:text-lg font-sans tracking-normal font-bold group-hover:text-blue-500 transition-colors line-clamp-2 leading-tight hover:underline hover:underline-offset-4">
            {blog.title}
          </h3>
        </Link>
        <article className="text-xs sm:text-sm mb-2 text-muted-foreground line-clamp-2 dark:text-gray-300 leading-relaxed overflow-hidden ">
          {parse(blog.description ?? "")}
        </article>
        {/* Tags */}
        <div className="inline-flex flex-wrap gap-2 mb-4">
          {blog?.tags?.split(",").map((tag: string, index: number) => (
            <Badge
              key={index}
              variant="secondary"
              className={`text-xs bg-blue-100 text-blue-700 hover:bg-cyan-100 cursor-pointer transition-colors hover:underline capitalize highlight-link-${index}`}>
              <Link href={`/search?q=${tag.toLowerCase()}`}># {tag}</Link>
            </Badge>
          ))}
        </div>
        {/* Action Buttons */}
        <div className="mt-auto pt-4 border-t border-gray-300 dark:border-gray-500 flex items-center justify-between text-accent-foreground">
          <div className="flex items-center space-x-4">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href={`/read/${blog.path}#comments`}
                    className="flex items-center space-x-1 hover:text-cyan-600 transition-colors cursor-pointer">
                    <MessageSquare className="h-4 w-4" />
                    <span className="text-sm">{blog._count.comments}</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent className="max-w-72 text-sm" side="bottom">
                  <p>{blog._count.comments} Comments</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href={`/read/${blog.path}`}
                    className="flex items-center space-x-1  transition-colors cursor-pointer">
                    <Heart className="h-4 w-4 hover:fill-red-500 hover:text-red-500" />
                    <span className="text-sm">{blog.likes}</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent className="max-w-72 text-sm" side="bottom">
                  <p>{blog.likes} Likes</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href={`/read/${blog.path}`}
                    className="flex items-center space-x-1 hover:text-cyan-600 transition-colors cursor-pointer">
                    <ChartNoAxesColumn className="h-4 w-4" />
                    <span className="text-sm">{formatViews(blog.views)}</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent className="max-w-72 text-sm" side="bottom">
                  <p>{formatViews(blog.views)} Views</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="flex items-center space-x-2">
            <ShareModal
              path={blog.path}
              title={blog.title}
              image={blog.image.secure_url ?? "/placeholder.svg"}
            />
            <Bookmark blogId={blog.id} size={24} />
          </div>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;
