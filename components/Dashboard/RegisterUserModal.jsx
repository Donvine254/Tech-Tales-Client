"use client";
import React, { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import Loader from "../Loader";
import { baseUrl } from "@/lib";

export default function AdminRegisterUserModal() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState({
    username: "",
    bio: "",
    email: "",
    password: "password",
  });
  const handleChange = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      if (data) {
        const toastId = toast.loading("Processing Request...", {
          position: "bottom-center",
        });
        await axios.post(`${baseUrl}/users`, data);
        toast.success("User created successfully!");
        setLoading(false);
        document.getElementById("register_user_modal").close();
        router.push("/admin");
        router.refresh();
      }
    } catch (error) {
      setError(error?.response?.data?.error);
      console.error(error);
      setLoading(false);
    } finally {
      toast.dismiss();
    }
  }

  return (
    <dialog
      id="register_user_modal"
      className="modal backdrop-blur-2xl rounded-xl">
      <form
        className="rounded-lg border  shadow-sm w-full max-w-lg bg-gray-50"
        method="dialog"
        onSubmit={handleSubmit}>
        <div className="px-6 pt-2">
          <h3 className="md:text-xl font-semibold  leading-none tracking-tight mt-2 text-center">
            Create A New User
          </h3>
        </div>
        <div className="px-6 pt-1 space-y-1.5 group">
          <div className="space-y-2">
            <label
              className="text-base font-bold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-700"
              htmlFor="username">
              Username
            </label>
            <input
              className="flex h-10 focus:outline-none text-base disabled:cursor-not-allowed disabled:opacity-50 w-full px-3 py-2 border border-gray-300 rounded-md"
              id="username"
              name="username"
              placeholder="john doe"
              value={data.username}
              onChange={handleChange}
              disabled={loading}
              required
              type="text"
              minLength={3}
              maxLength={20}
              pattern="^(?!.*@).*"
              title="Email addresses are not allowed as usernames."
            />
          </div>
          <div className="space-y-2">
            <label
              className="text-base font-bold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-700"
              htmlFor="email">
              Email
            </label>
            <input
              className="flex h-10 focus:outline-none text-base  disabled:cursor-not-allowed disabled:opacity-50 w-full px-3 py-2 border border-gray-300 rounded-md"
              id="email-1"
              name="email"
              title="must be a valid email address"
              placeholder="you@example.com"
              value={data.email}
              onChange={handleChange}
              disabled={loading}
              required
              type="email"
            />
          </div>
          {/* <div className="space-y-2">
            <label
              className="text-base font-bold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-700"
              htmlFor="role">
              Role
            </label>
            <select
              className="flex h-10 bg-background text-base  disabled:cursor-not-allowed focus:outline-none disabled:opacity-50 w-full px-3 py-2 border border-gray-300 rounded-md"
              id="role"
              name="role"
              placeholder="you@example.com"
              value={data.role}
              onChange={handleChange}
              disabled={loading}>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
          </div> */}
        </div>
        {error && (
          <div className="my-1 px-6">
            <p className="text-sm text-red-500">*{error}</p>
          </div>
        )}
        {/* start of actions buttons */}
        <div className="flex items-center justify-end gap-4 px-6 py-2">
          <button
            type="reset"
            title="reset"
            className="px-4 h-10 py-1 border-2 border-green-400 hover:border-orange-500 rounded-xl disabled:bg-opacity-30 disabled:border-gray-200 bg-transparent"
            disabled={loading}
            onClick={() => {
              document.getElementById("register_user_modal").close();
            }}>
            Cancel
          </button>
          <button
            className="px-4 py-1 h-10 border-2 bg-blue-600 text-white rounded-xl disabled:pointer-events-none disabled:bg-gray-100 disabled:text-black flex items-center justify-center gap-2 w-32"
            type="submit"
            title="submit"
            disabled={loading}>
            {loading ? (
              <>
                <Loader size={24} />
              </>
            ) : (
              "Register User"
            )}
          </button>
        </div>
        <p className="px-6 py-1 text-sm text-center bg-green-100 text-green-600">
          An automatic email will be sent to the specified email address
          requesting users to reset their password!
        </p>
      </form>
    </dialog>
  );
}
