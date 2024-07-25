"use client";
import { useState } from "react";
import toast from "react-hot-toast";
import Loader from "./Loader";
import { updateUserSocials } from "@/lib/updateUserSocials";
const SocialMediaModal = ({ platform, user }) => {
  const [data, setData] = useState({
    platform: platform,
    url: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const handleClose = () => {
    const modal = document.getElementById(`${platform}_modal`);
    if (modal) {
      modal.close();
    }
  };

  if (!platform || !user) {
    return null;
  }
  async function handleSubmit(e) {
    e.preventDefault();

    if (!data.url.includes(platform.toString())) {
      toast.error(`Please enter a URL for a ${platform} profile`);
      return;
    } else {
      setSubmitting(true);
      try {
        await updateUserSocials(user.id, data);
        toast.success(`profile updated successfully!`);
        setSubmitting(false);
        handleClose();
      } catch (error) {
        console.error(error);
        toast.error("Something went wrong");
        setSubmitting(false);
      }
    }
  }
  return (
    <dialog
      id={`${platform}_modal`}
      className="rounded-md max-w-[400px] m-auto xsm:mx-5 border backdrop-blur-sm shadow-md">
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
          <label className="capitalize" htmlFor="url">
            Enter your {platform} Account Url
          </label>
          <input
            className="h-8 w-full border-b border-green-500 bg-transparent focus:outline-none py-2 invalid:border-red-500"
            id="url"
            name="url"
            type="url"
            value={data.url}
            pattern="https://.*"
            onChange={(e) =>
              setData((prevData) => ({
                ...prevData,
                url: e.target.value,
              }))
            }
            placeholder="https://www.example.com/your-account"
          />
          <small>Appears on your profile page and on your authored blogs</small>
          <div className="flex items-center justify-end gap-4  py-2">
            <button
              className="bg-transparent border-2 border-green-600 hover:border-orange-500 py-0.5 px-2 h-8 rounded-md "
              title="close"
              onClick={handleClose}
              type="button">
              Cancel
            </button>
            <button
              className={` border-2 border-blue-600  py-0.5 px-2 h-8 flex items-center rounded-md text-white ${
                submitting ? "bg-white   " : "bg-[#0060CE] hover:bg-blue-600"
              } disabled:bg-gray-200 disabled:text-gray-600 disabled:border-gray-200 disabled:pointer-events-none`}
              title="save"
              type="submit"
              disabled={data.url === "" || !user}>
              {submitting ? (
                <>
                  <Loader fill="white" />
                  <span className="text-black">saving..</span>
                </>
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        </form>
        <hr className="border-dotted border-green-600 " />
        <div className="inline-flex items-center justify-center gap-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#16a34a"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round">
            <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
            <line x1="12" x2="12" y1="16" y2="12" />
            <line x1="12" x2="12.01" y1="8" y2="8" />
          </svg>
          <small>Changes will appear once you login again</small>
        </div>
      </div>
    </dialog>
  );
};

export default SocialMediaModal;
