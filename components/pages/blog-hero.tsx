import React from "react";
import { Calendar, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { calculateReadingTime } from "@/lib/utils";
import { BlogWithUser } from "@/types";
import Image from "next/image";
import Link from "next/link";

export default function BlogHero({ post }: { post: BlogWithUser }) {
  return (
    <div className="group block">
      <article className="relative overflow-hidden bg-card  shadow-lg hover:shadow-xl transition-all duration-300 group-hover:brightness-110 filter">
        <div className="aspect-video relative">
          <Image
            src={post?.image?.secure_url || "/placeholder-image.webp"}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-300  group-hover:brightness-120 filter"
          />

          {/* Enhanced gradient overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/30" />

          {/* Content overlay */}
          <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
            <div className="space-y-4">
              <Badge
                variant="secondary"
                className="bg-blue-600 hover:bg-blue-700 text-white w-fit shadow-lg text-lg capitalize">
                {post.tags?.split(",")[0] || "General"}
              </Badge>
              <Link href={`/blog/${post.slug}`}>
                <h2 className="text-3xl md:text-4xl font-bold drop-shadow-2xl text-shadow-lg line-clamp-2 hover:underline hover:underline-offset-4 transition-all duration-300">
                  {post.title}
                </h2>
              </Link>
              <div className="flex items-center gap-4 text-gray-100 drop-shadow-lg mt-2">
                <div className="flex items-center gap-3">
                  <Avatar className="w-10 h-10 ring-2 ring-white/20">
                    <AvatarImage
                      src={post.author.picture ?? "/placeholder-image.webp"}
                    />
                    <AvatarFallback>{post.author.username}</AvatarFallback>
                  </Avatar>
                  <span className="font-medium text-shadow capitalize">
                    {post.author.username}
                  </span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1 text-shadow">
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
                <span>•</span>
                <div className="flex items-center gap-1 text-shadow">
                  <Clock className="w-4 h-4" />
                  <span>{calculateReadingTime(post.body)} min read</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
