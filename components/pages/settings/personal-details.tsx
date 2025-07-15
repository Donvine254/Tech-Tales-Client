import React, { useRef, useState } from "react";
import { Camera, Save, UploadIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ColorPicker from "./color-picker";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { convertToHandle } from "@/lib/utils";
import { UserProfileData } from "@/types";

export default function PersonalDetails({ user }: { user: UserProfileData }) {
  const [formData, setFormData] = useState({
    username: user.username || "",
    bio: user.bio || "",
    handle: user.handle || "",
    skills: user.skills || "",
    picture: user.picture || "",
    branding: user.branding || "#01142d",
  });
  const imageInputRef = useRef<HTMLInputElement>(null);
  const [profileImage, setProfileImage] = useState(
    user.picture || "placeholder.svg"
  );

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "username" && { handle: convertToHandle(value) }),
    }));
  };
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitted:", { formData, profileImage });
    // Submit logic here...
  };

  return (
    <form onSubmit={handleSubmit} className="py-4 sm:p-6 lg:p-8 space-y-8">
      <div>
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
          Personal Details
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-muted-foreground">
          Update your personal information and profile settings
        </p>
      </div>
      {/* Profile Image */}
      <div className="flex flex-col sm:flex-row sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
        <div
          className="relative flex-shrink-0 self-center sm:self-start"
          onClick={() => imageInputRef.current?.click()}>
          <Avatar className="h-24 w-24 border-2 border-primary/20 ring-4 ring-primary shadow-lg">
            <AvatarImage
              src={profileImage || "/placeholder.svg"}
              alt="Profile"
              className="object-cover"
            />
            <AvatarFallback className="text-xl font-semibold bg-primary/10 text-primary">
              {formData.username.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <label className="absolute -bottom-1 -right-1 p-1.5 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors cursor-pointer shadow-lg">
            <Camera className="w-3 h-3" />
            <Input
              type="file"
              accept="image/*"
              ref={imageInputRef}
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>
        </div>

        <div className="text-center sm:text-left">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            Profile Picture
          </h3>
          <p className="text-[10px] sm:text-xs max-w-[80%] sm:max-w-max mx-auto sm:mx-0 text-muted-foreground leading-relaxed">
            <strong>Recommended:</strong> Square JPG, PNG, or JPEG, at least
            1,000 pixels per side and less than 2MB in size.
          </p>

          <div className="mt-3 text-sm font-medium text-blue-600 dark:text-blue-400">
            {/* appears if image exists */}
            {profileImage ? (
              <div className="flex items-center  w-full justify-center sm:justify-normal space-x-6">
                <button
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all cursor-pointer disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] h-8  px-3 has-[>svg]:px-2.5 hover:bg-blue-500 hover:text-white "
                  type="button"
                  title="upload photo">
                  <UploadIcon className="h-4 w-4" /> Upload Photo
                </button>
                <button
                  type="button"
                  onClick={() => setProfileImage("")}
                  className="hover:underline text-destructive">
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

      {/* Form Fields */}
      <div className="space-y-6">
        <Label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-200">
          Username
        </Label>
        <Input
          type="text"
          name="username"
          pattern="^[a-zA-Z\s]*$"
          title="numbers and special characters are not allowed"
          maxLength={20}
          minLength={3}
          value={formData.username}
          onChange={handleInputChange}
          placeholder="Enter your username"
          required
        />
        <Label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-200">
          Bio
        </Label>
        <Textarea
          name="bio"
          value={formData.bio}
          onChange={handleInputChange}
          minLength={10}
          maxLength={150}
          rows={3}
          placeholder="Tell us about yourself..."
        />

        <Label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-200">
          Skills / Languages
        </Label>
        <Textarea
          name="skills"
          value={formData.skills}
          onChange={handleInputChange}
          rows={3}
          minLength={2}
          maxLength={200}
          placeholder="List your skills and languages..."
        />

        <Label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-200">
          Branding Color
        </Label>
        <ColorPicker
          color={formData.branding}
          setColor={(value) =>
            setFormData((prev) => ({ ...prev, branding: value }))
          }
        />
      </div>

      {/* Submit Button */}
      <div className="flex space-x-2 md:space-x-4 justify-between sm:justify-end">
        <Button type="submit" variant="outline">
          Cancel
        </Button>
        <Button
          type="submit"
          variant="ghost"
          className="bg-gradient-to-tr from-blue-500 to-blue-600  hover:shadow-md hover:scale-[1.02] transition-all duration-200 ease-in-out text-white">
          <Save className="w-4 h-4" />
          <span>Save Changes</span>
        </Button>
      </div>
    </form>
  );
}
