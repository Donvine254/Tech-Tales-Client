"use client";
import { Suspense, useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArchiveIcon,
  ChevronLeft,
  ChevronRight,
  FileText,
  Flag,
  InfoIcon,
  ListFilterIcon,
  MessageSquare,
  Search,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import {
  CommentCard,
  SkeletonComment,
} from "@/components/comments/comment-card";
import { CommentStatus } from "@prisma/client";
import { UserComments } from "@/types";
import { toast } from "sonner";

const COMMENTS_PER_PAGE = 10;

export default function Replies({ data }: { data: UserComments }) {
  const [comments, setComments] = useState(data);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [activeTab, setActiveTab] = useState<CommentStatus>("VISIBLE");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab, searchQuery, sortBy]);

  const handleDelete = (commentId: number) => {
    setComments((prev) => prev.filter((c) => c.id !== commentId));
    toast.success("Comment deleted successfully");
  };

  const filterByStatus = (status: CommentStatus) =>
    comments.filter((c) => c.status === status);

  const searchComments = (list: UserComments) =>
    searchQuery.trim()
      ? list.filter(
          (c) =>
            c.body?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            c.blog?.title?.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : list;

  const sortComments = (list: UserComments) => {
    return [...list].sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        case "oldest":
          return (
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          );
        case "lastEdited":
          return (
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
          );
        default:
          return 0;
      }
    });
  };

  const getFiltered = (status: CommentStatus) =>
    sortComments(searchComments(filterByStatus(status)));

  const paginated = (list: UserComments) => {
    const start = (currentPage - 1) * COMMENTS_PER_PAGE;
    const end = start + COMMENTS_PER_PAGE;
    return list.slice(start, end);
  };

  const totalPages = Math.ceil(
    getFiltered(activeTab).length / COMMENTS_PER_PAGE
  );

  const EmptyState = ({ status }: { status: CommentStatus }) => {
    const messages = {
      VISIBLE: {
        title: "No visible comments",
        description: "You haven't posted any visible comments yet.",
        icon: MessageSquare,
      },
      FLAGGED: {
        title: "No flagged comments",
        description: "No comments flagged for review.",
        icon: Flag,
      },
      HIDDEN: {
        title: "No hidden comments",
        description: "You haven't hidden any comments.",
        icon: FileText,
      },
      ARCHIVED: {
        title: "No archived comments",
        description: "You haven't archived any comments.",
        icon: ArchiveIcon,
      },
    };

    const { title, description, icon: Icon } = messages[status];

    return (
      <div className="flex flex-col items-center justify-center py-16 px-4">
        <Icon className="w-12 h-12 md:h-16 md:w-16 mb-4 text-muted-foreground" />
        <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground text-center max-w-md">
          {description}
        </p>
      </div>
    );
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8 text-center sm:text-start">
        <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
          My Replies
        </h1>
        <p className="text-muted-foreground">
          View and manage your comment activity.
        </p>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={(val) => setActiveTab(val as CommentStatus)}
        className="w-full">
        <ScrollArea className="w-full whitespace-nowrap pb-4">
          <TabsList className="w-max space-x-4 bg-card shadow">
            {(
              ["VISIBLE", "FLAGGED", "HIDDEN", "ARCHIVED"] as CommentStatus[]
            ).map((status) => (
              <TabsTrigger
                key={status}
                value={status}
                className={cn(
                  "flex items-center gap-2 hover:bg-secondary",
                  activeTab === status &&
                    " border-blue-500 border-2 dark:border-blue-500 hover:border-blue-600 "
                )}>
                {status[0] + status.slice(1).toLowerCase()}
                <span
                  className={cn(
                    "bg-muted text-muted-foreground px-1.5 py-0.5 rounded-sm text-xs",
                    activeTab === status && "dark:text-white"
                  )}>
                  {filterByStatus(status).length}
                </span>
              </TabsTrigger>
            ))}
          </TabsList>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>

        {/* Search and Sort */}
        <div className="flex gap-4 mb-4 mt-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search comments..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white dark:bg-gray-900"
            />
          </div>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-min sm:w-48 cursor-pointer bg-white dark:bg-gray-900">
              <ListFilterIcon className="h-4 w-4" />
              <span className="hidden sm:inline">
                <SelectValue placeholder="Sort by" />
              </span>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="oldest">Oldest First</SelectItem>
              <SelectItem value="lastEdited">Last Edited</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {/* show alert */}
        <StatusAlert activeTab={activeTab} />
        <Suspense
          fallback={
            <div className="grid gap-6">
              {Array.from({ length: 5 }, (_, i) => (
                <SkeletonComment key={i} />
              ))}
            </div>
          }>
          {(
            ["VISIBLE", "FLAGGED", "HIDDEN", "ARCHIVED"] as CommentStatus[]
          ).map((status) => (
            <TabsContent value={status} key={status}>
              {getFiltered(status).length > 0 ? (
                <div className="grid gap-6">
                  {paginated(getFiltered(status)).map((comment) => (
                    <CommentCard
                      key={comment.id}
                      comment={comment}
                      onDelete={() => handleDelete(comment.id)}
                    />
                  ))}
                </div>
              ) : (
                <EmptyState status={status} />
              )}
            </TabsContent>
          ))}
        </Suspense>

        {/* Pagination */}
        {getFiltered(activeTab).length > COMMENTS_PER_PAGE && (
          <div className="flex justify-center items-center gap-4 mt-10">
            <Button
              size="sm"
              variant="ghost"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}>
              <ChevronLeft /> Prev
            </Button>
            <span className="font-semibold text-sm text-muted-foreground">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              size="sm"
              variant="ghost"
              disabled={currentPage === totalPages}
              onClick={() =>
                setCurrentPage((p) => Math.min(p + 1, totalPages))
              }>
              Next <ChevronRight />
            </Button>
          </div>
        )}
      </Tabs>
    </div>
  );
}

const StatusAlert = ({ activeTab }: { activeTab: CommentStatus }) => {
  return (
    <div className="mb-4">
      {activeTab === "ARCHIVED" && (
        <div
          role="alert"
          className="relative w-full rounded-lg border px-4 py-3 text-sm grid has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-3 gap-y-0.5 items-start [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current animate-scale-in bg-blue-500 text-white dark:bg-blue-900/50">
          <InfoIcon />
          <div className="col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight">
            Archived Comments
          </div>
          <div className="col-start-2 grid justify-items-start gap-1 text-sm [&_p]:leading-relaxed">
            <p>
              Comments are archived when users choose to delete their accounts.
              You can easily restore archived comments.
            </p>
          </div>
        </div>
      )}

      {activeTab === "FLAGGED" && (
        <div
          role="alert"
          className="relative w-full rounded-lg border px-4 py-3 text-sm grid has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-3 gap-y-0.5 items-start [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current animate-scale-in bg-yellow-500 text-white dark:bg-yellow-900/50">
          <InfoIcon />
          <div className="col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight">
            Flagged Comments
          </div>
          <div className="col-start-2 grid justify-items-start gap-1 text-sm [&_p]:leading-relaxed">
            <p>
              These comments have been reported as offensive or violating terms
              of service. They are pending moderator review.
            </p>
          </div>
        </div>
      )}

      {activeTab === "HIDDEN" && (
        <div
          role="alert"
          className="relative w-full rounded-lg border px-4 py-3 text-sm grid has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-3 gap-y-0.5 items-start [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current animate-scale-in bg-red-500 text-white dark:bg-red-900/50">
          <InfoIcon />
          <div className="col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight">
            Hidden Comments
          </div>
          <div className="col-start-2 grid justify-items-start gap-1 text-sm [&_p]:leading-relaxed">
            <p>
              These comments have been hidden by moderators after being flagged.
              They are no longer visible to the public.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
