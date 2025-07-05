import { CommentData, Session } from "@/types";
import React, { useState } from "react";
import { Badge } from "../ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  ChevronDown,
  ChevronUp,
  Edit2,
  Flag,
  MoreHorizontal,
  Reply,
  Trash2,
} from "lucide-react";
import { Button } from "../ui/button";
type Props = {
  comment: CommentData;
  session: Session | null;
  blogAuthorId: number;
};
import parse from "html-react-parser";
export const CommentItem: React.FC<Props> = ({
  comment,
  session,
  blogAuthorId,
}: Props) => {
  const [repliesCollapsed, setRepliesCollapsed] = useState(false);
  const formatDate = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60)
    );

    if (diffInHours < 1) {
      return "Just now";
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else if (diffInHours < 168) {
      return `${Math.floor(diffInHours / 24)}d ago`;
    } else {
      return date.toLocaleDateString();
    }
  };
  //   add editing state here
  return (
    <div className="">
      <div className="flex space-x-4">
        {/* User Avatar */}
        <div className="flex-shrink-0">
          <Avatar className="h-8 w-8 ring-2 ring-cyan-500 ring-offset-2">
            <AvatarImage
              src={comment.author.picture ?? "/placeholder.svg"}
              alt={comment.author.username}
            />
            <AvatarFallback className="bg-gradient-to-r from-cyan-100 to-blue-100 text-cyan-700 text-sm">
              {comment.author.username
                .split(" ")
                .map((n: string) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
        </div>
        {/* Comment Content */}
        <div className="flex-1 min-w-0">
          {/* Author Info */}
          <div className="flex items-start  justify-between mb-2 ">
            <div className="flex flex-col space-y-1">
              <div className="flex items-center space-x-2">
                <h4 className="font-semibold">{comment.author.username}</h4>
                {blogAuthorId === comment.authorId && <Badge>Author</Badge>}
                {session?.role === "admin" && <Badge>Admin</Badge>}
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <span>{formatDate(comment.createdAt)}</span>
                {comment.updatedAt && (
                  <span className="text-xs text-muted-foreground">
                    (edited)
                  </span>
                )}
              </div>
            </div>
            {/* Actions Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-32">
                {session?.userId === comment.authorId ? (
                  <>
                    <DropdownMenuItem>
                      <Edit2 className="h-4 w-4 mr-2" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600 focus:text-red-600">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuItem>
                      <Reply className="h-4 w-4 mr-2" />
                      Reply
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600 focus:text-red-600">
                      <Flag className="h-4 w-4 mr-2" />
                      Report
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Comment Body */}
          <div
            className="p-3 rounded-r-xl xsm:text-sm rounded-bl-xl border shadow bg-card text-xs md:text-sm"
            id="comment-body">
            {comment.body ? parse(comment.body) : comment.body}
          </div>

          {/* Action Buttons Row */}
          <div className="flex items-center space-x-4 mb-4">
            {/* Quick Reply Button */}
            {
              <button className="flex items-center text-sm text-gray-500 hover:text-blue-600 transition-colors font-medium">
                <Reply className="h-4 w-4 mr-1" />
                Reply
              </button>
            }

            {/* Collapse/Expand Replies Button */}
            {comment.responses && (
              <button
                onClick={() => setRepliesCollapsed(!repliesCollapsed)}
                className="flex items-center text-sm text-gray-500 hover:text-gray-700 transition-colors font-medium">
                {repliesCollapsed ? (
                  <>
                    <ChevronDown className="h-4 w-4 mr-1" />
                    Show {comment.responses!.length}{" "}
                    {comment.responses!.length === 1 ? "reply" : "replies"}
                  </>
                ) : (
                  <>
                    <ChevronUp className="h-4 w-4 mr-1" />
                    Hide replies
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Reply Editor */}
      {/* add reply editor here */}

      {/* Replies */}
      {/* {hasReplies && !repliesCollapsed && (
        <div className="mt-6 space-y-6">
          {comment.replies!.map((reply) => (
            <CommentItem
              key={reply.id}
              comment={reply}
              currentUser={currentUser}
              blogAuthorId={blogAuthorId}
              onReply={onReply}
              onEdit={onEdit}
              onDelete={onDelete}
              isReply={true}
              parentId={comment.id}
            />
          ))}
        </div>
      )} */}
    </div>
  );
};
