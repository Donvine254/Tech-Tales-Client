import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  Crown,
  Edit2,
  Feather,
  Flag,
  MoreHorizontal,
  Trash2,
} from "lucide-react";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { formatDate } from "@/lib/utils";
import { ResponseData, Session } from "@/types";
import { Badge } from "../ui/badge";
import CommentBody from "./comment-body";
type Props = {
  response: ResponseData;
  blogAuthorId: number;
  session: Session | null;
};

export default function Response({ response, blogAuthorId, session }: Props) {
  return (
    <div key={response.id} className="flex space-x-4">
      {/* User Avatar */}
      <div className="flex-shrink-0">
        <Avatar className="h-8 w-8 ring-2 ring-cyan-500 ring-offset-2">
          <AvatarImage
            src={response.author.picture ?? "/placeholder.svg"}
            alt={response.author.username}
          />
          <AvatarFallback className="bg-gradient-to-r from-cyan-100 to-blue-100 text-cyan-700 text-sm">
            {response.author.username
              .split(" ")
              .map((n: string) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
      </div>

      {/* Response Content */}
      <div className="flex-1 min-w-0">
        {/* Author Info */}
        <div className="flex items-center justify-between md:justify-normal md:space-x-6  w-full">
          {/* Left: Author info */}
          <div className="flex items-center space-x-2">
            <h5 className="font-semibold capitalize truncate text-ellipsis whitespace-nowrap">
              {response.author.username}
            </h5>
            {blogAuthorId === response.authorId ? (
              <Badge
                title="author"
                className="bg-blue-100 font-semibold text-blue-500">
                <Feather className="h-4 w-4 mr-1" />
                <span className="hidden sm:block">Author</span>
              </Badge>
            ) : response.author.role === "admin" ? (
              <Badge
                className="bg-purple-100 font-semibold text-purple-500"
                title="admin">
                <Crown className="h-4 w-4 mr-1" />
                <span className="hidden sm:block">Admin</span>
              </Badge>
            ) : null}
          </div>
          {/* Right: Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-32">
              {session?.userId === response.authorId ? (
                <>
                  <DropdownMenuItem>
                    <Edit2 className="h-4 w-4 mr-2" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-red-600 focus:text-red-600">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </DropdownMenuItem>
                </>
              ) : (
                <>
                  <DropdownMenuItem
                    className="text-red-600 focus:text-red-600"
                    onClick={() =>
                      toast.info("Thank you helping keep our community safe")
                    }>
                    <Flag className="h-4 w-4 mr-2" />
                    Report
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground  mb-1">
          <span>{formatDate(response.createdAt)}</span>
          {response.updatedAt &&
            new Date(response.updatedAt).getTime() !==
              new Date(response.createdAt).getTime() && (
              <span className="text-xs text-muted-foreground">(edited)</span>
            )}
        </div>
        {/* Response Body */}
        <CommentBody body={response.body} />
      </div>
    </div>
  );
}
