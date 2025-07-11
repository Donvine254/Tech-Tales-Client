import { CommentData, ResponseData, Session } from "@/types";
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
  Calendar,
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
  blogStatus: BlogStatus;
  onEdit: (comment: CommentData) => void;
  setComments: React.Dispatch<React.SetStateAction<CommentData[]>>;
};
import Response from "./response";
import { toast } from "sonner";
import CommentBody from "./comment-body";
import { BlogStatus } from "@prisma/client";
import { deleteComment } from "@/lib/actions/comments";
import { ResponseEditor } from "./response-editot";

export const CommentItem: React.FC<Props> = ({
  comment,
  session,
  blogAuthorId,
  blogStatus,
  setComments,
  onEdit,
}: Props) => {
  const [repliesCollapsed, setRepliesCollapsed] = useState(true);

  const [responseBody, setResponseBody] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editingResponse, setEditingResponse] = useState<ResponseData | null>(
    null
  );
  const [isReplying, setIsReplying] = useState(false);
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

  // function to handleDeleting comments
  async function handleDeleteComment() {
    const toastId = toast.loading("Deleting comment...");
    try {
      const res = await deleteComment(comment.id);
      if (res.success) {
        setComments((prev) => prev.filter((c) => c.id !== comment.id));
        toast.success(res.message || "Comment deleted", { id: toastId });
      } else {
        toast.error(res.message || "Failed to delete comment", { id: toastId });
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Something went wrong", { id: toastId });
    }
  }
  // confirm deletion of the comment
  function confirmDeleteComment() {
    const id = toast("Are you sure you want to delete this comment?", {
      position: "top-center",
      duration: 10000,
      action: {
        label: "Delete",
        onClick: async () => {
          toast.dismiss(id);
          await handleDeleteComment(); // Call your original function here
        },
      },
      cancel: {
        label: "Cancel",
        onClick: () => toast.dismiss(id),
      },
    });
  }
  // function to handle response submission
  async function handleSubmit() {
    console.log(responseBody);
  }
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
          <div className="flex items-center justify-between md:justify-normal md:space-x-8 w-full">
            {/* Left: Author info */}
            <div className="flex items-center space-x-2 overflow-x-hidden">
              <h5 className="font-semibold capitalize truncate text-ellipsis whitespace-nowrap">
                {comment.author.username}
              </h5>
              {blogAuthorId === comment.authorId ? (
                <Badge
                  title="author"
                  className="bg-blue-100 font-semibold truncate text-blue-500">
                  <Feather className="h-4 w-4 mr-1" />
                  Author
                </Badge>
              ) : comment.author.role === "admin" ? (
                <Badge
                  className="bg-purple-100 font-semibold text-purple-500"
                  title="admin">
                  <Crown className="h-4 w-4 mr-1 truncate" />
                  Admin
                </Badge>
              ) : null}
            </div>
            {/* Right: Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  size="icon"
                  variant="ghost"
                  className="cursor-pointer"
                  title="More Actions">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-32">
                {session?.userId === comment.authorId ? (
                  <>
                    <DropdownMenuItem asChild>
                      <Button
                        variant="ghost"
                        className="cursor-pointer justify-start w-full"
                        onClick={() => onEdit(comment)}
                        disabled={blogStatus === "ARCHIVED" || !session}>
                        <Edit2 className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Button
                        variant="ghost"
                        className="text-red-600 hover:text-red-600 hover:bg-red-100 group cursor-pointer group w-full justify-start"
                        onClick={confirmDeleteComment}
                        disabled={!session}>
                        <Trash2 className="h-4 w-4  text-red-600" />
                        <span className="text-red-600">Delete</span>
                      </Button>
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuItem asChild>
                      <Button
                        variant="ghost"
                        className="cursor-pointer w-full justify-start"
                        disabled={blogStatus === "ARCHIVED" || !session}>
                        {" "}
                        <Reply className="h-4 w-4" />
                        Reply
                      </Button>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Button
                        variant="ghost"
                        className="text-red-600 flex items-center cursor-pointer hover:text-red-600 justify-start w-full group"
                        onClick={() =>
                          toast.info(
                            "Thank you helping keep our community safe"
                          )
                        }>
                        <Flag className="h-4 w-4 text-red-500" />
                        <span className="text-red-500"> Report</span>
                      </Button>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Calendar className="h-3.5 w-3.5" />
            <span>{formatDate(comment.createdAt)}</span>
            {comment.updatedAt &&
              new Date(comment.updatedAt).getTime() !==
                new Date(comment.createdAt).getTime() && (
                <span className="text-xs text-muted-foreground">(Edited)</span>
              )}
          </div>

          {/* Comment Body */}
          <CommentBody body={comment.body} />
          {/* Action Buttons Row */}
          <div className="flex items-center space-x-4 mb-4">
            {/* Quick Reply Button */}
            {session && (
              <Button
                size="sm"
                variant="ghost"
                title="reply to this comment"
                className="hover:text-blue-600 cursor-pointer transition-colors text-sm font-medium text-muted-foreground">
                <Reply className="h-4 w-4 mr-1" />
                Reply
              </Button>
            )}
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
      <ResponseEditor
        session={session}
        initialData={responseBody}
        onEditorChange={setResponseBody}
        isEditing={isEditing}
        onSubmit={handleSubmit}
        comment={comment}
      />
      {/* add reply editor here */}

      {/* Replies */}
      {comment.responses &&
        comment.responses.length > 0 &&
        !repliesCollapsed && (
          <div className="ml-6 sm:ml-12">
            {comment.responses.map((response) => (
              <Response
                key={response.id}
                response={response}
                blogAuthorId={blogAuthorId}
                session={session}
              />
            ))}
          </div>
        )}
    </div>
  );
};
