import React, { useState } from 'react';
import { Sparkles, Lightbulb, X } from 'lucide-react';

interface TitleSectionProps {
    title: string;
    onTitleChange: (value: string) => void;
}

export const TitleSection: React.FC<TitleSectionProps> = ({
    title,
    onTitleChange,
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
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-300">
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
                placeholder="What's your story about?"
                className="w-full text-2xl font-bold border-none outline-none placeholder-gray-300 bg-transparent resize-none"
            />

            {showTitleTips && (
                <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-xl relative">
                    <button
                        onClick={() => setShowTitleTips(false)}
                        className="absolute top-3 right-3 text-blue-400 hover:text-red-600 transition-colors"
                    >
                        <X className="h-4 w-4 cursor-pointer" />
                    </button>
                    <div className="flex items-start space-x-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                            <Lightbulb className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                            <h4 className="font-semibold text-blue-900 mb-2">Writing a Good Blog Title</h4>
                            <p className="text-sm text-blue-800 leading-relaxed">
                                Think of your post title as a super short (but compelling!) description — like an overview of the actual post in one short sentence. Use keywords where appropriate to help ensure people can find your post by search. The title should be a maximum of 80 words.
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};