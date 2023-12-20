"use client";
import React, { useState, useRef } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import axiosInstance from "@/axiosConfig";
import { useRouter } from "next/navigation";
export default function UpdateProfileModal({ user }) {
  const router = useRouter();
  const fileInputRef = useRef(null);
  const [image, setImage] = useState("");
  const [data, setData] = useState({
    picture: user.picture,
    username: user.username,
  });
  function handleFileChange(e) {
    const maxAllowedSize = 5 * 1024 * 1024;
    if (e.target.files[0].size > maxAllowedSize) {
      toast.error("Image is too big, max allowed size is 5MB");
      fileInputRef.current = null;
      return false;
    }
    setImage(e.target.files[0]);
  }

  async function handleImageUpload() {
    if (
      (image !== "" && image.type === "image/png") ||
      image.type === "image/jpg" ||
      image.type === "image/jpeg"
    ) {
      const newImage = new FormData();
      newImage.append("file", image);
      newImage.append("cloud_name", "dipkbpinx");
      newImage.append("upload_preset", "ekomtspw");
      try {
        const response = await axiosInstance.post(
          "https://api.cloudinary.com/v1_1/dipkbpinx/image/upload",
          newImage
        );
        const responseData = await response.data;
        setData((prev) => ({
          ...prev,
          picture: responseData.secure_url,
        }));
        toast.success("Uploaded successfully!");
      } catch (error) {
        console.error("Error uploading image:", error);
        toast.error("upload failed");
      }
    }
  }
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (data && user) {
        const response = await axiosInstance.patch(
          `https://techtales.up.railway.app/users/${user.id}`,
          data
        );
        setImage("");
        const userData = response.data;
        if (userData && typeof window !== undefined) {
          localStorage.setItem("loggedInUser", JSON.stringify(response.data));
        }
        toast.success("Details updated successfully!");
        document.getElementById("my_modal_5").close();
        router.refresh();
      }
    } catch (error) {
      console.error(error);
      toast.error("request failed");
    }
  }

  return (
    <dialog id="my_modal_5" className="modal backdrop-blur-2xl rounded-xl">
      <form
        className="rounded-lg border bg-card text-card-foreground shadow-sm w-full max-w-lg bg-slate-100"
        method="dialog"
        onSubmit={handleSubmit}>
        <div className="flex flex-col space-y-1.5 p-6">
          <h3 className="text-2xl font-semibold leading-none tracking-tight">
            Profile Information
          </h3>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex items-center gap-4">
            {image ? (
              <Image
                src={URL.createObjectURL(image)}
                width={80}
                height={80}
                alt="profile-picture"
                className="rounded-full h-[80px] w-[80px]"
              />
            ) : (
              <Image
                src={user.picture}
                width={80}
                height={80}
                alt="profile-picture"
                className="rounded-full"
              />
            )}
            <div>
              {image ? (
                <>
                  <button
                    className="text-green-500 font-bold"
                    type="button"
                    onClick={handleImageUpload}>
                    Upload Picture
                  </button>
                  <p className="text-gray-500">
                    Recommended: Square JPG, PNG, or JPEG, at least 1,000 pixels
                    per side and less than 5MB in size.
                  </p>
                </>
              ) : (
                <>
                  <label
                    htmlFor="fileInput"
                    className="text-green-500 font-bold cursor-pointer">
                    Update Picture
                  </label>
                  <input
                    type="file"
                    id="fileInput"
                    accept="image/*"
                    className="hidden"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                  />
                  <p className="text-gray-500">
                    Recommended: Square JPG, PNG, or JPEG, at least 1,000 pixels
                    per side and less than 5MB in size.
                  </p>
                </>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label className="font-semibold" htmlFor="username">
              Username *
            </label>
            <input
              className="flex h-10 w-full border-b border-green-500 bg-transparent focus:outline-none py-2 "
              id="username"
              value={data.username}
              onChange={(e) => {
                setData((prev) => ({
                  ...prev,
                  username: e.target.value,
                }));
              }}
            />
            <p className="text-sm text-gray-600">
              Appears on your Profile page, as your author title, and in your
              comments.
            </p>
          </div>
        </div>
        <div className="flex items-center justify-end gap-4 p-6">
          <button
            className="px-4 py-2 border-2 border-green-400 hover:border-orange-500 rounded-xl bg-transparent"
            type="button"
            onClick={() => {
              document.getElementById("my_modal_5").close();
            }}>
            Cancel
          </button>
          <button
            className="px-4 py-2 border-2 bg-blue-600 text-white rounded-xl disabled:pointer-events-none disabled:opacity-50 disabled:bg-blue-400"
            type="submit"
            disabled={
              data.username.toLowerCase().trim() ===
                user.username.toLowerCase().trim() &&
              data.picture === user.picture
            }>
            Save Changes
          </button>
        </div>
      </form>
    </dialog>
  );
}
