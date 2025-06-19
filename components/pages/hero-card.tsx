import React from "react";
import { Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import Link from "next/link";
import { BlogWithUser } from "@/types";
export default function HeroCard({ post }: { post: BlogWithUser }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <article className="relative overflow-hidden  bg-card shadow-md hover:shadow-lg transition-all duration-300 group-hover:brightness-110 filter">
        <div className="aspect-video relative">
          <Image
            src={post?.image?.secure_url || "/placeholder-image.webp"}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:brightness-120 filter"
          />
          {/* Enhanced gradient overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/30" />

          {/* Content overlay */}
          <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
            <div className="space-y-3">
              <Badge
                variant="secondary"
                className="bg-blue-600 hover:bg-blue-700 text-white w-fit shadow-lg capitalize">
                {post.tags?.split(",")[0] || "General"}
              </Badge>

              <h3 className="text-xl  font-bold leading-tight line-clamp-2 drop-shadow-xl text-shadow-lg">
                {post.title}
              </h3>

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
                  <span className="text-shadow capitalize">
                    {post.author.username}
                  </span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1 text-shadow overflow-ellipsis">
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
                {/* <span>•</span>
                <div className="flex items-center gap-1 text-shadow">
                  <Clock className="w-4 h-4" />
                  <span>{calculateReadingTime(post.body)} min read</span>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
