import { FC, useEffect, useState } from "react";
import {
  Edit3,
  Trash2,
  Calendar,
  MoreVertical,
  Info,
  FlagIcon,
  ArchiveRestoreIcon,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserComments } from "@/types";
import { CommentStatus } from "@prisma/client";
import { formatCommentDate } from "@/lib/utils";
import Link from "next/link";
import CommentBody from "./comment-body";
import { Skeleton } from "../ui/skeleton";

interface CommentCardProps {
  comment: UserComments[number];
  onDelete: (commentId: number) => void;
  onUpdate: (commentId: number, commentStatus: CommentStatus) => void;
}

export function CommentCard({ comment, onDelete, onUpdate }: CommentCardProps) {
  const [isMounted, setIsMounted] = useState(false);
  const canEdit = comment.status === CommentStatus.VISIBLE;
  const isEdited =
    new Date(comment.updatedAt).getTime() !==
    new Date(comment.createdAt).getTime();
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <SkeletonComment />;
  }

  return (
    <Card className="group hover:shadow-medium transition-all duration-300 bg-card border border-border hover:border-primary/20 animate-fade-in-up">
      <CardContent>
        {/* header */}
        <div className="flex items-center justify-between gap-3 mb-2">
          <div className="flex flex-1 items-center gap-2 min-w-0">
            <Link
              href={`/read/${comment.blog.path}#comments`}
              scroll={false}
              className="hover:underline hover:text-blue-500 font-semibold text-card-foreground sm:text-lg group-hover:text-primary transition-colors duration-200 line-clamp-1 "
              target="_blank"
              rel="noopener noreferrer">
              {comment.blog.title}
            </Link>
            <StatusBadge status={comment.status} />
          </div>
          {/* Actions Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              {canEdit && (
                <DropdownMenuItem asChild>
                  <Link
                    href={`/read/${comment.blog.path}#comments`}
                    scroll={false}
                    className="flex items-center gap-2 group focus:text-blue-500">
                    <Edit3 className="h-4 w-4 group-focus:text-blue-500" />
                    Edit Comment
                  </Link>
                </DropdownMenuItem>
              )}
              {comment.status === "ARCHIVED" && (
                <DropdownMenuItem
                  className="hover:bg-green-500 hover:text-white"
                  onClick={() => onUpdate(comment.id, comment.status)}>
                  <ArchiveRestoreIcon className="size-4" />
                  Restore Comment
                </DropdownMenuItem>
              )}
              <DropdownMenuItem
                onSelect={(e) => {
                  e.preventDefault();
                  onDelete(comment.id);
                }}
                className="text-destructive focus:text-destructive">
                <Trash2 className="h-4 w-4 text-destructive" />
                Delete Comment
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="space-y-2">
          <div className="border-l-4 p-2 border-primary/50 bg-muted/80">
            <CommentBody body={comment.body} />
          </div>
          {(comment.status === CommentStatus.FLAGGED ||
            comment.status === CommentStatus.HIDDEN) && (
            <div
              className={`flex gap-1 rounded-sm  justify-between border border-l-4 ${
                comment.status === CommentStatus.FLAGGED
                  ? "bg-amber-100/20 border-amber-300"
                  : "bg-destructive/10 border-destructive/20"
              }`}>
              <div
                className={`flex justify-center items-center ${
                  comment.status === CommentStatus.FLAGGED
                    ? "bg-amber-300 text-amber-600 "
                    : "bg-destructive/20 text-destructive-foreground"
                } px-1 py-1.5 `}>
                <Info className="size-4 " />
              </div>
              <div className="flex-1 px-1 py-1.5 leading-0 font-medium items-center gap-1 text-destructive-foreground">
                <span className="text-xs italic sm:text-sm">
                  {comment.status === CommentStatus.FLAGGED
                    ? "This comment has been flagged due to inappropriate content."
                    : "This comment has been hidden due to inappropriate content."}{" "}
                  {""}
                  <Link
                    href="/community"
                    prefetch={false}
                    className="underline hover:text-blue-500 ">
                    {""}Learn more
                  </Link>
                </span>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" />
                <span>{formatCommentDate(comment.createdAt)}</span>
                {isEdited && (
                  <span className="text-xs text-muted-foreground">
                    (Edited)
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1">
                <span>•</span>
                <span>
                  {comment._count.responses} response
                  {comment._count.responses !== 1 ? "s" : ""}
                </span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

const StatusBadge: FC<{ status: CommentStatus }> = ({ status }) => {
  switch (status) {
    case CommentStatus.VISIBLE:
      return (
        <Badge
          variant="outline"
          className="text-xs hidden md:inline-flex border-green-500 text-green-500 bg-green-100/20">
          Visible
        </Badge>
      );
    case CommentStatus.FLAGGED:
      return (
        <Badge
          variant="outline"
          className="text-xs hidden  md:inline-flex items-center gap-2 bg-amber-100/20 border-amber-300 text-amber-600">
          <FlagIcon className="size-3 text-destructive" /> Flagged
        </Badge>
      );
    case CommentStatus.HIDDEN:
      return (
        <Badge
          variant="outline"
          className="text-xs hidden md:inline-flex border-destructive text-destructive bg-destructive/10">
          Hidden
        </Badge>
      );
    default:
      return (
        <Badge variant="outline" className="text-xs hidden md:inline-flex">
          {status}
        </Badge>
      );
  }
};

export const SkeletonComment = () => {
  return (
    <Card className="group hover:shadow-medium transition-all duration-300 bg-card border border-border hover:border-primary/20 animate-fade-in-up">
      <CardContent className="space-y-4">
        <div className="flex items-center  gap-3 mb-4">
          <Skeleton className="w-3/4 h-6 rounded-md" />
          <Skeleton className="w-24 h-6 rounded-md" />
          <Skeleton className="w-6 h-6 rounded-full ml-auto" />
        </div>
        <Skeleton className="w-[65%] h-2 rounded-md" />
        <Skeleton className="w-[60%] h-2 rounded-md" />
        <Skeleton className="w-[40%] h-2 rounded-md" />
        <div className="flex items-center gap-2">
          <Skeleton className="w-24 h-3 rounded-md" />
          <Skeleton className="w-2 h-2 rounded-md" />
          <Skeleton className="w-24 h-3 rounded-md" />
        </div>
      </CardContent>
    </Card>
  );
};
