"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Loader from "@/components/Loader";
import { baseUrl } from "@/lib";
import { Edit, Trash } from "@/assets";
import { convertToHandle } from "@/lib/utils";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { revalidateBlogs, revalidatePage } from "@/lib/actions";
import Axios from "axios";

export default function Dashboard({ blogs }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const blogsData = blogs.sort((a, b) => a.id - b.id);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`${baseUrl}/me`);
        const data = await response.json();
        setUser(data);
        console.log(data);
        if (data.role !== "admin") {
          router.push("/");
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [router]);

  if (loading) {
    return (
      <div className="w-full mx-auto m-2 min-h-[320px] px-8 md:w-4/5 md:mt-10 font-poppins flex items-center justify-center content-center">
        <Loader size={60} />
      </div>
    );
  }
  //function to delete blogs
  function deleteBlog(blog) {
    Swal.fire({
      icon: "warning",
      text: "Are you sure you want to delete this blog? This cannot action cannot be undone",
      showCloseButton: true,
      confirmButtonText: "Delete",
      showCancelButton: true,
      cancelButtonText: "Nevermind",
      customClass: {
        confirmButton:
          "px-2 py-1 mx-2 bg-red-500 text-white rounded-md hover:text-white hover:bg-red-500",
        cancelButton: "px-2 py-1 mx-2 bg-green-500 rounded-md text-white",
      },
      buttonsStyling: false,
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.delete(`https://techtales.up.railway.app/blogs/${blog.id}`).then(
          () => {
            toast.success("Blog deleted successfully!");
          }
        );
      }
    });
    revalidateBlogs(blog.slug);
    revalidatePage("latest");
    revalidatePage("relevant");
  }

  return (
    <section className="w-full min-h-[320px] py-4 md:mt-10">
      <h1 className="text-xl text-center bg-gray-100 border py-1 px-2 rounded-md font-semibold my-4 md:text-2xl">
        Manage Blogs
      </h1>

      <div className="overflow-x-auto py-2">
        <table className="min-w-full bg-gray-100 border rounded-md">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b font-bold">ID</th>
              <th className="px-4 py-2 border-b font-bold">Title</th>
              <th className="px-4 py-2 border-b font-bold">Author</th>
              <th className="px-4 py-2 border-b font-bold">Status</th>
              <th className="px-4 py-2 border-b font-bold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs &&
              blogsData.map((blog) => (
                <tr key={blog.id}>
                  <td className="px-4 py-2 border-b"> {blog.id}</td>
                  <td className="px-4 py-2 border-b">
                    <Link
                      href={`/blogs/${blog.slug}`}
                      className="font-medium text-blue-500 hover:underline">
                      {blog.title}
                    </Link>
                  </td>
                  <td className="px-4 py-2 border-b text-center">
                    {convertToHandle(blog.author)}
                  </td>
                  <td className="px-4 py-2 border-b">
                    <span className="inline-block px-2 rounded-full bg-green-500 text-white">
                      Published
                    </span>
                  </td>
                  <td className="px-4 py-2 border-b">
                    <div className="flex space-x-2">
                      <Link
                        href={`/create/${blog.slug}`}
                        className="flex items-center gap-1 text-sm   bg-gray-200 border px-1 py-0.5 rounded-md hover:bg-cyan-500 hover:text-white"
                        title="edit blog">
                        <Edit size={14} />
                      </Link>

                      <button
                        className="flex items-center gap-1 text-sm   bg-gray-200 border px-1 py-0.5 rounded-md hover:bg-red-500 hover:text-white"
                        onClick={() => deleteBlog(blog)}
                        title="delete blog">
                        <Trash size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
