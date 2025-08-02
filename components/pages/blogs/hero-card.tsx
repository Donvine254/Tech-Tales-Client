import React from "react";
import { Calendar, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { BlogWithUser } from "@/types";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import BlogImage from "./blog-image";
// This is the big card
export default function CarouselHeroCard({ post }: { post: BlogWithUser }) {
  return (
    <div className="group block">
      <article className="relative overflow-hidden bg-card  shadow-lg hover:shadow-xl transition-all duration-300 group-hover:brightness-110 filter blog">
        <div className="aspect-video relative">
          <BlogImage
            src={post.image.secure_url}
            title={post.title}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-300  group-hover:brightness-120 filter"
          />
          <div>
            <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-medium backdrop-blur-sm absolute top-4 left-4 z-10 text-orange-600 dark:text-gray-50 shadow-lg">
              🔥 Trending
            </span>
          </div>
          {/* Enhanced gradient overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/30" />
          {/* Content overlay */}
          <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
            <Link
              href={`/read/${post.path}`}
              className="drop-shadow-2xl font-bold text-xl text-shadow-lg line-clamp-2 hover:underline hover:underline-offset-4 hover:text-blue-500 transition-all duration-300">
              {post.title}
            </Link>
            <div className="flex items-center gap-4 text-gray-100 drop-shadow-lg pt-4 text-sm">
              <div className="flex items-center gap-1 text-shadow whitespace-nowrap overflow-ellipsis">
                {" "}
                <Calendar className="h-4 w-4" />{" "}
                <span>{formatDate(post.createdAt)}</span>
              </div>
              <div className="flex items-center gap-1 text-shadow whitespace-nowrap overflow-ellipsis">
                <Clock className="w-4 h-4" />
                <span>{post.reading_time} min read</span>
              </div>
              <Badge
                variant="secondary"
                className="bg-blue-100 text-blue-500 dark:bg-blue-900/20 dark:text-blue-50 border border-blue-500 w-fit shadow-lg  hover:underline rounded-full backdrop-blur-sm text-xs">
                <Link href={`/search?q=${post.tags?.split(",")[0]}`}>
                  {" "}
                  # {post.tags?.split(",")[0] || "General"}
                </Link>
              </Badge>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
