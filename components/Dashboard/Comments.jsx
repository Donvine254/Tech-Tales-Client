import React, { useState } from "react";
import { SearchIcon } from "@/assets";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { baseUrl } from "@/lib";
import CommentActionsButton from "./commentActions";
import { updateCommentStatus } from "@/lib/actions";
import Axios from "axios";
import Image from "next/image";
import Link from "next/link";

export default function CommentsTable({ comments }) {
  const commentsData = comments.sort((a, b) => a.id - b.id);
  const [totalComments, setTotalComments] = useState(commentsData);
  const [isSorted, setIsSorted] = useState(false);

  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    if (searchTerm === "") {
      setTotalComments(commentsData);
    }
    const filteredComments = commentsData.filter((comment) =>
      comment.blog.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setTotalComments(filteredComments);
  };

  const handleSort = () => {
    if (isSorted) {
      setTotalComments(commentsData);
    } else {
      const sortedComments = [...commentsData].sort((a, b) => b.id - a.id);
      setTotalComments(sortedComments);
    }
    setIsSorted(!isSorted);
  };

  //function to delete comments
  async function deleteComment(id) {
    Swal.fire({
      icon: "warning",
      text: "Are you sure you want to delete this comment? This action cannot be undone!",
      showCloseButton: true,
      confirmButtonText: "Delete",
      showCancelButton: true,
      cancelButtonText: "Nevermind",
      footer:
        "Deleting user comments without a valid reason might affect user experience!",
      customClass: {
        confirmButton:
          "px-2 py-1 mx-2 bg-red-500 text-white rounded-md hover:text-white hover:bg-red-500",
        cancelButton: "px-2 py-1 mx-2 bg-green-500 rounded-md text-white",
      },
      buttonsStyling: false,
    }).then(async (result) => {
      if (result.isConfirmed) {
        Axios.delete(`${baseUrl}/comments?id=${id}`);
        toast.success("comment deleted successfully");
        setTotalComments((prevBlogs) => prevBlogs.filter((b) => b.id !== id));
      }
    });
  }
  //function to update comment status

  async function handleUpdateCommentStatus(status, id) {
    try {
      const toastId = toast.loading("Processing Request...", {
        position: "bottom-center",
      });
      const data = await updateCommentStatus(status, id);
      setTotalComments((prev) =>
        prev.map((comment) => (comment.id === data.id ? data : comment))
      );
      toast.success("Comment status updated successfully");
    } catch (error) {
      console.error(error);
      toast.error("Oops! Something went wrong");
    } finally {
      toast.dismiss();
    }
  }

  return (
    <section>
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <h1 className="md:text-xl  font-semibold my-2 ">Manage comments</h1>
      </div>
      {/* search input */}
      <div className="flex items-center my-2 sm:gap-2 md:gap-4">
        <div className="relative w-full">
          <input
            type="search"
            id="search"
            name="search"
            minLength={3}
            placeholder="Search.."
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
      </div>
      {/* end of search input beginning of table */}
      <div className="overflow-x-auto py-2">
        <table className="min-w-full shadow bg-gray-50 xsm:text-sm ">
          <thead>
            <tr className="bg-[#7bede6]">
              <th className="px-4 py-2 font-bold">#</th>
              <th className="px-4 py-2 font-bold text-start">Author</th>
              <th className="px-4 py-2 font-bold text-start">Blog</th>
              <th className="px-4 py-2 font-bold text-start">Status</th>
              <th className="px-4 py-2 font-bold text-start">Actions</th>
            </tr>
          </thead>
          <tbody>
            {comments &&
              totalComments.map((comment) => (
                <tr key={comment.id} className="hover:bg-zinc-200 group ">
                  <td className="px-4 py-2 ">
                    <span className="bg-gray-200 rounded-full  px-1 border group-hover:bg-gray-50 text-sm ">
                      {comment.id > 10 ? " #0" : "#00"}
                      {comment.id}
                    </span>
                  </td>
                  <td className="px-4 py-2  text-start capitalize  content-center whitespace-nowrap xsm:text-sm">
                    <div className="flex items-center  gap-1">
                      <Image
                        src={comment.author.picture}
                        alt={comment.author}
                        height={32}
                        width={32}
                        className="rounded-full border italic h-8 w-8"
                      />
                      <span>{comment.author.username}</span>
                    </div>
                  </td>
                  <td className="px-4 py-2 ">
                    <Link
                      href={`/blogs/${comment.blog.slug}#comments`}
                      target="_blank"
                      className="hover:underline hover:text-blue-600">
                      {comment.blog.title}
                    </Link>
                  </td>

                  <td className="px-4 py-2 ">
                    <span
                      className={`inline-block px-2 rounded-full border text-sm ${
                        comment.status === "VISIBLE"
                          ? "bg-green-100 text-green-600  border-green-300"
                          : comment.status === "HIDDEN"
                          ? "bg-yellow-100 text-yellow-600  border-yellow-600"
                          : comment.status === "FLAGGED"
                          ? "bg-red-100 text-red-600  border-red-600"
                          : "bg-gray-200 text-gray-700 border-gray-400"
                      }`}>
                      {comment.status.toLowerCase()}
                    </span>
                  </td>
                  <td className="px-4 py-2 ">
                    <div className="flex items-center justify-center">
                      <CommentActionsButton
                        onDelete={deleteComment}
                        comment={comment}
                        onUpdate={handleUpdateCommentStatus}
                      />
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <p>
          Showing <strong>{totalComments.length}</strong> of{" "}
          <strong>{comments.length}</strong> comments
        </p>
      </div>
    </section>
  );
}
// add pagination
