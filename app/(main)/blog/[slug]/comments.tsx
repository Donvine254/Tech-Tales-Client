"use client";
import React, { useEffect, useState } from "react";
import { CommentItem } from "@/components/comments/comment-item";
import { CommentEditor } from "@/components/comments/editor";
import { Button } from "@/components/ui/button";
import {
  TooltipProvider,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CommentData, Session } from "@/types";
import { ArrowUpDown, CircleUserRound, LockIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { setCookie } from "@/lib/cookie";
import { usePathname, useRouter } from "next/navigation";
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
  blogAuthorId,
}: Props) {
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
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

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // redirect user back to the page after login

  function handleLogin() {
    setCookie("post_login_redirect", pathname, 1);
    router.push("/login");
  }
  if (!isMounted) {
    return false;
  }
  return (
    <div className="my-2" id="comments">
      <div className="py-2 md:py-4 flex items-center justify-between gap-4">
        <h3 className="text-lg md:text-2xl font-semibold  font-sans">
          Responses ({comments?.length ?? 0})
        </h3>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/community"
                target="_blank"
                className="hover:text-cyan-600 transition-colors cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="1.5rem"
                  height="1.5rem"
                  className="h-6 w-6">
                  <g fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M3 10.417c0-3.198 0-4.797.378-5.335c.377-.537 1.88-1.052 4.887-2.081l.573-.196C10.405 2.268 11.188 2 12 2s1.595.268 3.162.805l.573.196c3.007 1.029 4.51 1.544 4.887 2.081C21 5.62 21 7.22 21 10.417v1.574c0 5.638-4.239 8.375-6.899 9.536C13.38 21.842 13.02 22 12 22s-1.38-.158-2.101-.473C7.239 20.365 3 17.63 3 11.991z"></path>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16 11.55L12.6 9a1 1 0 0 0-1.2 0L8 11.55m6 2.5l-2-1.5l-2 1.5"></path>
                  </g>
                </svg>
              </Link>
            </TooltipTrigger>
            <TooltipContent className="max-w-72 text-sm" side="bottom">
              View community guidelines
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
            onClick={handleLogin}
            className="flex gap-1 items-center bg-gradient-to-r from-cyan-600 to-blue-600 text-white">
            <CircleUserRound className="h-4 w-4 " /> Login/Register
          </Button>
        </div>
      )}
      {/* Add a sort button here */}
      <div className="space-y-4 border-b flex items-center justify-end py-2 my-4 border-border">
        {comments && comments.length > 0 && (
          <Button
            onClick={toggleSortOrder}
            variant="ghost"
            className="hover:bg-blue-500 hover:text-white">
            <ArrowUpDown className="h-4 w-4" />
            <span>
              {sortOrder === "newest" ? "Newest First" : "Oldest First"}
            </span>
          </Button>
        )}
      </div>
      <div className="space-y-2">
        {comments && comments.length > 0 ? (
          comments.map((c) => (
            <CommentItem
              key={c.id}
              comment={c}
              session={session}
              blogAuthorId={blogAuthorId}
            />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center gap-1 p-2 my-2">
            <Image
              src="/conversation.svg"
              alt="conversation-starter"
              height={150}
              width={150}
              className="italic w-auto max-w-[150px] "
            />
            <p className="font-semibold md:text-lg">
              This thread is open to discussion
            </p>
            <p className="text-xs">✨ Be the first to comment ✨</p>
          </div>
        )}
      </div>
      {/* Add comments here */}
    </div>
  );
}
