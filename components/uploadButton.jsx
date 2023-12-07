"use client";
import React, { useState, useRef } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
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
      alert("Image is too big, max allowed size is 5MB");
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
    <div>
      <label
        htmlFor="title"
        className="p-2 mt-2 text-xl text-center font-bold text-black">
        Cover Image
      </label>
      <div className="flex flex-col md:flex-row md:items-center md:gap-5">
        <div className="relative min-w-0 flex-auto ">
          <input
            className="mb-2 p-2 rounded border w-full border-solid border-blue-600 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-black transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-blue-600 file:px-3 file:py-[0.32rem] file:text-white  file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem]  focus:border-primary focus:outline-none "
            type="file"
            name="image"
            ref={fileInputRef}
            accept="image/*"
            onChange={handleChange}
          />
          <span
            className={`absolute top-1/2 right-0 transform -translate-y-1/2 ${
              image === "" ? "hidden" : ""
            }`}>
            <svg
              className="fill-current h-6 w-6 text-gray-600"
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
          title="button"
          onClick={handleImageUpload}
          disabled={isLoading || image === ""}
          className="bg-blue-600 mb-2 xsm:w-full min-w-[150px] w-fit py-[0.32rem] rounded border border-solid border-blue-600 bg-clip-padding px-5 text-white flex items-center justify-center">
          {isLoading ? (
            <p className="flex gap-2">
              <AiOutlineLoading3Quarters className="animate-spin text-xl font-bold" />
              Uploading....
            </p>
          ) : (
            " Upload"
          )}
        </button>
      </div>
      <p>
        <span className="text-red-500 font-bold">*</span>Max size 5MB
      </p>
    </div>
  );
}
