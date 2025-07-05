import { CommentEditor } from "@/components/comments/editor";
import { Button } from "@/components/ui/button";
import {
  TooltipProvider,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CommentData, Session } from "@/types";
import {
  ArrowUpDown,
  CircleUserRound,
  LockIcon,
  ShieldAlertIcon,
} from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

type Props = {
  blogId: number;
  blogAuthorId: number;
  setComments: (comments: CommentData[]) => void;
  comments: CommentData[] | [];
  session: Session | null;
};

export default function Comments({
  comments = [],
  session,
  setComments,
}: Props) {
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");

  const toggleSortOrder = () => {
    const newOrder = sortOrder === "newest" ? "oldest" : "newest";
    const sorted = [...comments].sort((a, b) =>
      newOrder === "newest"
        ? new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        : new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );
    setSortOrder(newOrder);
    setComments(sorted);
  };
  return (
    <div className="my-2">
      <div className="py-2 md:py-4 flex items-center justify-between gap-4">
        <h3 className="text-muted-foreground text-lg md:text-2xl font-serif font-bold">
          Comments ({comments?.length ?? 0})
        </h3>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/community"
                target="_blank"
                className="hover:text-cyan-600 transition-colors cursor-pointer">
                <ShieldAlertIcon className="h-6 w-6" />
              </Link>
            </TooltipTrigger>
            <TooltipContent className="max-w-72 text-sm" side="bottom">
              view community guidelines
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      {/* Not logged in state */}
      {session ? (
        <CommentEditor session={session} initialData="" isReply={false} />
      ) : (
        <div className="flex flex-col items-center justify-center gap-4 border rounded-xl h-fit min-h-16 px-6 py-8 my-4 bg-card shadow-lg dark:shadow-gray-900/20">
          {/* Lock Icon with improved styling */}
          <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-500/50">
            <LockIcon />
          </div>
          {/* Heading with better typography */}
          <div className="text-center space-y-2">
            <h2 className="font-bold text-xl md:text-2xl text-gray-900 dark:text-white">
              Login Required
            </h2>
            <p className="text-muted-foreground text-sm max-w-2xl">
              Login to share your thoughts, ask questions, and engage with other
              readers in the comments.
            </p>
          </div>

          {/* Single Login Button */}
          <Button
            variant="secondary"
            size="sm"
            asChild
            className="flex gap-1 items-center bg-gradient-to-r from-cyan-600 to-blue-600 text-white">
            <Link href="/login" scroll>
              <CircleUserRound className="h-4 w-4 " /> Login/Register
            </Link>
          </Button>
        </div>
      )}
      {/* Add a sort button here */}
      <div className="space-y-4 border-b flex items-center justify-end py-2 my-4 border-border">
        <Button
          onClick={toggleSortOrder}
          variant="ghost"
          className="hover:bg-blue-500 hover:text-white">
          <ArrowUpDown className="h-4 w-4" />
          <span>
            {sortOrder === "newest" ? "Newest First" : "Oldest First"}
          </span>
        </Button>
      </div>
      {/* Add comments here */}
    </div>
  );
}
