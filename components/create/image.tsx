import React, { useRef, useState } from 'react';
import { HelpCircle, ImageIcon, Upload, X } from 'lucide-react';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from 'sonner';

interface ImageValidation {
    isValid: boolean;
    width: number;
    height: number;
    size: number;
    aspectRatio: number;
}

interface CoverImageProps {
    image: string;
    onImageChange: (url: string) => void;
}

const validateImage = (file: File): Promise<ImageValidation> => {
    return new Promise((resolve) => {
        const img = new window.Image();
        const url = URL.createObjectURL(file);

        img.onload = () => {
            const width = img.naturalWidth;
            const height = img.naturalHeight;
            const size = file.size;
            const aspectRatio = width / height;

            let isValid = true;

            // Check size
            if (size > 5 * 1024 * 1024) {
                toast.error('Image must be less than 5MB');
                isValid = false;
            }

            // Check minimum dimensions
            if (width < 1280 || height < 720) {
                toast.error('Image must be at least 1280x720px');
                isValid = false;
            }

            // Check aspect ratio (16:9)
            const targetRatio = 16 / 9;
            const tolerance = 0.1;
            if (Math.abs(aspectRatio - targetRatio) > tolerance) {
                toast.error('Image should have approximately 16:9 aspect ratio');
                isValid = false;
            }

            URL.revokeObjectURL(url);

            resolve({
                isValid,
                width,
                height,
                size,
                aspectRatio,
            });
        };

        img.onerror = () => {
            URL.revokeObjectURL(url);
            toast.error('Invalid image file');
            resolve({
                isValid: false,
                width: 0,
                height: 0,
                size: 0,
                aspectRatio: 0,
            });
        };

        img.src = url;
    });
};

export const CoverImageSection: React.FC<CoverImageProps> = ({ image, onImageChange }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [previewImage, setPreviewImage] = useState(image || "")

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return
        const result = await validateImage(file)
        if (result.isValid) {
            const url = URL.createObjectURL(file);
            setPreviewImage(url)
            onImageChange(url);
        }
    };

    const handleRemoveImage = () => {
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
        onImageChange('');
        setPreviewImage("")
    };

    return (
        // remember to remove max-w-md and my-4
        <div className="bg-card rounded-2xl shadow-sm border border-border my-4 p-6 hover:shadow-md transition-all duration-300 max-w-md">
            <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-cyan-100 rounded-lg">
                    <ImageIcon className="h-5 w-5 text-cyan-600" />
                </div>
                <label htmlFor='image' className="font-semibold text-primary flex items-center gap-2">
                    Cover Image
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <HelpCircle className="h-4 w-4" />
                            </TooltipTrigger>
                            <TooltipContent className="max-w-72 text-sm" side="bottom">
                                <p>Images should be 16:9 • Min 1280x720 • Max 5MB</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </label>
            </div>

            {!image ? (
                <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-border rounded-xl p-6 text-center hover:border-blue-300 hover:bg-blue-50 dark:hover:bg-blue-500 dark:hover:border-blue-100 transition-all duration-200 cursor-pointer group"
                >
                    <div className="p-3 bg-gray-100 group-hover:bg-blue-100 rounded-full w-fit mx-auto mb-3 transition-colors">
                        <Upload className="h-6 w-6 text-gray-400 group-hover:text-cyan-500 transition-colors" />
                    </div>
                    <p className="text-sm font-medium text-primary/80 mb-2">Select Cover Image</p>
                    <p className="text-sm text-muted-foreground">16:9 • Max 5MB</p>
                </div>
            ) : (
                <div className="relative group">
                    {/* eslint-disable */}
                    <img
                        src={previewImage}
                        alt="Cover preview"
                        className="w-full h-48 object-cover rounded-xl border border-border bg-blend-overlay"
                    />
                    <div className="absolute bg-black/50  group-hover:bg-opacity-3 inset-0 group-hover:bg-opacity-30 transition-all duration-200 rounded-xl flex items-center justify-center">
                        {/* when submitting, replace this button with a loader and hide it */}
                        <button
                            onClick={handleRemoveImage}
                            title="change/remove"
                            className="opacity-0 group-hover:opacity-100 transition-all duration-200 p-3 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-lg transform scale-90 group-hover:scale-100 cursor-pointer"
                        >
                            <X className="h-6 w-6" />
                        </button>
                    </div>
                </div>
            )}

            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
            />
        </div>
    );
};

