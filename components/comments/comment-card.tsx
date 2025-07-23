import { FC } from "react";
import {
  ExternalLink,
  Edit3,
  Trash2,
  MessageSquare,
  Calendar,
  MoreVertical,
} from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import parse from "html-react-parser";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserComments } from "@/types";
import { CommentStatus } from "@prisma/client";
import { formatCommentDate } from "@/lib/utils";

interface CommentCardProps {
  comment: UserComments[number];
  onDelete: (commentId: number) => void;
}

export function CommentCard({ comment, onDelete }: CommentCardProps) {
  const canEdit = comment.status === CommentStatus.VISIBLE;
  const canDelete = comment.status !== CommentStatus.HIDDEN;

  const isEdited = comment.updatedAt !== comment.createdAt;

  return (
    <Card className="group hover:shadow-medium transition-all duration-300 bg-card border border-border hover:border-primary/20 animate-fade-in">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-semibold text-card-foreground text-lg group-hover:text-primary transition-colors duration-200 truncate">
                <a
                  href={`/blog/${comment.blog.slug}#comments`}
                  className="hover:underline"
                  target="_blank"
                  rel="noopener noreferrer">
                  {comment.blog.title}
                </a>
              </h3>
              <ExternalLink className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex-shrink-0" />
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="outline" className="text-xs">
                {comment.blog.slug}
              </Badge>
              <StatusBadge status={comment.status} />
            </div>
          </div>

          {/* Actions Dropdown */}
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {canEdit && (
                  <DropdownMenuItem asChild>
                    <a
                      href={`/blog/${comment.blog.slug}#comments`}
                      className="flex items-center gap-2">
                      <Edit3 className="h-4 w-4" />
                      Edit Comment
                    </a>
                  </DropdownMenuItem>
                )}
                {canDelete && (
                  <DropdownMenuItem
                    onSelect={(e) => {
                      e.preventDefault();
                      onDelete(comment.id);
                    }}
                    className="text-destructive focus:text-destructive">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Comment
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="space-y-4">
          <blockquote className="border-l-4 border-primary/30 bg-muted/30 pl-4 py-3 italic">
            <div className="flex items-start gap-3">
              <MessageSquare className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
              <p className="text-card-foreground truncate leading-relaxed">
                {parse(comment.body || "")}
              </p>
            </div>
          </blockquote>

          {(comment.status === CommentStatus.FLAGGED ||
            comment.status === CommentStatus.HIDDEN) && (
            <div className="bg-destructive/10 border border-destructive/20 rounded-md p-3">
              <p className="text-sm text-destructive font-medium">
                {comment.status === CommentStatus.FLAGGED
                  ? "This comment has been flagged due to inappropriate content."
                  : "This comment has been hidden due to inappropriate content."}
              </p>
            </div>
          )}

          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                <span>{formatCommentDate(comment.createdAt)}</span>
                {isEdited && (
                  <span className="text-muted-foreground/70">(Edited)</span>
                )}
              </div>
              {comment._count.responses && (
                <div className="flex items-center gap-1">
                  <span>•</span>
                  <span>
                    {comment._count.responses} response
                    {comment._count.responses !== 1 ? "s" : ""}
                  </span>
                </div>
              )}
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
          className="text-xs border-success/50 text-success bg-success/10">
          Visible
        </Badge>
      );
    case CommentStatus.FLAGGED:
      return (
        <Badge
          variant="outline"
          className="text-xs border-destructive/50 text-destructive bg-destructive/10">
          Flagged
        </Badge>
      );
    case CommentStatus.HIDDEN:
      return (
        <Badge
          variant="outline"
          className="text-xs border-muted-foreground/50 text-muted-foreground bg-muted/10">
          Hidden
        </Badge>
      );
    default:
      return (
        <Badge variant="outline" className="text-xs">
          {status}
        </Badge>
      );
  }
};
