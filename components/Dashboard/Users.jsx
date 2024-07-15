import React, { useState } from "react";
import Link from "next/link";
import { Edit, Trash, SearchIcon } from "@/assets";
import { convertToHandle } from "@/lib/utils";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { exportUsersCSV } from "@/lib/utils";
import Axios from "axios";

export default function UsersTable({ users }) {
  const usersData = users.sort((a, b) => a.id.toString() - b.id.toString());
  const [totalUsers, setTotalUsers] = useState(usersData);
  const [isSorted, setIsSorted] = useState(false);

  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    if (searchTerm === "") {
      setTotalUsers(usersData);
    }
    const filteredUsers = usersData.filter((user) =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setTotalUsers(filteredUsers);
  };

  const handleSort = () => {
    if (isSorted) {
      setTotalUsers(usersData);
    } else {
      const sortedUsers = [...usersData].sort((a, b) =>
        a.username.localeCompare(b.username)
      );
      setTotalUsers(sortedUsers);
    }
    setIsSorted(!isSorted);
  };

  //function to delete users
  async function deleteUser(user) {
    Swal.fire({
      icon: "warning",
      text: "Are you sure you want to delete this user? This cannot action cannot be undone",
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
        Axios.delete(`https://techtales.up.railway.app/users/${user.id}`);
        toast.success("Account deleted successfully");
        setTotalUsers((prevBlogs) => prevBlogs.filter((b) => b.id !== user.id));
      }
    });
  }

  return (
    <section>
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <h1 className="md:text-xl  font-semibold my-2 ">Manage users</h1>
        <div className="flex items-center gap-1 md:gap-2 lg:gap-4 my-1 ">
          <Link
            href="/register"
            className="xsm:hidden p-2 bg-cyan-100 text-cyan-600 border-cyan-600  rounded-md border hover:bg-cyan-500 hover:text-white flex items-center shadow ">
            <svg viewBox="0 0 24 24" fill="currentColor" height="24" width="24">
              <path d="M17 11a1 1 0 010 2h-4v4a1 1 0 01-2 0v-4H7a1 1 0 010-2h4V7a1 1 0 012 0v4h4z" />
            </svg>
            <span>Add user</span>
          </Link>
          <button
            className="p-2  rounded-md border hover:bg-gray-900 hover:text-white  flex items-center gap-1 shadow bg-white"
            onClick={() => exportUsersCSV(users)}>
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
            placeholder="Search.."
            autoCorrect="on"
            autoComplete="on"
            onChange={(e) => handleSearch(e)}
            className="rounded-xl focus:border-blue-500 bg-gray-50 p-2 pl-10  px-4 w-full  text-black focus:outline-none text-xl border border-gray-300 h-12   placeholder-gray-600 shadow"
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
        <table className="min-w-full border-separate border-spacing-2 border rounded-md  bg-gray-50 xsm:text-sm ">
          <thead>
            <tr className="border-gray-400 border">
              <th className="px-4 py-2 border-b font-bold">ID</th>
              <th className="px-4 py-2 border-b font-bold text-start">Email</th>
              <th className="px-4 py-2 border-b font-bold text-start">
                Username
              </th>
              <th className="px-4 py-2 border-b font-bold">Role</th>
              <th className="px-4 py-2 border-b font-bold">Status</th>
              <th className="px-4 py-2 border-b font-bold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users &&
              totalUsers.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-gray-200 group border-gray-400 -1">
                  <td className="px-4 py-2 border-b ">
                    <span className="bg-gray-200 rounded-full  px-1 border group-hover:bg-gray-50 text-sm ">
                      {" "}
                      #00
                      {user.id.toString()}
                    </span>
                  </td>
                  <td className="px-4 py-2 border-b">{user.email}</td>
                  <td className="px-4 py-2 border-b text-start capitalize">
                    {convertToHandle(user.username)}
                  </td>

                  <td className="px-4 py-2 border-b text-center">
                    {user.role}
                  </td>
                  <td className="px-4 py-2 border-b">
                    <span className="inline-block px-2 rounded-full bg-green-500 text-white text-sm">
                      Active
                    </span>
                  </td>
                  <td className="px-4 py-2 border-b">
                    <div className="flex space-x-2">
                      <Link
                        href={`/me/settings`}
                        className="flex items-center gap-1 text-sm   bg-gray-200 border px-1 py-0.5 rounded-md  group-hover:bg-cyan-100 group-hover:border-cyan-500"
                        title="edit user">
                        <Edit size={14} />
                      </Link>

                      <button
                        className="flex items-center gap-1 text-sm   bg-gray-200 border px-1 py-0.5 rounded-md  group-hover:bg-red-100 group-hover:border-red-500"
                        onClick={() => deleteUser(user)}
                        title="delete user">
                        <Trash size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <p>
          Showing <strong>{totalUsers.length}</strong> of{" "}
          <strong>{users.length}</strong> users
        </p>
      </div>
    </section>
  );
}
// actions should include suspend user, make admin, reset password, edit user and delete user
