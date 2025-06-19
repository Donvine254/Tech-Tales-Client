import React from "react";
import { Blog } from "@/types";
import { Clock, Link } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { calculateReadingTime } from "@/lib/utils";

import Image from "next/image";
export default function BlogHero({ post }: { post: Blog }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <article className="relative overflow-hidden rounded-2xl bg-card border shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-[1.02]">
        <div className="aspect-video relative">
          <Image
            src={post.image.secure_url || "/placeholder-image.webp"}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {/* Enhanced gradient overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/30" />

          {/* Content overlay */}
          <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
            <div className="space-y-4">
              <Badge
                variant="secondary"
                className="bg-blue-600 hover:bg-blue-700 text-white w-fit shadow-lg">
                {post.tags?.split(",")[0] || "General"}
              </Badge>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight drop-shadow-2xl text-shadow-lg">
                {post.title}
              </h2>

              <div className="flex items-center gap-4 text-gray-100 drop-shadow-lg">
                <div className="flex items-center gap-3">
                  <Avatar className="w-10 h-10 ring-2 ring-white/20">
                    <AvatarImage src="/images/author-avatar.jpg" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <span className="font-medium text-shadow">
                    {post.author.image}
                  </span>
                </div>
                <span>•</span>
                <span>
                  {new Date(post.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
                <span>•</span>
                <div className="flex items-center gap-1 text-shadow">
                  <Clock className="w-4 h-4" />
                  <span>{calculateReadingTime(post.body)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
