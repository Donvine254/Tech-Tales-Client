"use client";
import { useState } from "react";
import toast from "react-hot-toast";
import Loader from "./Loader";
const SocialMediaModal = ({ platform }) => {
  const [url, setUrl] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const handleClose = () => {
    const modal = document.getElementById(`${platform}_modal`);
    if (modal) {
      modal.close();
    }
  };

  if (!platform) {
    return null;
  }
  function handleSubmit(e) {
    e.preventDefault();

    if (!url.includes(platform.toString())) {
      toast.error(`Please enter a URL for a ${platform} profile`);
      return;
    } else {
      setSubmitting(true);
    }
  }
  return (
    <dialog
      id={`${platform}_modal`}
      className="rounded-md max-w-[400px] border backdrop-blur-sm shadow-md">
      <div className="relative p-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="hover:fill-red-500 hover:bg-gray-100 p-1 rounded-md hover:text-red-500 cursor-pointer z-50 absolute top-0 right-0"
          onClick={handleClose}>
          <path d="M18 6 6 18" />
          <path d="m6 6 12 12" />
          <title>Close</title>
        </svg>
        <div className="flex flex-col space-y-1.5  py-4">
          <h3 className="lg:text-xl font-semibold  text-center capitalize">
            Update Your {platform} Profile
          </h3>
          <p className="text-sm">
            Make it easier for other people to follow you by adding your social
            media profiles
          </p>
        </div>
        <hr />
        <form className=" py-4" method="dialog" onSubmit={handleSubmit}>
          <label className="capitalize " htmlFor="url">
            Enter your {platform} Account Url
          </label>
          <input
            className="h-8 w-full border-b border-green-500 bg-transparent focus:outline-none py-2 invalid:border-red-500"
            id="url"
            name="url"
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://www.example.com/your-account"
          />
          <small>Appears on your profile page and on your authored blogs</small>
          <div className="flex items-center justify-end gap-4  py-6">
            <button
              className="bg-transparent border-2 border-green-600 hover:border-orange-500 py-0.5 px-2 rounded-md "
              title="close"
              onClick={handleClose}
              type="button">
              Cancel
            </button>
            <button
              className="bg-[#0060CE] hover:bg-blue-600 border-2 border-blue-600  py-0.5 px-2 rounded-md text-white"
              title="save"
              type="submit">
              {submitting ? (
                <span>
                  <Loader />
                  saving..
                </span>
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default SocialMediaModal;
