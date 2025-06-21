import {
  Calendar,
  Clock,
  Heart,
  Bookmark,
  ChartNoAxesColumn,
  MessageSquare,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import { calculateReadingTime, formatViews } from "@/lib/utils";
import { BlogWithUser } from "@/types";
import parse from "html-react-parser";
import Link from "next/link";
import { ShareModal } from "../modals/share-modal";

interface BlogCardProps extends BlogWithUser {
  _count: {
    comments: number;
  };
}

const BlogCard = ({ blog }: { blog: BlogCardProps }) => {
  const image = blog.image as { secure_url?: string };
  return (
    <article className="group bg-white dark:bg-accent rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden  hover:border-gray-200 hover:-translate-y-1 flex flex-col">
      <div className="aspect-[16/9] bg-gradient-to-br from-cyan-100 to-blue-100 relative overflow-hidden">
        <Link href={`/blog/${blog.slug}`} className="group" title={blog.title}>
          <Image
            src={image?.secure_url || "/placeholder-image.webp"}
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
            <AvatarFallback className="bg-gradient-to-r from-cyan-100 to-blue-100 text-cyan-700 text-sm">
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
                <span>{calculateReadingTime(blog.body)} min read</span>
              </div>
            </div>
          </div>
        </div>
        <Link href={`/blog/${blog.slug}`} className="group" title={blog.title}>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 transition-colors line-clamp-2 leading-tight hover:underline hover:underline-offset-4">
            {blog.title}
          </h3>
        </Link>

        <article className="text-xs sm:text-sm leading-8 md:pb-1 line-clamp-2 text-accent-foreground  overflow-hidden trimmed-blog-body ">
          {blog ? parse(blog.body.substring(0, 400)) : "Loading..."}
        </article>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4 overflow-ellipsis">
          {blog?.tags?.split(",").map((tag: string, index: number) => (
            <Badge
              key={index}
              variant="secondary"
              className="text-xs bg-blue-100 text-blue-700 hover:bg-cyan-100 cursor-pointer transition-colors hover:underline capitalize">
              <Link href={`/search?q=${tag}`}># {tag}</Link>
            </Badge>
          ))}
        </div>

        {/* Action Buttons */}

        <div className="mt-auto pt-4 border-t border-gray-300 dark:border-gray-500 flex items-center justify-between text-accent-foreground">
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-1 hover:text-cyan-600 transition-colors">
              <MessageSquare className="h-4 w-4" />
              <span className="text-sm">{blog._count.comments}</span>
            </button>
            <button className="flex items-center space-x-1 hover:text-red-500 transition-colors">
              <Heart className="h-4 w-4" />
              <span className="text-sm">{blog.likes}</span>
            </button>
            <button className="flex items-center space-x-1 hover:text-cyan-600 transition-colors">
              <ChartNoAxesColumn className="h-4 w-4" />
              <span className="text-sm">{formatViews(blog.views)}</span>
            </button>
          </div>
          <div className="flex items-center space-x-2">
            <ShareModal
              slug={blog.slug}
              title={blog.title}
              image={image?.secure_url ?? "/placeholder-image.webp"}
            />
            <button className="p-1  hover:text-cyan-600 transition-colors">
              <Bookmark className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;
