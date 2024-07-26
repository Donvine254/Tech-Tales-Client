"use client";
import React, { useState } from "react";
import toast from "react-hot-toast";
import axiosInstance from "@/axiosConfig";
import { convertToHandle } from "@/lib/utils";
import Loader from "../Loader";
import { baseUrl } from "@/lib";

export default function AdminUpdateProfileModal({ user, setUsers }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState({
    username: user?.username ?? "",
    handle: user?.handle ?? "",
    bio: user?.bio ?? "",
    role: user?.role ?? "user",
  });
  const handleUsernameChange = (e) => {
    const { value } = e.target;
    setData((prevData) => ({
      ...prevData,
      username: value,
      handle: convertToHandle(value),
    }));
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const toastId = toast.loading("Processing Request...", {
        position: "bottom-center",
      });
      if (data && user) {
        const res = await axiosInstance.patch(
          `${baseUrl}/users?id=${user.id}`,
          data
        );
        const userData = await res.data;
        setUsers((prev) => [...prev, userData]);
        toast.success("Details updated successfully!");
        setLoading(false);
        document.getElementById("profile_update_modal").close();
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
      setError(error?.response?.data?.error);
      toast.error("Something went wrong");
    } finally {
      toast.dismiss();
    }
  }

  return (
    <dialog
      id={`profile_update_modal_${user.id}`}
      className="modal backdrop-blur-2xl rounded-xl">
      <form
        className="rounded-lg border  shadow-sm w-full max-w-lg bg-slate-100"
        method="dialog"
        onSubmit={handleSubmit}>
        <div className="px-6 pt-2">
          <h3 className="md:text-xl font-medium leading-none tracking-tight mt-2 text-center">
            Update User Profile Information
          </h3>
        </div>
        <div className="p-6 space-y-2">
          <div className="space-y-1">
            <label className="font-semibold" htmlFor="username">
              Username
            </label>
            <input
              className="flex h-10 w-full border-b border-green-500 bg-transparent focus:outline-none py-2 invalid:border-red-500"
              id={`username${user.id}`}
              name="username"
              value={data.username}
              autoComplete="username"
              pattern="^[a-zA-Z\s]*$"
              title="numbers and special characters are not allowed"
              maxLength={20}
              minLength={3}
              onChange={handleUsernameChange}
            />
            {error ? (
              <p className="text-[14px] text-red-500">* {error}</p>
            ) : (
              <p className="text-[14px] text-gray-600">
                Appears on the profile page, as author title, and in comments.
              </p>
            )}
          </div>
          <div className="space-y-1">
            <label className="font-semibold" htmlFor="Bio">
              Bio
            </label>
            <input
              className="h-8 w-full border-b border-green-500 bg-transparent focus:outline-none py-2 invalid:border-red-500"
              id={`bio${user.id}`}
              value={data.bio}
              minLength={5}
              maxLength={100}
              spellCheck={true}
              autoComplete="on"
              autoCorrect="on"
              title="numbers and special characters are not allowed"
              onChange={(e) => {
                setData((prev) => ({
                  ...prev,
                  bio: e.target.value,
                }));
              }}
            />
            <p className="text-[14px] text-gray-600 flex items-center justify-between gap-4">
              Appears on profile page and author card.
              <span>{data?.bio?.length ?? 0}/100</span>
            </p>
          </div>
          <div className="space-y-1">
            <label htmlFor="role" className="font-semibold">
              Role
            </label>
            <select
              className="h-8 w-full border-b border-green-500 bg-transparent focus:outline-none py-2 invalid:border-red-500"
              value={data.role}
              disabled={loading}
              title="Change user roles on the dashboard"
              onChange={(e) => {
                setData((prev) => ({
                  ...prev,
                  role: e.target.value,
                }));
              }}>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
          </div>
          <div className="space-y-1">
            <label htmlFor="password" className="font-semibold">
              Password
            </label>
            <button
              type="button"
              disabled
              className="px-4  w-full py-1 bg-cyan-100 border hover:bg-cyan-200  rounded-xl disabled:bg-opacity-30 disabled:border-gray-200 disabled:pointer-events-none "
              onClick={() => {
                setData((prev) => ({
                  ...prev,
                  password: "password",
                }));
              }}>
              Reset User Password
            </button>
            <p className="text-[14px] text-gray-600">
              Only reset user password if requested by the user!
            </p>
          </div>
        </div>
        <div className="flex items-center justify-end gap-4 px-6 py-2">
          <button
            type="reset"
            title="reset"
            className="px-4 h-10 py-1 border-2 border-green-400 hover:border-orange-500 rounded-xl disabled:bg-opacity-30 disabled:border-gray-200 bg-transparent"
            disabled={loading}
            onClick={() => {
              document
                .getElementById(`profile_update_modal_${user.id}`)
                .close();
            }}>
            Cancel
          </button>
          <button
            className="px-4 py-1 h-10 border-2 bg-blue-600 text-white rounded-xl disabled:pointer-events-none disabled:bg-gray-100 disabled:text-black flex items-center justify-center gap-2"
            type="submit"
            title="submit"
            disabled={
              data?.username?.toLowerCase().trim() ===
                user?.username?.toLowerCase().trim() &&
              data?.bio?.toLowerCase().trim() ===
                user?.bio?.toLowerCase().trim() &&
              loading
            }>
            {loading ? (
              <>
                <Loader size="12" /> Saving...
              </>
            ) : (
              "Save Changes"
            )}
          </button>
        </div>
        <p className="px-6 py-1 text-sm text-center bg-red-100 text-red-600">
          Avoid carelessly updating user details since this might be upsetting
          and lead to a bad user experience!
        </p>
      </form>
    </dialog>
  );
}
