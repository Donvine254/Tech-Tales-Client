"use client";
import React, { useState, useRef } from "react";
import toast from "react-hot-toast";
import Axios from "axios";
import Image from "next/image";
import * as sha256 from "crypto-js/sha256";
export default function UploadButton({ setBlog, uploadedImage }) {
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
      image.type === "image/jpeg" ||
      image.type === "image/webp" ||
      image.type === "image/avif"
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

  async function handleRemoveImage() {
    setBlog((prev) => ({
      ...prev,
      image: "",
    }));
    try {
      const public_id = uploadedImage.split("/").pop().split(".")[0];
      const apiKey = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY;
      const apiSecret = process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET;
      const timestamp = Math.round(new Date().getTime() / 1000).toString();
      const paramsToSign = `public_id=${public_id}&timestamp=${timestamp}`;
      const signature = sha256(paramsToSign + apiSecret).toString();
      const payload = {
        public_id,
        timestamp,
        api_key: apiKey,
        signature,
      };
      const response = await Axios.post(
        `https://api.cloudinary.com/v1_1/dipkbpinx/image/destroy`,
        payload
      );
      
    } catch (error) {
      console.error(error);
    }
  }
  async function handleImageChange() {
    handleRemoveImage();
    setTimeout(() => {
      if (fileInputRef.current) {
        fileInputRef.current.click();
      }
    }, 10);
  }

  return (
    <>
      <h2 className="text-xl font-bold">Cover Image</h2>

      {uploadedImage ? (
        <div className="mb-2">
          <div className="flex items-center gap-4 p-2 ">
            <a
              href={uploadedImage}
              target="_blank"
              rel="noopener noreferrer"
              title="open image in new tab">
              <Image
                src={uploadedImage}
                alt="Uploaded"
                width={167}
                height={90}
                className="object-cover object-center h-[100px] w-[100px] italic"
              />
            </a>
            <button
              type="button"
              onClick={handleImageChange}
              className="py-1 border hover:text-white hover:bg-blue-500 px-4 rounded-md">
              Change
            </button>
            <button
              type="button"
              onClick={handleRemoveImage}
              className="text-red-500 font-semibold">
              Remove
            </button>
          </div>
        </div>
      ) : (
        <div className="border-blue-500 mb-2 bg-white rounded-md border-spacing-2 border-2 border-dotted p-2">
          <div className="flex flex-col sm:flex-row gap-2 p-2 sm:items-center sm:gap-5">
            <div className="relative min-w-0 flex-auto">
              <input
                className={`p-2 rounded border w-full border-solid border-blue-600 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-black transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:px-3 file:py-[0.32rem] file:text-white bg-gray-100 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem]  focus:border-primary focus:outline-none ${
                  image === ""
                    ? "file:bg-gray-600 "
                    : "file:bg-blue-500 bg-blue-300 bg-opacity-50"
                }`}
                type="file"
                name="image"
                title="Use ratio of 1200:648 for best results. Images should be below 5 mbs"
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
                isLoading || image === "" ? "No image selected" : "Upload Image"
              }
              onClick={handleImageUpload}
              disabled={isLoading || image === ""}
              className="bg-blue-500  xsm:w-full min-w-[150px] w-fit py-[0.32rem] rounded border  border-blue-600 bg-clip-padding px-5 text-white flex items-center justify-center disabled:bg-gray-100 disabled:text-gray-400">
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
                    viewBox="0 0 640 512"
                    width="20"
                    height="20"
                    fill="currentColor">
                    <path d="M537.6 226.6c4.1-10.7 6.4-22.4 6.4-34.6 0-53-43-96-96-96-19.7 0-38.1 6-53.3 16.2C367 64.2 315.3 32 256 32c-88.4 0-160 71.6-160 160 0 2.7 .1 5.4 .2 8.1C40.2 219.8 0 273.2 0 336c0 79.5 64.5 144 144 144h368c70.7 0 128-57.3 128-128 0-61.9-44-113.6-102.4-125.4zM393.4 288H328v112c0 8.8-7.2 16-16 16h-48c-8.8 0-16-7.2-16-16V288h-65.4c-14.3 0-21.4-17.2-11.3-27.3l105.4-105.4c6.2-6.2 16.4-6.2 22.6 0l105.4 105.4c10.1 10.1 2.9 27.3-11.3 27.3z" />
                  </svg>
                  Upload
                </p>
              )}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
