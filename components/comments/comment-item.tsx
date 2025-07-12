import { CommentData, ResponseData, Session } from "@/types";
import React, { useState } from "react";
import { Badge } from "../ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
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
import { ResponseEditor } from "./response-editor";
import {
  createResponse,
  deleteResponse,
  updateResponse,
} from "@/lib/actions/responses";

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
  // check if current user is author or admin
  const isAdmin = session?.role === "admin";
  const isBlogAuthor = session?.userId === blogAuthorId;
  const isCommentAuthor = session?.userId === comment.authorId;
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
  //function to edit comment responses
  const handleEditing = (response: ResponseData) => {
    setIsEditing(true);
    setEditingResponse(response);
    setResponseBody(editingResponse?.body ?? response.body);
    // remove the response from state
    setComments((prevComments) =>
      prevComments.map((c) =>
        c.id === comment.id
          ? {
              ...c,
              responses: c.responses.filter((r) => r.id !== response.id),
            }
          : c
      )
    );
  };
  //function to handleResponseSubmission
  async function handleResponseSubmit() {
    // Logic to submit or respond
    if (!session) {
      toast.error("Login required");
      return;
    }
    const toastId = toast.loading("Processing Request...", {
      position: "bottom-center",
    });
    try {
      const responseData = {
        authorId: session.userId!,
        commentId: comment.id,
        body: responseBody,
      };
      const res = await createResponse(responseData);
      if (res.success && res.response) {
        toast.success(res.message);
        // ✅ Add the new response to the correct comment
        setComments((prevComments) =>
          prevComments.map((c) =>
            c.id === comment.id
              ? {
                  ...c,
                  responses: [...c.responses, res.response],
                }
              : c
          )
        );
        // Optionally reset editor
        setResponseBody("");
        setIsReplying(false);
        setRepliesCollapsed(false);
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    } finally {
      toast.dismiss(toastId);
    }
  }
  // function to handle editing responses
  async function handleEditSubmit() {
    if (!editingResponse) return;
    const updatedResponse = {
      ...editingResponse,
      body: responseBody,
    };
    const toastId = toast.loading("Updating response...");
    try {
      // return the response to state
      setComments((prevComments) =>
        prevComments.map((c) =>
          c.id === comment.id
            ? {
                ...c,
                responses: [...c.responses, updatedResponse],
              }
            : c
        )
      );
      const res = await updateResponse({
        id: editingResponse.id,
        body: responseBody,
      });
      if (res.success && res.response) {
        toast.success(res.message);
      } else {
        // revert to the original body (editingComment.body) if this fails
        setComments((prevComments) =>
          prevComments.map((c) =>
            c.id === comment.id
              ? {
                  ...c,
                  responses: [...c.responses, editingResponse], // Add back original
                }
              : c
          )
        );
        toast.error(res.message);
      }
    } catch (error) {
      console.log(error);
      setComments((prevComments) =>
        prevComments.map((c) =>
          c.id === comment.id
            ? {
                ...c,
                responses: [...c.responses, editingResponse], // Add back original
              }
            : c
        )
      );
      toast.error("Something went wrong");
    } finally {
      setIsEditing(false);
      setEditingResponse(null);
      setRepliesCollapsed(false);
      toast.dismiss(toastId);
    }
  }
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
          await handleDeleteComment();
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
    if (isReplying && responseBody.trim() !== "") {
      handleResponseSubmit();
    } else if (isEditing && editingResponse) {
      handleEditSubmit();
    }
  }
  // function to delete responses
  async function handleDeleteResponse(id: number) {
    const toastId = toast.loading("Deleting...");
    try {
      const res = await deleteResponse(id);
      if (res.success) {
        // remove the response from state
        setComments((prevComments) =>
          prevComments.map((c) =>
            c.id === comment.id
              ? {
                  ...c,
                  responses: c.responses.filter((r) => r.id !== id),
                }
              : c
          )
        );
        toast.success(res.message || "Comment deleted", { id: toastId });
      } else {
        toast.error(res.message || "Failed to delete response", {
          id: toastId,
        });
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Something went wrong", { id: toastId });
    }
  }

  //function to hide the editor
  function handleCancel() {
    setIsReplying(false);
    setIsEditing(false);
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
              <DropdownMenuContent align="end" className="w-40">
                {/* Comment Author can edit */}
                {isCommentAuthor && (
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
                    <DropdownMenuSeparator />
                  </>
                )}

                {/* Comment Author, Blog Author, or Admin can delete */}
                {(isCommentAuthor || isBlogAuthor || isAdmin) && (
                  <DropdownMenuItem asChild>
                    <Button
                      variant="ghost"
                      className="text-red-600 hover:text-red-600 hover:bg-red-100 group cursor-pointer w-full justify-start"
                      onClick={confirmDeleteComment}
                      disabled={!session}>
                      <Trash2 className="h-4 w-4 text-red-600" />
                      <span className="text-red-600">Delete</span>
                    </Button>
                  </DropdownMenuItem>
                )}

                {/* Reply & Report for everyone else */}
                {!isCommentAuthor && !isBlogAuthor && !isAdmin && (
                  <>
                    <DropdownMenuItem asChild>
                      <Button
                        variant="ghost"
                        className="cursor-pointer w-full justify-start hover:text-blue-500 group"
                        disabled={blogStatus === "ARCHIVED" || !session}
                        onClick={() => setIsReplying(!isReplying)}>
                        <Reply className="h-4 w-4 group-hover:text-blue-500" />
                        <span className="group-hover:text-blue-500">Reply</span>
                      </Button>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Button
                        variant="ghost"
                        className="text-red-600 flex items-center cursor-pointer hover:text-red-600 justify-start w-full group"
                        onClick={() =>
                          toast.info(
                            "Thank you for helping keep our community safe"
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
                variant="ghost"
                className="cursor-pointer justify-start hover:text-blue-500 group"
                disabled={blogStatus === "ARCHIVED" || !session}
                onClick={() => setIsReplying(!isReplying)}>
                {" "}
                <Reply className="h-4 w-4 group-hover:text-blue-500" />
                <span className="group-hover:text-blue-500"> Reply</span>
              </Button>
            )}
            {/* Collapse/Expand Replies Button */}
            {comment.responses && comment.responses.length > 0 && (
              <Button
                size="sm"
                variant="ghost"
                disabled={isReplying || isEditing}
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
      {(isReplying || isEditing) && (
        <ResponseEditor
          session={session}
          initialData={responseBody}
          onEditorChange={setResponseBody}
          isEditing={isEditing}
          onSubmit={handleSubmit}
          comment={comment}
          onCancel={handleCancel}
        />
      )}
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
                commentAuthorId={comment.authorId}
                blogAuthorId={blogAuthorId}
                session={session}
                handleEditing={handleEditing}
                onDelete={handleDeleteResponse}
              />
            ))}
          </div>
        )}
    </div>
  );
};
