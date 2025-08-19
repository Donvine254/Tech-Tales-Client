"use client";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  Link as LinkIcon,
  Trash,
  Undo2Icon,
  ArchiveIcon,
  ArchiveRestore,
  MegaphoneIcon,
  MoreHorizontal,
  PencilLineIcon,
  LockIcon,
  LockOpenIcon,
} from "lucide-react";
import { BlogStatus } from "@prisma/client";
import { useSession } from "@/providers/session";
import { toast } from "sonner";
import { baseUrl } from "@/lib/utils";
import Bookmark from "@/components/custom/bookmark";
import RevisionHistoryDialog from "@/components/modals/revision-history-dialog";

interface BlogCardDropdownProps {
  path: string;
  blogId: number;
  blogAuthorId: number;
  uuid: string;
  blogStatus: BlogStatus;
  blogTitle?: string;
  showMoreActions?: boolean;
  showComments: boolean;
  onShowCommentsUpdate?: (blogId: number, show: boolean) => void;
  onUpdate: (status: BlogStatus, blogId: number) => void;
  onDelete: () => void;
}

export const BlogCardDropdown = ({
  path,
  blogId,
  blogAuthorId,
  blogStatus,
  uuid,
  showMoreActions = false,
  showComments,
  onShowCommentsUpdate,
  onUpdate,
  onDelete,
  blogTitle = "Untitled Blog",
}: BlogCardDropdownProps) => {
  const { session } = useSession();

  const isAuthor = session?.userId === blogAuthorId;
  const isAdmin = session?.role === "admin";
  const isOwner = isAuthor || isAdmin;

  const handleCopy = () => {
    const blogUrl = `${baseUrl}/read/${path}`;
    navigator.clipboard.writeText(blogUrl);
    toast.success("Link copied to clipboard");
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="top" align="end" className="w-48">
        {/* Copy Link */}
        {(blogStatus === "PUBLISHED" || blogStatus === "ARCHIVED") && (
          <div className="flex flex-col gap-1">
            <DropdownMenuItem onClick={handleCopy} className="cursor-copy mb-0">
              <LinkIcon className="w-4 h-4 mr-2" />
              Copy link
            </DropdownMenuItem>
            <Bookmark blogId={blogId} asDropdownItem />
          </div>
        )}
        {/* Owner actions */}
        {showMoreActions && isOwner && (
          <div className="flex flex-col gap-1 mt-1">
            <Link
              href={`/posts/new/${uuid}`}
              passHref
              className="cursor-pointer">
              <DropdownMenuItem asChild>
                <span className="flex items-center">
                  <PencilLineIcon className="w-4 h-4 mr-2" />
                  Edit
                </span>
              </DropdownMenuItem>
            </Link>
            <RevisionHistoryDialog blogId={blogId} blogTitle={blogTitle} />
            {/* TODO: Add view version history to the blog */}

            {blogStatus === "PUBLISHED" &&
              (showComments ? (
                <DropdownMenuItem
                  onClick={() => onShowCommentsUpdate?.(blogId, false)}>
                  <LockIcon className="h-4 w-4 mr-2" />
                  Lock Discussion
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem
                  onClick={() => onShowCommentsUpdate?.(blogId, true)}>
                  <LockOpenIcon className="h-4 w-4 mr-2" />
                  Unlock Discussion
                </DropdownMenuItem>
              ))}
            {blogStatus !== "PUBLISHED" && (
              <DropdownMenuItem
                onClick={() => {
                  onUpdate("PUBLISHED", blogId);
                }}>
                <MegaphoneIcon className="w-4 h-4 mr-2" />
                Publish
              </DropdownMenuItem>
            )}
            {blogStatus === "ARCHIVED" && (
              <DropdownMenuItem
                onClick={() => {
                  onUpdate("DRAFT", blogId);
                }}>
                <ArchiveRestore className="w-4 h-4 mr-2" />
                Unarchive
              </DropdownMenuItem>
            )}
            <DropdownMenuSeparator />
            {blogStatus !== "ARCHIVED" && blogStatus !== "DRAFT" && (
              <DropdownMenuItem
                className="text-amber-400 focus:text-amber-400 group"
                onClick={() => {
                  onUpdate("ARCHIVED", blogId);
                }}>
                <ArchiveIcon className="w-4 h-4 mr-2 text-amber-400" />
                Archive
              </DropdownMenuItem>
            )}
            {blogStatus === "PUBLISHED" && (
              <DropdownMenuItem
                className=" group text-amber-600 focus:text-amber-600"
                onClick={() => {
                  onUpdate("UNPUBLISHED", blogId);
                }}>
                <Undo2Icon className="w-4 h-4 mr-2 text-amber-600" />
                Unpublish
              </DropdownMenuItem>
            )}

            {/* delete */}
            <DropdownMenuItem
              className="text-destructive focus:text-destructive"
              disabled={blogStatus !== "DRAFT" && blogStatus !== "ARCHIVED"}
              onClick={onDelete}>
              <Trash className="w-4 h-4 mr-2 text-destructive" />
              Delete
            </DropdownMenuItem>
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
