"use client";
import React, { useState } from "react";
import toast from "react-hot-toast";
import axiosInstance from "@/axiosConfig";
import Loader from "../ui/Loader";
import { baseUrl } from "@/lib";
import { Tooltip } from "react-tooltip";
import { generatePassword } from "@/lib/utils";
import PasswordStrengthMeter from "./passwordMeter";

export default function ResetPasswordModal({ user }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (event) => {
    setError(null);
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

  //function to suggest password
  const handleSuggestPassword = () => {
    const password = generatePassword();
    setData((prevData) => ({
      ...prevData,
      newPassword: password,
    }));
  };
  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    try {
      setLoading(true);
      const response = await axiosInstance.post(`${baseUrl}/auth/reset`, {
        id: user.id,
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      });
      toast.success("Password updated successfully!");
      setLoading(false);
      setData({
        currentPassword: "",
        confirmPassword: "",
        newPassword: "",
      });
      document.getElementById("password_reset_modal").close();
    } catch (error) {
      setError(error?.response?.data?.error);
      setLoading(false);
    }
  }

  return (
    <dialog
      id="password_reset_modal"
      className="modal backdrop-blur-2xl rounded-xl">
      <div className="px-2 py-1 bg-gradient-to-r from-green-400 via-cyan-400 to-indigo-400 text-white">
        <h1 className="font-bold xsm:text-base text-2xl text-center ">
          Reset Your Password
        </h1>
        <div className="flex items-center justify-center gap-1">
          <svg viewBox="0 0 24 24" fill="currentColor" height="1em" width="1em">
            <path d="M12 2C6.579 2 2 6.579 2 12s4.579 10 10 10 10-4.579 10-10S17.421 2 12 2zm0 5c1.727 0 3 1.272 3 3s-1.273 3-3 3c-1.726 0-3-1.272-3-3s1.274-3 3-3zm-5.106 9.772c.897-1.32 2.393-2.2 4.106-2.2h2c1.714 0 3.209.88 4.106 2.2C15.828 18.14 14.015 19 12 19s-3.828-.86-5.106-2.228z" />
          </svg>
          <span>{user?.email}</span>
        </div>
      </div>
      <form
        className="rounded-lg border bg-card text-card-foreground shadow-sm w-full max-w-md xsm:mx-2 px-6 py-2 max-h-full"
        method="dialog"
        onSubmit={handleSubmit}>
        <div>
          <div className="space-y-2">
            <label className="font-semibold" htmlFor="current-password">
              Current Password
            </label>
            <input
              className={`flex bg-background text-base disabled:cursor-not-allowed disabled:opacity-50 w-full px-3 py-1 border border-gray-300 rounded-md ${
                error ? "border-red-500 bg-red-100" : ""
              }`}
              id="current-password"
              name="currentPassword"
              placeholder="********"
              value={data.currentPassword}
              onChange={handleChange}
              minLength={8}
              disabled={loading}
              required
              type={showPassword ? "text" : "password"}
            />
          </div>
          <div className="space-y-2">
            <label className="font-semibold" htmlFor="new-password">
              New Password
            </label>
            <input
              className={`flex bg-background text-base disabled:cursor-not-allowed disabled:opacity-50 w-full px-3 py-1 border border-gray-300 rounded-md ${
                error ? "border-red-500 bg-red-100" : ""
              }`}
              id="new-password"
              name="newPassword"
              placeholder="********"
              value={data.newPassword}
              onChange={handleChange}
              minLength={8}
              disabled={loading}
              required
              type={showPassword ? "text" : "password"}
            />
          </div>
          <div className="space-y-2">
            <label className="font-semibold" htmlFor="confirm-password">
              Confirm Password
            </label>
            <input
              className={`flex bg-background text-base disabled:cursor-not-allowed disabled:opacity-50 w-full px-3 py-1 border border-gray-300 rounded-md ${
                error ? "border-red-500 bg-red-100" : ""
              }`}
              id="confirm-password"
              name="confirmPassword"
              placeholder="********"
              value={data.confirmPassword}
              onChange={handleChange}
              minLength={8}
              disabled={loading}
              required
              type={showPassword ? "text" : "password"}
            />
          </div>
          <div className="flex items-center justify-between gap-2 my-1">
            <div className="flex items-center  gap-2">
              <input
                type="checkbox"
                className="z-50"
                value={showPassword}
                onChange={() => setShowPassword(!showPassword)}
              />
              <span> {showPassword ? "Hide" : "Show"} Password</span>
            </div>
            <span
              className="text-blue-500 underline cursor-pointer"
              data-tooltip-id="suggest-password"
              onClick={handleSuggestPassword}>
              <Tooltip
                content="click here to suggest a strong password"
                id="suggest-password"
                variant="info"
                place="bottom"
                style={{ padding: "4px", fontSize: "12px" }}
              />
              Suggest Password
            </span>
          </div>
          <PasswordStrengthMeter password={data.newPassword} />
          <div className="h-5 min-h-5 max-h-5 space-y-1">
            {error ? (
              <p className="text-orange-600 inline-flex place-items-center items-center text-xs w-full gap-3">
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  height="12"
                  width="12">
                  <path d="M11 7h2v7h-2zm0 8h2v2h-2z" />
                  <path d="M21.707 7.293l-5-5A.996.996 0 0016 2H8a.996.996 0 00-.707.293l-5 5A.996.996 0 002 8v8c0 .266.105.52.293.707l5 5A.996.996 0 008 22h8c.266 0 .52-.105.707-.293l5-5A.996.996 0 0022 16V8a.996.996 0 00-.293-.707zM20 15.586L15.586 20H8.414L4 15.586V8.414L8.414 4h7.172L20 8.414v7.172z" />
                </svg>
                <span>{error}</span>
              </p>
            ) : (
              data.confirmPassword !== "" &&
              data.confirmPassword === data.newPassword && (
                <p className="text-green-500 inline-flex place-items-center items-center w-full gap-3 text-xs">
                  <svg fill="none" viewBox="0 0 15 15" height="12" width="12">
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
        <div className="flex items-center justify-end gap-4 px-6 py-1 pb-2">
          <button
            type="reset"
            title="reset"
            className="px-4 h-8 py-0.5 border border-green-400 hover:border-orange-500 rounded-xl disabled:bg-opacity-30 disabled:border-gray-200 bg-transparent"
            disabled={loading}
            onClick={() => {
              setData({
                currentPassword: "",
                confirmPassword: "",
                newPassword: "",
              });
              document.getElementById("password_reset_modal").close();
            }}>
            Cancel
          </button>
          <button
            className="px-4 py-0.5 h-8 border  bg-blue-600 text-white rounded-xl disabled:pointer-events-none disabled:bg-gray-100 disabled:text-black flex items-center justify-center gap-2"
            type="submit"
            title="submit"
            disabled={error || loading}>
            {loading ? (
              <>
                <Loader size="12" /> Saving...
              </>
            ) : (
              "Update"
            )}
          </button>
        </div>
      </form>
    </dialog>
  );
}
