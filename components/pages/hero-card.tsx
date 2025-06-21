import React from "react";
import { Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import Link from "next/link";
import { BlogWithUser } from "@/types";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import parse from "html-react-parser";
export default function HeroCard({
  post,
  className,
}: {
  post: BlogWithUser;
  className?: string;
}) {
  const image = post.image as { secure_url?: string };
  const isMobile = useIsMobile();
  return (
    <article
      className={cn(
        "relative overflow-hidden  bg-card shadow-md hover:shadow-lg transition-all duration-300 group-hover:brightness-110 filter group block",
        isMobile && "min-h-[80vh]",
        className
      )}>
      <div className={cn(!isMobile ? "aspect-video relative" : "")}>
        {isMobile && (
          <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-medium backdrop-blur-sm absolute top-4 left-4 z-10 text-orange-600 dark:text-gray-50 shadow-lg">
            🔥 Trending
          </span>
        )}
        <Image
          src={image?.secure_url || "/placeholder-image.webp"}
          alt={post.title}
          fill
          className={cn(
            isMobile ? "object-scale-down object-top" : "object-cover",
            "transition-transform duration-300 group-hover:brightness-120 filter"
          )}
        />
        {/* Enhanced gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/30" />

        {/* Content overlay */}
        <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
          <div className="space-y-3">
            {!isMobile && (
              <Badge
                variant="secondary"
                className="bg-blue-600 hover:bg-blue-700 text-white w-fit shadow-lg capitalize hover:underline text-xs">
                <Link href={`/search?q=${post.tags?.split(",")[0]}`}>
                  {" "}
                  # {post.tags?.split(",")[0] || "General"}
                </Link>
              </Badge>
            )}

            <h3 className="text-xl font-bold leading-tight line-clamp-2 drop-shadow-xl text-shadow-lg">
              {post.title}
            </h3>

            <div className="flex items-center gap-3 text-sm text-gray-100 drop-shadow-lg">
              <div className="flex items-center gap-2">
                <Avatar className="w-6 h-6 ring-1 ring-white/20">
                  <AvatarImage
                    src={post.author.picture ?? "/placeholder-image.webp"}
                  />
                  <AvatarFallback className="text-xs capitalize ">
                    {post.author.username}
                  </AvatarFallback>
                </Avatar>
                <span className="text-shadow capitalize whitespace-nowrap overflow-ellipsis">
                  {post.author.username}
                </span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1 text-shadow whitespace-nowrap overflow-ellipsis">
                {" "}
                <Calendar className="h-4 w-4" />{" "}
                <span>
                  {new Date(post.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
            </div>
            {isMobile && (
              <>
                <article className="text-xs sm:text-sm leading-8 md:pb-1 line-clamp-3 sm:line-clamp-2 text-white  overflow-hidden trimmed-blog-body ">
                  {post ? parse(post.body.substring(0, 400)) : "Loading..."}
                </article>
                <div className="flex flex-wrap gap-2 my-4 overflow-ellipsis">
                  {post?.tags?.split(",").map((tag: string, index: number) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="text-xs bg-blue-500 text-white hover:bg-cyan-100 cursor-pointer transition-colors hover:underline capitalize">
                      <Link href={`/search?q=${tag}`}># {tag}</Link>
                    </Badge>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <hr />
    </article>
  );
}
