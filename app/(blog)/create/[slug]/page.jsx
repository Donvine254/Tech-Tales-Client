"use client";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Loader, PreviewModal, TagInput, UploadButton } from "@/components";
import dynamic from "next/dynamic";
import Script from "next/script";
import Link from "next/link";
import { revalidateBlogs, UpdateBlogData } from "@/lib/actions";
import { slugify } from "@/lib";
import { getBlogData } from "@/lib/actions";
import { useUserContext } from "@/providers";

const DynamicEditor = dynamic(() => import("@/components/editors/Editor"), {
  loading: () => (
    <div className="flex items-center justify-center gap-2 text-xl my-2">
      <Loader size={60} />
      Loading Editor...
    </div>
  ),
});

export default function EditBlog({ params }) {
  const [loading, setLoading] = useState("loading");
  const [blogData, setBlogData] = useState({
    title: "",
    slug: "",
    body: "",
    tags: "",
    image: "",
  });
  const [error, setError] = useState("");
  const user = useUserContext();
  useEffect(() => {
    async function getUser() {
      try {
        const blog = await getBlogData(params.slug);
        // modify this to ensure admins can edit any blog
        if (user.id !== blog.authorId && user.role !== "admin") {
          toast.error("This blog belongs to a different author!");
          if (typeof window !== "undefined" && window) {
            window.location.href = "/me/blogs?action=forbidden";
          }
        } else {
          setBlogData(blog);
          setLoading("");
        }
      } catch (error) {
        console.error(error);
        setLoading("");
      }
    }
    getUser();
  }, [params.slug, user]);
  //function to handle title change
  const handleTitleChange = (e) => {
    const { value } = e.target;
    setBlogData((prevData) => ({
      ...prevData,
      title: value,
      slug: slugify(value),
    }));
    setError("");
  };
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading("submitting");
    setError("");

    if (blogData.title === "" || blogData.body == "") {
      toast.error("Please fill out all the required fields");
      setLoading("");
      return false;
    } else {
      try {
        await UpdateBlogData(blogData.id, blogData);
        toast.success("Blog updated successfully");
        confetti({
          particleCount: 800,
          spread: 50,
          origin: { y: 0.5 },
        });
        setLoading("");
        revalidateBlogs(params.slug);
        if (typeof window !== "undefined" && window) {
          window.location.href = "/me/blogs";
        }
      } catch (error) {
        toast.error("Something went wrong");
        setError(error.message);
        console.error(error);
        setLoading("");
      }
    }
  }
  // function to show preview modal
  function showPreviewModal() {
    const modal = document.getElementById("preview-modal");
    if (modal) {
      modal.showModal();
    }
  }
  if (loading === "loading") {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="loader"></div>
        Loading Blog...
      </div>
    );
  }

  return (
    <div className="md:mt-9 font-poppins relative">
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
          className="p-2 mt-2 text-xl text-center font-bold">
          Blog Title
        </label>
        {error && (
          <div className="px-2 ">
            <p className="text-sm text-red-500">* {error}</p>
          </div>
        )}
        <input
          className="blog-input-field focus:outline-none text-lg text-gray-500"
          type="text"
          name="title"
          id="title"
          minLength={30}
          maxLength={80}
          disabled={loading === "submitting"}
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
            blogData?.tags
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

        <DynamicEditor data={blogData} handleChange={setBlogData} />

        <div className="flex gap-2 xsm:items-center xsm:justify-between justify-end md:gap-8 mt-4">
          <button
            type="button"
            onClick={showPreviewModal}
            title="see what your blog will look like after publishing"
            className="bg-transparent flex items-center justify-center gap-1 bg-gradient-to-r from-green-400 to-indigo-500 border hover:bg-gradient-to-r hover:from-blue-500 hover:to-green-200 px-2 py-1.5 rounded-md text-white h-8">
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
            type="submit"
            disabled={loading === "submitting"}
            className="bg-blue-500 text-center disabled:bg-gray-200 disabled:text-black px-5 py-2 text-white rounded-md h-8 hover:bg-blue-800 flex items-center gap-2">
            {loading === "submitting" ? (
              <p className="flex items-center gap-2">
                <Loader size={16} />
                <span>Updating..</span>
              </p>
            ) : (
              <p className="flex items-center gap-2">
                <svg fill="none" viewBox="0 0 15 15" height="1em" width="1em">
                  <path
                    fill="currentColor"
                    fillRule="evenodd"
                    d="M1.903 7.297c0 3.044 2.207 5.118 4.686 5.547a.521.521 0 11-.178 1.027C3.5 13.367.861 10.913.861 7.297c0-1.537.699-2.745 1.515-3.663.585-.658 1.254-1.193 1.792-1.602H2.532a.5.5 0 010-1h3a.5.5 0 01.5.5v3a.5.5 0 01-1 0V2.686l-.001.002c-.572.43-1.27.957-1.875 1.638-.715.804-1.253 1.776-1.253 2.97zm11.108.406c0-3.012-2.16-5.073-4.607-5.533a.521.521 0 11.192-1.024c2.874.54 5.457 2.98 5.457 6.557 0 1.537-.699 2.744-1.515 3.663-.585.658-1.254 1.193-1.792 1.602h1.636a.5.5 0 110 1h-3a.5.5 0 01-.5-.5v-3a.5.5 0 111 0v1.845h.002c.571-.432 1.27-.958 1.874-1.64.715-.803 1.253-1.775 1.253-2.97z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Update</span>
              </p>
            )}
          </button>
        </div>
      </form>
      <PreviewModal blog={blogData} />
    </div>
  );
}
