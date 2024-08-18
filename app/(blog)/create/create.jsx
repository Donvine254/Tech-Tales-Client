"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createBlog, slugify } from "@/lib";
import { Loader, PreviewModal, TagInput, UploadButton } from "@/components";
import toast from "react-hot-toast";
import dynamic from "next/dynamic";
import Script from "next/script";
import secureLocalStorage from "react-secure-storage";
import Link from "next/link";
import { useUserContext } from "@/providers";
const DynamicEditor = dynamic(() => import("@/components/editors/Editor"), {
  loading: () => (
    <div className="flex items-center justify-center gap-2 text-xl my-2">
      <Loader size={60} />
      Loading Editor...
    </div>
  ),
});

export default function CreateNewBlog() {
  const user = useUserContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  let count = 0;
  const router = useRouter();
  const [blogData, setBlogData] = useState({
    title: "",
    image: "",
    body: "",
    slug: "",
    tags: "",
  });

  //function to create slug
  const handleTitleChange = (e) => {
    const { value } = e.target;
    setBlogData((prevData) => ({
      ...prevData,
      title: value,
      slug: slugify(value),
    }));
    setError("");
  };
  function saveDraft() {
    const hasEntries = Object.entries(blogData).some(
      ([key, value]) =>
        (key === "title" ||
          key === "body" ||
          key === "image" ||
          key === "tags") &&
        value.trim() !== ""
    );

    if (!hasEntries) {
      toast.error("Kindly fill the required fields");
    } else if (typeof window !== "undefined") {
      secureLocalStorage.setItem("draft_blog_data__", JSON.stringify(blogData));
      toast.success("Draft saved successfully!");
    } else return null;
  }

  useEffect(() => {
    const draftBlogData = secureLocalStorage.getItem("draft_blog_data__");
    if (draftBlogData) {
      setBlogData(JSON.parse(draftBlogData));
    }
  }, []);
  //save draft when user clicks ctrl+s in windows and command + s in mac
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "s" && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        secureLocalStorage.setItem(
          "draft_blog_data__",
          JSON.stringify(blogData)
        );
        toast.success("Blog draft saved successfully");
      }
    };
    // Add the event listener
    document.addEventListener("keydown", handleKeyDown);
    // Clean up the event listener
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [blogData]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (blogData.title === "" || blogData.body == "") {
      toast.error("Please fill out all the required fields");
      return false;
    }
    setLoading(true);
    const data = {
      ...blogData,
      authorId: Number(user.id),
    };
    createBlog(data, setLoading, setError);
  }
  //function to trigger alert
  function triggerAlert(command) {
    const alertElement = document.getElementById("alert");
    if (count < 1 && command === "show") {
      alertElement.style.display = "block";
      count += 1;
    } else if (command === "hide") {
      alertElement.style.display = "none";
    } else {
      return false;
    }
  }
  //function to show modal
  function showPreviewModal() {
    const modal = document.getElementById("preview-modal");
    if (modal) {
      modal.showModal();
    }
  }
  return (
    <div className="font-poppins md:mt-9">
      <Script src="https://cdn.jsdelivr.net/npm/@tsparticles/confetti@3.0.2/tsparticles.confetti.bundle.min.js"></Script>
      <div className="w-full bg-[#FDFAE9] border-b-amber-500  border text-center p-2 mb-2 ">
        <p className="text-sm hidden xsm:block">
          &#x1F6C8; Before you write your blog, please read our{" "}
          <Link
            href="/community"
            className="hover:text-blue-500 font-bold underline">
            community guidelines
          </Link>
        </p>
        <p className="xsm:hidden text-sm md:text-base inline-flex gap-1 items-center justify-center content-center ">
          <svg
            className="text-green-600 xsm:hidden"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            height={20}
            fill="currentColor"
            width={20}>
            <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
          </svg>
          <span className="text-green-500 hidden xsm:block"> </span>
          <span>Before you write your blog, please read our </span>
          <Link
            href="/community"
            className="hover:text-blue-500 font-bold underline">
            community guidelines
          </Link>
        </p>
      </div>
      <form
        className="bg-gray-100 border m-auto lg:w-3/4 p-4 md:p-8 rounded-sm relative"
        onSubmit={handleSubmit}>
        <label
          htmlFor="title"
          className="p-2 mt-2 text-xl text-center font-bold ">
          Blog Title
        </label>
        {/* div for alert */}
        {error && (
          <div className="px-2 ">
            <p className="text-sm text-red-500">* {error}</p>
          </div>
        )}
        <div
          className="absolute bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md z-50 mr-4 hidden"
          role="alert"
          id="alert">
          <div className="flex">
            <div className="py-1">
              <svg
                className="fill-current h-6 w-6 text-teal-500 mr-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20">
                <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
              </svg>
            </div>
            <div>
              <p className="font-bold">Writing a Good Blog Title</p>
              <p className="text-sm">
                Think of your post title as a super short (but compelling!)
                description — like an overview of the actual post in one short
                sentence. Use keywords where appropriate to help ensure people
                can find your post by search. The title should be a maximum of
                80 words.
              </p>
            </div>
          </div>
          <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
            <svg
              className="fill-current h-6 w-6 text-red-500 hover:scale-110 bg-white rounded-full"
              role="button"
              onClick={() => triggerAlert("hide")}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20">
              <title>Close</title>
              <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
            </svg>
          </span>
        </div>
        {/* end of alert div */}

        <input
          className=" blog-input-field focus:outline-none text-lg"
          type="text"
          name="title"
          id="title"
          maxLength={80}
          minLength={20}
          autoComplete="on"
          autoCorrect="on"
          spellCheck="true"
          onFocus={() => triggerAlert("show")}
          disabled={loading}
          value={blogData?.title}
          onChange={handleTitleChange}
          placeholder="Write your blog title here"
          required
        />
        <div className="text-sm text-gray-600 flex justify-end ">
          <p>
            {blogData.title.length ?? 0}/
            <span className="font-medium text-gray-800">80</span>
          </p>
        </div>

        <TagInput
          setBlogData={setBlogData}
          blogTags={
            blogData.tags
              ? blogData.tags
                  .split(",")
                  .map((tag) => tag.trim())
                  .filter((tag) => tag)
              : []
          }
        />

        <UploadButton setBlog={setBlogData} />
        {blogData.image ? (
          <p className="m-2 text-sm">
            {" "}
            Blog cover image:{" "}
            <a
              href={blogData?.image}
              target="_blank"
              className="text-blue-500 hover:underline cursor-pointer">
              {blogData?.image}
            </a>
          </p>
        ) : null}

        <DynamicEditor data={blogData.body} handleChange={setBlogData} />

        <div className="flex gap-2 xsm:items-center xsm:justify-between mt-4 transition-all">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 bg-opacity-80 disabled:bg-gray-200 disabled:text-black px-2 py-1.5 text-white rounded-md hover:bg-blue-600 w-1/3 flex items-center justify-center gap-1 h-[35px]">
            {loading ? (
              <Loader />
            ) : (
              <p className="flex items-center gap-1">
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  height="1em"
                  width="1em">
                  <path d="M5 4v2h14V4H5m0 10h4v6h6v-6h4l-7-7-7 7z" />
                </svg>
                <span> Publish</span>
              </p>
            )}
          </button>
          {!loading && (
            <>
              <button
                type="button"
                onClick={showPreviewModal}
                disabled={loading}
                className="flex items-center justify-center gap-1 bg-gradient-to-r from-green-400 via-cyan-500 to-indigo-400 hover:bg-gradient-to-r hover:from-indigo-400 hover:via-cyan-500 hover:to-green-400 px-2 py-1.5 rounded-md w-1/3 text-white h-[35px]  disabled:pointer-events-none"
                title="see what your blog will look like after publishing">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round">
                  <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>{" "}
                Preview
              </button>
              <button
                type="button"
                onClick={saveDraft}
                disabled={loading}
                className="bg-transparent h-[35px] text-black hover:bg-blue-500 border hover:text-white border-blue-500 px-2 py-1.5 rounded-md w-1/3 xsm:w-fit flex items-center md:justify-center gap-1 disabled:bg-gray-200 disabled:text-black disabled:border-gray-200 disabled:pointer-events-none"
                title="save draft">
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                  height="1em"
                  width="1em">
                  <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z" />
                  <path d="M17 21v-8H7v8M7 3v5h8" />
                </svg>
                <span>Draft</span>
              </button>
            </>
          )}
        </div>
      </form>
      <PreviewModal blog={blogData} />
    </div>
  );
}
