import {
  Calendar,
  Clock,
  MessageCircle,
  Heart,
  Eye,
  Share,
  Bookmark,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import { calculateReadingTime } from "@/lib/utils";
import { BlogWithUser } from "@/types";
import parse from "html-react-parser";

interface BlogCardProps extends BlogWithUser {
  _count: {
    comments: number;
  };
}

const BlogCard = ({ blog }: { blog: BlogCardProps }) => {
  const image = blog.image as { secure_url?: string };
  return (
    <article className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-gray-200 hover:-translate-y-1">
      <div className="aspect-[16/9] bg-gradient-to-br from-cyan-100 to-blue-100 relative overflow-hidden">
        <Image
          src={image?.secure_url || "/placeholder-image.webp"}
          alt={blog.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
          className="w-full h-full object-cover transition-transform duration-500"
        />
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-cyan-600 text-xs font-semibold rounded-full">
            {blog?.tags?.split(",")[0] || "General"}
          </span>
        </div>
      </div>

      <div className="p-6">
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
            <span className="font-bold text-gray-700 text-sm capitalize">
              {blog.author.username}
            </span>
            <div className="flex items-center space-x-3 text-xs text-gray-500">
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

        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-cyan-600 transition-colors line-clamp-2 leading-tight">
          {blog.title}
        </h3>

        <article className="text-xs sm:text-sm leading-8 md:pb-1 line-clamp-2 text-gray-800  overflow-hidden trimmed-blog-body ">
          {blog ? parse(blog.body.substring(0, 400)) : "Loading..."}
        </article>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {blog?.tags?.split(",").map((tag: string, index: number) => (
            <Badge
              key={index}
              variant="secondary"
              className="text-xs bg-cyan-100 text-cyan-700 hover:bg-cyan-100 cursor-pointer transition-colors">
              {tag}
            </Badge>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-2 border-t ">
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-1 text-gray-500 hover:text-cyan-600 transition-colors">
              <MessageCircle className="h-4 w-4" />
              <span className="text-sm">{blog._count.comments}</span>
            </button>
            <button className="flex items-center space-x-1 text-gray-500 hover:text-red-500 transition-colors">
              <Heart className="h-4 w-4" />
              <span className="text-sm">{blog.likes}</span>
            </button>
            <button className="flex items-center space-x-1 text-gray-500 hover:text-cyan-600 transition-colors">
              <Eye className="h-4 w-4" />
              <span className="text-sm">{blog.views}</span>
            </button>
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-1 text-gray-500 hover:text-cyan-600 transition-colors">
              <Share className="h-4 w-4" />
            </button>
            <button className="p-1 text-gray-500 hover:text-cyan-600 transition-colors">
              <Bookmark className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;
