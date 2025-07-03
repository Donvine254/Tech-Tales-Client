import React from "react";
import { Button } from "../ui/button";
import { Eye, Save, Sparkles, X, MoreHorizontal } from "lucide-react";
import { BlogData } from "@/types";
import { toast } from "sonner";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Props = {
    data: BlogData;
    hasEntries: (data: BlogData) => boolean;
    onPublish: (e: React.FormEvent<HTMLFormElement>) => void;
    disabled: boolean;
};

export default function ActionButtons({
    data,
    hasEntries,
    onPublish,
    disabled,
}: Props) {
    const hasAllEntries = (data: BlogData): boolean => {
        return (
            data.title.trim() !== "" &&
            data.body.trim() !== "" &&
            data.tags.trim() !== "" &&
            data.image.secure_url.trim() !== ""
        );
    };

    const handleSave = () => {
        const dataStr = JSON.stringify(data);
        localStorage.setItem("blog-draft", dataStr);
        toast.success("Draft saved successfully");
    };

    const clearDraft = () => {
        localStorage.removeItem("blog-draft");
        toast.success("Draft deleted!");
    };

    return (
        <div className="flex gap-4 justify-between items-center bg-card rounded-2xl shadow-sm border border-border p-6 hover:shadow-md transition-all duration-300">
            {/* Left group (Preview + Clear) */}
            <div className="flex flex-wrap gap-3 md:flex-nowrap">
                <Button
                    variant="outline"
                    disabled={!hasEntries(data) || disabled}
                    className="flex items-center gap-2 hover:bg-slate-50 backdrop-blur-sm shadow-lg px-4 py-2 border-border"
                >
                    <Eye className="w-4 h-4" />
                    <span className="">Preview</span>
                </Button>

                <div className="hidden sm:block">
                    <Button
                        onClick={clearDraft}
                        disabled={!hasEntries(data) || disabled}
                        variant="outline"
                        className="flex items-center gap-2 backdrop-blur-sm shadow-lg text-red-600 hover:text-red-700 hover:bg-red-50 px-4 py-2 border-border"
                    >
                        <X className="w-4 h-4" />
                        <span className="hidden sm:inline">Clear Draft</span>
                    </Button>
                </div>
            </div>

            {/* Right group (Save + Publish) */}
            <div className="flex flex-wrap gap-3 md:flex-nowrap">
                <div className="hidden sm:block">
                    <Button
                        onClick={handleSave}
                        disabled={!hasEntries(data) || disabled}
                        variant="outline"
                        className="flex items-center gap-2 backdrop-blur-sm shadow-lg px-4 py-2 border-border"
                    >
                        <Save className="w-4 h-4" />
                        <span className="hidden sm:inline">Save Draft</span>
                    </Button>
                </div>

                <Button
                    onClick={() => onPublish}
                    disabled={!hasAllEntries(data) || disabled}
                    className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700  shadow-lg px-4 py-2"
                >
                    <Sparkles className="w-4 h-4" />
                    <span className="">Publish</span>
                </Button>

                {/* Mobile dropdown for hidden buttons */}
                <div className="sm:hidden">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="px-2 py-2">
                                <MoreHorizontal className="w-5 h-5" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem
                                onClick={handleSave}
                                className="hover:bg-blue-100 dark:hover:bg-gray-700"
                                disabled={!hasEntries(data) || disabled}
                            >
                                <Save className="w-4 h-4 mr-2" />
                                Save Draft
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={clearDraft}
                                disabled={!hasEntries(data) || disabled}
                            >
                                <X className="w-4 h-4 mr-2 text-red-600" />
                                Clear Draft
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </div>
    );
}
