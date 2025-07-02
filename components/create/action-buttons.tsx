import React from 'react'
import { Button } from '../ui/button'
import { Eye, Save, Sparkles, X } from 'lucide-react';
import { BlogData } from '@/types';
import { toast } from 'sonner';
type Props = {
    data: BlogData;
    hasEntries: (data: BlogData) => boolean;

}

export default function ActionButtons({ data, hasEntries }: Props) {
    const hasAllEntries = (data: BlogData): boolean => {
        return (
            data.title.trim() !== "" &&
            data.body.trim() !== "" &&
            data.tags.trim() !== "" &&
            data.image.secure_url.trim() !== ""
        );
    };

    const handleSave = () => {
        // change this to save the draft to the database
        const dataStr = JSON.stringify(data);
        localStorage.setItem("blog-draft", dataStr);
        toast.success("Draft saved successfully")
    }
    const clearDraft = () => {
        localStorage.removeItem("blog-draft");
        toast.success("Draft deleted!")
    }

    const handlePublish = () => {
        toast.info("function not implemented")
    }
    return (
        <div className="flex items-center flex-wrap justify-between sm:flex-row gap-3 px-6 py-4 bg-card rounded-2xl shadow-2xl border border-border p-6 hover:shadow-md transition-all duration-300">
            <Button
                variant="outline"
                disabled={!hasEntries(data)}
                // onClick={handlePreview}
                className="flex items-center gap-2 hover:bg-slate-50 bg-white/90 backdrop-blur-sm shadow-lg border-slate-200 px-4 py-2"
            >
                <Eye className="w-4 h-4" />
                Preview
            </Button>
            <Button
                onClick={clearDraft}
                disabled={!hasEntries(data)}
                variant="outline"
                className="flex items-center gap-2 bg-white/90 backdrop-blur-sm shadow-lg border-slate-200 text-red-600 hover:text-red-700 hover:bg-red-50 px-4 py-2"
            >
                <X className="w-4 h-4" />
                Clear Draft
            </Button>
            <Button
                onClick={handleSave}
                variant="outline"
                className="flex items-center gap-2 bg-white/90 backdrop-blur-sm shadow-lg border-slate-200 px-4 py-2"
            >
                <Save className="w-4 h-4" />
                Save Draft
            </Button>
            <Button
                onClick={handlePublish}
                disabled={!hasAllEntries(data)}
                className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-slate-400 disabled:to-slate-500 disabled:cursor-not-allowed shadow-lg px-4 py-2"
            >
                <Sparkles className="w-4 h-4" />
                Publish
            </Button>
        </div>
    )
}