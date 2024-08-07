"use client";
import { useEffect, useState } from "react";
import { baseUrl, clearLocalStorage } from "@/lib";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import UpdateProfileModal from "@/components/UpdateProfileModal";
import ResetPasswordModal from "@/components/ResetPasswordModal";
import { UserImage } from "@/components/Avatar";
import { deactivateUser, deleteUser } from "@/lib/actions";
import { getCookie, setCookie } from "@/lib/utils";
import { useUserContext } from "@/providers";

export default function Page() {
  const user = useUserContext();
  const [acceptCookies, setAcceptCookies] = useState(false);

  useEffect(() => {
    const cookieConsent = getCookie("acceptCookies");
    if (cookieConsent === "true") {
      setAcceptCookies(true);
    }
  }, []);

  // Handle checkbox change event
  const handleCheckboxChange = (event) => {
    const checked = event.target.checked;
    setAcceptCookies(checked);
    if (checked) {
      setCookie("acceptCookies", "true", 30);
    } else {
      setCookie("acceptCookies", "", -1);
    }
  };

  //function to deactivate user account
  function handleDeactivate() {
    Swal.fire({
      icon: "warning",
      title: "Deactivate Account",
      text: "Deactivating your account will remove it from TechTales within a few minutes. You can sign back in anytime to reactivate your account and restore its content.",
      showCloseButton: true,
      confirmButtonText: "Deactivate",
      showCancelButton: true,
      dangerMode: true,
      customClass: {
        confirmButton:
          "px-2 py-1 mx-2 bg-red-500 text-white rounded-md hover:text-white hover:bg-red-500",
        cancelButton: "px-2 py-1 mx-2 bg-green-500 rounded-md text-white",
      },
      buttonsStyling: false,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const toastId = toast.loading("Processing Request...", {
            position: "bottom-center",
          });
          await deactivateUser(user.id);
          toast.success("Account deactivated");
          clearLocalStorage();
          await fetch(`${baseUrl}/auth/logout`);
          if (typeof window !== "undefined" && window) {
            toast.dismiss();
            window.location.reload();
          }
        } catch (error) {
          toast.error("Something went wrong");
          console.error(error);
        } finally {
          toast.dismiss();
        }
      }
    });
  }
  //function to deleteAccount
  function handleDeleteAccount() {
    Swal.fire({
      icon: "warning",
      title: "Delete Account",
      text: "We’re sorry to see you go. Once your account is deleted, all of your content will be permanently gone, including your profile, blogs, publications, notes, and responses",
      showCloseButton: true,
      dangerMode: true,
      confirmButtonText: "Delete Account",
      showCancelButton: true,
      customClass: {
        confirmButton:
          "px-2 py-1 mx-2 bg-red-500 text-white rounded-md hover:text-white hover:bg-red-500",
        cancelButton: "px-2 py-1 mx-2 bg-green-500 rounded-md text-white",
      },
      buttonsStyling: false,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const toastId = toast.loading("Processing Request...", {
            position: "bottom-center",
          });
          await deleteUser(user.id);
          toast.success("Account deleted successfully");
          clearLocalStorage();
          await fetch(`${baseUrl}/auth/logout`);
          if (typeof window !== "undefined" && window) {
            window.location.reload();
          }
        } catch (error) {
          console.error(error);
          toast.success("Oops! Something went wrong");
        } finally {
          toast.dismiss();
        }
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

  function showPasswordResetModal() {
    const modal = document.getElementById("password_reset_modal");
    if (modal) {
      modal.showModal();
    } else {
      console.error("Element with ID 'my_modal_3' not found.");
    }
  }
  return (
    <div className="font-poppins flex items-center justify-center m-auto xsm:m-2 md:mt-10 ">
      <div className="bg-gray-50 shadow border-2 py-2 rounded-md">
        <div className="flex flex-col space-y-1.5 py-1 px-6">
          <h3 className="tracking-tight text-xl text-center font-bold md:text-2xl">
            Settings
          </h3>
          <p className="text-center text-sm md:text-base">
            Update your details, profile picture, and manage your account.
          </p>
        </div>
        <div className="px-6 py-4 space-y-1">
          <div className="space-y-2 flex items-center justify-between gap-4 text-gray-700">
            <h3 className="text-sm md:text-base">Email address</h3>
            <p className="break-words text-sm md:text-base">{user?.email}</p>
          </div>
          <div className="space-y-2 flex items-center justify-between gap-4 text-gray-700 text-sm md:text-base">
            <h3 className="hover:text-gray-900 font-semibold">Username</h3>
            <p className="capitalize">{user?.username}</p>
          </div>
          <div className="space-y-2 cursor-pointer flex items-center justify-between gap-4 text-gray-700 ">
            <div onClick={showUpdateModal} className="text-sm md:text-base">
              <h3>Profile Information</h3>
              <p onClick={showUpdateModal} className="hover:underline">
                Edit your profile photo, bio and username
              </p>
            </div>
            <div onClick={showUpdateModal}>
              <UserImage
                url={user?.picture}
                className="ring ring-blue-500 ring-offset-1 ring-offset-white"
              />
            </div>
          </div>
        </div>
        <div className="px-6 py-2 flex items-center justify-between gap-3 text-sm md:text-base space-y-2">
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
        <div className="px-6 py-1 flex items-center justify-between gap-3 text-sm md:text-base">
          <div className="py-1">
            <h3 className="">Analytics Report </h3>
            <p className="text-sm wrap text-gray-600">
              We will send you analytics reports each month.
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" value="" className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-400 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-blue-600"></div>
          </label>
        </div>
        <div className="px-6 py-1 flex items-center justify-between gap-3 text-sm md:text-base">
          <div className="py-1">
            <h3 className="">Enable Cookies </h3>
            <p className="text-sm wrap text-gray-600">
              We use cookies to provide you with the best experience.
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={acceptCookies}
              onChange={handleCheckboxChange}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-400 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-blue-600"></div>
          </label>
        </div>
        <h2 className="px-6 font-semibold">Danger Zone</h2>
        <div className="items-center px-6 py-2 flex flex-col space-y-4">
          <button
            className="inline-flex items-center justify-center  font-medium hover:bg-primary/90 h-10 px-4 py-2 w-full border-2   rounded-md hover:bg-cyan-400 hover:text-white"
            onClick={showPasswordResetModal}>
            Change Password
          </button>
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
        <ResetPasswordModal
          user={user}
          closeModal={() => setShowModal(false)}
        />
      </div>
    </div>
  );
}
