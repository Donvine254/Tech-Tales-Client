"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Loader from "@/components/Loader";
import dynamic from "next/dynamic";
import Axios from "axios";

const DynamicEditor = dynamic(() => import("@/components/Editor"), {
  loading: () => (
    <div className="flex items-center justify-center gap-2 text-xl my-2">
      <Loader />
      Loading Editor...
    </div>
  ),
});

export default function CreateNewBlog({ params }) {
  const [loading, setLoading] = useState(true);
  const [blogData, setBlogData] = useState();
  const navigate = useRouter();
  useEffect(() => {
    async function getBlog() {
      const response = await Axios.get(
        `https://techtales.up.railway.app/blogs/${params.id}`
      );
      const data = response.data;
      setLoading(false);
      setBlogData(data);
    }
    getBlog();
  }, [params.id]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (blogData.title === "" || blogData.body == "") {
      toast.error("Please fill out all the required fields");
      return false;
    } else {
      try {
        await Axios.patch(
          `https://techtales.up.railway.app/blogs/${params.id}`,
          blogData
        );
        toast.success("Blog updated successfully");
        navigate.replace("/my-blogs");
      } catch (error) {
        toast.error(error?.response?.data?.errors);
      }
    }
  }
  if (loading) {
    return (
      <div className="flex items-center justify-center gap-2 text-xl min-h-[500px]">
        <Loader />
        Loading Blog...
      </div>
    );
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
        <input
          className="blog-input-field focus:outline-none text-xl font-bold"
          type="text"
          name="title"
          id="title"
          disabled={loading}
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

        <DynamicEditor data={blogData.body} handleChange={setBlogData} />

        <div className="flex gap-2 xsm:items-center xsm:justify-between md:gap-8 mt-4">
          <button
            type="submit"
            className="bg-blue-500 font-bold px-4 py-2 text-white rounded-md hover:bg-blue-800">
            Update Blog
          </button>
        </div>
      </form>
    </div>
  );
}
