"use client";
import { useState } from "react";
import toast from "react-hot-toast";
import Loader from "../ui/Loader";
import axios from "axios";
import { baseUrl } from "@/lib";
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
        await axios.patch(`${baseUrl}/users/socials`, {
          userId: user.id,
          newSocial: data,
        });
        toast.success(`profile updated successfully!`);
        setSubmitting(false);
        setData({
          platform: "",
          url: "",
        });
        handleClose();
        if (typeof window !== "undefined") {
          window.location.reload();
        }
      } catch (error) {
        console.error(error);
        toast.error("Something went wrong");
        setError(error?.response?.data?.error);
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
          <h3 className="text-2xl lg:text-3xl font-semibold  text-center">
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
            <li>Share your content and ideas with a broader audience</li>
            <li>Gain followers who are interested in your content</li>
          </ul>
        </section>
        <form
          className=" py-4 bg-[#f8f9fa] p-2 rounded-md mb-4 mx-4 border"
          method="dialog"
          onSubmit={handleSubmit}>
          <div className="space-y-1">
            <label
              className="capitalize font-semibold text-gray-600"
              htmlFor="platform">
              Select a Social Platform
            </label>
            <select
              className="w-full border border-blue-500 rounded-md focus:outline-none py-1 text-gray-600"
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
              <option value="instagram">Instagram</option>
              <option value="youtube">Youtube</option>
              <option value="tiktok">TikTok</option>
            </select>
          </div>

          <div className="space-y-1">
            <label
              className="capitalize font-semibold text-gray-600"
              htmlFor="url">
              Enter your Profile Url
            </label>
            <input
              className="h-8 w-full border p-2  border-blue-500 rounded-md  focus:outline-none   "
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
          <div className="inline-flex gap-1 items-center my-1">
            <input
              type="checkbox"
              name="terms"
              required
              title="terms"
              className="z-50"
              aria-label="Agree to terms and conditions"
            />
            <label className="text-sm font-extralight">
              Agree with{" "}
              <a
                target="_blank"
                href="/terms"
                className="text-blue-500 cursor-pointer hover:underline">
                Terms and Conditions
              </a>
            </label>
          </div>
          <div className="flex items-center justify-end gap-4  py-1">
            <button
              className="bg-transparent border-2 border-green-600 hover:border-orange-500  px-2 h-8 rounded-md "
              title="close"
              onClick={handleClose}
              type="reset">
              Cancel
            </button>
            <button
              className={` border-2 border-blue-600  px-2 h-8 flex items-center rounded-md text-white ${
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
      </div>
    </dialog>
  );
};

export default SocialMediaModal;
