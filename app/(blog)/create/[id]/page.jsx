"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Loader from "@/components/Loader";
import dynamic from "next/dynamic";
import Axios from "axios";
import Script from "next/script";
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
    <div className="md:m-1 font-poppins">
      <Script src="https://cdn.jsdelivr.net/npm/@tsparticles/confetti@3.0.2/tsparticles.confetti.bundle.min.js"></Script>
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
