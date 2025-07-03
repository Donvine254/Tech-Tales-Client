"use client";

import type React from "react";
import { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { X, Hash, HelpCircle, RefreshCw, Wand2 } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "sonner";
import { baseUrl } from "@/lib/utils";
interface TagsSectionProps {
  tags: string[];
  title: string;
  onTagsChange: (tags: string[]) => void;
  disabled?: boolean;
}
export const TagsSection: React.FC<TagsSectionProps> = ({
  tags,
  title,
  onTagsChange,
  disabled = false,
}) => {
  const [currentTag, setCurrentTag] = useState("");
  const [isGeneratingTags, setIsGeneratingTags] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag(currentTag.trim());
    }
    if (e.key === "Backspace" && !currentTag) {
      removeTag(tags.length - 1);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.includes(",")) {
      const newTags = value
        .split(",")
        .map((tag) => tag.toLowerCase().trim())
        .filter((tag) => tag);
      newTags.forEach((tag) => addTag(tag));
      setCurrentTag("");
    } else {
      setCurrentTag(value);
    }
  };

  const addTag = (tag: string) => {
    if (tag && !tags.includes(tag) && tags.length < 4) {
      const updatedTags = [...tags, tag];
      onTagsChange(updatedTags);
    }
    setCurrentTag("");
  };

  const removeTag = (index: number) => {
    const updatedTags = tags.filter((_, i) => i !== index);
    onTagsChange(updatedTags);
  };

  const handleTagClick = (tag: string, index: number) => {
    setCurrentTag(tag);
    removeTag(index);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 10);
  };
  // function to generate tags with AI
  async function generateAITags() {
    if (!title.trim()) {
      toast.error("Kindly write a title first");
      return false;
    }
    setIsGeneratingTags(true);
    try {
      const requestData = {
        message:
          "Based on the following blog title, generate exactly four relevant tags that best describe its content and topics. Return them as a single comma-separated string in this format: 'tag1,tag2,tag3,tag4'. Do not include any explanation or introductory text—only the tags. Tags should be as short as possible, max 15 letters.",
        body: title,
      };
      const res = await fetch(`${baseUrl}/api/gemini`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });
      if (res.ok) {
        const data = await res.json();
        onTagsChange(data.message.split(","));
      } else {
        toast.error("something went wrong");
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    } finally {
      setIsGeneratingTags(false);
    }
  }

  return (
    <Card className="bg-card rounded-2xl shadow-sm border border-border p-6 hover:shadow-md transition-all duration-300">
      <div className="flex items-center space-x-3 mb-2">
        <div className="p-2 bg-blue-100 rounded-lg">
          <Hash className="h-5 w-5 text-blue-600" />
        </div>
        <label
          htmlFor="tag-input"
          className="text-lg font-semibold flex items-center gap-2 text-primary">
          Tags
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <HelpCircle className="h-4 w-4" />
              </TooltipTrigger>
              <TooltipContent
                className="max-w-72 text-sm"
                side="bottom"
                data-state="delayed-open">
                <p className="text-xs">
                  Add up to 4 tags to help categorize your blog post. Press
                  Enter or comma to add tags. Backspace to remove last tag
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </label>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={generateAITags}
                disabled={
                  !title.trim() || isGeneratingTags || tags.length === 4
                }
                className="ml-auto p-2 bg-gradient-to-r from-blue-500 to-cyan-500 cursor-pointer text-white rounded-lg hover:from-blue-600 hover:to-cyan-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg">
                {isGeneratingTags ? (
                  <RefreshCw className="h-4 w-4 animate-spin" />
                ) : (
                  <Wand2 className="h-4 w-4" />
                )}
              </button>
            </TooltipTrigger>
            <TooltipContent
              className="max-w-72 text-sm"
              side="bottom"
              data-state="delayed-open">
              <p className="text-xs">Auto Generate Tags with AI</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className="space-y-4">
        {/* Tags Display */}
        <div className="flex flex-wrap gap-2 min-h-[2rem]">
          {tags.map((tag, index) => (
            <Button
              key={index}
              size={"sm"}
              variant="outline"
              className="group cursor-pointer"
              onClick={() => handleTagClick(tag, index)}>
              {tag}
              <X
                className="w-3 h-3 group-hover:text-red-500"
                onClick={(e) => {
                  e.stopPropagation();
                  removeTag(index);
                }}
              />
            </Button>
          ))}
          {tags.length === 0 && (
            <span className="text-muted-foreground text-sm italic">
              No tags added yet
            </span>
          )}
        </div>

        {/* Tag Input */}
        <div className="flex gap-2">
          <Input
            id="tag-input"
            placeholder="Add a tag..."
            value={currentTag}
            ref={inputRef}
            maxLength={15}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            disabled={disabled || tags.length >= 4}
            className="border-slate-200 focus:border-blue-400 text-base bg-transparent"
          />
          <Button
            type="button"
            onClick={() => addTag(currentTag.trim())}
            disabled={disabled || !currentTag.trim() || tags.length >= 4}
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 dark:text-white hover:to-blue-700 px-4">
            Add
          </Button>
        </div>
      </div>
    </Card>
  );
};
