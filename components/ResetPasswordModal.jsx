"use client";
import React, { useState } from "react";
import toast from "react-hot-toast";
import axiosInstance from "@/axiosConfig";
import { useRouter } from "next/navigation";
import Loader from "./Loader";

export default function ResetPasswordModal({ user }) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [data, setData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const handleChange = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    if (name === "confirmPassword") {
      if (data.newPassword !== value) {
        setError("Passwords do not match");
      } else if (data.newPassword === data.currentPassword) {
        setError("New password cannot be the same as the old password");
      } else {
        setError(false);
      }
    }
  };
  async function handleSubmit(e) {
    if (error) {
      toast.error("Kindly make sure the passwords match");
      setLoading(false);
      return;
    }
    e.preventDefault();
    console.log(data);
  }

  return (
    <dialog
      id="password_reset_modal"
      className="modal backdrop-blur-2xl rounded-xl">
      <form
        className="rounded-lg border bg-card text-card-foreground shadow-sm w-full max-w-lg p-6 max-h-full"
        method="dialog"
        onSubmit={handleSubmit}>
        <div className="flex gap-2 items-center justify-center">
          <hr className="border border-blue-200 w-1/3" />
          <div className="flex flex-col text-blue-500 items-center w-14 h-14 rounded-full justify-center border bg-blue-100 ring ring-offset-1 ring-blue-400">
            <svg viewBox="0 0 24 24" fill="currentColor" height="30" width="30">
              <path d="M12.63 2c5.53 0 10.01 4.5 10.01 10s-4.48 10-10.01 10c-3.51 0-6.58-1.82-8.37-4.57l1.58-1.25C7.25 18.47 9.76 20 12.64 20a8 8 0 008-8 8 8 0 00-8-8C8.56 4 5.2 7.06 4.71 11h2.76l-3.74 3.73L0 11h2.69c.5-5.05 4.76-9 9.94-9m2.96 8.24c.5.01.91.41.91.92v4.61c0 .5-.41.92-.92.92h-5.53c-.51 0-.92-.42-.92-.92v-4.61c0-.51.41-.91.91-.92V9.23c0-1.53 1.25-2.77 2.77-2.77 1.53 0 2.78 1.24 2.78 2.77v1.01m-2.78-2.38c-.75 0-1.37.61-1.37 1.37v1.01h2.75V9.23c0-.76-.62-1.37-1.38-1.37z" />
            </svg>
            <span className="text-xl text-blue-500">****</span>
          </div>
          <hr className="border border-blue-200 w-1/3" />
        </div>
        <div className="flex flex-col space-y-1.5 px-6">
          <h3 className="text-xl text-gray-600 font-semibold leading-none tracking-tight mt-2 text-center">
            Change Your Password
          </h3>
          <div className="flex items-center justify-center gap-1">
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              height="1em"
              width="1em">
              <path d="M12 2C6.579 2 2 6.579 2 12s4.579 10 10 10 10-4.579 10-10S17.421 2 12 2zm0 5c1.727 0 3 1.272 3 3s-1.273 3-3 3c-1.726 0-3-1.272-3-3s1.274-3 3-3zm-5.106 9.772c.897-1.32 2.393-2.2 4.106-2.2h2c1.714 0 3.209.88 4.106 2.2C15.828 18.14 14.015 19 12 19s-3.828-.86-5.106-2.228z" />
            </svg>
            <span>{user?.email}</span>
          </div>
        </div>
        <div className="text-sm py-1">
          <p>Password Requirements</p>
          <ul className="list-disc">
            <li className="list-item list-inside">
              At least 8 Characters. Include letters, numbers and symbols
            </li>
            <li className="list-item list-inside">Not same as your username</li>
            <li className="list-item list-inside">
              Your new password cannot be the same as the current password
            </li>
          </ul>
        </div>
        <div>
          <div className="space-y-2">
            <label className="font-semibold" htmlFor="current-password">
              Current Password
            </label>
            <input
              className={`flex h-10 bg-background text-base disabled:cursor-not-allowed disabled:opacity-50 w-full px-3 py-2 border border-gray-300 rounded-md ${
                error ? "border-red-500 bg-red-100" : ""
              }`}
              id="current-password"
              name="currentPassword"
              placeholder="*******"
              value={data.currentPassword}
              onChange={handleChange}
              minLength={8}
              disabled={loading}
              required
              type="password"
            />
          </div>
          <div className="space-y-2">
            <label className="font-semibold" htmlFor="new-password">
              New Password
            </label>
            <input
              className={`flex h-10 bg-background text-base disabled:cursor-not-allowed disabled:opacity-50 w-full px-3 py-2 border border-gray-300 rounded-md ${
                error ? "border-red-500 bg-red-100" : ""
              }`}
              id="new-password"
              name="newPassword"
              placeholder="*******"
              value={data.newPassword}
              onChange={handleChange}
              minLength={8}
              disabled={loading}
              required
              type="password"
            />
          </div>
          <div className="space-y-2">
            <label className="font-semibold" htmlFor="confirm-password">
              Confirm Password
            </label>
            <input
              className={`flex h-10 bg-background text-base disabled:cursor-not-allowed disabled:opacity-50 w-full px-3 py-2 border border-gray-300 rounded-md ${
                error ? "border-red-500 bg-red-100" : ""
              }`}
              id="confirm-password"
              name="confirmPassword"
              placeholder="*******"
              value={data.confirmPassword}
              onChange={handleChange}
              minLength={8}
              disabled={loading}
              required
              type="password"
            />
          </div>
          <div className="h-5 min-h-5 max-h-5 space-y-1">
            {error ? (
              <p className="text-orange-600 inline-flex place-items-center items-center text-sm w-full gap-1 ">
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  height="1em"
                  width="1em">
                  <path d="M11 7h2v7h-2zm0 8h2v2h-2z" />
                  <path d="M21.707 7.293l-5-5A.996.996 0 0016 2H8a.996.996 0 00-.707.293l-5 5A.996.996 0 002 8v8c0 .266.105.52.293.707l5 5A.996.996 0 008 22h8c.266 0 .52-.105.707-.293l5-5A.996.996 0 0022 16V8a.996.996 0 00-.293-.707zM20 15.586L15.586 20H8.414L4 15.586V8.414L8.414 4h7.172L20 8.414v7.172z" />
                </svg>
                <span>{error}</span>
              </p>
            ) : (
              data.confirmPassword !== "" &&
              data.confirmPassword === data.newPassword && (
                <p className="text-green-500 inline-flex place-items-center items-center text-sm w-full gap-1">
                  <svg fill="none" viewBox="0 0 15 15" height="1em" width="1em">
                    <path
                      stroke="currentColor"
                      strokeLinecap="square"
                      d="M1 7l4.5 4.5L14 3"
                    />
                  </svg>
                  <span>Passwords match</span>
                </p>
              )
            )}
          </div>
        </div>
        <div className="flex items-center justify-end gap-4 px-6 py-1 pb-3">
          <button
            type="reset"
            title="reset"
            className="px-4 h-10 py-0.5 border-2 border-green-400 hover:border-orange-500 rounded-xl disabled:bg-opacity-30 disabled:border-gray-200 bg-transparent"
            disabled={loading}
            onClick={() => {
              document.getElementById("password_reset_modal").close();
            }}>
            Cancel
          </button>
          <button
            className="px-4 py-0.5 h-10 border-2 bg-blue-600 text-white rounded-xl disabled:pointer-events-none disabled:bg-gray-100 disabled:text-black flex items-center justify-center gap-2"
            type="submit"
            title="submit"
            disabled={error || loading}>
            {loading ? (
              <>
                <Loader size="12" /> Saving...
              </>
            ) : (
              "Update Password"
            )}
          </button>
        </div>
      </form>
    </dialog>
  );
}
