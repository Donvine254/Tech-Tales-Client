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
import { Calendar, Clock, LockIcon, Plus } from "lucide-react";
import parse from "html-react-parser";
import PrismLoader from "../custom/prism-loader";
import Image from "next/image";
import { useSession } from "@/providers/session";
import { calculateReadingTime, cn } from "@/lib/utils";
import { useState } from "react";
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
  const [activeTab, setActiveTab] = useState("mobile");
  const { session } = useSession();
  const isMobile = activeTab === "mobile";

  const BlogBody = () => {
    return (
      <div className="w-full h-full pt-4 overflow-y-auto overflow-x-hidden">
        <div className="p-2">
          <article
            className={cn(
              "prose prose-slate dark:prose-invert max-w-none",
              isMobile && "prose-sm"
            )}
            id="blog-body">
            <PrismLoader />
            {/* Blog Banner + Title */}
            <div className="space-y-2">
              <Image
                src={blog.image?.secure_url || "/placeholder.svg"}
                alt="Blog header"
                width={800}
                height={400}
                className="w-full object-cover rounded-lg h-24"
              />
              <h1
                className={cn(
                  "font-bold text-xl md:text-2xl lg:text-3xl",
                  isMobile && "text-lg"
                )}>
                {blog.title?.trim() || "Your blog title goes here"}
              </h1>

              {/* Author Info */}
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold capitalize">
                  {session?.username
                    .split(" ")
                    .map((n: string) => n[0])
                    .join("")}
                </div>
                <div className="flex flex-col">
                  <span
                    className={cn(
                      "font-bold text-accent-foreground text-base capitalize",
                      isMobile && "text-sm"
                    )}>
                    {session?.username ?? "Author Name"}
                  </span>
                  <div
                    className={cn(
                      "flex items-center space-x-3 text-sm text-accent-foreground",
                      isMobile && "text-xs"
                    )}>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-3 w-3 md:h-4 md:w-4" />
                      <span>
                        {new Date().toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1 capitalize">
                      <Clock className="h-3 w-3 md:h-4 md:w-4" />
                      <span>
                        {calculateReadingTime(blog?.body ?? "")} min read
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Blog Tags */}
            <div className="py-1">
              {blog.tags ? (
                <div className="flex text-xs gap-2 items-center flex-wrap">
                  {blog.tags.split(",").map((tag, index) => (
                    <span key={index} className="text-xs" title={tag}>
                      <span className="text-blue-500">#</span>
                      {tag.trim()}
                    </span>
                  ))}
                </div>
              ) : (
                <span>No Tags Yet</span>
              )}
            </div>

            {/* Blog Body */}
            <div className="min-h-[200px] max-w-max font-serif">
              {blog.body
                ? parse(blog.body)
                : "Lorem Ipsum sample body: At vero eos et accusamus..."}
            </div>
          </article>
        </div>
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
          <div className="flex-1 pt-2 items-center justify-center bg-muted hidden md:flex  w-full h-full overflow-hidden">
            <div className="w-[375px] h-[812px] mt-auto pb-auto bg-black rounded-[40px] p-2 shadow-2xl overflow-hidden mx-auto">
              {/* Screen */}
              <div className="w-full h-full bg-white dark:bg-accent/50 rounded-[32px] overflow-y-hidden relative">
                {/* Status Bar */}
                <div className="absolute top-0 left-0 right-0 h-11 bg-white dark:bg-accent shadow  z-10 flex items-center justify-between px-6 text-primary text-sm font-medium">
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
                {/* Content Frame */}
                <BlogBody />
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
                    <span className="whitespace-nowrap truncate text-ellipsis">{`https://techtales.vercel.app/blog/${blog?.slug}`}</span>
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
