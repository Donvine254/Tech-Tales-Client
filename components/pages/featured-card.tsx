import React from "react";
import { BlogWithUser } from "@/types";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import parse from "html-react-parser";
import { Calendar, Clock } from "lucide-react";
import { calculateReadingTime } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
export default function FeaturedCard({ blog }: { blog: BlogWithUser }) {
  const image = blog.image as { secure_url?: string };
  return (
    <div className="w-full">
      {/* Desktop Layout */}
      <div className="hidden md:flex overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300 rounded-lg border">
        {/* Left Image Section */}
        <div className="relative aspect-video w-1/2">
          <Link href={`/blog/${blog.slug}`}>
            <Image
              src={image?.secure_url ?? "/placeholder-image.webp"}
              alt={blog.title}
              fill
              className="w-full h-full object-cover transition-transform duration-500"
            />
            {/* Dark gradient overlay for image */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10" />
          </Link>
        </div>
        {/* Right Content Section */}
        <div className="w-1/2 relative p-6 md:p-8 bg-background">
          {/* Left-side gradient overlay */}
          <div className="absolute inset-0 z-0 bg-gradient-to-l from-gray/80 via-gray/60 to-transparent dark:from-black/70 dark:via-black/50 dark:to-transparent" />
          <div className="relative z-10 flex flex-col space-y-4">
            {/* Tag Badge */}
            <Badge
              variant="secondary"
              className="bg-blue-600 hover:bg-blue-700 text-white w-fit shadow-lg text-sm capitalize hover:underline">
              <Link href={`/search?q=${blog.tags?.split(",")[0]}`}>
                # {blog.tags?.split(",")[0] || "General"}
              </Link>
            </Badge>
            {/* Title */}
            <Link href={`/blog/${blog.slug}`}>
              <h2 className="text-3xl md:text-4xl font-bold drop-shadow-lg line-clamp-2 hover:underline hover:underline-offset-4 transition-all duration-300">
                {blog.title}
              </h2>
            </Link>
            {/* Excerpt */}
            <article className="text-sm md:text-base leading-7 line-clamp-3 text-accent-foreground overflow-hidden">
              {blog ? parse(blog.body.substring(0, 400)) : "Loading..."}
            </article>
            {/* Author & Metadata */}
            <div className="flex items-center space-x-3 pt-2">
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
                <span className="font-semibold text-sm text-accent-foreground capitalize">
                  {blog.author.username}
                </span>
                <div className="flex items-center space-x-3 text-xs text-accent-foreground">
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-3 w-3" />
                    <span>
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
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden overflow-hidden bg-white shadow-xl rounded-lg">
        <div className="relative">
          <Image
            src="/placeholder.svg?height=250&width=400"
            alt="Blog post featured image"
            width={400}
            height={250}
            className="w-full h-48 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <Badge
            variant="secondary"
            className="absolute top-4 left-4 bg-blue-100 text-blue-800">
            Technology
          </Badge>
        </div>
        <div className="p-6 space-y-3">
          <h2 className="text-xl font-bold text-gray-900 leading-tight">
            The Future of Web Development: Trends and Technologies Shaping
            Tomorrow
          </h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            Discover the latest trends in web development, from AI-powered tools
            to new frameworks that are revolutionizing how we build digital
            experiences.
          </p>
          <div className="flex items-center text-xs text-gray-500 space-x-3">
            <span>5 min read</span>
            <span>•</span>
            <span>Dec 22, 2024</span>
          </div>
        </div>
      </div>
    </div>
  );
}
