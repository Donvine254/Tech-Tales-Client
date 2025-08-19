"use client";
import { useState } from "react";
import { Calendar, FileText, FileClockIcon, X } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Button } from "../ui/button";
import { getBlogVersions } from "@/lib/actions/blog-version";
import { useQuery } from "@tanstack/react-query";
import { formatDate } from "@/lib/utils";

interface RevisionHistoryProps {
  blogId: number;
  blogTitle?: string;
}

const RevisionHistoryDialog = ({ blogId, blogTitle }: RevisionHistoryProps) => {
  const [open, setOpen] = useState(false);
  const {
    data: versions,
    isFetching,
    error,
  } = useQuery({
    queryKey: ["blogVersions", blogId],
    queryFn: () => getBlogVersions(blogId),
    enabled: !!blogId,
    staleTime: 60 * 5 * 1000, //cache for 5 minutes
  });

  const getRoleBadgeColor = (role: string) => {
    switch (role.toLowerCase()) {
      case "admin":
        return "bg-purple-50 text-purple-600 border-purple-200";
      case "author":
        return "bg-green-50 text-green-600 border-green-200";

      default:
        return "bg-gray-50 text-gray-600 border-gray-200";
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          title="View revision history"
          className="hover:bg-accent my-0 w-full hover:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:hover:bg-destructive/10 dark:data-[variant=destructive]:hover:bg-destructive/20 data-[variant=destructive]:hover:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4">
          <FileClockIcon className="w-4 h-4 mr-2" />
          Revision History
        </button>
      </DialogTrigger>
      <DialogContent className="min-w-full h-full overflow-hidden flex flex-col p-0 bg-muted ">
        <DialogHeader className="px-6 py-4 border-b flex-shrink-0 bg-background">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <div>
                <DialogTitle className="text-xl font-semibold">
                  Revision History
                </DialogTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  {blogTitle || "Blog Post"} - {versions?.length ?? 0} revisions
                </p>
              </div>
            </div>
          </div>
        </DialogHeader>
        <ScrollArea className="flex-1 min-h-0 ">
          <div className="px-6 py-4 space-y-6 max-w-5xl mx-auto">
            {isFetching && (
              <div className="flex flex-col items-center justify-center py-10 text-muted-foreground md:mt-20">
                <div className="w-8 h-8 border-3 text-blue-400 text-4xl animate-spin border-primary flex items-center justify-center border-t-blue-400 rounded-full mb-2"></div>
                <p>Fetching blog versions...</p>
              </div>
            )}

            {error && (
              <div className="flex flex-col items-center justify-center py-10 text-red-500">
                <X className="size-8 fill-red-500 mb-2" />
                <p>Failed to load blog versions. Please try again later.</p>
              </div>
            )}

            {!isFetching &&
              !error &&
              (versions && versions.length > 0 ? (
                versions.map((revision, index) => (
                  <div key={revision.id} className="relative">
                    {/* Timeline line */}
                    {index < versions.length - 1 && (
                      <div className="absolute left-6 top-12 w-px h-16 bg-border" />
                    )}

                    <div className="flex gap-4">
                      {/* Avatar */}
                      <Avatar className="h-12 w-12 border-2 border-background shadow-sm">
                        <AvatarImage
                          src={revision.editor.picture ?? "/placeholder.svg"}
                          alt={revision.editor.username}
                        />
                        <AvatarFallback className="bg-muted text-muted-foreground font-medium">
                          {revision.editor.username
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-medium text-foreground">
                                Version {revision.id}
                              </h4>
                              <Badge
                                variant="outline"
                                className={`text-xs ${getRoleBadgeColor(revision.role)}`}>
                                {revision.role}
                              </Badge>
                            </div>

                            <p className="text-sm text-muted-foreground mb-2">
                              Edited by{" "}
                              <span className="font-medium text-foreground">
                                {revision.editor.username}
                              </span>
                            </p>

                            <div className="flex items-center gap-1 text-xs text-muted-foreground mb-3">
                              <Calendar className="h-3 w-3" />
                              <span>
                                {formatDate(revision.createdAt, true)}
                              </span>
                            </div>

                            {revision.note && (
                              <div className="bg-green-100 dark:bg-green-900/20 rounded-lg p-3">
                                <p className="text-sm leading-relaxed text-green-500">
                                  +{" "}
                                  {revision.note ?? "This revision has no note"}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center py-10 text-muted-foreground">
                  <span className="text-6xl mb-3 text-muted-foreground/70">
                    🔍
                  </span>
                  <p className="max-w-xl text-center">
                    This is the only version — no new revisions have been made.
                    Your revisions will show here.
                  </p>
                </div>
              ))}
          </div>
          <ScrollBar orientation="vertical" />
        </ScrollArea>

        <div className="px-6 py-4 border-t bg-background flex-shrink-0">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Showing {versions?.length ?? 0} revisions
            </p>
            <DialogClose asChild>
              <Button variant="outline" title="close dialog">
                Close
              </Button>
            </DialogClose>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RevisionHistoryDialog;
