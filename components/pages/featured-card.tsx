import React from "react";
import { BlogWithComments } from "@/types";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import parse from "html-react-parser";
import { Calendar, Clock, Crown } from "lucide-react";
import { calculateReadingTime } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import BlogCard from "./blog-card";

export default function FeaturedCard({
  blog,
  variant,
}: {
  blog: BlogWithComments;
  variant?: "featured" | "trending" | "latest";
}) {
  return (
    <div className="w-full blog">
      {/* Desktop Layout */}
      <div className="hidden md:flex overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300 rounded-lg border">
        {/* Left Image Section */}
        <div className="relative aspect-video w-1/2">
          <Link href={`/blog/${blog.slug}`}>
            <Image
              src={blog.image.secure_url ?? "/placeholder-image.webp"}
              alt={blog.title}
              fill
              className="w-full h-full object-cover transition-transform duration-500"
            />
          </Link>
          {/* Dark gradient overlay for image */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10" />
        </div>
        {/* Right Content Section */}
        <div className="w-1/2 relative p-6 md:p-8 bg-background">
          {/* Left-side gradient overlay */}
          <div className="absolute inset-0 z-0 bg-gradient-to-r from-gray-300/80 via-gray-300/50 to-transparent dark:from-black/70 dark:via-black/50 dark:to-transparent" />
          {variant === "latest" ? (
            <svg
              height="16"
              width="16"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              fill="currentColor"
              className="h-8 w-8 fill-orange-500 absolute top-1 right-1 z-20">
              <path d="M512,255.996l-63.305-51.631l29.002-76.362l-80.633-13.07L383.993,34.3l-76.361,29.002L256,0.004 l-51.646,63.298L128.008,34.3l-13.07,80.634l-80.633,13.07l28.988,76.362L0,255.996l63.292,51.632l-28.988,76.368l80.633,13.07 l13.07,80.633l76.347-29.002L256,511.996l51.632-63.299l76.361,29.002l13.07-80.633l80.633-13.07l-29.002-76.368L512,255.996z M212.829,313.648l-14.382,2.834c-0.973,0.183-1.649-0.056-2.298-0.811l-39.266-45.872l-0.606,0.12l10.151,51.596 c0.142,0.726-0.253,1.304-0.972,1.452l-13.662,2.686c-0.719,0.141-1.297-0.254-1.438-0.98l-15.678-79.746 c-0.155-0.734,0.24-1.304,0.959-1.445l14.508-2.855c0.846-0.169,1.635,0.056,2.284,0.811l39.181,46.013l0.592-0.12l-10.166-51.716 c-0.14-0.733,0.254-1.304,0.973-1.452l13.662-2.686c0.719-0.141,1.297,0.24,1.438,0.973l15.678,79.745 C213.942,312.929,213.548,313.507,212.829,313.648z M283.663,299.718l-52.689,10.364c-0.733,0.14-1.296-0.247-1.452-0.973 l-15.678-79.745c-0.141-0.734,0.24-1.312,0.973-1.452l52.688-10.364c0.719-0.14,1.298,0.247,1.438,0.98l2.538,12.922 c0.155,0.726-0.24,1.305-0.959,1.445l-35.418,6.966c-0.479,0.092-0.676,0.38-0.578,0.867l3.201,16.312 c0.099,0.48,0.395,0.677,0.874,0.586l29.495-5.802c0.719-0.141,1.297,0.253,1.438,0.972l2.524,12.81 c0.141,0.726-0.254,1.297-0.972,1.438l-29.496,5.802c-0.479,0.099-0.676,0.388-0.577,0.867l3.355,17.039 c0.084,0.486,0.38,0.676,0.86,0.578l35.417-6.965c0.719-0.141,1.298,0.254,1.438,0.98l2.538,12.93 C284.777,298.999,284.382,299.577,283.663,299.718z M371.896,281.107c0.014,0.754-0.493,1.361-1.339,1.523l-12.083,2.376 c-0.846,0.169-1.424-0.226-1.805-0.902L332.362,235.8l-0.24,0.049l-4.328,53.937c-0.099,0.768-0.494,1.354-1.34,1.515 l-12.083,2.383c-0.719,0.141-1.297-0.254-1.692-0.931l-36.94-75.565c-0.268-0.705-0.127-1.234,0.719-1.403l15.594-3.059 c0.846-0.17,1.423,0.212,1.678,0.923l21.995,49.263l0.24-0.049l3.877-54.346c0.099-0.782,0.493-1.353,1.326-1.523l10.518-2.066 c0.719-0.141,1.297,0.24,1.692,0.931l24.631,48.734l0.254-0.05l1.212-53.816c-0.042-0.874,0.367-1.34,1.213-1.502l15.467-3.038 c0.846-0.17,1.17,0.261,1.198,1.015L371.896,281.107z"></path>{" "}
            </svg>
          ) : variant === "trending" ? (
            <div className="absolute top-1 right-1 z-20">
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                #1
              </div>
            </div>
          ) : (
            <div className="absolute top-2 right-2 z-20">
              <div className="bg-gradient-to-r from-yellow-600 to-orange-600 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center space-x-1">
                <Crown className="h-4 w-4" />
                <span>#1</span>
              </div>
            </div>
          )}
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
              <h2
                className="font-bold drop-shadow-lg line-clamp-2 hover:underline hover:text-blue-500 hover:underline-offset-4 transition-all duration-300"
                title={blog.title}>
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
      <div className="md:hidden">
        <BlogCard blog={blog} />
      </div>
    </div>
  );
}
