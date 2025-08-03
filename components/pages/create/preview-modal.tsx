import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BlogData } from "@/types";
import {
  BookmarkPlus,
  Calendar,
  ChartNoAxesColumn,
  Clock,
  Heart,
  LockIcon,
  MessageSquare,
  Plus,
  Share,
} from "lucide-react";
import parse from "html-react-parser";
import PrismLoader from "../../custom/prism-loader";
import { useSession } from "@/providers/session";
import { calculateReadingTime, cn, formatDate } from "@/lib/utils";
import { useState } from "react";
import BlogImage from "../blogs/blog-image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
interface PreviewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  blog: BlogData;
}

export const PreviewDialog = ({
  open,
  onOpenChange,
  blog,
}: PreviewDialogProps) => {
  const getCurrentTime = () => {
    return new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };
  const [activeTab, setActiveTab] = useState<"mobile" | "desktop">("mobile");
  const { session } = useSession();

  const BlogBody = () => {
    return (
      <div
        className={cn(
          "w-full h-full overflow-y-auto overflow-x-hidden px-2",
          activeTab === "mobile" ? "pt-14" : "pt-4"
        )}>
        {/* Blog Banner + Title */}
        <div className="space-y-2 sm:mt-0">
          <BlogImage
            src={blog.image?.secure_url || "/placeholder.svg"}
            alt="Blog header"
            image={blog.image}
            height={720}
            width={1280}
            quality={100}
            className="object-fill italic h-auto max-h-[450px]  rounded-md w-full border-2 border-blue-500"
          />
          {/* Author Info */}
          <div className="flex items-center space-x-3 my-4">
            <Avatar className="h-12 w-12 ring-2 ring-offset-2 cursor-pointer">
              <AvatarImage
                src={session?.picture ?? "/placeholder.svg"}
                alt={session?.username ?? "Author Name"}
              />
              <AvatarFallback className="bg-gradient-to-r from-cyan-100 to-blue-100 text-cyan-700 text-sm capitalize">
                {session?.username
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col space-y-2">
              <div className="flex items-center space-x-2">
                <span className="font-bold text-accent-foreground text-base md:text-xl capitalize">
                  {session?.username.split(" ").slice(0, 2).join(" ") ??
                    "Author's Name"}
                </span>
                <Badge
                  variant="secondary"
                  className="text-xs p-0.5 text-blue-500 font-medium bg-blue-900/20">
                  Author
                </Badge>
              </div>
              <div className="flex items-center space-x-3 text-xs text-accent-foreground">
                <div className="flex items-center whitespace-nowrap truncate space-x-1">
                  <Calendar className="h-3 w-3" />
                  <span>{formatDate(new Date())}</span>
                </div>
                <div className="flex items-center whitespace-nowrap truncate space-x-1">
                  <Clock className="h-3 w-3" />
                  <span>
                    {" "}
                    {calculateReadingTime(blog?.body ?? "")} min read
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Blog Title */}
        <h1 className="text-xl md:text-2xl lg:text-3xl font-bold mb-1">
          {blog?.title?.trim() ?? "Untitled Blog Post"}
        </h1>

        {/* Blog Tags */}
        <div className="py-1">
          <div className="flex space-x-2 items-center flex-wrap">
            {(blog.tags
              ? blog.tags.split(",")
              : ["Tag 1", "Tag 2", "Tag 3"]
            ).map((tag: string, index: number) => {
              const trimmedTag = tag.trim();
              const commonClasses =
                "md:px-2 md:py-0 text-blue-500 dark:text-cyan-500 md:bg-transparent md:border border-transparent md:rounded-full text-sm";
              return blog.tags ? (
                <span
                  key={index}
                  title={trimmedTag}
                  className={`${commonClasses} highlight-link-${index}`}>
                  <span>#</span>
                  {trimmedTag}
                </span>
              ) : (
                <span key={index} className={commonClasses}>
                  <span>#</span>
                  {trimmedTag}
                </span>
              );
            })}
          </div>
        </div>
        {/* Top actions */}
        <div className="flex items-center justify-between xsm:gap-2 md:gap-4 py-2 border-y border-border my-2">
          <div className="flex items-center space-x-1 text-muted-foreground">
            <MessageSquare className="h-4 w-4" />
            <span className="text-sm">0</span>
          </div>

          <div className="flex items-center space-x-1 text-muted-foreground">
            <Heart className="h-4 w-4" />
            <span className="text-sm">0</span>
          </div>

          <div className="flex items-center space-x-1 text-muted-foreground">
            <ChartNoAxesColumn className="h-4 w-4" />
            <span className="text-sm">0</span>
          </div>
          <div className="flex items-center space-x-1 text-muted-foreground">
            <svg
              fill="none"
              viewBox="0 0 24 24"
              height="1rem"
              width="1rem"
              className="h-4 w-4">
              <path
                fill="currentColor"
                fillRule="evenodd"
                d="M12 21a9 9 0 100-18 9 9 0 000 18zm0 2c6.075 0 11-4.925 11-11S18.075 1 12 1 1 5.925 1 12s4.925 11 11 11z"
                clipRule="evenodd"
              />
              <path fill="currentColor" d="M16 12l-6 4.33V7.67L16 12z" />
            </svg>
          </div>
          <Share className="text-muted-foreground size-4" />
          <BookmarkPlus className="text-muted-foreground size-4" />
        </div>
        {/* Blog Body */}
        <article
          className="min-h-[800px] sm:min-h-full leading-8 prose lg:prose-lg prose-headings:mt-8 prose-p:mt-4 md:leading-10 subpixel-antialiased blog-body max-w-none mt-4 prose-slate dark:prose-invert prose-headings:font-semibold prose-headings:text-gray-900 dark:prose-headings:text-gray-50 prose-a:text-blue-600 hover:prose-a:text-blue-800 prose-a:underline-offset-4 prose-img:rounded-lg prose-img:shadow-lg prose-img:border prose-img:border-gray-200 dark:prose-img:border-gray-700 prose-pre:bg-gray-100 dark:prose-pre:bg-gray-800 prose-pre:rounded-lg prose-pre:p-4 blog"
          id="blog-body">
          <PrismLoader />
          {blog.body
            ? parse(blog.body)
            : "Your blog body will appear here. Continue editing to see the changes here.... "}
        </article>
      </div>
    );
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogOverlay className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm dark:bg-black/70 transition-all" />
      <DialogContent
        className="rounded-2xl shadow-2xl w-full min-w-[98%] max-w-7xl h-[90vh] p-0 gap-0"
        aria-describedby="preview modal">
        {/* Header */}
        <DialogHeader className="border-b p-2 w-full border-border hidden md:block">
          <DialogDescription />
          <DialogTitle />
          <Tabs
            defaultValue="account"
            className="flex items-center justify-center">
            <TabsList className="gap-2 bg-muted">
              <TabsTrigger
                value="mobile"
                onClick={() => setActiveTab("mobile")}>
                Mobile
              </TabsTrigger>
              <TabsTrigger
                value="desktop"
                onClick={() => setActiveTab("desktop")}>
                Desktop
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </DialogHeader>
        {/* Content */}
        {/* Phone Frame */}
        {activeTab === "mobile" && (
          <div className="flex-1 pt-2 items-center justify-center bg-muted hidden md:flex w-full h-full overflow-hidden">
            <div className="w-[375px] h-[812px] mt-auto pb-auto bg-black rounded-[40px] p-2 shadow-2xl overflow-hidden mx-auto">
              {/* Screen */}
              <div className="w-full h-full bg-white dark:bg-accent/50 rounded-[32px] overflow-y-hidden relative">
                {/* Status Bar */}
                <div className="absolute top-0 left-0 right-0 h-11  bg-white dark:bg-accent shadow z-10 flex items-center justify-between px-6 text-primary text-sm font-medium">
                  <span>{getCurrentTime()}</span>
                  <div className="w-20 h-6 bg-black dark:bg-gray-950 rounded-full"></div>
                  <div className="flex items-center gap-x-1.5">
                    {/* network bars */}
                    <div className="flex items-end space-x-0.5 ml-1">
                      <div className="w-1 h-1 bg-primary rounded-sm"></div>
                      <div className="w-1 h-2 bg-primary rounded-sm"></div>
                      <div className="w-1 h-3 bg-primary rounded-sm"></div>
                      <div className="w-1 h-4 bg-primary rounded-sm"></div>
                    </div>
                    {/* wifi bars */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="1.2rem"
                      height="1.2rem">
                      <path
                        fill="currentColor"
                        d="m6.35 15.35l-2.1-2.15q1.55-1.55 3.55-2.375T12 10t4.213.838t3.537 2.412l-2.1 2.1q-1.125-1.125-2.588-1.737T12 13t-3.062.613T6.35 15.35M2.1 11.1L0 9q2.375-2.425 5.488-3.713T12 4t6.513 1.288T24 9l-2.1 2.1q-1.975-1.975-4.538-3.037T12 7T6.637 8.063T2.1 11.1M12 21l-3.525-3.55q.7-.7 1.613-1.075T12 16t1.913.375t1.612 1.075z"></path>
                    </svg>
                    {/* battery */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="1.5rem"
                      height="1.5rem">
                      <path
                        fill="currentColor"
                        d="M20 8a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-2h2v-4h-2z"></path>
                    </svg>
                  </div>
                </div>
                {/* Content Frame */} <BlogBody />
              </div>
            </div>
          </div>
        )}

        {activeTab === "desktop" && (
          <div className="h-full hidden md:flex overflow-y-hidden w-full flex-col items-center justify-center">
            <div className="mx-auto w-full max-w-[95%] h-[812px] mt-auto pb-auto bg-background border border-border rounded-lg shadow-2xl overflow-hidden">
              {/* Browser Chrome */}
              <div className="h-12 bg-gray-100 dark:bg-accent border-b border-border flex items-center px-4 gap-3 flex-shrink-0">
                {/* Traffic Lights */}
                <div className="flex gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>

                {/* Address Bar */}
                <div className="flex-1 mx-4">
                  <div className="bg-white dark:bg-gray-600 border border-border rounded-md px-3 py-1.5 text-sm text-muted-foreground flex items-center gap-2 w-fit mx-auto">
                    <LockIcon className="h-4 w-4 text-muted-foreground" />
                    <span className="whitespace-nowrap truncate text-ellipsis">{`https://techtales.vercel.app/read/${blog?.path}`}</span>
                  </div>
                </div>

                {/* Browser Controls */}

                <div className="flex items-center justify-center">
                  <Plus className="text-muted-foreground" />
                </div>
              </div>

              {/* Content Frame*/}
              <div className="w-full h-[calc(100%-48px)] overflow-y-auto overflow-x-hidden">
                <div className="max-w-4xl mx-auto">
                  <BlogBody />
                </div>
              </div>
            </div>
          </div>
        )}
        {/* mobile view */}
        <div className="md:hidden w-full h-[calc(100%-48px)] overflow-y-auto overflow-x-hidden bg-white dark:bg-accent/90">
          <div className="max-w-4xl mx-auto">
            <BlogBody />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
