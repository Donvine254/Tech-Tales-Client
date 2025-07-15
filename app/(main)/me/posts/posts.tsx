"use client";
import MinimalBlogCard from "@/components/pages/blogs/minimal-blog-card";
import { Button } from "@/components/ui/button";
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
  ListFilterIcon,
  Search,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { BlogStatus } from "@prisma/client";
import { cn } from "@/lib/utils";
import { getUserBlogs } from "@/lib/actions/user";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import CreateButton from "@/components/pages/profile/create-button";
import { toast } from "sonner";
import { deleteOrArchiveBlog, updateBlogStatus } from "@/lib/actions/blogs";

const BLOGS_PER_PAGE = 4;
type BlogsType = Awaited<ReturnType<typeof getUserBlogs>>;

export default function Posts({ data }: { data: BlogsType }) {
  const [blogs, setBlogs] = useState(data);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [activeTab, setActiveTab] = useState("published");
  const [currentPage, setCurrentPage] = useState(1);

  // reset page number when the tab changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab, searchQuery, sortBy]);

  const filterBlogsByStatus = (status: BlogStatus) => {
    return blogs.filter((blog) => blog.status === status);
  };

  const sortBlogs = (blogs: BlogsType) => {
    return [...blogs].sort((a, b) => {
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

  const searchBlogs = (blogs: BlogsType) => {
    if (!searchQuery) return blogs;
    return blogs.filter(
      (blog) =>
        blog?.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog?.tags?.includes(searchQuery.toLowerCase())
    );
  };

  const getFilteredBlogs = (status: BlogStatus) => {
    const statusBlogs = filterBlogsByStatus(status);
    const searchedBlogs = searchBlogs(statusBlogs);
    return sortBlogs(searchedBlogs);
  };
  const totalPages = Math.ceil(
    getFilteredBlogs(activeTab.toUpperCase() as BlogStatus).length /
      BLOGS_PER_PAGE
  );
  const paginatedBlogs = (blogs: BlogsType) => {
    const start = (currentPage - 1) * BLOGS_PER_PAGE;
    const end = start + BLOGS_PER_PAGE;
    return blogs.slice(start, end);
  };
  const getEmptyStateMessage = (status: BlogStatus) => {
    switch (status) {
      case "PUBLISHED":
        return {
          title: "No published blogs",
          description:
            "You haven't published any blogs yet. Create your first blog post to get started!",
        };
      case "DRAFT":
        return {
          title: "No draft blogs",
          description:
            "No drafts in progress. Start writing a new blog post to see it here.",
        };
      case "UNPUBLISHED":
        return {
          title: "No unpublished blogs",
          description:
            "No unpublished blogs found. Drafts that are ready can be moved here before publishing.",
        };
      case "ARCHIVED":
        return {
          title: "No archived blogs",
          description:
            "No archived blogs found. Old or outdated posts you've archived will appear here.",
        };
      default:
        return {
          title: "No blogs found",
          description: "No blogs found in this category.",
        };
    }
  };
  const EmptyState = ({ status }: { status: BlogStatus }) => {
    const { title, description } = getEmptyStateMessage(status);
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4">
        {status === "ARCHIVED" ? (
          <ArchiveIcon className="w-12 h-12 md:h-16 md:w-16 mb-4 text-muted-foreground" />
        ) : (
          <FileText className="w-12 h-12 md:h-16 md:w-16 mb-4 text-muted-foreground" />
        )}
        <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground text-center max-w-md mb-6">
          {description}
        </p>
        <CreateButton />
      </div>
    );
  };
  // function to update blog status
  async function handleStatusChange(status: BlogStatus, blogId: number) {
    const toastId = toast.loading("Processing request");
    let originalStatus: BlogStatus | null = null;

    setBlogs((prevBlogs) =>
      prevBlogs.map((blog) => {
        if (blog.id === blogId) {
          originalStatus = blog.status;
          return { ...blog, status };
        }
        return blog;
      })
    );
    const res = await updateBlogStatus(status, blogId);
    toast.dismiss(toastId);
    if (res.success) {
      toast.success("Blog status updated successfully");
    } else {
      if (originalStatus) {
        setBlogs((prevBlogs) =>
          prevBlogs.map((blog) =>
            blog.id === blogId ? { ...blog, status: originalStatus! } : blog
          )
        );
      }
      toast.error(res.message || "Failed to update blog status");
    }
  }
  // function delete blogs
  async function handleDelete(uuid: string) {
    let deletedBlog: BlogsType[number] | undefined;
    setBlogs((prev) => {
      const target = prev.find((b) => b.uuid === uuid);
      deletedBlog = target; // Save for possible rollback
      return prev.filter((b) => b.uuid !== uuid);
    });
    const res = await deleteOrArchiveBlog(uuid);

    if (res.success) {
      toast.success(res.message);
    } else {
      if (deletedBlog) {
        setBlogs((prev) => [deletedBlog!, ...prev]);
      }
      toast.error(res.message);
    }
  }
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8 text-center sm:text-start ">
        <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
          My Blogs
        </h1>
        <p className="text-muted-foreground">
          Manage and organize your blog posts
        </p>
      </div>
      {/* Tabs */}
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        defaultValue="published"
        className="w-full">
        <ScrollArea className="w-full whitespace-nowrap pb-4">
          <TabsList className="w-max space-x-4 bg-card dark:bg-gray-950 shadow">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <TabsTrigger
                    value="published"
                    className={cn(
                      "flex items-center gap-2 hover:bg-secondary",
                      activeTab === "published" &&
                        "bg-blue-500 hover:bg-blue-600 text-white"
                    )}>
                    <span
                      className={cn(
                        activeTab === "published" && "dark:text-white"
                      )}>
                      Published
                    </span>
                    <span
                      className={cn(
                        "bg-muted text-muted-foreground px-1.5 py-0.5 rounded-sm text-xs",
                        activeTab === "published" && "dark:text-white"
                      )}>
                      {filterBlogsByStatus("PUBLISHED").length}
                    </span>
                  </TabsTrigger>
                </TooltipTrigger>
                <TooltipContent className="max-w-72 text-sm" side="bottom">
                  <p>View published blogs</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <TabsTrigger
                    value="draft"
                    className={cn(
                      "flex items-center gap-2 hover:bg-secondary ",
                      activeTab === "draft" &&
                        "bg-blue-500 hover:bg-blue-600 text-white"
                    )}>
                    <span
                      className={cn(
                        activeTab === "draft" && "dark:text-white"
                      )}>
                      Drafts
                    </span>
                    <span
                      className={cn(
                        "bg-muted text-muted-foreground px-1.5 py-0.5 rounded-sm text-xs",
                        activeTab === "draft" && "dark:text-white"
                      )}>
                      {filterBlogsByStatus("DRAFT").length}
                    </span>
                  </TabsTrigger>
                </TooltipTrigger>
                <TooltipContent className="max-w-72 text-sm" side="bottom">
                  <p>View draft blogs</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <TabsTrigger
                    value="unpublished"
                    className={cn(
                      "flex items-center gap-2 hover:bg-secondary ",
                      activeTab === "unpublished" &&
                        "bg-blue-500 hover:bg-blue-600 text-white"
                    )}>
                    <span
                      className={cn(
                        activeTab === "unpublished" && "dark:text-white"
                      )}>
                      Unpublished
                    </span>
                    <span
                      className={cn(
                        "bg-muted text-muted-foreground px-1.5 py-0.5 rounded-sm text-xs",
                        activeTab === "unpublished" && "dark:text-white"
                      )}>
                      {filterBlogsByStatus("UNPUBLISHED").length}
                    </span>
                  </TabsTrigger>
                </TooltipTrigger>
                <TooltipContent className="max-w-72 text-sm" side="bottom">
                  <p>View unpublished blogs</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <TabsTrigger
                    value="archived"
                    className={cn(
                      "flex items-center gap-2 hover:bg-secondary",
                      activeTab === "archived" &&
                        "bg-blue-500 hover:bg-blue-600 text-white"
                    )}>
                    <span
                      className={cn(
                        activeTab === "archived" && "dark:text-white"
                      )}>
                      Archived
                    </span>
                    <span
                      className={cn(
                        "bg-muted text-muted-foreground px-1.5 py-0.5 rounded-sm text-xs",
                        activeTab === "archived" && "dark:text-white"
                      )}>
                      {filterBlogsByStatus("ARCHIVED").length}
                    </span>
                  </TabsTrigger>
                </TooltipTrigger>
                <TooltipContent className="max-w-72 text-sm" side="bottom">
                  <p>View archived blogs</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </TabsList>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>

        {/* Search and Sort Controls */}
        <div className="flex  gap-4 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search blogs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white dark:bg-gray-900"
            />
          </div>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger
              className="w-min bg-white cursor-pointer dark:bg-gray-900 dark:hover:bg-gray-950 sm:w-48"
              title="filter blogs">
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

        {/* Published Blogs */}
        <TabsContent value="published" className="mt-0">
          {getFilteredBlogs("PUBLISHED").length > 0 ? (
            <div className="grid gap-6">
              {paginatedBlogs(getFilteredBlogs("PUBLISHED")).map((blog) => (
                <MinimalBlogCard
                  key={blog.id}
                  blog={blog}
                  onDelete={() => null}
                  onUpdate={handleStatusChange}
                  showMoreActions={true}
                />
              ))}
            </div>
          ) : (
            <EmptyState status="PUBLISHED" />
          )}
        </TabsContent>

        {/* Draft Blogs */}
        <TabsContent value="draft" className="mt-0">
          {getFilteredBlogs("DRAFT").length > 0 ? (
            <div className="grid gap-6">
              {paginatedBlogs(getFilteredBlogs("DRAFT")).map((blog) => (
                <MinimalBlogCard
                  key={blog.id}
                  blog={blog}
                  onDelete={handleDelete}
                  showMoreActions={true}
                  onUpdate={handleStatusChange}
                />
              ))}
            </div>
          ) : (
            <EmptyState status="DRAFT" />
          )}
        </TabsContent>

        {/* Unpublished Blogs */}
        <TabsContent value="unpublished" className="mt-0">
          {getFilteredBlogs("UNPUBLISHED").length > 0 ? (
            <div className="grid  gap-6">
              {paginatedBlogs(getFilteredBlogs("UNPUBLISHED")).map((blog) => (
                <MinimalBlogCard
                  key={blog.id}
                  blog={blog}
                  onDelete={handleDelete}
                  onUpdate={handleStatusChange}
                  showMoreActions={true}
                />
              ))}
            </div>
          ) : (
            <EmptyState status="UNPUBLISHED" />
          )}
        </TabsContent>

        {/* Archived Blogs */}
        <TabsContent value="archived" className="mt-0">
          {getFilteredBlogs("ARCHIVED").length > 0 ? (
            <div className="grid  gap-6">
              {paginatedBlogs(getFilteredBlogs("ARCHIVED")).map((blog) => (
                <MinimalBlogCard
                  key={blog.id}
                  blog={blog}
                  onDelete={handleDelete}
                  onUpdate={handleStatusChange}
                  showMoreActions={true}
                />
              ))}
            </div>
          ) : (
            <EmptyState status="ARCHIVED" />
          )}
        </TabsContent>
        {/* pagination */}
        {getFilteredBlogs(activeTab.toUpperCase() as BlogStatus) &&
          getFilteredBlogs(activeTab.toUpperCase() as BlogStatus).length >
            3 && (
            <div className="flex justify-center items-center gap-4 mt-10">
              <Button
                size="sm"
                variant="ghost"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                className="cursor-pointer items-center">
                <ChevronLeft /> Prev
              </Button>
              <span className="font-semibold text-sm text-muted-foreground">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                size="sm"
                variant="ghost"
                className="cursor-pointer items-center"
                disabled={currentPage === totalPages}
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }>
                Next <ChevronRight />
              </Button>
            </div>
          )}
      </Tabs>
    </div>
  );
}
