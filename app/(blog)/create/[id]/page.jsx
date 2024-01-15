"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Loader from "@/components/Loader";
import dynamic from "next/dynamic";
import Axios from "axios";
import Script from "next/script";
import Link from "next/link";
import { revalidateBlogs } from "@/lib/actions";
import { getCurrentUser } from "@/lib";

const DynamicEditor = dynamic(() => import("@/components/Editor"), {
  loading: () => (
    <div className="flex items-center justify-center gap-2 text-xl my-2">
      <Loader />
      Loading Editor...
    </div>
  ),
});

export default function EditBlog({ params }) {
  const [loading, setLoading] = useState("loading");
  const [blogData, setBlogData] = useState();
  const router = useRouter();

  //redirect user to login page if they are not logged in

  const user = getCurrentUser();
  if (!user) {
    toast.error("Login required to perform this action!");
    router.replace(`/login?post_login_redirect_url=create/${params.id}`);
  }

  //function to fetch blog data
  useEffect(() => {
    async function getBlog() {
      const response = await Axios.get(
        `https://techtales.up.railway.app/blogs/${params.id}`
      );
      const data = response.data;
      if (data.user_id !== user.id) {
        toast.error("This blog belongs to a different author!");
        router.replace("/my-blogs?action=forbidden");
      }
      setLoading("");
      setBlogData(data);
    }
    getBlog();
  }, [params.id, router, user.id]);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading("submitting");
    toast.custom((t) => (
      <div
        className={`${
          t.visible ? "animate-enter" : "animate-leave"
        } max-w-md w-fit bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5 font-poppins`}>
        <div className="py-2 flex items-center space-x-2 px-2 text-xl">
          <Loader size={20} />
          <span>Processing Request....</span>
        </div>
      </div>
    ));

    if (blogData.title === "" || blogData.body == "") {
      toast.error("Please fill out all the required fields");
      setLoading("");
      return false;
    } else {
      try {
        await Axios.patch(
          `https://techtales.up.railway.app/blogs/${params.id}`,
          blogData
        );
        toast.success("Blog updated successfully");
        confetti({
          particleCount: 800,
          spread: 50,
          origin: { y: 0.5 },
        });
        setLoading("");
        revalidateBlogs(params.id);
        router.replace("/my-blogs");
      } catch (error) {
        toast.error(error?.response?.data?.errors);
        console.error(error);
        setLoading("");
      }
    }
  }
  if (loading === "loading") {
    return (
      <div className="flex items-center justify-center gap-2 text-xl min-h-[500px]">
        <Loader />
        Loading Blog...
      </div>
    );
  }

  return (
    <div className="md:mt-9 font-poppins">
      <Script src="https://cdn.jsdelivr.net/npm/@tsparticles/confetti@3.0.2/tsparticles.confetti.bundle.min.js"></Script>
      <div className="w-full bg-[#FDFAE9] border-b-amber-500  border text-center py-2 text-[18px] mb-2 xsm:text-[16px]">
        <p className="inline-block md:inline-flex md:items-center md:gap-1">
          <svg
            className="text-amber-600 xsm:text-center xsm:mx-auto"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            height={20}
            fill="currentColor"
            width={20}>
            <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
          </svg>
          Before you write your blog, please read our{" "}
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
          className="p-2 mt-2 text-2xl text-center font-bold text-gray-600">
          Blog Title
        </label>
        <input
          className="blog-input-field focus:outline-none text-xl font-bold text-gray-500"
          type="text"
          name="title"
          id="title"
          disabled={loading === "submitting"}
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
            disabled={loading === "submitting"}
            className="bg-blue-500 disabled:bg-gray-200 disabled:text-black  font-bold px-5 py-2 text-white rounded-xl hover:bg-blue-800">
            {loading === "submitting" ? (
              <p className="flex items-center gap-2">
                <Loader size={20} />
                <span>Updating..</span>
              </p>
            ) : (
              "Update Blog"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
