"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Edit, Trash, SearchIcon } from "@/assets";
import { convertToHandle } from "@/lib/utils";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { revalidateBlogs, revalidatePage } from "@/lib/actions";
import { exportCSV } from "@/lib/utils";
import Axios from "axios";

export default function Dashboard({ blogs, totalComments, totalUsers }) {
  const router = useRouter();

  const blogsData = blogs.sort((a, b) => a.id - b.id);
  const [totalBlogs, setTotalBlogs] = useState(blogsData);
  const [isSorted, setIsSorted] = useState(false);

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
    toast.success("Incoming feature");
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
      await Axios.delete(`https://techtales.up.railway.app/blogs/${blog.id}`);
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
    <section className="w-full min-h-[320px] py-4 md:mt-10">
      <div className="grid grid-cols-1 gap-4  py-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 ">
        {/* first card */}
        <div className=" bg-gray-100 hover:bg-gray-200 p-6 space-y-4 text-center  shadow rounded-md hover:-translate-y-1 transition-transform duration-300">
          <div className=" inline-flex items-center justify-center w-full text-cyan-500">
            <svg
              version="1.1"
              id="_x32_"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              fill="#06b6d4 "
              height={48}
              width={48}>
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <g>
                  {" "}
                  <rect
                    x="293.186"
                    y="307.184"
                    width="131.572"
                    height="112.986"></rect>{" "}
                  <rect
                    x="87.243"
                    y="308.893"
                    width="154.448"
                    height="17.162"></rect>{" "}
                  <rect
                    x="87.243"
                    y="401.298"
                    width="154.448"
                    height="17.162"></rect>{" "}
                  <rect
                    x="87.243"
                    y="355.1"
                    width="154.448"
                    height="17.162"></rect>{" "}
                  <path d="M416.428,0.004H95.58C42.787,0.013,0.016,42.792,0,95.577v303.685 c0.025,62.262,50.463,112.717,112.742,112.734h286.524c62.27-0.017,112.717-50.464,112.734-112.734V95.577 C511.992,42.792,469.212,0.013,416.428,0.004z M464.805,399.262c-0.008,18.15-7.308,34.424-19.198,46.34 c-11.916,11.891-28.19,19.19-46.34,19.198H112.742c-18.15-0.009-34.433-7.308-46.348-19.198 c-11.892-11.916-19.182-28.19-19.198-46.34V118.696h417.61V399.262z"></path>{" "}
                  <path d="M88.96,267.908h34.583c19.71,0,31.642-8.581,31.642-26.548c0-10.852-6.167-18.368-12.2-20.648v-0.268 c6.034-3.352,10.592-9.519,10.592-19.432c0-14.489-9.251-24.268-29.086-24.268H88.96c-0.796,0-1.332,0.536-1.332,1.34v88.475 C87.628,267.371,88.164,267.908,88.96,267.908z M107.338,193.495c0-0.528,0.251-0.804,0.804-0.804h13.944 c7.5,0,11.925,3.888,11.925,10.584c0,6.712-4.425,10.734-11.925,10.734h-13.944c-0.553,0-0.804-0.268-0.804-0.804V193.495z M107.338,229.955c0-0.528,0.251-0.795,0.804-0.795h15c8.061,0,12.343,4.424,12.343,11.405c0,7.097-4.282,11.396-12.343,11.396h-15 c-0.553,0-0.804-0.276-0.804-0.812V229.955z"></path>{" "}
                  <path d="M181.516,267.908h59.404c0.796,0,1.332-0.536,1.332-1.349v-14.874c0-0.813-0.536-1.341-1.332-1.341h-40.224 c-0.544,0-0.804-0.268-0.804-0.812v-71.447c0-0.804-0.528-1.34-1.341-1.34h-17.036c-0.805,0-1.332,0.536-1.332,1.34v88.475 C180.183,267.371,180.711,267.908,181.516,267.908z"></path>{" "}
                  <path d="M292.708,269.374c15.963,0,28.558-7.366,33.251-22.115c2.011-6.301,2.539-11.396,2.539-24.938 c0-13.542-0.528-18.637-2.539-24.939c-4.693-14.739-17.288-22.114-33.251-22.114c-15.956,0-28.558,7.375-33.243,22.114 c-2.02,6.302-2.556,11.397-2.556,24.939c0,13.542,0.536,18.637,2.556,24.938C264.149,262.009,276.752,269.374,292.708,269.374z M278.361,202.746c2.011-6.301,6.847-10.055,14.346-10.055c7.508,0,12.335,3.754,14.346,10.055 c1.073,3.226,1.474,7.634,1.474,19.576c0,11.924-0.402,16.357-1.474,19.567c-2.011,6.31-6.838,10.072-14.346,10.072 c-7.5,0-12.335-3.763-14.346-10.072c-1.064-3.21-1.475-7.643-1.475-19.567C276.886,210.38,277.297,205.972,278.361,202.746z"></path>{" "}
                  <path d="M387.961,269.374c16.081,0,28.685-8.171,33.251-22.794c1.6-4.952,2.263-12.46,2.263-20.505v-7.517 c0-0.788-0.536-1.333-1.332-1.333h-31.366c-0.813,0-1.349,0.545-1.349,1.333v12.888c0,0.796,0.536,1.332,1.349,1.332h12.326 c0.536,0,0.805,0.277,0.805,0.805c0,3.879-0.403,6.703-1.073,8.991c-1.878,6.026-7.777,9.386-14.614,9.386 c-7.91,0-12.88-3.763-14.891-10.072c-1.064-3.21-1.466-7.643-1.466-19.567c0-11.941,0.402-16.223,1.466-19.441 c2.011-6.302,6.847-10.19,14.631-10.19c7.5,0,12.05,3.218,15.678,9.385c0.269,0.67,0.939,0.939,1.886,0.67l14.338-6.033 c0.796-0.402,0.947-1.206,0.536-2.019c-4.299-10.995-15.419-19.425-32.439-19.425c-16.232,0-28.835,7.375-33.527,22.114 c-2.012,6.302-2.556,11.397-2.556,24.939c0,13.542,0.545,18.637,2.556,24.938C359.126,262.009,371.73,269.374,387.961,269.374z"></path>{" "}
                </g>{" "}
              </g>
            </svg>
          </div>
          <h1 className="text-6xl text-center font-bold font-sans">
            {blogs.length}
          </h1>
          <p className="text-gray-600">Total published blogs.</p>
          <hr />
          <p className="text-gray-600 "> Manage and publish blogs.</p>
        </div>
        {/* second card */}
        <div className=" bg-gray-100 hover:bg-gray-200 p-6 space-y-4  shadow rounded-md hover:-translate-y-1 transition-transform duration-300 text-center">
          <div className=" inline-flex items-center justify-center w-full text-cyan-500">
            <svg viewBox="0 0 24 24" fill="currentColor" height="48" width="48">
              <path d="M20 2H4a2 2 0 00-2 2v12a2 2 0 002 2h4v3c0 .55.45 1 1 1h.5c.25 0 .5-.1.7-.29L13.9 18H20c1.11 0 2-.89 2-2V4a2 2 0 00-2-2m-9.53 12L7 10.5l1.4-1.41 2.07 2.08L15.6 6 17 7.41 10.47 14z" />
            </svg>
          </div>

          <h1 className="text-6xl font-sans font-bold">{totalComments}</h1>

          <p className="text-gray-600 "> Total comments</p>
          <hr />
          <p className="text-gray-600 ">
            {" "}
            Moderate and respond to user comments.
          </p>
        </div>

        {/* third card */}
        <div className=" bg-gray-100 hover:bg-gray-200 p-6 space-y-4 text-center shadow rounded-md hover:-translate-y-1 transition-transform duration-300">
          <div className=" inline-flex items-center justify-center w-full text-cyan-500">
            <svg
              viewBox="0 0 640 512"
              fill="currentColor"
              height="48"
              width="48">
              <path d="M41 7C31.6-2.3 16.4-2.3 7 7s-9.3 24.6 0 34l72 72c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9L41 7zm558 0l-72 72c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l72-72c9.4-9.4 9.4-24.6 0-33.9S608.3-2.4 599 7zM7 505c9.4 9.4 24.6 9.4 33.9 0l72-72c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0L7 471c-9.4 9.4-9.4 24.6 0 33.9zm592 0c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-72-72c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l72 72zM320 256c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm-107.9 80c-2.7 7.5-4.1 15.6-4.1 24 0 13.3 10.7 24 24 24h176c13.3 0 24-10.7 24-24 0-8.4-1.4-16.5-4.1-24-.5-1.4-1-2.7-1.6-4-9.4-22.3-29.8-38.9-54.3-43-3.9-.7-7.9-1-12-1h-80c-4.1 0-8.1.3-12 1-.8.1-1.7.3-2.5.5-24.9 5.1-45.1 23-53.4 46.5zm-36.3-112c26.5 0 48-21.5 48-48s-21.5-48-48-48-48 21.5-48 48 21.5 48 48 48zm-26.5 32c-29.4 0-53.3 23.9-53.3 53.3 0 14.7 11.9 26.7 26.7 26.7h56.1c8-34.1 32.8-61.7 65.2-73.6-7.5-4.1-16.2-6.4-25.3-6.4h-69.4zm368 80c14.7 0 26.7-11.9 26.7-26.7 0-29.5-23.9-53.3-53.3-53.3h-69.4c-9.2 0-17.8 2.3-25.3 6.4 32.4 11.9 57.2 39.5 65.2 73.6h56.1zM464 224c26.5 0 48-21.5 48-48s-21.5-48-48-48-48 21.5-48 48 21.5 48 48 48z" />
            </svg>
          </div>
          <h1 className="text-6xl text-center font-bold font-sans">
            {totalUsers}
          </h1>
          <p className="text-gray-600"> Total Users.</p>
          <hr />
          <p className="text-gray-600">
            {" "}
            Keep track of your registered authors.
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <h1 className="text-xl  font-semibold my-2 md:text-2xl lg:text-3xl">
          Blogs
        </h1>
        <div className="flex items-center gap-1 ">
          <Link
            href="/create?user=admin"
            className="p-2 bg-cyan-500  rounded-md border hover:bg-black text-white flex items-center ">
            <svg viewBox="0 0 24 24" fill="currentColor" height="24" width="24">
              <path d="M17 11a1 1 0 010 2h-4v4a1 1 0 01-2 0v-4H7a1 1 0 010-2h4V7a1 1 0 012 0v4h4z" />
            </svg>
            <span>Add Blog</span>
          </Link>
          <button
            className="p-2 bg-gray-900 rounded-md border hover:bg-gray-600 text-white flex items-center gap-1"
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
      <div className="flex items-center w-full ">
        <div className="relative w-full md:w-[3/4] ">
          <input
            type="search"
            id="search"
            name="search"
            minLength={2}
            placeholder="Search.."
            autoCorrect="on"
            autoComplete="on"
            onChange={(e) => handleSearch(e)}
            className="rounded-xl focus:border-blue-500 bg-gray-50 p-2 pl-10  px-4 w-full md:w-[3/4] text-black focus:outline-none text-xl border-2 border-gray-300   placeholder-gray-600 shadow"
          />
          <SearchIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600" />
        </div>
        <div
          className="cursor-pointer border-2 bg-gray-50 hover:bg-blue-500 hover:text-slate-200 rounded-xl p-2 px-3 m-1 border-gray-300 hover:border-blue-500 shadow "
          onClick={handleSort}>
          <svg
            viewBox="0 0 1024 1024"
            fill="currentColor"
            height="24"
            width="24">
            <path d="M839.6 433.8L749 150.5a9.24 9.24 0 00-8.9-6.5h-77.4c-4.1 0-7.6 2.6-8.9 6.5l-91.3 283.3c-.3.9-.5 1.9-.5 2.9 0 5.1 4.2 9.3 9.3 9.3h56.4c4.2 0 7.8-2.8 9-6.8l17.5-61.6h89l17.3 61.5c1.1 4 4.8 6.8 9 6.8h61.2c1 0 1.9-.1 2.8-.4 2.4-.8 4.3-2.4 5.5-4.6 1.1-2.2 1.3-4.7.6-7.1zM663.3 325.5l32.8-116.9h6.3l32.1 116.9h-71.2zm143.5 492.9H677.2v-.4l132.6-188.9c1.1-1.6 1.7-3.4 1.7-5.4v-36.4c0-5.1-4.2-9.3-9.3-9.3h-204c-5.1 0-9.3 4.2-9.3 9.3v43c0 5.1 4.2 9.3 9.3 9.3h122.6v.4L587.7 828.9a9.35 9.35 0 00-1.7 5.4v36.4c0 5.1 4.2 9.3 9.3 9.3h211.4c5.1 0 9.3-4.2 9.3-9.3v-43a9.2 9.2 0 00-9.2-9.3zM416 702h-76V172c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v530h-76c-6.7 0-10.5 7.8-6.3 13l112 141.9a8 8 0 0012.6 0l112-141.9c4.1-5.2.4-13-6.3-13z" />
            <title>Sort by title</title>
          </svg>
        </div>
        <div
          className="cursor-pointer border-2 bg-gray-50 hover:bg-blue-500 hover:text-slate-200 rounded-xl p-2 px-3 m-1 border-gray-300 hover:border-blue-500 shadow "
          onClick={handleDateSort}>
          <svg viewBox="0 0 24 24" fill="currentColor" height="24" width="24">
            <path d="M20 17h3l-4 4-4-4h3V3h2v14M8 5c-3.86 0-7 3.13-7 7s3.13 7 7 7c3.86 0 7-3.13 7-7s-3.13-7-7-7m2.19 9.53L7 12.69V9h1.5v2.82l2.44 1.41-.75 1.3z" />
            <title>sort by date</title>
          </svg>
        </div>
      </div>
      {/* end of search input beginning of table */}
      <div className="overflow-x-auto py-2">
        <table className="min-w-full border-separate border-spacing-2 border rounded-md  bg-gray-50 xsm:text-sm ">
          <thead>
            <tr className="border-gray-400 border">
              <th className="px-4 py-2 border-b font-bold">ID</th>
              <th className="px-4 py-2 border-b font-bold">Title</th>
              <th className="px-4 py-2 border-b font-bold">Author</th>
              <th className="px-4 py-2 border-b font-bold">Status</th>
              <th className="px-4 py-2 border-b font-bold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs &&
              totalBlogs.map((blog) => (
                <tr
                  key={blog.id}
                  className="hover:bg-gray-200 group border-gray-400 -1">
                  <td className="px-4 py-2 border-b ">
                    <span className="bg-gray-200 rounded-full  px-1 border group-hover:bg-gray-50 text-sm ">
                      {" "}
                      #00{blog.id}
                    </span>
                  </td>
                  <td className="px-4 py-2 border-b">
                    <Link
                      href={`/blogs/${blog.slug}`}
                      className="font-medium hover:text-blue-500 hover:underline">
                      {blog.title}
                    </Link>
                  </td>
                  <td className="px-4 py-2 border-b text-center">
                    {convertToHandle(blog.author)}
                  </td>
                  <td className="px-4 py-2 border-b">
                    <span className="inline-block px-2 rounded-full bg-green-500 text-white text-sm">
                      Published
                    </span>
                  </td>
                  <td className="px-4 py-2 border-b">
                    <div className="flex space-x-2">
                      <Link
                        href={`/create/${blog.slug}`}
                        className="flex items-center gap-1 text-sm   bg-gray-200 border px-1 py-0.5 rounded-md  group-hover:bg-cyan-100 group-hover:border-cyan-500"
                        title="edit blog">
                        <Edit size={14} />
                      </Link>

                      <button
                        className="flex items-center gap-1 text-sm   bg-gray-200 border px-1 py-0.5 rounded-md  group-hover:bg-red-100 group-hover:border-red-500"
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
