import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  Crown,
  Edit2,
  Feather,
  Flag,
  MoreHorizontal,
  Trash2,
} from "lucide-react";
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
        <Avatar className="h-8 w-8 ring-2 ring-cyan-500 ring-offset-2">
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
          <div className="flex items-center justify-between md:justify-normal md:space-x-8 w-full gap-y-0">
            <div className="flex items-center space-x-2 overflow-x-hidden">
              <h5 className="font-semibold capitalize truncate text-ellipsis whitespace-nowrap">
                {response.author.username}
              </h5>
              {blogAuthorId === response.authorId ? (
                <Badge
                  title="author"
                  className="bg-blue-100 font-semibold text-blue-500">
                  <Feather className="h-4 w-4 mr-1" />
                  <span className="hidden sm:block">Author</span>
                </Badge>
              ) : response.author.role === "admin" ? (
                <Badge
                  className="bg-purple-100 font-semibold text-purple-500"
                  title="admin">
                  <Crown className="h-4 w-4 mr-1" />
                  <span className="hidden sm:block">Admin</span>
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

          <div className="flex items-center space-x-2 text-xs sm:text-sm text-muted-foreground mb-1">
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
