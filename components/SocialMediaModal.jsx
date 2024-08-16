"use client";
import { useState } from "react";
import toast from "react-hot-toast";
import Loader from "./Loader";
import { updateUserSocials } from "@/lib/updateUserSocials";
const SocialMediaModal = ({ user }) => {
  const [data, setData] = useState({
    platform: "",
    url: "",
  });
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const handleClose = () => {
    const modal = document.getElementById(`social_media_modal`);
    if (modal) {
      modal.close();
    }
  };

  if (!user) {
    return null;
  }
  async function handleSubmit(e) {
    e.preventDefault();

    if (!data.url.includes(data.platform.toString())) {
      setError(`Please enter a URL for a ${data.platform} profile`);
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
      id="social_media_modal"
      className="rounded-md max-w-[400px] m-auto xsm:mx-5  backdrop-blur-sm shadow-md">
      <div className="relative ">
        <div className="px-2 py-1 bg-gradient-to-r from-green-400 via-cyan-400 to-indigo-400 text-white space-y-2">
          <h3 className="lg:text-xl font-semibold  text-center capitalize">
            Update Your Social Profile
          </h3>
          <p className="text-sm xsm:text-xs text-center">
            Make it easier for other people to follow you by adding your social
            media profiles
          </p>
        </div>
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
        <section id="benefits" className="p-2">
          <ul className="subscribe-form">
            <li>Build your own social community</li>
            <li>Be followed and follow other users</li>
          </ul>
        </section>
        <form
          className=" py-4 bg-gray-100 p-2 rounded-md mb-2 mx-4"
          method="dialog"
          onSubmit={handleSubmit}>
          <div className="space-y-1">
            <label
              className="capitalize font-semibold text-gray-600"
              htmlFor="platform">
              Select a Social Platform
            </label>
            <select
              className="h-8 w-full border border-blue-500 rounded-md focus:outline-none py-2 "
              id="platform"
              name="platform"
              type="text"
              value={data.platform}
              required
              onChange={(e) =>
                setData((prevData) => ({
                  ...prevData,
                  platform: e.target.value,
                }))
              }>
              <option value="" disabled>
                Select Platform
              </option>
              <option value="facebook">Facebook</option>
              <option value="x">Twitter/X</option>
              <option value="github">Github</option>
              <option value="linkedin">Linkedin</option>
            </select>
          </div>

          <div className="space-y-1">
            <label
              className="capitalize font-semibold text-gray-600"
              htmlFor="url">
              Enter your Profile Url
            </label>
            <input
              className="h-8 w-full border p-2  border-blue-500 rounded-md  focus:outline-none  invalid:border-red-500 "
              id="url"
              name="url"
              type="url"
              value={data.url}
              onInput={() => setError(null)}
              required
              pattern="https://.*"
              onChange={(e) =>
                setData((prevData) => ({
                  ...prevData,
                  url: e.target.value,
                }))
              }
              placeholder="https://www.example.com/your-account"
            />
          </div>
          <small
            className={`text-red-500 text-sm xsm:text-xs  ${
              error ? "visible opacity-100" : "invisible opacity-0"
            }`}>
            {error ? error : null}
          </small>
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

        <div className="flex items-center justify-center gap-1 bg-cyan-100 border-t-2 border-cyan-500 py-1">
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
