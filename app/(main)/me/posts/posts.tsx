"use client";
import MinimalBlogCard from "@/components/pages/minimal-blog-card";
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
import { createNewBlog } from "@/lib/actions/blogs";
import {
  Archive,
  Eye,
  EyeOff,
  FileText,
  ListFilterIcon,
  Plus,
  Search,
} from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";
import { BlogStatus } from "@prisma/client";
import { cn } from "@/lib/utils";
import { getUserBlogs } from "@/lib/actions/user";

type BlogsType = Awaited<ReturnType<typeof getUserBlogs>>;
export default function Posts({ blogs }: { blogs: BlogsType }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [activeTab, setActiveTab] = useState("published");
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

  const getTabIcon = (status: BlogStatus) => {
    switch (status) {
      case "PUBLISHED":
        return <Eye className="h-4 w-4" />;
      case "DRAFT":
        return <FileText className="h-4 w-4" />;
      case "UNPUBLISHED":
        return <EyeOff className="h-4 w-4" />;
      case "ARCHIVED":
        return <Archive className="h-4 w-4" />;
      default:
        return null;
    }
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
        <div className="text-muted-foreground mb-4">{getTabIcon(status)}</div>
        <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground text-center max-w-md mb-6">
          {description}
        </p>
        <CreateButton />
      </div>
    );
  };
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between gap-4 mb-2">
          <h1 className="text-lg md:text-2xl lg:text-3xl font-bold text-foreground">
            My Blogs
          </h1>
          <CreateButton className="md:hidden" />
        </div>
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
        <TabsList className="w-fit overflow-x-auto space-x-4 bg-card dark:bg-gray-950 shadow">
          <TabsTrigger
            value="published"
            className="flex items-center gap-2 data-[state=active]:bg-blue-500 data-[state=active]:text-white dark:data-[state=active]:bg-blue-500 dark:data-[state=active]:text-white">
            Published
            <span className="bg-muted text-muted-foreground px-1.5 py-0.5 rounded-sm text-xs data-[state=active]:bg-white/20 data-[state=active]:text-white">
              {filterBlogsByStatus("PUBLISHED").length}
            </span>
          </TabsTrigger>
          <TabsTrigger
            value="draft"
            className="flex items-center gap-2 data-[state=active]:bg-blue-500 data-[state=active]:text-white dark:data-[state=active]:bg-blue-500 dark:data-[state=active]:text-white">
            <span>Drafts</span>
            <span className="bg-muted text-muted-foreground px-1.5 py-0.5 rounded-sm text-xs data-[state=active]:bg-white/20 data-[state=active]:text-white">
              {filterBlogsByStatus("DRAFT").length}
            </span>
          </TabsTrigger>
          <TabsTrigger
            value="unpublished"
            className="flex items-center gap-2 data-[state=active]:bg-blue-500 data-[state=active]:text-white dark:data-[state=active]:bg-blue-500 dark:data-[state=active]:text-white">
            Unpublished
            <span className="bg-muted text-muted-foreground px-1.5 py-0.5 rounded-sm text-xs data-[state=active]:bg-white/20 data-[state=active]:text-white">
              {filterBlogsByStatus("UNPUBLISHED").length}
            </span>
          </TabsTrigger>
          <TabsTrigger
            value="archived"
            className="flex items-center gap-2 data-[state=active]:bg-blue-500 data-[state=active]:text-white dark:data-[state=active]:bg-blue-500 dark:data-[state=active]:text-white">
            Archived
            <span className="bg-muted text-muted-foreground px-1.5 py-0.5 rounded-sm text-xs data-[state=active]:bg-white/20 data-[state=active]:text-white">
              {filterBlogsByStatus("ARCHIVED").length}
            </span>
          </TabsTrigger>
        </TabsList>

        {/* Search and Sort Controls */}
        <div className="flex flex-col sm:flex-row gap-4 my-6">
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
            <SelectTrigger className="w-full bg-white cursor-pointer dark:bg-gray-900 dark:hover:bg-gray-950 sm:w-48">
              <ListFilterIcon className="h-4 w-4" />
              <SelectValue placeholder="Sort by" />
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
              {getFilteredBlogs("PUBLISHED").map((blog) => (
                <MinimalBlogCard
                  key={blog.id}
                  blog={blog}
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
              {getFilteredBlogs("DRAFT").map((blog) => (
                <MinimalBlogCard
                  key={blog.id}
                  blog={blog}
                  showMoreActions={true}
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
              {getFilteredBlogs("UNPUBLISHED").map((blog) => (
                <MinimalBlogCard
                  key={blog.id}
                  blog={blog}
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
              {getFilteredBlogs("ARCHIVED").map((blog) => (
                <MinimalBlogCard
                  key={blog.id}
                  blog={blog}
                  showMoreActions={true}
                />
              ))}
            </div>
          ) : (
            <EmptyState status="ARCHIVED" />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

const CreateButton: React.FC<{ className?: string }> = ({ className }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  async function createBlog() {
    setIsLoading(true);
    const toastId = toast.loading("processing request");
    const res = await createNewBlog();
    if (res.success && res.data) {
      router.replace(`/posts/new/${res.data.uuid}`);
    } else {
      toast.error(res.message);
    }
    setIsLoading(false);
    toast.dismiss(toastId);
  }

  return (
    <Button
      className={cn(
        "bg-gradient-to-r from-cyan-600 to-blue-600 text-white cursor-pointer",
        className
      )}
      variant="secondary"
      size="sm"
      disabled={isLoading}
      onClick={createBlog}>
      <Plus className="h-4 w-4" />
      New Post
    </Button>
  );
};
