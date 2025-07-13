import Link from "next/link";
import parse from "html-react-parser";
import { Calendar, Clock } from "lucide-react";
import { MessageSquare, Heart, ChartNoAxesColumn } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { BlogWithComments, CoverImage } from "@/types";
import { calculateReadingTime, formatViews } from "@/lib/utils";
import { ShareModal } from "../modals/share-modal";
import Image from "next/image";
import { BlogCardDropdown } from "./blog-dropdown";
import { Badge } from "../ui/badge";
import { getUserBlogs } from "@/lib/actions/user";

// check for image
function isCoverImage(image: unknown): image is CoverImage {
  return (
    typeof image === "object" &&
    image !== null &&
    "secure_url" in image &&
    "public_id" in image
  );
}
export default function MinimalBlogCard({
  blog,
  showMoreActions = false,
}: {
  blog: BlogWithComments | Awaited<ReturnType<typeof getUserBlogs>>[number];
  showMoreActions?: boolean;
}) {
  const image = isCoverImage(blog.image) ? blog.image : null;
  return (
    <div className="group bg-card rounded-lg border border-border hover:border-border/60 transition-all duration-200 hover:shadow-sm p-4 md:p-6 space-y-4 flex flex-col">
      {/* Top: Image + Content */}
      <div className="flex items-center md:items-start gap-4 md:gap-6">
        {/* Content */}
        <div className="flex-1 min-w-0 space-y-3 order-2 md:order-1 flex flex-col">
          {/* Author */}
          <div className="flex items-center space-x-3">
            <Avatar className="h-8 w-8">
              <AvatarImage
                src={blog?.author?.picture ?? "/placeholder-image.webp"}
                alt={blog?.author?.username}
              />
              <AvatarFallback className="bg-gradient-to-r from-cyan-100 to-blue-100 text-cyan-700 text-sm capitalize">
                {blog.author?.username
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="font-bold text-accent-foreground text-sm capitalize">
                {blog.author?.username ?? "John Doe"}
              </span>
              <div className="flex items-center space-x-3 text-xs text-accent-foreground">
                <div className="flex items-center whitespace-nowrap truncate space-x-1">
                  <Calendar className="h-3 w-3" />
                  <span>
                    {new Date(blog.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <div className="flex items-center whitespace-nowrap truncate space-x-1">
                  <Clock className="h-3 w-3" />
                  <span>{calculateReadingTime(blog.body ?? "")} min read</span>
                </div>
              </div>
            </div>
          </div>

          {/* Title */}
          {blog.status === "PUBLISHED" ? (
            <Link
              href={`${blog.slug}`}
              className="group"
              title={blog.title ?? ""}>
              <h3 className="text-base sm:text-lg font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-snug cursor-pointer">
                {blog.title ?? ""}
              </h3>
            </Link>
          ) : (
            <h3 className="text-base sm:text-lg font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-snug cursor-pointer">
              {blog.title ?? "Untitled Post"}
            </h3>
          )}
          {/* Body Preview */}
          <article className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
            {blog?.body
              ? parse(blog?.body?.substring(0, 400))
              : "Your blog body will show here. Continue editing your blog"}
          </article>
          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {(blog?.tags?.trim()
              ? blog.tags
                  .split(",")
                  .map((tag) => tag.trim())
                  .filter(Boolean)
              : ["tag 1", "tag 2", "tag 3", "tag 4"]
            ).map((tag, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="text-xs bg-gray-200 text-blue-700 hover:bg-cyan-100 cursor-pointer transition-colors hover:underline capitalize">
                {blog?.tags?.trim() ? (
                  <Link href={`/search?q=${tag.toLowerCase()}`}># {tag}</Link>
                ) : (
                  <># {tag}</>
                )}
              </Badge>
            ))}
          </div>
        </div>
        {/* Image */}
        <div className="relative hidden sm:flex sm:w-24 aspect-[3/2] md:w-42 lg:w-60 flex-shrink-0 rounded-lg overflow-hidden bg-muted order-2">
          <Image
            src={image?.secure_url ?? "/placeholder.svg"}
            alt={blog?.title || ""}
            fill
            sizes="(max-width: 768px) 100vw, 200px"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </div>

      {/* Footer: Engagement + Actions */}
      <div className="pt-4 border-t border-gray-300 dark:border-gray-600 flex items-center justify-between text-accent-foreground mt-auto">
        <div className="flex items-center space-x-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="flex items-center space-x-1 hover:text-cyan-600 transition-colors cursor-pointer">
                  <MessageSquare className="h-4 w-4" />
                  <span className="text-sm">{blog._count.comments ?? 0}</span>
                </button>
              </TooltipTrigger>
              <TooltipContent className="max-w-72 text-sm" side="bottom">
                <p>{blog._count.comments ?? 0} Comments</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="flex items-center space-x-1 hover:text-red-500 transition-colors cursor-pointer group">
                  <Heart className="h-4 w-4 group-hover:fill-red-500" />
                  <span className="text-sm">{blog.likes ?? 0}</span>
                </button>
              </TooltipTrigger>
              <TooltipContent className="max-w-72 text-sm" side="bottom">
                <p>{blog.likes ?? 0} Likes</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="flex items-center space-x-1 hover:text-cyan-600 transition-colors cursor-pointer">
                  <ChartNoAxesColumn className="h-4 w-4" />
                  <span className="text-sm">
                    {formatViews(blog.views ?? 0)}
                  </span>
                </button>
              </TooltipTrigger>
              <TooltipContent className="max-w-72 text-sm" side="bottom">
                <p>{formatViews(blog?.views ?? 0)} Views</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="flex items-center space-x-2">
          {blog.status === "PUBLISHED" && (
            <ShareModal
              slug={blog?.slug ?? ""}
              title={blog?.title ?? ""}
              image={image?.secure_url ?? "/placeholder.svg"}
            />
          )}
          <BlogCardDropdown
            blogId={blog.id}
            slug={blog.slug ?? ""}
            blogAuthorId={blog.authorId}
            blogStatus={blog.status}
            uuid={blog.uuid}
            showMoreActions={showMoreActions}
          />
        </div>
      </div>
    </div>
  );
}
