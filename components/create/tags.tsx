"use client"

import type React from "react"
import { useRef, useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { X, Hash, HelpCircle } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
interface TagsSectionProps {
    tags: string[]
    onTagsChange: (tags: string[]) => void
    disabled?: boolean
}
export const TagsSection: React.FC<TagsSectionProps> = ({ tags, onTagsChange, disabled = false }) => {
    const [currentTag, setCurrentTag] = useState("")
    const inputRef = useRef<HTMLInputElement>(null)
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" || e.key === ",") {
            e.preventDefault()
            addTag(currentTag.trim())
        }
        if (e.key === "Backspace" && !currentTag) {
            removeTag(tags.length - 1)
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        if (value.includes(",")) {
            const newTags = value
                .split(",")
                .map((tag) => tag.trim())
                .filter((tag) => tag)
            newTags.forEach((tag) => addTag(tag))
            setCurrentTag("")
        } else {
            setCurrentTag(value)
        }
    }

    const addTag = (tag: string) => {
        if (tag && !tags.includes(tag) && tags.length < 4) {
            const updatedTags = [...tags, tag]
            onTagsChange(updatedTags)
        }
        setCurrentTag("")
    }

    const removeTag = (index: number) => {
        const updatedTags = tags.filter((_, i) => i !== index)
        onTagsChange(updatedTags)
    }

    const handleTagClick = (tag: string, index: number) => {
        setCurrentTag(tag)
        removeTag(index)
        setTimeout(() => {
            inputRef.current?.focus()
        }, 10)

    }

    return (
        <Card className="bg-card rounded-2xl shadow-sm border border-border p-6 hover:shadow-md transition-all duration-300">
            <div className="flex items-center space-x-3 mb-2">
                <div className="p-2 bg-blue-100 rounded-lg">
                    <Hash className="h-5 w-5 text-blue-600" />
                </div>
                <label htmlFor="tag-input" className="text-lg font-semibold flex items-center gap-2 text-primary">
                    Tags
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <HelpCircle className="h-4 w-4" />
                            </TooltipTrigger>
                            <TooltipContent className="max-w-72 text-sm" side="bottom" data-state="delayed-open">
                                <p className="text-xs">Add up to 4 tags to help categorize your blog post. Press Enter or comma to add tags. Press Enter or comma to add tags. Backspace to remove last tag</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </label>
                <span className="text-sm text-muted-foreground ml-auto font-medium">{tags.length}/4</span>
            </div>
            <div className="space-y-4">
                {/* Tags Display */}
                <div className="flex flex-wrap gap-2 min-h-[2rem]">
                    {tags.map((tag, index) => (
                        <Button
                            key={index}
                            variant="outline"
                            className=""
                            onClick={() => handleTagClick(tag, index)}
                        >
                            {tag}
                            <X className="w-3 h-3 cursor-pointer hover:text-red-500" onClick={(e) => {
                                e.stopPropagation()
                                removeTag(index)
                            }} />

                        </Button>
                    ))}
                    {tags.length === 0 && <span className="text-muted-foreground text-sm italic">No tags added yet</span>}
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
                        className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 px-4"
                    >
                        Add
                    </Button>
                </div>
            </div>
        </Card>
    )
}
