"use client";
import React, { useState, useRef } from "react";
import toast from "react-hot-toast";
import Axios from "axios";

export default function UploadButton({ setBlog }) {
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);
  const [image, setImage] = useState("");
  //   const uploadPreset = process.env.NEXT_PUBLIC_UPLOAD_PRESET;
  function handleChange(e) {
    const maxAllowedSize = 5 * 1024 * 1024;
    if (e.target.files[0].size > maxAllowedSize) {
      toast.error("Image is too big, max allowed size is 5MB");
      fileInputRef.current = null;
      return false;
    }
    setImage(e.target.files[0]);
  }
  function clearFileInput() {
    fileInputRef.current.value = null;
    setImage("");
  }

  async function handleImageUpload() {
    setIsLoading(true);
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
        const response = await Axios.post(
          "https://api.cloudinary.com/v1_1/dipkbpinx/image/upload",
          newImage
        );
        const data = await response.data;
        setBlog((prev) => ({
          ...prev,
          image: data?.secure_url,
        }));
        setIsLoading(false);
        toast.success("Uploaded successfully!");
        clearFileInput();
      } catch (error) {
        console.error("Error uploading image:", error);
        setIsLoading(false);
        toast.error("upload failed");
        clearFileInput();
      }
    }
  }

  return (
    <div className="border-blue-500 p-2 mb-2 bg-zinc-300 border-2 border-dotted">
      <label
        htmlFor="title"
        className="my-2 text-xl text-center font-bold text-black">
        Cover Image <small className="text-gray-600 text-sm">(optional)</small>
      </label>
      <div className="flex flex-col md:flex-row md:items-center md:gap-5">
        <div className="relative min-w-0 flex-auto ">
          <input
            className="mb-2 p-2 rounded border w-full border-solid border-blue-600 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-black transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-gray-600 file:px-3 file:py-[0.32rem] file:text-white bg-gray-100 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem]  focus:border-primary focus:outline-none "
            type="file"
            name="image"
            ref={fileInputRef}
            accept="image/*"
            onChange={handleChange}
          />
          <span
            className={`absolute right-0 transform translate-y-1/2 my-auto ${
              image === "" ? "hidden" : ""
            }`}>
            <svg
              className="fill-current h-4 w-4 hover:fill-red-500 text-gray-600"
              role="button"
              onClick={clearFileInput}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20">
              <title>Clear Input</title>
              <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
            </svg>
          </span>
        </div>
        <button
          type="button"
          title={
            isLoading || image === ""
              ? "No image selected"
              : "upload blog cover image"
          }
          onClick={handleImageUpload}
          disabled={isLoading || image === ""}
          className="bg-blue-600 mb-2 xsm:w-full min-w-[150px] w-fit py-[0.32rem] rounded border  border-blue-600 bg-clip-padding px-5 text-white flex items-center justify-center disabled:bg-gray-100 disabled:text-gray-400">
          {isLoading ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 4335 4335"
              width="20"
              className="animate-spin"
              height="20">
              <path
                fill="#2563eb"
                d="M3346 1077c41,0 75,34 75,75 0,41 -34,75 -75,75 -41,0 -75,-34 -75,-75 0,-41 34,-75 75,-75zm-1198 -824c193,0 349,156 349,349 0,193 -156,349 -349,349 -193,0 -349,-156 -349,-349 0,-193 156,-349 349,-349zm-1116 546c151,0 274,123 274,274 0,151 -123,274 -274,274 -151,0 -274,-123 -274,-274 0,-151 123,-274 274,-274zm-500 1189c134,0 243,109 243,243 0,134 -109,243 -243,243 -134,0 -243,-109 -243,-243 0,-134 109,-243 243,-243zm500 1223c121,0 218,98 218,218 0,121 -98,218 -218,218 -121,0 -218,-98 -218,-218 0,-121 98,-218 218,-218zm1116 434c110,0 200,89 200,200 0,110 -89,200 -200,200 -110,0 -200,-89 -200,-200 0,-110 89,-200 200,-200zm1145 -434c81,0 147,66 147,147 0,81 -66,147 -147,147 -81,0 -147,-66 -147,-147 0,-81 66,-147 147,-147zm459 -1098c65,0 119,53 119,119 0,65 -53,119 -119,119 -65,0 -119,-53 -119,-119 0,-65 53,-119 119,-119z"
              />
            </svg>
          ) : (
            <p className="flex items-center gap-2">
              {" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" x2="12" y1="3" y2="15" />
              </svg>
              Upload
            </p>
          )}
        </button>
      </div>
      <p>
        <span className="text-red-500 font-bold">*</span>Max size 5MB
      </p>
    </div>
  );
}
