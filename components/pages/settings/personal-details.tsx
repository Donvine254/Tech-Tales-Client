"use client";
import React, { useState } from "react";
import { Loader2, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ColorPicker from "./color-picker";
import { Textarea } from "@/components/ui/textarea";
import { convertToHandle } from "@/lib/utils";
import { Session, UserProfileData } from "@/types";
import { toast } from "sonner";
import { updateUserDetails } from "@/lib/actions/user";
import { useSession } from "@/providers/session";
import ProfileImageUploader from "./profile-image";

export default function PersonalDetails({
  initialData,
  userId,
}: {
  initialData: Pick<
    UserProfileData,
    "username" | "bio" | "handle" | "skills" | "picture" | "branding"
  >;
  userId: number;
}) {
  const [formData, setFormData] = useState(initialData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { setSession, session } = useSession();
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

  const hasChanges = JSON.stringify(formData) !== JSON.stringify(initialData);
  //function to submit the form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!hasChanges) {
      toast.error("Kindly make changes before submitting data");
      return;
    }
    setIsSubmitting(true);
    const toastId = toast.loading("Processing request..");
    const res = await updateUserDetails(userId, formData);
    toast.dismiss(toastId);
    setIsSubmitting(false);
    if (res.success && res.user) {
      toast.success(res.message);
      const newSession: Session = {
        ...res.user,
        userId: userId,
        picture: res.user.picture as string,
        exp: session?.exp ?? Math.floor(Date.now() / 1000) + 60 * 60 * 8,
      };
      setSession(newSession);
    } else {
      toast.error(res.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="py-4 sm:p-6 lg:p-8 space-y-6">
      <div>
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
          Personal Details
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-muted-foreground">
          Update your personal information and profile settings
        </p>
      </div>
      {/* Profile Image */}
      <ProfileImageUploader
        currentPicture={initialData.picture}
        onImageUpload={(imgUrl) =>
          setFormData((prev) => ({ ...prev, picture: imgUrl }))
        }
        userId={userId}
      />
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
          value={formData.bio ?? ""}
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
          value={formData.skills ?? ""}
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
          color={formData.branding ?? "#155dfc"}
          setColor={(value) =>
            setFormData((prev) => ({ ...prev, branding: value }))
          }
        />
      </div>

      {/* Submit Button */}
      <div className="flex space-x-2 md:space-x-4 justify-between sm:justify-end">
        <Button
          type="reset"
          variant="outline"
          disabled={!hasChanges || isSubmitting}
          onClick={() => setFormData(initialData)}>
          Cancel
        </Button>
        <Button
          type="submit"
          variant="ghost"
          disabled={!hasChanges || isSubmitting}
          className="bg-gradient-to-tr from-blue-500 to-blue-600  hover:shadow-md hover:scale-[1.02] transition-all duration-200 ease-in-out text-white hover:text-white">
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Saving ...</span>
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              <span>Save Changes</span>
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
