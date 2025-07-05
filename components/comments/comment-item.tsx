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
  Crown,
  Edit2,
  Feather,
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
import { toast } from "sonner";
export const CommentItem: React.FC<Props> = ({
  comment,
  session,
  blogAuthorId,
}: Props) => {
  const [repliesCollapsed, setRepliesCollapsed] = useState(true);
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
          <div className="flex items-start justify-between mb-2 w-full">
            {/* Left: Author info */}
            <div className="flex flex-col space-y-1 min-w-0">
              <div className="flex items-center space-x-2">
                <h5 className="font-semibold capitalize truncate text-ellipsis whitespace-nowrap">
                  {comment.author.username}
                </h5>
                {blogAuthorId === comment.authorId && (
                  <Badge className="bg-blue-100 font-semibold text-blue-500">
                    <Feather className="h-4 w-4 mr-1" />
                    Author
                  </Badge>
                )}
                {comment.author.role === "admin" && (
                  <Badge className="bg-purple-100 font-semibold text-purple-500">
                    <Crown className="h-4 w-4 mr-1" />
                    Admin
                  </Badge>
                )}
              </div>

              <div className="flex items-center space-x-2 text-sm text-muted-foreground font-semibold">
                <span>{formatDate(comment.createdAt)}</span>
                {comment.updatedAt &&
                  new Date(comment.updatedAt).getTime() !==
                    new Date(comment.createdAt).getTime() && (
                    <span className="text-xs text-muted-foreground">
                      (Edited)
                    </span>
                  )}
              </div>
            </div>

            {/* Right: Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
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

          {/* Comment Body */}
          <article
            className="p-3 rounded-r-xl xsm:text-sm rounded-bl-xl border shadow bg-card text-xs md:text-sm mb-2"
            id="comment-body">
            {comment.body ? parse(comment.body) : comment.body}
          </article>

          {/* Action Buttons Row */}
          <div className="flex items-center space-x-4 mb-4">
            {/* Quick Reply Button */}
            {
              <Button
                size="sm"
                variant="ghost"
                title="reply to this comment"
                className="hover:text-blue-600 cursor-pointer transition-colors text-sm font-medium text-muted-foreground">
                <Reply className="h-4 w-4 mr-1" />
                Reply
              </Button>
            }
            {/* Collapse/Expand Replies Button */}
            {comment.responses && comment.responses.length > 0 && (
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setRepliesCollapsed(!repliesCollapsed)}
                className="text-sm cursor-pointer font-medium text-muted-foreground">
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
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Reply Editor */}
      {/* add reply editor here */}

      {/* Replies */}
      {comment.responses &&
        comment.responses.length > 0 &&
        !repliesCollapsed && (
          <div className="ml-6 sm:ml-12">
            {comment.responses.map((response) => (
              <div key={response.id} className="flex space-x-4">
                {/* User Avatar */}
                <div className="flex-shrink-0">
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
                  <div className="flex items-start justify-between mb-2 w-full">
                    {/* Left: Author info */}
                    <div className="flex flex-col space-y-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <h5 className="font-semibold capitalize truncate text-ellipsis whitespace-nowrap">
                          {response.author.username}
                        </h5>
                        {blogAuthorId === response.authorId && (
                          <Badge className="bg-blue-100 font-semibold text-blue-500">
                            <Feather className="h-4 w-4 mr-1" />
                            Author
                          </Badge>
                        )}
                        {response.author.role === "admin" && (
                          <Badge className="bg-purple-100 font-semibold text-purple-500">
                            <Crown className="h-4 w-4 mr-1" />
                            Admin
                          </Badge>
                        )}
                      </div>

                      <div className="flex items-center space-x-2 text-sm text-muted-foreground font-semibold">
                        <span>{formatDate(response.createdAt)}</span>
                        {response.updatedAt &&
                          new Date(response.updatedAt).getTime() !==
                            new Date(response.createdAt).getTime() && (
                            <span className="text-xs text-muted-foreground">
                              (edited)
                            </span>
                          )}
                      </div>
                    </div>

                    {/* Right: Dropdown */}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-32">
                        {session?.userId === response.authorId ? (
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
                            <DropdownMenuItem
                              className="text-red-600 focus:text-red-600"
                              onClick={() =>
                                toast.info(
                                  "Thank you helping keep our community safe"
                                )
                              }>
                              <Flag className="h-4 w-4 mr-2" />
                              Report
                            </DropdownMenuItem>
                          </>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  {/* Response Body */}
                  <article
                    className="p-3 rounded-r-xl xsm:text-sm rounded-bl-xl border shadow bg-card text-xs md:text-sm mb-2"
                    id="comment-body">
                    {response.body ? parse(response.body) : response.body}
                  </article>
                </div>
              </div>
            ))}
          </div>
        )}
    </div>
  );
};
