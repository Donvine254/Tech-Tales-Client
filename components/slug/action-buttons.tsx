"use client";
import {
  MessageSquareText,
  MoreHorizontal,
  Eye,
  Printer,
  Pencil,
  ShieldBan,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { deleteOrArchiveBlog } from "@/lib/actions/blogs";
import AnimatedLikeButton from "@/components/custom/like-button";
import { ShareModal } from "@/components/modals/share-modal";
import Bookmark from "@/components/custom/bookmark";
import DeleteButton from "@/components/modals/delete-dialog";
import BlogReportDialog from "@/components/modals/report-blog";
import { CommentData, Session } from "@/types";
import parse from "html-react-parser";
interface ActionButtonsProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  blog: Record<string, any>;
  session: Session | null;
  comments: CommentData[];
}

const ActionButtons: FC<ActionButtonsProps> = ({ blog, session, comments }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  //function to print contents
  const handlePrint = async () => {
    //eslint-disable-next-line
    const print = (window as any).inkHtml;
    if (typeof print === "function") {
      print(document.getElementById("print-div"));
    } else {
      console.error("inkHtml is not loaded.");
    }
  };
  const handleBlogDeletion = async () => {
    try {
      const res = await deleteOrArchiveBlog(blog.uuid);
      if (res.success) {
        toast.success(res.message);
        router.replace("/");
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  const isAuthor = session?.userId === blog.authorId;
  const isAdmin = session?.role === "ADMIN";

  return (
    <div className="flex items-center justify-between border-b border-border mb-4 mt-8 py-4">
      {/* Left side: likes + comments */}
      <div className="flex items-center gap-2 xsm:gap-2 md:gap-4">
        <Tooltip>
          <TooltipTrigger asChild>
            <a
              href="#comments"
              className="flex items-center space-x-1 hover:text-cyan-600 transition-colors cursor-pointer"
              title="Jump to comments">
              <MessageSquareText className="h-6 w-6" />
              <span className="text-sm">{comments?.length ?? 0}</span>
            </a>
          </TooltipTrigger>
          <TooltipContent className="max-w-72 text-sm" side="bottom">
            <p>{comments?.length ?? 0} Comments</p>
          </TooltipContent>
        </Tooltip>
        <AnimatedLikeButton
          initialLikes={blog.likes}
          blogId={blog.id}
          size={40}
        />
      </div>

      {/* Right side: actions */}
      <div className="flex items-center gap-2 xsm:gap-2 md:gap-4">
        <ShareModal
          slug={blog.slug}
          title={blog.title}
          size={22}
          image={blog.image?.secure_url ?? "/placeholder.svg"}
        />
        <Bookmark blogId={blog.id} size={24} />

        {/* More Actions Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="cursor-pointer"
              title="More actions">
              <MoreHorizontal className="h-6 w-6" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-popover space-y-2">
            <DropdownMenuItem onClick={handlePrint}>
              <Printer className="h-4 w-4" />
              Print Blog
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={`/explore/${blog.author.handle}`}>
                <Eye className="h-4 w-4" />
                More by Author
              </Link>
            </DropdownMenuItem>

            {(isAuthor || isAdmin) && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href={`/posts/new/${blog.uuid}`} title="Edit blog">
                    <Pencil className="h-4 w-4" />
                    Edit Blog
                  </Link>
                </DropdownMenuItem>
                <DeleteButton
                  item="blog post"
                  text="Archive Post"
                  action="archive"
                  onDelete={handleBlogDeletion}
                />
              </>
            )}
            {!isAuthor && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setIsOpen(true)}>
                  <ShieldBan className="h-4 w-4 text-destructive" />
                  <span className="text-red-500">Report Abuse</span>
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <BlogReportDialog
        blogTitle={blog.title}
        authorName={blog.author.username}
        open={isOpen}
        onOpenChange={setIsOpen}
      />
      {/* print div: hidden */}
      <div id="print-div" style={{ display: "none" }} className="blog prose">
        <h1 className="text-xl font-bold">{blog.title}</h1>
        <p className="italic">
          By {blog.author.username} published on{" "}
          {new Date(blog.createdAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </p>
        <div className="blog-body">{parse(blog.body)}</div>
      </div>
    </div>
  );
};

export default ActionButtons;
