"use client";
import React, { useState, useRef } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
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
      const response = await Axios.post(
        "https://api.cloudinary.com/v1_1/dipkbpinx/image/upload",
        newImage
      );
      const data = await response.data;
      imageUrl = data?.secure_url;
      setBlog((prev) => ({
        ...prev,
        image: data?.secure_url,
      }));
      setIsLoading(false);
      fileInputRef.current = null;
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
        <input
          className="mb-2 p-2 min-w-0 flex-auto rounded border border-solid border-blue-600 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-black transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-blue-600 file:px-3 file:py-[0.32rem] file:text-white  file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem]  focus:border-primary focus:outline-none "
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
          required
        />
        <button
          type="button"
          title="button"
          onClick={handleImageUpload}
          className="bg-blue-600 mb-2 py-[0.32rem] rounded border border-solid border-blue-600 bg-clip-padding px-5 text-white flex w-fit">
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
