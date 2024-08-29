"use client";
import React, { useState, useRef } from "react";
import toast from "react-hot-toast";
import axiosInstance from "@/axiosConfig";
import { useRouter } from "next/navigation";
import Loader from "../ui/Loader";
import secureLocalStorage from "react-secure-storage";
import { UserImage } from "../ui/Avatar";
import { baseUrl } from "@/lib";
import { convertToHandle } from "@/lib/utils";

export default function UpdateProfileModal({ user }) {
  const router = useRouter();
  const fileInputRef = useRef(null);
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [data, setData] = useState({
    picture: user?.picture,
    username: user?.username,
    bio: user?.bio ?? "",
    handle: user?.handle ?? "",
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
      setUploading(true);
      const newImage = new FormData();
      newImage.append("file", image);
      newImage.append("cloud_name", "dipkbpinx");
      newImage.append("upload_preset", "ekomtspw");
      newImage.append("folder", "TECH_TALES_PROFILE_PICTURES");
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
        setUploading(false);
        toast.success("Uploaded successfully!");
      } catch (error) {
        console.error("Error uploading image:", error);
        setUploading(false);
        toast.error("upload failed");
      }
    }
  }

  const handleUsernameChange = (e) => {
    const { value } = e.target;
    setData((prevData) => ({
      ...prevData,
      username: value,
      handle: convertToHandle(value),
    }));
  };
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const toastId = toast.loading("Processing Request...", {
        position: "bottom-center",
      });
      if (data && user) {
        const response = await axiosInstance.patch(
          `${baseUrl}/users/${user.id}`,
          data
        );
        setImage("");
        const userData = response.data;
        if (userData && typeof window !== undefined) {
          secureLocalStorage.setItem(
            "react_auth_token__",
            JSON.stringify(response.data)
          );
        }
        toast.success("Details updated successfully!");
        setLoading(false);
        document.getElementById("my_modal_5").close();
        router.refresh();
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
      setError(error?.response?.data?.error);
      toast.error("Something went wrong");
    } finally {
      toast.dismiss();
    }
  }

  return (
    <dialog id="my_modal_5" className="modal backdrop-blur-2xl rounded-xl">
      <form
        className="rounded-lg border bg-card text-card-foreground shadow-sm w-full max-w-lg bg-gray-50"
        method="dialog"
        onSubmit={handleSubmit}>
        <div className="pt-2 px-2 py-2 bg-gradient-to-r from-green-400 via-cyan-400 to-indigo-400 text-white">
          <h3 className="text-xl 0 font-semibold leading-none tracking-tight mt-2 text-center">
            Update Profile Information
          </h3>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex items-center gap-4  ">
            {image ? (
              <UserImage
                url={URL.createObjectURL(image)}
                size={80}
                onClick={handleImageUpload}
                className="!h-20 !w-20 ring ring-blue-500 ring-offset-1 ring-offset-white italic"
              />
            ) : (
              <UserImage
                url={user?.picture}
                size={80}
                onClick={handleImageUpload}
                className="!h-20 !w-20 ring ring-blue-500 ring-offset-1 ring-offset-white italic"
              />
            )}
            <div>
              {image ? (
                <>
                  <div className="flex items-center gap-4">
                    <button
                      className="text-green-500 font-bold"
                      type="button"
                      onClick={handleImageUpload}>
                      {uploading ? "Uploading..." : "Upload Picture"}
                    </button>
                    <button
                      type="reset"
                      className="text-blue-500 font-bold hover:text-red-400  cursor-pointer"
                      onClick={() => {
                        setImage(null);
                      }}>
                      Reset
                    </button>
                  </div>

                  <p className="text-gray-500 text-[14px]">
                    Recommended: Square JPG, PNG, or JPEG, at least 1,000 pixels
                    per side and less than 5MB in size.
                  </p>
                </>
              ) : (
                <>
                  <div>
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
                  </div>

                  <p className="text-gray-500 text-[14px]">
                    Recommended: Square JPG, PNG, or JPEG, at least 1,000 pixels
                    per side and less than 5MB in size.
                  </p>
                </>
              )}
            </div>
          </div>

          <div className="">
            <label className="font-semibold" htmlFor="username">
              Username
            </label>
            <input
              className="flex h-8 w-full border-b border-green-500 bg-transparent focus:outline-none py-2 invalid:border-red-500"
              id="username1"
              name="username"
              value={data.username}
              autoComplete="username"
              pattern="^[a-zA-Z\s]*$"
              title="numbers and special characters are not allowed"
              maxLength={20}
              minLength={3}
              onChange={handleUsernameChange}
            />
            <p className="text-xs text-gray-600">
              Appears on your profile page, as your author title, and in your
              comments.
            </p>
          </div>
          <div className="">
            <label className="font-semibold my-1" htmlFor="Bio">
              Bio
            </label>
            <textarea
              className=" w-full border border-green-500 focus:outline-none p-2 invalid:border-red-500 rounded-md"
              id="bio"
              name="bio"
              rows={2}
              value={data.bio}
              minLength={10}
              maxLength={150}
              spellCheck={true}
              autoComplete="on"
              autoCorrect="on"
              onChange={(e) => {
                setData((prev) => ({
                  ...prev,
                  bio: e.target.value,
                }));
              }}
            />
            <p className=" text-gray-600 flex items-center justify-between gap-4">
              <small className="text-xs">
                Appears on your Profile page and next to your articles.
              </small>
              <span className="text-sm">{data?.bio?.length ?? 0}/150</span>
            </p>
          </div>
          {error && (
            <div className=" bg-red-100 border-red-300 p-1 rounded-md text-center">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}
        </div>

        <div className="flex items-center justify-end gap-4 px-6 pb-4">
          <button
            type="reset"
            title="reset"
            className="px-4 h-10 py-0.5 border-2 border-green-400 hover:border-orange-500 rounded-xl disabled:bg-opacity-30 disabled:border-gray-200 bg-transparent"
            disabled={loading}
            onClick={() => {
              document.getElementById("my_modal_5").close();
            }}>
            Cancel
          </button>
          <button
            className="px-4 py-0.5 h-10 border-2 bg-blue-600 text-white rounded-xl disabled:pointer-events-none disabled:bg-gray-100 disabled:text-black flex items-center justify-center gap-2"
            type="submit"
            title="submit"
            disabled={
              data?.username?.toLowerCase().trim() ===
                user?.username?.toLowerCase().trim() &&
              data?.picture === user?.picture &&
              data?.bio?.toLowerCase().trim() ===
                user?.bio?.toLowerCase().trim() &&
              loading
            }>
            {loading ? (
              <>
                <Loader size="12" /> Saving...
              </>
            ) : (
              "Save Changes"
            )}
          </button>
        </div>
      </form>
    </dialog>
  );
}
