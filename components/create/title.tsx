import React, { useState } from 'react';
import { Sparkles, Lightbulb, X } from 'lucide-react';
import { FormStatus } from '@/types';

interface TitleSectionProps {
    title: string;
    onTitleChange: (value: string) => void;
    status: FormStatus
}

export const TitleSection: React.FC<TitleSectionProps> = ({
    title,
    onTitleChange,
    status,
}) => {
    const [showTitleTips, setShowTitleTips] = useState(false)
    const [hasFocused, setHasFocused] = useState(false);

    const handleFocus = () => {
        if (!hasFocused) {
            setShowTitleTips(true);
            setHasFocused(true);
        }
    };
    return (
        <div className="bg-card rounded-2xl shadow-sm border border-border p-6 hover:shadow-md transition-all duration-300">
            <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                    <Sparkles className="h-5 w-5 text-blue-600" />
                </div>
                <h2 className="text-lg font-semibold text-gray-900">Your Story Title</h2>
            </div>
            <input
                type="text"
                value={title}
                onChange={(e) => onTitleChange(e.target.value)}
                onFocus={handleFocus}
                autoFocus
                maxLength={80}
                minLength={20}
                autoComplete="on"
                autoCorrect="on"
                spellCheck="true"
                disabled={status === "loading"}
                placeholder="What's your story about?"
                className="w-full text-2xl font-bold border-none outline-none placeholder-gray-300 dark:placeholder-gray-600 bg-transparent resize-none"
            />
            <div className="text-xs text-muted-foreground flex justify-end ">
                <p>
                    {title?.length ?? 0}/
                    <span className="font-medium text-muted-foreground">80</span>
                </p>
            </div>
            {showTitleTips && (
                <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 dark:border-blue-800 dark:from-blue-900 dark:to-cyan-900 rounded-xl relative">
                    <button
                        onClick={() => setShowTitleTips(false)}
                        className="absolute top-3 right-3 text-blue-400 dark:text-blue-50 hover:text-red-600 transition-colors"
                    >
                        <X className="h-4 w-4 cursor-pointer" />
                    </button>
                    <div className="flex items-start space-x-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                            <Lightbulb className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                            <h4 className="font-semibold text-blue-900 dark:text-white mb-2">Writing a Good Blog Title</h4>
                            <p className="text-sm text-blue-800 dark:text-blue-50 leading-relaxed">
                                Think of your post title as a super short (but compelling!) description — like an overview of the actual post in one short sentence. Use keywords where appropriate to help ensure people can find your post by search. The title should be a maximum of 80 words.
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};