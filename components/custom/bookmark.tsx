"use client";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { useSession } from "@/providers/session";
import {
  Tooltip,
  TooltipProvider,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { DropdownMenuItem } from "../ui/dropdown-menu";
export default function Bookmark({
  blogId,
  size = 16,
  asDropdownItem,
}: {
  blogId: number;
  size?: number;
  asDropdownItem?: boolean;
}) {
  const { session } = useSession();
  const [isBookmarked, setIsBookmarked] = useState(false);
  useEffect(() => {
    if (!session) {
      return;
    }
    const localStorageData = localStorage.getItem("bookmarked_blogs");
    let bookmarkedBlogs: Record<number, boolean> = {};

    if (localStorageData) {
      try {
        bookmarkedBlogs = JSON.parse(localStorageData);
      } catch (error) {
        console.error("Error parsing bookmarked blogs data:", error);
      }
    }
    setIsBookmarked(!!bookmarkedBlogs[blogId]);
  }, [blogId, session]);

  const updateLocalStorage = (blogId: number, value: boolean) => {
    const localStorageData = localStorage.getItem("bookmarked_blogs");
    const bookmarkedBlogs = localStorageData
      ? JSON.parse(localStorageData)
      : {};
    bookmarkedBlogs[blogId] = value;
    localStorage.setItem("bookmarked_blogs", JSON.stringify(bookmarkedBlogs));
    window.dispatchEvent(
      new CustomEvent("bookmark-removed", { detail: blogId })
    );
  };

  const handleBookmark = () => {
    if (!session) {
      toast.info("Login to bookmark blogs");
      return;
    }
    const updatedValue = !isBookmarked;
    setIsBookmarked(updatedValue);
    updateLocalStorage(blogId, updatedValue);
    toast.success(updatedValue ? "bookmarked" : "bookmark removed");
  };
  if (asDropdownItem) {
    return (
      <DropdownMenuItem
        onClick={handleBookmark}
        className={cn("group cursor-pointer", isBookmarked && "bg-muted")}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width={size}
          height={size}
          className={cn(
            "text-muted-foreground transition-colors mr-2",
            isBookmarked
              ? "text-cyan-600 group-hover:text-red-500"
              : "group-hover:text-cyan-600"
          )}>
          <path
            fill="currentColor"
            d={
              isBookmarked
                ? "m10.95 14l4.95-4.95l-1.425-1.4l-3.525 3.525L9.525 9.75L8.1 11.175zM5 21V5q0-.825.588-1.412T7 3h10q.825 0 1.413.588T19 5v16l-7-3z"
                : "M5 21V5q0-.825.588-1.412T7 3h6v2H7v12.95l5-2.15l5 2.15V11h2v10l-7-3zM7 5h6zm10 4V7h-2V5h2V3h2v2h2v2h-2v2z"
            }
          />
        </svg>
        <span
          className={cn(
            "transition-colors",
            isBookmarked
              ? "text-cyan-600 group-hover:text-red-500"
              : "group-hover:text-cyan-600"
          )}>
          {isBookmarked ? "Unbookmark" : "Bookmark"}
        </span>
      </DropdownMenuItem>
    );
  }
  return (
    <TooltipProvider>
      {!isBookmarked ? (
        <Tooltip>
          <TooltipTrigger asChild>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width={size}
              height={size}
              className="cursor-pointer font-bold hover:text-cyan-600 transition-color"
              onClick={handleBookmark}>
              <path
                fill="currentColor"
                d="M5 21V5q0-.825.588-1.412T7 3h6v2H7v12.95l5-2.15l5 2.15V11h2v10l-7-3zM7 5h6zm10 4V7h-2V5h2V3h2v2h2v2h-2v2z"></path>
            </svg>
          </TooltipTrigger>
          <TooltipContent className="max-w-72 text-sm" side="bottom">
            <p>Bookmark this blog</p>
          </TooltipContent>
        </Tooltip>
      ) : (
        <Tooltip>
          <TooltipTrigger asChild>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width={size}
              height={size}
              strokeWidth={1.5}
              className="cursor-pointer  text-cyan-500 hover:text-red-500 transition-color"
              onClick={handleBookmark}>
              <path
                fill="currentColor"
                d="m10.95 14l4.95-4.95l-1.425-1.4l-3.525 3.525L9.525 9.75L8.1 11.175zM5 21V5q0-.825.588-1.412T7 3h10q.825 0 1.413.588T19 5v16l-7-3z"></path>
            </svg>
          </TooltipTrigger>
          <TooltipContent className="max-w-72 text-sm" side="bottom">
            <p>Remove from bookmarks</p>
          </TooltipContent>
        </Tooltip>
      )}
    </TooltipProvider>
  );
}
