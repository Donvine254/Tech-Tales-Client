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
  const isMobile = useIsMobile();

  return (
    <article
      className={cn(
        "relative overflow-hidden bg-card shadow-md hover:shadow-lg transition-all duration-300 group-hover:brightness-110 filter group block",
        className
      )}>
      {isMobile ? (
        // 📱 Mobile layout: Image top, text below
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
              <Link href={`/blog/${post.slug}`}>{post.title}</Link>
            </h3>
            <div className="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-200">
              <div className="flex items-center gap-2">
                <Avatar className="w-6 h-6 ring-1 ring-white/20">
                  <AvatarImage
                    src={post.author.picture ?? "/placeholder-image.webp"}
                  />
                  <AvatarFallback className="text-xs capitalize">
                    {post.author.username}
                  </AvatarFallback>
                </Avatar>
                <span className="capitalize">{post.author.username}</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1 whitespace-nowrap">
                <Calendar className="h-4 w-4" />
                <span>
                  {new Date(post.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
            </div>
            <article className="text-xs sm:text-sm text-gray-700 dark:text-gray-200 line-clamp-3">
              {post ? parse(post.body.substring(0, 400)) : "Loading..."}
            </article>
            <div className="flex flex-wrap gap-2 my-2">
              {post?.tags?.split(",").map((tag: string, index: number) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="text-xs bg-blue-500 text-white hover:bg-cyan-100 cursor-pointer transition-colors hover:underline capitalize">
                  <Link href={`/search?q=${tag}`}># {tag}</Link>
                </Badge>
              ))}
            </div>
          </div>
        </div>
      ) : (
        // 🖥 Desktop layout: Image + overlay text
        <div className="aspect-video relative">
          <Image
            src={post.image.secure_url || "/placeholder-image.webp"}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:brightness-120"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/30" />
          <div className="absolute inset-0 p-6 flex flex-col justify-end text-white space-y-2">
            <Badge
              variant="secondary"
              className="bg-blue-600 hover:bg-blue-700 text-white w-fit shadow-lg capitalize hover:underline text-xs">
              <Link href={`/search?q=${post.tags?.split(",")[0]}`}>
                # {post.tags?.split(",")[0] || "General"}
              </Link>
            </Badge>

            <Link href={`/blog/${post.slug}`}>
              <h3 className="font-sans line-clamp-2 drop-shadow-xl text-shadow-lg hover:underline tracking-normal mb-2 font-bold">
                {post.title}
              </h3>
            </Link>

            <div className="flex items-center gap-3 text-sm text-gray-100 drop-shadow-lg">
              <div className="flex items-center gap-2">
                <Avatar className="w-6 h-6 ring-1 ring-white/20">
                  <AvatarImage
                    src={post.author.picture ?? "/placeholder-image.webp"}
                  />
                  <AvatarFallback className="text-xs capitalize">
                    {post.author.username}
                  </AvatarFallback>
                </Avatar>
                <span className="capitalize">{post.author.username}</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1 whitespace-nowrap">
                <Calendar className="h-4 w-4" />
                <span>
                  {new Date(post.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
      <hr />
    </article>
  );
}
