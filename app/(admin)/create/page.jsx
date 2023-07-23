"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { slugify, createBlog } from "@/lib";
import Swal from "sweetalert2";

export default function useCreate() {
  const navigate = useRouter();
  const [blogData, setBlogData] = useState({
    title: "",
    image: "",
    slug:"",
    body: "",
  });
  const handleChange = (event) => {
    const { name, value } = event.target;
    setBlogData((prevData) => ({
      ...prevData,
      [name]: value,
      slug: slugify(blogData.title),
    }));
  };
  function saveDraft() {
    localStorage.setItem('draftBlog', JSON.stringify(blogData));
    Swal.fire({
      html:"<p>✅ draft saved successfully</p>",
      showConfirmButton: false,
      timer: 3000
    })
  }
  useEffect(() => {
    const draftBlogData = localStorage.getItem('draftBlog');
    if (draftBlogData) {
      setBlogData(JSON.parse(draftBlogData));
    }
  }, []);
  function handleSubmit(e) {
    e.preventDefault();
    createBlog(blogData, navigate, setBlogData);
    localStorage.removeItem('draftBlog');
  }

  return (
    <div className="flex flex-col md:flex-row m-5 md:w-4/5 md:ml-auto">
      <form
        className="bg-gray-200 md:w-2/3 border m-auto p-8 rounded-sm"
        onSubmit={handleSubmit}>
        <label
          htmlFor="title"
          className="p-2 mt-2 text-xl md:text-2xl text-center font-bold text-black">
          Blog Title
        </label>
        <input
          className="blog-input-field focus:outline-none"
          type="text"
          name="title"
          value={blogData.title}
          onChange={handleChange}
          placeholder="Write your blog title here"
          required
        />
        <br></br>
        <label
          htmlFor="title"
          className="p-2 mt-2 text-xl md:text-2xl text-center font-bold text-black">
          Cover Image
        </label>
        <input
          className="blog-input-field focus:outline-none"
          type="text"
          name="image"
          value={blogData.image}
          onChange={handleChange}
          placeholder="Paste the url for the cover image"
          required
        />
        <br className="mt-8"></br>
        <textarea
          rows="10"
          name="body"
          value={blogData.body}
          onChange={handleChange}
          required
          placeholder="write your blog here"
          className="p-4 w-full border-none shadow-lg text-black focus:outline-none text-xl"
        />
        <div className="flex gap-2 md:gap-8 mt-4">
          <button
            type="submit"
            className="bg-blue-500 font-bold px-4 py-2 rounded-md hover:bg-blue-800">
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
      <div className="md:w-1/3 ml-5 mr-5 hidden md:block">
        <h1 className="tex-xl md:text-2xl font-bold">
          Writing a Great Post Title{" "}
        </h1>
        <p className="space-y-2 leading-relaxed">
          Think of your post title as a super short (but compelling!)
          description — like an overview of the actual post in one short
          sentence. Use keywords where appropriate to help ensure people can
          find your post by search.
        </p>
      </div>
    </div>
  );
}
