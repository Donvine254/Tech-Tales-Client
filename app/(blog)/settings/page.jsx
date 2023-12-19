"use client";
import React, { useEffect } from "react";
import { getCurrentUser } from "@/lib";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Image from "next/image";
import Swal from "sweetalert2";
import { clearCurrentUser, clearAllCookies } from "@/lib";
import Loader from "@/components/Loader";

export default function Page() {
  const user = getCurrentUser();
  const navigate = useRouter();
  useEffect(() => {
    if (!user) {
      toast.error("kindly login first!");
      navigate.replace("/login");
    }
  }, [user]);
  if (!user) {
    return (
      <div className="md:min-h-[400px]">
        <div className="flex items-center justify-center gap-2 text-xl my-2">
          <Loader />
          Loading Details...
        </div>
      </div>
    );
  }
  //function to deactivate user account
  function handleDeactivate() {
    Swal.fire({
      icon: "warning",
      title: "Deactivate Account",
      text: "Deactivating your account will remove it from TechTales within a few minutes. You can sign back in anytime to reactivate your account and restore its content.",
      showCloseButton: true,
      confirmButtonColor: "red",
      confirmButtonText: "Deactivate",
      showCancelButton: true,
      cancelButtonColor: "green",
    }).then((result) => {
      if (result.isConfirmed) {
        clearCurrentUser();
        clearAllCookies();
        navigate.replace("/");
      }
    });
  }
  //function to deleteAccount
  function handleDeleteAccount() {
    toast.error("stop this nonsense!");
  }
  return (
    <div className="font-poppins flex items-center justify-center m-auto ">
      <div className="bg-slate-100 shadow border-2 py-2 rounded-md">
        <div className="flex flex-col space-y-1.5 p-6">
          <h3 className="tracking-tight text-2xl text-center font-bold md:text-3xl">
            Settings
          </h3>
          <p className="text-center">
            Update your details, profile picture, and manage your account.
          </p>
        </div>
        <div className="p-6 space-y-4">
          <div className="space-y-2 flex items-center justify-between gap-4 text-gray-700">
            <h3>Email address</h3>
            <p>{user.email}</p>
          </div>
          <div className="space-y-2 flex items-center justify-between gap-4 text-gray-700">
            <h3 className="hover:text-gray-900 font-semibold">Username</h3>
            <p>{user.username}</p>
          </div>
          <div className="space-y-2 cursor-pointer flex items-center justify-between gap-4 text-gray-700">
            <div>
              <h3>Profile Information</h3>
              <p>Edit your photo and username</p>
            </div>
            <div className="">
              <Image
                src={user.picture}
                alt="profile-picture"
                className="rounded-full"
                height={38}
                width={38}
              />
            </div>
          </div>
        </div>
        <div className="items-center p-6 flex flex-col space-y-4">
          <button
            className="inline-flex items-center justify-center text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90 h-10 px-4 py-2 w-full bg-yellow-500 text-white rounded-md"
            onClick={handleDeactivate}>
            Deactivate Account
          </button>
          <button
            className="inline-flex items-center justify-center text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90 h-10 px-4 py-2 w-full bg-red-500 text-white rounded-md"
            onClick={handleDeleteAccount}>
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}
