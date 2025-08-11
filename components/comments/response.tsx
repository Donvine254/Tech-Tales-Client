import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Edit2, Flag, MoreHorizontal, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { formatDate } from "@/lib/utils";
import { ResponseData, Session } from "@/types";
import { Badge } from "../ui/badge";
import CommentBody from "./comment-body";
type Props = {
  response: ResponseData;
  blogAuthorId: number;
  commentAuthorId: number;
  session: Session | null;
  handleEditing: (response: ResponseData) => void;
  onDelete: (id: number) => void;
};

export default function Response({
  response,
  blogAuthorId,
  commentAuthorId,
  session,
  handleEditing,
  onDelete,
}: Props) {
  // function to handle deleting response
  const isAdmin = session?.role === "admin";
  const isCommentAuthor = commentAuthorId === session?.userId;
  const isResponseAuthor = response.authorId === session?.userId;
  return (
    <div key={response.id} className="flex space-x-4">
      {/* User Avatar */}
      <div className="flex-shrink-0 self-start mt-2">
        <Avatar className="h-6 w-6 ring-2 ring-cyan-500 ring-offset-2">
          <AvatarImage
            src={response.author.picture ?? "/placeholder.svg"}
            alt={response.author.username}
          />
          <AvatarFallback className="bg-gradient-to-r from-cyan-100 to-blue-100 text-cyan-700 text-sm">
            {response.author.username
              .split(" ")
              .map((n: string) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
      </div>
      {/* Response Content */}
      <div className="flex-1 min-w-0">
        {/* Author Info */}
        <div className="">
          {/* Left: Author info */}
          <div className="flex items-center justify-between md:justify-start md:space-x-24 w-full gap-y-0">
            <div className="flex items-center space-x-2 overflow-x-hidden">
              <h5 className="font-semibold text-sm capitalize truncate text-ellipsis whitespace-nowrap">
                {response.author.username.split(" ").slice(0, 2).join(" ")}
              </h5>
              {blogAuthorId === response.authorId ? (
                <Badge
                  title="author"
                  className="text-xs p-0.5 text-yellow-500 font-medium bg-yellow-200 dark:bg-yellow-900/20 ">
                  ✨Author
                </Badge>
              ) : response.author.role === "admin" ? (
                <Badge
                  className="text-xs p-0.5 text-purple-500 font-medium bg-purple-900/20"
                  title="admin">
                  ★Admin
                </Badge>
              ) : null}
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className="cursor-pointer hover:bg-input/50 p-1 rounded-full"
                  title="More Actions">
                  <MoreHorizontal className="h-4 w-4" />
                </button>
              </DropdownMenuTrigger>
              {/* comment author and admin can delete responses */}
              <DropdownMenuContent align="end" className="w-32">
                {isResponseAuthor && (
                  <>
                    <DropdownMenuItem onClick={() => handleEditing(response)}>
                      <Edit2 className="h-4 w-4 mr-2" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                  </>
                )}
                {isResponseAuthor || isCommentAuthor || isAdmin ? (
                  <DropdownMenuItem
                    className="text-red-500 focus:text-red-600"
                    onClick={() => onDelete(response.id)}>
                    <Trash2 className="h-4 w-4 mr-2 text-red-500" />
                    <span className="text-red-500">Delete</span>
                  </DropdownMenuItem>
                ) : (
                  <>
                    <DropdownMenuItem
                      className="text-red-600 focus:text-red-600"
                      onClick={() =>
                        toast.info("Thank you helping keep our community safe")
                      }>
                      <Flag className="h-4 w-4 mr-2" />
                      Report
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          {/* Right: Dropdown */}

          <div className="flex items-center space-x-2 text-xs text-muted-foreground mb-1">
            <span>{formatDate(response.createdAt)}</span>
            {response.updatedAt &&
              new Date(response.updatedAt).getTime() !==
                new Date(response.createdAt).getTime() && (
                <span className="text-xs text-muted-foreground">(edited)</span>
              )}
          </div>
        </div>

        {/* Response Body */}
        <CommentBody body={response.body} />
      </div>
    </div>
  );
}
