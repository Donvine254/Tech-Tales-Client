import React, { useState } from "react";
import { GithubIcon, GoogleIcon } from "@/assets";
import { useRouter } from "next/navigation";
import { useGoogleLogin } from "@react-oauth/google";
import { getUserData, authenticateUser } from "@/lib";
import { createOtpCode, findUser } from "@/lib/actions";
import Loader from "../Loader";
import toast from "react-hot-toast";

export default function EmailPage() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      loginGoogleUsers(tokenResponse.access_token);
    },
    onFailure: (error) => {
      console.error(error);
      setError(error);
    },
  });

  async function loginGoogleUsers(access_token) {
    const user = await getUserData(access_token);
    //check on why this is misbehaving
    if (user) {
      try {
        authenticateUser(user, router, "accounts.google.com");
        router.replace("/");
      } catch (error) {
        console.error(error);
        toast.error("Login failed");
      }
    }
  }
  //function to handle GitHub Login
  function handleGithubLogin() {
    router.push(
      "https://github.com/login/oauth/authorize?client_id=2384921712f034fd32cf"
    );
    toast.success("processing request");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const user = await findUser(email.toLowerCase());
      if (!user) {
        setError("Oops! We couldn't find your account");
        setLoading(false);
        return;
      } else {
        await createOtpCode(email.toLowerCase());
        const encodedEmail = btoa(email.toLowerCase());
        setLoading(false);
        toast.success("Verification code sent to your email");
        router.replace(
          `/reset?action=verification&rs=${encodeURIComponent(encodedEmail)}`
        );
      }
    } catch (error) {
      console.error(error);
      setError("Something went wrong");
      setLoading(false);
    }
  }
  return (
    <section className="w-full">
      <div className="flex flex-col items-center justify-center w-full min-h-screen  px-4 md:px-6 font-crimson ">
        <div className="border w-full max-w-sm mx-auto rounded-xl shadow-md overflow-hidden bg-gray-50">
          <div className="flex gap-2 text-blue-500 items-center justify-center py-1 mt-2">
            <hr className="border border-blue-200 w-1/3" />
            <svg viewBox="0 0 24 24" fill="currentColor" height="60" width="60">
              <path d="M12.63 2c5.53 0 10.01 4.5 10.01 10s-4.48 10-10.01 10c-3.51 0-6.58-1.82-8.37-4.57l1.58-1.25C7.25 18.47 9.76 20 12.64 20a8 8 0 008-8 8 8 0 00-8-8C8.56 4 5.2 7.06 4.71 11h2.76l-3.74 3.73L0 11h2.69c.5-5.05 4.76-9 9.94-9m2.96 8.24c.5.01.91.41.91.92v4.61c0 .5-.41.92-.92.92h-5.53c-.51 0-.92-.42-.92-.92v-4.61c0-.51.41-.91.91-.92V9.23c0-1.53 1.25-2.77 2.77-2.77 1.53 0 2.78 1.24 2.78 2.77v1.01m-2.78-2.38c-.75 0-1.37.61-1.37 1.37v1.01h2.75V9.23c0-.76-.62-1.37-1.38-1.37z" />
            </svg>
            <hr className="border border-blue-200 w-1/3" />
          </div>
          {/* start of form */}
          <form onSubmit={handleSubmit}>
            <div className="px-6">
              <h3 className="font-semibold tracking-tight text-xl  text-center">
                Forgot Password
              </h3>
              <p className="text-sm xsm:text-[12px] my-1 text-center font-extralight">
                Enter your email and we will send you a verification code to
                reset your password.
              </p>
              <div className="space-y-2 py-2">
                <label
                  className="text-base font-bold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-700"
                  htmlFor="email">
                  Enter Your Email
                </label>
                <input
                  className="flex h-10 bg-background text-base disabled:cursor-not-allowed disabled:opacity-50 w-full px-3 py-2 bg-white border border-gray-300 rounded-md"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  disabled={loading}
                  required
                  type="email"
                />
              </div>
              <div className="h-5 min-h-5 max-h-5">
                {error ? (
                  <p className="text-orange-600 text-sm  ">
                    <span>{error}</span>
                  </p>
                ) : null}
              </div>
              <button
                className="inline-flex items-center justify-center  disabled:pointer-events-none disabled:bg-gray-100 disabled:text-black px-4 w-full bg-blue-500 text-white rounded-md h-10 py-1.5 my-1"
                type="submit"
                disabled={loading}
                title="reset">
                {loading ? <Loader size={30} /> : "Continue"}
              </button>
              <div className="flex items-center gap-2 w-full ">
                <hr className="border border-gray-200 w-full" />
                <div className="text-sm flex-1 w-fit whitespace-nowrap">Or</div>
                <hr className="border border-gray-200 w-full" />
              </div>
              <div className="flex flex-col space-y-2 py-2 mb-2">
                {" "}
                <button
                  className="rounded-md font-medium  border  hover:bg-black hover:text-white  h-10 px-4 py-2 w-full flex justify-center items-center space-x-2"
                  type="button"
                  onClick={handleGoogleLogin}>
                  <GoogleIcon />
                  <span>Login with Google</span>
                </button>
                <button
                  className="rounded-md font-medium  border  hover:bg-black hover:text-white  h-10 px-4 py-2 w-full flex justify-center items-center space-x-2 "
                  type="button"
                  onClick={handleGithubLogin}>
                  <GithubIcon />
                  <span>Login with Github</span>
                </button>
              </div>
            </div>
            <div className=" text-gray-600 text-base px-6 py-2 bg-cyan-100 w-full ">
              Remember Password?{" "}
              <a className="text-blue-500 hover:underline z-50 " href="login">
                Login Here
              </a>
            </div>
          </form>
          {/* end of form */}
        </div>
      </div>
    </section>
  );
}
