"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createBlog } from "@/lib";
import toast from "react-hot-toast";
import { getCurrentUser } from "@/lib";
import dynamic from "next/dynamic";
import UploadButton from "@/components/uploadButton";

const DynamicEditor = dynamic(() => import("@/components/Editor"), {
  loading: () => (
    <p className="font-bold text-2xl text-black animate-bounce">Loading...</p>
  ),
});

export default function CreateNewBlog() {
  const user = getCurrentUser();
  let count = 0;
  const navigate = useRouter();
  const [blogData, setBlogData] = useState({
    title: "",
    image: "",
    body: "",
  });
  function saveDraft() {
    if (typeof window !== undefined) {
      localStorage.setItem("draftBlog", JSON.stringify(blogData));
      toast.success("draft saved successfully");
    }
  }
  useEffect(() => {
    const draftBlogData = localStorage.getItem("draftBlog");
    if (draftBlogData) {
      setBlogData(JSON.parse(draftBlogData));
    }
  }, []);
  useEffect(() => {
    const user = getCurrentUser();
    if (!user) {
      toast.error("Login required to perform this action!");
      navigate.replace("/login");
    }
  }, [navigate]);

  function handleSubmit(e) {
    e.preventDefault();
    if (blogData.title === "" || blogData.image === "" || blogData.body == "") {
      toast.error("Please fill out all the required fields");
      return false;
    }
    const data = {
      ...blogData,
      user_id: user.id,
    };
    createBlog(data, navigate, setBlogData);
    localStorage.removeItem("draftBlog");
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
  return (
    <div className="md:m-1 font-poppins">
      <form
        className="bg-gray-100 border m-auto lg:w-3/4 p-4 md:p-8 rounded-sm relative"
        onSubmit={handleSubmit}>
        <label
          htmlFor="title"
          className="p-2 mt-2 text-xl text-center font-bold text-black">
          Blog Title
        </label>
        {/* div for alert */}
        <div
          className="absolute bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md z-50 mr-4 hidden"
          role="alert"
          id="alert">
          <div class="flex">
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
              <p className="text-base">
                Think of your post title as a super short (but compelling!)
                description — like an overview of the actual post in one short
                sentence. Use keywords where appropriate to help ensure people
                can find your post by search.
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
          className="blog-input-field focus:outline-none text-xl font-bold"
          type="text"
          name="title"
          id="title"
          onFocus={() => triggerAlert("show")}
          disabled={!user}
          value={blogData?.title}
          onChange={(e) =>
            setBlogData((prev) => ({
              ...prev,
              title: e.target.value,
            }))
          }
          placeholder="Write your blog title here"
          required
        />

        <UploadButton setBlog={setBlogData} />

        <DynamicEditor data={blogData.body} handleChange={setBlogData} />

        <div className="flex gap-2 xsm:items-center xsm:justify-between md:gap-8 mt-4">
          <button
            type="submit"
            className="bg-blue-500 font-bold px-4 py-2 text-white rounded-md hover:bg-blue-800">
            Publish
          </button>
          <button
            type="button"
            onClick={saveDraft}
            className="bg-transparent text-black hover:bg-slate-300 border hover:text-blue-500 border-blue-500 px-2 p-2 rounded-md">
            Save Draft
          </button>
        </div>
      </form>
    </div>
  );
}
