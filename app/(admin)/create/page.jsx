"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { slugify, createBlog } from "@/lib";
import Swal from "sweetalert2";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { AiFillEdit } from "react-icons/ai";
import { getCurrentUser } from "@/lib";

export default function useCreate() {
  const [isAuth, setIsAuth] = useState(true);
  const user = getCurrentUser();

  const navigate = useRouter();
  const [blogData, setBlogData] = useState({
    title: "",
    image: "",
    body: "",
    user_id: "",
  });
  const handleChange = (event) => {
    const { name, value } = event.target;
    setBlogData((prevData) => ({
      ...prevData,
      [name]: value,
      user_id: user.id,
    }));
  };
  function saveDraft() {
    if(typeof window !== undefined){
    localStorage.setItem("draftBlog", JSON.stringify(blogData));
    Swal.fire({
      text: "draft saved successfully",
      icon: "success",
      showConfirmButton: false,
      showCloseButton: true,
      timer: 3000,
    });
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
      setIsAuth(false);
      navigate.replace("/login");
    }
  }, [navigate]);

  function handleSubmit(e) {
    e.preventDefault();
    createBlog(blogData, navigate, setBlogData);
    localStorage.removeItem("draftBlog");
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
          disabled={!user}
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
          disabled={!user}
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
          disabled={!user}
          required
          placeholder="Write your blog here. Remember to use html tags"
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
        <h1 className="tex-xl md:text-2xl font-bold flex items-center space-1">
          <BsInfoCircle className="pr-2" /> Writing a Great Post Title{" "}
        </h1>
        <p className="space-y-2 leading-relaxed">
          Think of your post title as a super short (but compelling!)
          description — like an overview of the actual post in one short
          sentence. Use keywords where appropriate to help ensure people can
          find your post by search.
        </p>
        <h1 className="tex-xl md:text-2xl font-bold py-2 flex items-center space-1">
          <AiFillEdit className="pr-2" /> Write like a Pro!
        </h1>
        <p className="space-y-2 leading-relaxed py-2">
          {" "}
          Use html tags to format the body of your blogs, put headings in h1 to
          h6 tags, separate paragraphs by nesting them in p tags and format
          lists using ul and li tags
        </p>
        <p className="text-base font-bold leading-relaxed py-2">
          Common html tags include
        </p>
        <ul>
          <li>&lt;ul&gt; &lt;/ul&gt; followed by &lt;li&gt; for lists</li>
          <li>&lt;br&gt; &lt;/br&gt; for line breaks</li>
          <li>&lt;strong&gt; &lt;/strong&gt; for bold text</li>
          <li>&lt;p&gt; &lt;/p&gt; for paragraphs</li>
          <li>&lt;h1--h6&gt; &lt;/h1--h6&gt; for headers</li>
          <li>&lt;img&gt; &lt;/img&gt; for image tags</li>
        </ul>
      </div>
    </div>
  );
}
