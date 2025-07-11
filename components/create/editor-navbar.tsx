import {
  ArrowLeft,
  ChevronRight,
  Eye,
  RefreshCcw,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import DeleteButton from "../modals/delete-dialog";
import { BlogStatus } from "@prisma/client";
import { FormStatus } from "@/types";

interface EditorNavbarProps {
  onPreview?: () => void;
  onPublish: (e: React.FormEvent<HTMLFormElement>) => void;
  lastSaved: Date | null;
  disabled: boolean;
  hasEntries: boolean;
  onSync: () => void;
  onDelete: () => void;
  status: BlogStatus;
  onUpdate: () => void;
  formStatus: FormStatus;
}

export const EditorNavbar = ({
  onPreview,
  onPublish,
  lastSaved,
  disabled,
  hasEntries,
  onSync,
  onDelete,
  status,
  onUpdate,
  formStatus,
}: EditorNavbarProps) => {
  const formatSaveTime = (date: Date) => {
    return `Last saved: ${date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })}`;
  };

  const action = status === "PUBLISHED" ? "archive" : "delete";
  return (
    <TooltipProvider>
      <nav className="flex items-center justify-between px-4 py-2 bg-white/90 dark:bg-gray-950 border-b border-border backdrop-blur-2xl sticky top-0 z-50">
        {/* Left side */}
        <div className="flex items-center gap-4">
          {/* Back button */}
          <Button
            variant="ghost"
            size="sm"
            asChild
            className="gap-2"
            disabled={formStatus === "loading"}>
            <Link href="/">
              <ArrowLeft className="h-4 w-4" />
              Back
            </Link>
          </Button>
          {/* Draft status */}
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer">
                <div className="relative">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div className="absolute inset-0 w-2 h-2 bg-green-500 rounded-full animate-ping opacity-75"></div>
                </div>
                <span>Draft</span>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>{lastSaved ? formatSaveTime(lastSaved) : "Just now"}</p>
            </TooltipContent>
          </Tooltip>
        </div>
        {/* action buttons */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="cursor-pointer hidden md:flex"
            onClick={onPreview}
            disabled={formStatus === "loading"}>
            <Eye className="w-4 h-4" />
            Preview
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                size="sm"
                className="gap-2 cursor-pointer"
                disabled={formStatus === "loading"}>
                Continue
                <ChevronRight className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="bg-popover p-3 space-y-2">
              <DropdownMenuItem
                onClick={onPreview}
                disabled={formStatus === "loading"}
                className="cursor-pointer md:hidden bg-secondary">
                {" "}
                <Eye className="w-4 h-4 mr-1" />
                Preview
              </DropdownMenuItem>
              {status === "DRAFT" && (
                <>
                  {" "}
                  <DropdownMenuItem
                    className="cursor-pointer"
                    disabled={!hasEntries || formStatus == "loading"}
                    onClick={onSync}
                    title="sync draft with database">
                    <RefreshCcw className="w-4 h-4 mr-1" />
                    Sync Draft
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => onPublish}
                    disabled={disabled || formStatus === "loading"}
                    title="publish blog"
                    className="flex items-center bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white cursor-pointer group">
                    <Sparkles className="w-4 h-4 text-white " />
                    <span className="group-hover:text-white">Publish</span>
                  </DropdownMenuItem>
                </>
              )}
              {status === "PUBLISHED" && (
                <DropdownMenuItem asChild>
                  <Button
                    className="cursor-pointer hover:bg-blue-500 hover:text-white"
                    disabled={!hasEntries || formStatus === "loading"}
                    onClick={onUpdate}
                    title="sync draft with database">
                    <RefreshCcw className="w-4 h-4 mr-1" />
                    Update
                  </Button>
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <DeleteButton
                  item="blog post"
                  text={`${action} Post`}
                  action={action}
                  onDelete={onDelete}
                />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
    </TooltipProvider>
  );
};
