"use client";

import { useRef, useState } from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Camera, Loader2, UploadIcon } from "lucide-react";
import { toast } from "sonner";
import {
  deleteCloudinaryImage,
  uploadToCloudinary,
} from "@/lib/helpers/cloudinary";
import { useSession } from "@/providers/session";
import { Session } from "@/types";
import { updateUserDetails } from "@/lib/actions/user";

type ProfileImageUploaderProps = {
  currentPicture: string | null;
  onImageUpload: (imageUrl: string) => void;
  userId: number;
};

export default function ProfileImageUploader({
  currentPicture,
  onImageUpload,
  userId,
}: ProfileImageUploaderProps) {
  const imageInputRef = useRef<HTMLInputElement>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { setSession, session } = useSession();
  //   triggered on file select
  const handleImageSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error("Please select an image smaller than 2MB");
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      setSelectedFile(file);
    }
  };

  //  function to upload the image
  async function handleImageUpload() {
    if (!selectedFile) return;

    setIsUploading(true);
    const toastId = toast.loading("Uploading image...");

    const res = await uploadToCloudinary(
      selectedFile,
      "tech-tales/profile-pictures"
    );

    toast.dismiss(toastId);
    setIsUploading(false);
    if (!res.success || !res.data) {
      toast.error("Upload failed, try again.");
      return setIsUploading(false);
    }

    const imageUrl = res.data.secure_url;
    toast.success("Image uploaded successfully");
    onImageUpload(imageUrl);
    const userUpdateRes = await updateUserDetails( {
      picture: imageUrl,
    });
    if (userUpdateRes.success && userUpdateRes.user) {
      toast.success(userUpdateRes.message);
      setSession({
        ...userUpdateRes.user,
        userId,
        picture: imageUrl,
        exp: session?.exp ?? Math.floor(Date.now() / 1000) + 60 * 60 * 8,
      } as Session);
    }
    if (imageInputRef.current) imageInputRef.current.value = "";
    setSelectedFile(null);
    setPreviewImage("");
    await deleteImageIfExists();
  }
  //function to delete the old image
  async function deleteImageIfExists() {
    const cloudinaryBaseUrl =
      "https://res.cloudinary.com/dipkbpinx/image/upload/";
    if (currentPicture && currentPicture.startsWith(cloudinaryBaseUrl)) {
      const lastSegment = currentPicture.split("/").pop(); // could be undefined
      if (lastSegment) {
        const public_id =
          "tech-tales/profile-pictures/" + lastSegment.split(".")[0];
        await deleteCloudinaryImage(public_id);
      }
    }
  }

  return (
    <div className="flex flex-col sm:flex-row sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
      <div
        className="relative flex-shrink-0 self-center sm:self-start"
        onClick={() => imageInputRef.current?.click()}>
        {previewImage ? (
          <Avatar
            className="h-24 w-24 ring-offset-2 ring-offset-accent ring-4 ring-blue-600 dark:ring-white shadow-lg cursor-pointer"
            title="Change profile picture">
            <AvatarImage
              src={previewImage ?? "/placeholder.svg"}
              alt="Profile"
              className="object-cover"
            />
          </Avatar>
        ) : (
          <Avatar
            className="h-24 w-24 ring-offset-2 ring-offset-accent ring-4 ring-blue-600 dark:ring-white shadow-lg cursor-pointer"
            title="Change profile picture">
            <AvatarImage
              src={currentPicture || "/placeholder.svg"}
              alt="Profile"
              className="object-cover"
            />
          </Avatar>
        )}
        <label className="absolute -bottom-1 -right-1 p-1.5 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors cursor-pointer shadow-lg">
          <Camera className="w-3 h-3" />
          <Input
            type="file"
            accept="image/*"
            ref={imageInputRef}
            onChange={handleImageSelect}
            className="hidden"
          />
        </label>
      </div>

      <div className="text-center sm:text-left">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
          Profile Picture
        </h3>
        <p className="text-[10px] sm:text-xs max-w-[80%] sm:max-w-max mx-auto sm:mx-0 text-muted-foreground leading-relaxed">
          <strong>Recommended:</strong> Square JPG, PNG, or JPEG, at least 1,000
          pixels per side and less than 2MB in size.
        </p>

        <div className="mt-3 text-sm font-medium text-blue-600 dark:text-blue-400">
          {/* appears if image exists */}
          {previewImage ? (
            <div className="flex items-center  w-full justify-center sm:justify-normal space-x-6">
              <button
                disabled={isUploading || !selectedFile}
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all cursor-pointer disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] h-8  px-3 has-[>svg]:px-2.5 hover:bg-blue-500 hover:text-white "
                type="button"
                onClick={handleImageUpload}
                title="upload photo">
                {isUploading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Uploading ...
                  </>
                ) : (
                  <>
                    <UploadIcon className="h-4 w-4" /> Upload Photo
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelectedFile(null);
                  setPreviewImage("");
                }}
                disabled={isUploading}
                className="hover:underline text-destructive cursor-pointer disabled:pointer-events-none disabled:opacity-50">
                Remove
              </button>
            </div>
          ) : (
            <button
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all cursor-pointer disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] h-8  px-3 has-[>svg]:px-2.5 hover:bg-blue-500 hover:text-white "
              type="button"
              onClick={() => imageInputRef.current?.click()}>
              <Camera className="h-4 w-4" /> Select Photo
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
