"use client";
import { useState } from "react";
import secureLocalStorage from "react-secure-storage";
import Link from "next/link";
import toast from "react-hot-toast";
import Axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { saveUserData } from "@/lib";
import Loader from "@/components/Loader";
import { Suspense } from "react";

export default function Page() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const referrer = searchParams.get("referrer")?.split(".")[1];

  const [loading, setLoading] = useState(false);
  async function handleRegistration() {
    let user;
    setLoading(true);
    toast.success("Processing Request");
    if (typeof window !== undefined) {
      user = secureLocalStorage.getItem("unauthorized_user");
      try {
        const response = await Axios.post(
          "https://techtales.up.railway.app/users",
          user
        );
        const data = await response.data;
        saveUserData(data);
        secureLocalStorage.removeItem("unauthorized_user");
        setLoading(false);
        toast.success("registration successful");
        router.replace("/featured");
      } catch (error) {
        setLoading(false);
        console.log(error);
        toast.error("An error occurred, please try again");
        router.replace("/login");
        secureLocalStorage.removeItem("unauthorized_user");
      }
    } else {
      toast.error("Please try again later!");
      router.replace("/login");
    }
  }

  return (
    <Suspense
      fallback={
        <div>
          <Loader />
        </div>
      }>
      <div className="flex flex-col items-center justify-center w-full min-h-screen  px-4 font-poppins">
        <div className="border w-full max-w-sm mx-auto rounded-xl shadow-md overflow-hidden bg-white p-5">
          <h2 className="font-bold text-base space-y-2 my-2">
            We cannot find any account linked to your email address
          </h2>
          <p className="text-base my-2">
            Do you want to create a new one with your{" "}
            <span className="capitalize">{referrer} </span>
            Account?
          </p>
          <div
            className="bg-green-100 border border-green-500 text-green-600 font-bold py-3 rounded relative space-y-2 border-l-4 my-1"
            role="alert">
            <div className="flex  px-1 ">
              <div className="py-1">
                <svg
                  className="fill-current h-6 w-6 text-green-500 mr-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20">
                  <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
                </svg>
              </div>
              <div>
                <p className="text-sm">
                  By continuing, you agree to Tech Tales Terms and Conditions.
                </p>
              </div>
            </div>
          </div>
          <button
            className="py-2 px-4 bg-blue-700 text-white hover:shadow my-3 rounded-md text-xl w-full disabled:bg-gray-100 disabled:text-black flex items-center justify-center disabled:py-1 disabled:px-2 "
            disabled={loading}
            onClick={handleRegistration}>
            {loading ? <Loader size={30} /> : "Create Account"}
          </button>

          <p className="text-center text-base">
            or{" "}
            <Link
              className="text-blue-600 font-bold border py-0.5 px-1 hover:bg-blue-600 hover:text-white rounded-md"
              href="/login">
              sign in another way
            </Link>
          </p>
        </div>
      </div>
    </Suspense>
  );
}
