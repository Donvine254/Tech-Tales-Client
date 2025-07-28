import React, { useRef, useState } from "react";
import { HelpCircle, ImageIcon, Loader2, Upload, X } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "sonner";
import { CoverImage } from "@/types";
import {
  deleteCloudinaryImage,
  uploadToCloudinary,
  validateImage,
} from "@/lib/helpers/cloudinary";
import { cn } from "@/lib/utils";

interface CoverImageProps {
  image: CoverImage;
  onImageChange: (data: CoverImage) => void;
}

export const CoverImageSection: React.FC<CoverImageProps> = ({
  image,
  onImageChange,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const result = await validateImage(file);
    if (!result.isValid) return;
    const url = URL.createObjectURL(file);
    onImageChange({
      secure_url: url,
      public_id: crypto.randomUUID(),
    });
    // Upload the image here
    handleFileUpload(file);
  };

  const handleRemoveImage = async () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    onImageChange({
      secure_url: "",
      public_id: "",
    });
    await deleteCloudinaryImage(image.public_id);
  };

  async function handleFileUpload(file: File) {
    setIsUploading(true);
    try {
      const res = await uploadToCloudinary(file, "tech-tales/cover-images");
      if (res.success && res.data) {
        toast.success("Image uploaded successfully");
        onImageChange(res.data);
        if (fileInputRef.current) {
          (fileInputRef.current as HTMLInputElement).value = "";
        }
      } else {
        toast.error("Upload failed, try again.");
      }
      setIsUploading(false);
    } catch (error) {
      console.error(error);
      setIsUploading(false);
      toast.error("Something went wrong.");
    }
  }

  return (
    // remember to remove max-w-md and my-4
    <div className="bg-card rounded-2xl shadow-sm border border-border p-6 hover:shadow-md transition-all duration-300">
      <div className="flex items-center space-x-3 mb-4">
        <div className="p-2 bg-blue-100 rounded-lg">
          <ImageIcon className="h-5 w-5 text-blue-600" />
        </div>
        <label
          htmlFor="image"
          className="font-semibold text-primary flex items-center gap-2">
          Cover Image
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <HelpCircle className="h-4 w-4" />
              </TooltipTrigger>
              <TooltipContent className="max-w-72 text-sm" side="bottom">
                <p>Images should be 16:9, Min 1280x720 Max 5MB</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </label>
      </div>

      {!image.secure_url ? (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-border rounded-xl p-6 text-center hover:border-blue-300 hover:bg-blue-50 dark:hover:bg-blue-500 dark:hover:border-blue-100 transition-all duration-200 cursor-pointer group min-h-48">
          <div className="p-3 bg-gray-100 group-hover:bg-blue-100 rounded-full w-fit mx-auto mb-3 transition-colors">
            <Upload className="h-6 w-6 text-gray-400 group-hover:text-cyan-500 transition-colors" />
          </div>
          <p className="text-sm font-medium text-primary/80 mb-2">
            Select Cover Image
          </p>
          <p className="text-sm text-muted-foreground">16:9 • Max 5MB</p>
        </div>
      ) : (
        <div className="relative group">
          {/* eslint-disable */}
          <img
            src={image.secure_url}
            alt="Cover preview"
            className="w-full h-48 aspect-video object-cover rounded-xl border border-border"
          />
          <div
            className={cn(
              "absolute bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity  inset-0  duration-200 rounded-xl flex items-center justify-center",
              isUploading ? "opacity-100" : ""
            )}>
            {/* when submitting, replace this button with a loader and hide it */}
            {!isUploading ? (
              <button
                onClick={handleRemoveImage}
                title="change/remove"
                className="opacity-0 group-hover:opacity-100 transition-all duration-200 p-3 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-lg transform scale-90 group-hover:scale-100 cursor-pointer w-12 h-12">
                <X className="h-6 w-6" />
              </button>
            ) : (
              <div className="flex flex-col items-center space-y-2">
                {" "}
                <button
                  onClick={handleRemoveImage}
                  title="uploading.."
                  disabled
                  className="group-hover:opacity-100 transition-all duration-200 p-3 w-12 h-12 bg-gray-100  text-green-500 rounded-full shadow-lg transform scale-90 group-hover:scale-100 inline-flex items-center justify-center">
                  <Loader2 className="h-8 w-8 animate-spin" />
                </button>
                <span>Uploading..</span>
              </div>
            )}
          </div>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/avif"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
};
