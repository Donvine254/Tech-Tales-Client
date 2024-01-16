"use client";
import React, { useEffect } from "react";
import { getCurrentUser, clearLocalStorage } from "@/lib";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import Loader from "@/components/Loader";
import Axios from "axios";
import UpdateProfileModal from "@/components/UpdateProfileModal";
import { UserImage } from "@/components/Avatar";

export default function Page() {
  const user = getCurrentUser();
  const router = useRouter();
  useEffect(() => {
    if (!user) {
      toast.error("Login required to perform this action!");
      router.replace("/login?post_login_redirect_url=me/settings");
    }
  }, [user, router]);
  if (!user) {
    return (
      <div className="flex items-center justify-center h-[300px] md:h-[600px]">
        <Loader size={60} />
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
        clearLocalStorage;
        router.refresh();
      }
    });
  }
  //function to deleteAccount
  function handleDeleteAccount() {
    Swal.fire({
      icon: "warning",
      title: "Delete Account",
      text: "We’re sorry to see you go. Once your account is deleted, all of your content will be permanently gone, including your profile, stories, publications, notes, and responses",
      showCloseButton: true,
      confirmButtonColor: "red",
      confirmButtonText: "Delete Account",
      showCancelButton: true,
      cancelButtonColor: "green",
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.delete(`https://techtales.up.railway.app/users/${user.id}`);
        toast.success("Account deleted successfully");
        clearLocalStorage();
        router.refresh();
      }
    });
  }
  //function to show update modal
  function showUpdateModal() {
    const modal = document.getElementById("my_modal_5");
    if (modal) {
      modal.showModal();
    } else {
      console.error("Element with ID 'my_modal_3' not found.");
    }
  }
  return (
    <div className="font-poppins flex items-center justify-center m-auto md:mt-10 ">
      <div className="bg-slate-100 shadow border-2 py-2 rounded-md">
        <div className="flex flex-col space-y-1.5 py-2 px-6">
          <h3 className="tracking-tight text-2xl text-center font-bold md:text-3xl">
            Settings
          </h3>
          <p className="text-center">
            Update your details, profile picture, and manage your account.
          </p>
        </div>
        <div className="p-6 space-y-2">
          <div className="space-y-2 flex items-center justify-between gap-4 text-gray-700">
            <h3>Email address</h3>
            <p className="break-words">{user.email}</p>
          </div>
          <div className="space-y-2 flex items-center justify-between gap-4 text-gray-700">
            <h3 className="hover:text-gray-900 font-semibold">Username</h3>
            <p>{user.username}</p>
          </div>
          <div className="space-y-2 cursor-pointer flex items-center justify-between gap-4 text-gray-700">
            <div onClick={showUpdateModal}>
              <h3>Profile Information</h3>
              <p onClick={showUpdateModal}>
                Edit your profile photo, bio and username
              </p>
            </div>
            <div onClick={showUpdateModal}>
              <UserImage url={user.picture} />
            </div>
          </div>
        </div>
        <div className="px-6 py-1 flex items-center justify-between gap-3">
          <div className="py-1">
            <h3 className="">Allow Email Notifications </h3>
            <p className="text-sm wrap text-gray-600">
              You&apos;ll still receive administrative emails even if this
              setting is off.
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" value="" className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-400 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-blue-600"></div>
          </label>
        </div>
        <div className="items-center p-6 flex flex-col space-y-4">
          <button
            className="inline-flex items-center justify-center  font-medium hover:bg-primary/90 h-10 px-4 py-2 w-full bg-[#FDFAE9] border-2 border-amber-500  rounded-md hover:bg-amber-400 hover:text-white"
            onClick={handleDeactivate}>
            Deactivate Account
          </button>
          <button
            className="inline-flex items-center justify-center  font-medium border-2 border-red-400 h-10 px-4 py-2 w-full bg-red-100  rounded-md hover:bg-red-400 hover:text-white"
            onClick={handleDeleteAccount}>
            Delete Account
          </button>
        </div>
        <UpdateProfileModal
          user={user}
          closeModal={() => setShowModal(false)}
        />
      </div>
    </div>
  );
}
