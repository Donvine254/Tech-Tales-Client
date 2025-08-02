import React from "react";
import { Calendar, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import { BlogWithUser } from "@/types";
import { cn, formatDate } from "@/lib/utils";
import parse from "html-react-parser";
// This is the small card
export function HeroCardMobile({
  post,
  className,
}: {
  post: BlogWithUser;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative bg-card shadow-md hover:shadow-lg transition-all duration-300 flex flex-col md:hidden group-hover:brightness-110 filter group", // Fixed height
        className
      )}>
      <div className="flex flex-col">
        <div className="relative w-full h-60 sm:h-72">
          <Image
            src={post.image.secure_url || "/placeholder-image.webp"}
            alt={post.title}
            fill
            className="object-cover rounded-t-lg"
          />
          <span className="absolute top-4 left-4 px-3 py-1 bg-white/20 rounded-full text-sm font-medium backdrop-blur-2xl text-orange-600 dark:text-gray-50 shadow-lg">
            🔥 Trending
          </span>
        </div>
        <div className="p-4 space-y-3">
          <h3 className="font-bold text-lg hover:underline leading-snug">
            <Link href={`/read/${post.path}`}>{post.title}</Link>
          </h3>
          <div className="flex items-center gap-3 text-xs text-gray-700 dark:text-gray-200">
            <div className="flex items-center gap-1 whitespace-nowrap">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(post.createdAt)}</span>
            </div>
            <div className="flex items-center gap-1 text-shadow whitespace-nowrap overflow-ellipsis">
              <Clock className="w-4 h-4" />
              <span>{post.reading_time} min read</span>
            </div>
          </div>
          <article className="text-xs sm:text-sm mb-2 text-muted-foreground line-clamp-2 dark:text-gray-300 leading-relaxed">
            {parse(post.description ?? "")}
          </article>
          <div className="flex flex-wrap gap-2 my-2">
            {post?.tags
              ?.split(",")
              .slice(1)
              .map((tag: string, index: number) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="text-xs bg-blue-100 text-blue-500 dark:bg-blue-900/20 dark:text-blue-50 border border-blue-500 cursor-pointer transition-colors hover:underline capitalize">
                  <Link href={`/search?q=${tag}`}># {tag}</Link>
                </Badge>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function HeroCardDesktop({
  post,
  className,
}: {
  post: BlogWithUser;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden bg-card shadow-md hover:shadow-lg transition-all duration-300 group-hover:brightness-110 filter group block",
        className
      )}>
      <div className="aspect-video relative hidden md:block">
        <Image
          src={post.image.secure_url || "/placeholder-image.webp"}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:brightness-120"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/30" />
        <div className="absolute inset-0 p-6 flex flex-col justify-end text-white space-y-1">
          <Link
            href={`/read/${post.path}`}
            className="drop-shadow-2xl font-bold text-base text-shadow-lg line-clamp-1 hover:underline hover:underline-offset-4 transition-all duration-300">
            {post.title}
          </Link>
          <div className="flex items-center gap-3 text-sm text-gray-100 drop-shadow-lg">
            <div className="flex items-center gap-1 whitespace-nowrap">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(post.createdAt)}</span>
            </div>
            <Badge
              variant="secondary"
              className="bg-blue-100 text-blue-500 dark:bg-blue-900/20 dark:text-blue-50 border border-blue-500 w-fit shadow-lg   hover:underline rounded-full backdrop-blur-sm text-xs">
              <Link href={`/search?q=${post.tags?.split(",")[0]}`}>
                # {post.tags?.split(",")[0] || "General"}
              </Link>
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
}
