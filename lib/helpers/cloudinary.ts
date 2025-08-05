import { toast } from "sonner";
import { baseUrl } from "../utils";
import { CoverImage } from "@/types";

export async function uploadToCloudinary(image: File, folder: string) {
  const newImage = new FormData();
  newImage.append("file", image);
  newImage.append("cloud_name", "dipkbpinx");
  newImage.append("upload_preset", "ekomtspw");
  newImage.append("folder", folder);
  try {
    const response = await fetch(
      "https://api.cloudinary.com/v1_1/dipkbpinx/image/upload",
      {
        method: "POST",
        body: newImage,
      }
    );
    const res = await response.json();
    return {
      success: true,
      message: "Image uploaded successfully",
      data: {
        secure_url: res.secure_url,
        public_id: res.public_id,
      } satisfies CoverImage,
    };
  } catch (error) {
    console.error("Error uploading image:", error);
    return { success: false, message: "Something went wrong" };
  }
}
// TODO: Create function to upload audio filed to cloudinary under folder name tech-tales/blog-audio
export async function uploadAudioToCloudinary(audio: File) {
  const formData = new FormData();
  formData.append("file", audio);
  formData.append("cloud_name", "dipkbpinx");
  formData.append("upload_preset", "ml_default"); // make sure preset allows audio
  // formData.append("folder", "tech-tales/blog-audio");

  try {
    const response = await fetch(
      "https://api.cloudinary.com/v1_1/dipkbpinx/video/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    const res = await response.json();

    return {
      success: true,
      message: "Audio uploaded successfully",
      data: {
        secure_url: res.secure_url,
        public_id: res.public_id,
      },
    };
  } catch (error) {
    console.error("Error uploading audio:", error);
    return { success: false, message: "Something went wrong" };
  }
}

/*Function to delete files from cloudinary, helps save storage space for unnecessary assets*/
export async function deleteCloudinaryImage(publicId: string) {
  try {
    await fetch(`${baseUrl}/api/cloudinary`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ public_id: publicId }),
    });
    console.log(`Deleted Cloudinary image: ${publicId}`);
  } catch (error) {
    console.error(`Failed to delete Cloudinary image: ${publicId}`, error);
  }
}

interface ImageValidation {
  isValid: boolean;
  width: number;
  height: number;
  size: number;
  aspectRatio: number;
}

export const validateImage = (file: File): Promise<ImageValidation> => {
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
        toast.error("Image must be less than 5MB");
        isValid = false;
      }

      // Check minimum dimensions
      if (width < 1280 || height < 720) {
        toast.error("Image must be at least 1280x720px");
        isValid = false;
      }

      // Check aspect ratio (16:9)
      const targetRatio = 16 / 9;
      const tolerance = 0.1;
      if (Math.abs(aspectRatio - targetRatio) > tolerance) {
        toast.error("Image should have approximately 16:9 aspect ratio");
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
      toast.error("Invalid image file");
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
