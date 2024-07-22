import React, { useState } from "react";
import Link from "next/link";
import { SearchIcon } from "@/assets";
import BlogActionsButton from "./blogActions";
import Image from "next/image";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { baseUrl, handleUpdateStatus } from "@/lib";
import { revalidateBlogs, revalidatePage } from "@/lib/actions";
import { exportCSV } from "@/lib/utils";
import Axios from "axios";
import { useRouter } from "next/navigation";

export default function BlogsTable({ blogs }) {
  const blogsData = blogs.sort((a, b) => a.id - b.id);
  const [totalBlogs, setTotalBlogs] = useState(blogsData);
  const [isSorted, setIsSorted] = useState(false);
  const router = useRouter();

  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    if (searchTerm === "") {
      setTotalBlogs(blogsData);
    }
    const filteredBlogs = blogsData.filter((blog) =>
      blog.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setTotalBlogs(filteredBlogs);
  };

  const handleSort = () => {
    if (isSorted) {
      setTotalBlogs(blogsData);
    } else {
      const sortedBlogs = [...blogsData].sort((a, b) =>
        a.title.localeCompare(b.title)
      );
      setTotalBlogs(sortedBlogs);
    }
    setIsSorted(!isSorted);
  };

  const handleDateSort = () => {
    if (isSorted) {
      setTotalBlogs(blogsData);
    } else {
      const sortedBlogs = [...blogsData].sort((a, b) => {
        return b.id - a.id;
      });
      setTotalBlogs(sortedBlogs);
    }
    setIsSorted(!isSorted);
  };

  //function to delete blogs
  async function deleteBlog(blog) {
    Swal.fire({
      icon: "warning",
      text: "Are you sure you want to delete this blog? This cannot action cannot be undone",
      showCloseButton: true,
      confirmButtonText: "Delete",
      showCancelButton: true,
      cancelButtonText: "Nevermind",
      footer:
        "Deleting user blogs without a valid reason might discourage them from blogging!",
      customClass: {
        confirmButton:
          "px-2 py-1 mx-2 bg-red-500 text-white rounded-md hover:text-white hover:bg-red-500",
        cancelButton: "px-2 py-1 mx-2 bg-green-500 rounded-md text-white",
      },
      buttonsStyling: false,
    }).then(async (result) => {
      if (result.isConfirmed) {
        await handleDelete(blog);
      }
    });
  }

  async function handleDelete(blog) {
    try {
      await Axios.delete(`${baseUrl}/blogs?id=${id}`);
      setTotalBlogs((prevBlogs) => prevBlogs.filter((b) => b.id !== blog.id));
      toast.success("Blog deleted successfully!");
      await Revalidate(blog);
      // try using window.location.reload()
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("An error has occurred");
    }
  }

  async function Revalidate(blog) {
    revalidateBlogs();
    revalidateBlogs(blog.slug);
    revalidatePage("latest");
    revalidatePage("admin/dashboard");
    revalidatePage("relevant");
  }
  return (
    <section>
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <h1 className="md:text-xl  font-semibold my-2 ">Manage Blogs</h1>
        <div className="flex items-center gap-1 md:gap-2 lg:gap-4 my-1 ">
          <Link
            href="/create?user=admin"
            target="_blank"
            className="xsm:hidden p-2 bg-cyan-100 text-cyan-600 border-cyan-600  rounded-md border hover:bg-cyan-500 hover:text-white flex items-center shadow ">
            <svg viewBox="0 0 24 24" fill="currentColor" height="24" width="24">
              <path d="M17 11a1 1 0 010 2h-4v4a1 1 0 01-2 0v-4H7a1 1 0 010-2h4V7a1 1 0 012 0v4h4z" />
            </svg>
            <span>Add Blog</span>
          </Link>
          <button
            className="p-2  rounded-md border hover:bg-gray-900 hover:text-white  flex items-center gap-1 shadow bg-white"
            onClick={() => exportCSV(blogs)}>
            <svg
              viewBox="0 0 640 512"
              fill="currentColor"
              height="24"
              width="24">
              <path d="M32 64C32 28.7 60.7 0 96 0h160v128c0 17.7 14.3 32 32 32h128v128H248c-13.3 0-24 10.7-24 24s10.7 24 24 24h168v112c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V64zm384 272v-48h110.1l-39-39c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l80 80c9.4 9.4 9.4 24.6 0 33.9l-80 80c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l39-39H416zm0-208H288V0l128 128z" />
            </svg>
            <span>Export CSV</span>
          </button>
        </div>
      </div>
      {/* search input */}
      <div className="flex items-center my-2 sm:gap-2 md:gap-4">
        <div className="relative w-full">
          <input
            type="search"
            id="search"
            name="search"
            minLength={3}
            placeholder="Search by title.."
            autoCorrect="on"
            autoComplete="on"
            onChange={(e) => handleSearch(e)}
            className="rounded-xl focus:border-blue-500 bg-gray-50 p-2 pl-10  px-4 w-full  text-black focus:outline-none text-xl border border-gray-300 h-12   placeholder-gray-400 shadow"
          />
          <SearchIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600" />
        </div>
        <div
          className={`cursor-pointer border  hover:text-slate-200 rounded-xl p-2 px-3 m-1 content-center  shadow h-12 ${
            isSorted
              ? "bg-blue-500 text-white"
              : "bg-gray-50 text-black hover:bg-blue-500   "
          }`}
          onClick={handleSort}>
          <svg
            viewBox="0 0 1024 1024"
            fill="currentColor"
            height="24"
            width="24">
            <path d="M839.6 433.8L749 150.5a9.24 9.24 0 00-8.9-6.5h-77.4c-4.1 0-7.6 2.6-8.9 6.5l-91.3 283.3c-.3.9-.5 1.9-.5 2.9 0 5.1 4.2 9.3 9.3 9.3h56.4c4.2 0 7.8-2.8 9-6.8l17.5-61.6h89l17.3 61.5c1.1 4 4.8 6.8 9 6.8h61.2c1 0 1.9-.1 2.8-.4 2.4-.8 4.3-2.4 5.5-4.6 1.1-2.2 1.3-4.7.6-7.1zM663.3 325.5l32.8-116.9h6.3l32.1 116.9h-71.2zm143.5 492.9H677.2v-.4l132.6-188.9c1.1-1.6 1.7-3.4 1.7-5.4v-36.4c0-5.1-4.2-9.3-9.3-9.3h-204c-5.1 0-9.3 4.2-9.3 9.3v43c0 5.1 4.2 9.3 9.3 9.3h122.6v.4L587.7 828.9a9.35 9.35 0 00-1.7 5.4v36.4c0 5.1 4.2 9.3 9.3 9.3h211.4c5.1 0 9.3-4.2 9.3-9.3v-43a9.2 9.2 0 00-9.2-9.3zM416 702h-76V172c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v530h-76c-6.7 0-10.5 7.8-6.3 13l112 141.9a8 8 0 0012.6 0l112-141.9c4.1-5.2.4-13-6.3-13z" />
            <title>Sort by A-Z</title>
          </svg>
        </div>
        <div
          className={`cursor-pointer border  hover:text-slate-200 rounded-xl p-2 px-3 m-1 content-center shadow h-12 ${
            isSorted
              ? "bg-blue-500 text-white"
              : "bg-gray-50 text-black hover:bg-blue-500   "
          }`}
          onClick={handleDateSort}>
          <svg viewBox="0 0 24 24" fill="currentColor" height="24" width="24">
            <path d="M20 17h3l-4 4-4-4h3V3h2v14M8 5c-3.86 0-7 3.13-7 7s3.13 7 7 7c3.86 0 7-3.13 7-7s-3.13-7-7-7m2.19 9.53L7 12.69V9h1.5v2.82l2.44 1.41-.75 1.3z" />
            <title>sort by date</title>
          </svg>
        </div>
      </div>
      {/* end of search input beginning of table */}
      <div className="overflow-x-auto py-2 ">
        <table className="min-w-full border shadow  bg-gray-50 xsm:text-sm ">
          <thead>
            <tr className="bg-[#7bede6] rounded-md ">
              <th className="px-4 py-2  font-bold">#</th>
              <th className="px-4 py-2  font-bold text-start">Author</th>
              <th className="px-4 py-2  font-bold text-start">Title</th>
              <th className="px-4 py-2  font-bold">Status</th>
              <th className="px-4 py-2  font-bold ">Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs &&
              totalBlogs.map((blog) => (
                <tr
                  key={blog.id}
                  className="hover:bg-gray-200 group border-gray-400">
                  <td className="px-4 py-2 content-center ">
                    <span className="bg-gray-200 rounded-full  px-1 group-hover:bg-gray-50 text-sm ">
                      {" "}
                      {blog.id < 10 ? "#000" : "#00"}
                      {blog.id}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-start capitalize content-center whitespace-nowrap xsm:text-sm">
                    <div className="flex items-center gap-1">
                      <Image
                        src={blog.author.picture}
                        alt={blog.author.username}
                        height={32}
                        width={32}
                        className="rounded-full  italic h-8 w-8"
                      />{" "}
                      <span>{blog.author.username}</span>
                    </div>
                  </td>
                  <td className="px-4 py-2 place-items-center ">
                    <Link
                      href={`/blogs/${blog.slug}`}
                      className="font-medium hover:text-blue-500 hover:underline">
                      {blog.title}
                    </Link>
                  </td>

                  <td className="px-4 py-2 place-items-center ">
                    <span
                      className={`inline-block px-2 rounded-full border text-sm ${
                        blog.status === "PUBLISHED"
                          ? "bg-green-100 text-green-600  border-green-200"
                          : blog.status === "UNPUBLISHED"
                          ? "bg-yellow-100 text-yellow-600  border-yellow-600"
                          : "bg-gray-200 text-gray-700 border-gray-400"
                      }`}>
                      {blog.status.toLowerCase()}
                    </span>
                  </td>
                  <td className="px-4 py-2   place-items-center">
                    <div className="flex items-center justify-center">
                      <BlogActionsButton
                        blog={blog}
                        onDelete={() => deleteBlog(blog)}
                        onUpdate={handleUpdateStatus}
                        setBlogs={setTotalBlogs}
                      />
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <p>
          Showing <strong>{totalBlogs.length}</strong> of{" "}
          <strong>{blogs.length}</strong> blogs
        </p>
      </div>
    </section>
  );
}
