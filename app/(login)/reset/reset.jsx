"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import Loader from "@/components/Loader";
import CodeInput from "@/components/CodeInput";
import { GithubIcon, GoogleIcon } from "@/assets";
import { useGoogleLogin } from "@react-oauth/google";
import { GoogleReCaptcha } from "react-google-recaptcha-v3";
import { getUserData, authenticateUser, baseUrl } from "@/lib";
import axios from "axios";
import { validateRecaptcha, findUser, resendOTPEmail } from "@/lib/actions";

export default function ResetPage() {
  const searchParams = useSearchParams();
  const step = searchParams.get("step") || "send-otp";
  return (
    <section className="w-full">
      <div className="flex flex-col items-center justify-center w-full min-h-screen  px-4 md:px-6 font-crimson bg-gray-50">
        <div className="border w-full max-w-sm mx-auto rounded-xl shadow-md overflow-hidden">
          <div className="flex gap-2 text-blue-500 items-center justify-center py-1 mt-2">
            <hr className="border border-blue-200 w-1/3" />
            <svg viewBox="0 0 24 24" fill="currentColor" height="60" width="60">
              <path d="M12.63 2c5.53 0 10.01 4.5 10.01 10s-4.48 10-10.01 10c-3.51 0-6.58-1.82-8.37-4.57l1.58-1.25C7.25 18.47 9.76 20 12.64 20a8 8 0 008-8 8 8 0 00-8-8C8.56 4 5.2 7.06 4.71 11h2.76l-3.74 3.73L0 11h2.69c.5-5.05 4.76-9 9.94-9m2.96 8.24c.5.01.91.41.91.92v4.61c0 .5-.41.92-.92.92h-5.53c-.51 0-.92-.42-.92-.92v-4.61c0-.51.41-.91.91-.92V9.23c0-1.53 1.25-2.77 2.77-2.77 1.53 0 2.78 1.24 2.78 2.77v1.01m-2.78-2.38c-.75 0-1.37.61-1.37 1.37v1.01h2.75V9.23c0-.76-.62-1.37-1.38-1.37z" />
            </svg>
            <hr className="border border-blue-200 w-1/3" />
          </div>
          <div className="flex flex-col space-y-1.5 px-6 py-2 font-poppins">
            <h3 className="font-semibold tracking-tight text-xl  text-center">
              Reset Your Password
            </h3>
            <p className="xsm:text-sm text-base  text-center">
              Unlock your account to access your personalized settings and
              content.
            </p>
          </div>
          {!step || (step === "send-otp" && <StepOne />)}
          {step === "verification" && <StepTwo />}
          {step === "new_password" && <StepThree />}
        </div>
        <div className="mt-2 text-gray-600 text-base">
          Remember Password?{" "}
          <a
            className="text-blue-500 hover:underline border px-2 py-0.5"
            href="login">
            Login Here
          </a>
        </div>
      </div>
    </section>
  );
}
//first step
const StepOne = () => {
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
    if (user) {
      authenticateUser(user, router, "accounts.google.com");
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
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    try {
      const response = await findUser(email, otp);
      const encodedEmail = btoa(email);
      setLoading(false);
      toast.success("Verification code sent to your email");
      router.replace(
        `/reset?step=verification&verify=${encodeURIComponent(encodedEmail)}`
      );
    } catch (error) {
      console.error(error);
      setError("Ooops! we couldn't find your account");
      setLoading(false);
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <div className="px-6">
        <div className="space-y-4 py-2">
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
          className="inline-flex items-center justify-center  disabled:pointer-events-none disabled:bg-gray-100 disabled:text-black hover:bg-primary/90 px-4  w-full bg-blue-500 text-white rounded-md h-10 py-1.5 my-2"
          type="submit"
          disabled={loading}
          title="reset">
          {loading ? <Loader size={30} /> : "Send OTP"}
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
    </form>
  );
};
//second step
const StepTwo = () => {
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [timer, setTimer] = useState(120);
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = atob(decodeURIComponent(searchParams.get("verify")));
  useEffect(() => {
    if (isResendDisabled) {
      const countdown = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer === 1) {
            clearInterval(countdown);
            setIsResendDisabled(false);
            return 120;
          }
          return prevTimer - 1;
        });
      }, 1000);

      return () => clearInterval(countdown);
    }
  }, [isResendDisabled]);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${baseUrl}/auth/verify-token`, {
        email: email,
        code: code,
      });
      const data = await response.data;
      const encodedEmail = btoa(email);
      router.replace(
        `/reset?step=new_password&rs=${encodeURIComponent(encodedEmail)}`
      );
      toast.success(data.message);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
      setError(error.response?.data?.error);
      setLoading(false);
    }
  }

  async function handleResend() {
    setLoading(true);
    setIsResendDisabled(true);
    setTimer(120);
    try {
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      if (!email) {
        toast.error("Email address is required");
        setResending(false);
        return;
      }
      const response = await resendOTPEmail(email, otp.toString());
      toast.success("Verification code resent to your email!");
      setResending(false);
    } catch (error) {
      console.error(error);
      setResending(false);
      setError(error.message);
    }
  }

  return (
    <form onSubmit={handleSubmit} id="verify-token">
      <div className="px-6">
        <h1 className="font-bold">Check Your Email</h1>
        <div className="space-y-4 py-2">
          <label
            className="text-base xms:text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 font-extralight"
            htmlFor="email">
            Enter the code we just sent to your email address
          </label>
          <CodeInput setCode={setCode} />
        </div>
        <p className="text-sm text-center">
          {" "}
          {isResendDisabled ? (
            `Didn't receive the code? Resend in ${timer} seconds`
          ) : (
            <span>
              Didn&apos;t receive the code?
              <span className="text-blue-500" onClick={handleResend}>
                Resend code
              </span>
            </span>
          )}
        </p>
        <div className="h-5 min-h-5 max-h-5">
          {error ? (
            <p className="text-orange-600 text-sm  ">
              <span>{error}</span>
            </p>
          ) : null}
        </div>
        <button
          className="inline-flex items-center justify-center  disabled:pointer-events-none disabled:bg-gray-100 disabled:text-black hover:bg-primary/90 px-4  w-full bg-blue-500 text-white rounded-md h-10 py-1.5 my-2 mb-4"
          type="submit"
          disabled={loading}
          title="reset">
          {loading ? <Loader size={30} /> : "Verify"}
        </button>
      </div>
      <div
        id="information"
        className="bg-green-100 border-t border-green-500 flex items-center gap-1 p-2 text-sm">
        <svg fill="currentColor" viewBox="0 0 16 16" height="1em" width="1em">
          <path d="M8 16A8 8 0 108 0a8 8 0 000 16zm.93-9.412l-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 110-2 1 1 0 010 2z" />
        </svg>
        <p> If you cannot see the code, kindly check the spam folder</p>
      </div>
    </form>
  );
};

const StepThree = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(false);
  const [data, setData] = useState({
    password: "",
    confirmPassword: "",
  });

  const router = useRouter();
  const searchParams = useSearchParams();
  const email = atob(decodeURIComponent(searchParams.get("rs")));

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    if (name === "confirmPassword") {
      if (data.password !== value) {
        setError("Passwords do not match");
      } else {
        setError(false);
      }
    }
  };
  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const isValid = await validateRecaptcha(token);
      if (isValid && email) {
        await axios.patch(`${baseUrl}/auth/reset`, {
          email: email,
          password: data.password,
        });
        toast.success("Password reset successfully");
        setLoading(false);
        router.push("/login");
      } else toast.error("Failed to validate reCAPTCHA response");
    } catch (error) {
      setError(error.response?.data?.error);
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="px-6">
        <div className="space-y-2">
          <div className="text-sm py-1">
            <p>Password Requirements</p>
            <ul className="list-disc">
              <li className="list-item list-inside">At least 8 characters</li>
              <li className="list-item list-inside">
                Include numbers, letters and symbols
              </li>
              <li className="list-item list-inside">
                Not same as your username
              </li>
            </ul>
          </div>
          <label
            className="text-base font-bold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-700"
            htmlFor="password">
            Enter New Password
          </label>
          <input
            className={`flex h-10 bg-background text-base disabled:cursor-not-allowed disabled:opacity-50 w-full px-3 py-2 border border-gray-300 rounded-md ${
              error ? "border-red-500 bg-red-100" : ""
            }`}
            id="password"
            name="password"
            placeholder="*******"
            value={data.password}
            onChange={handleChange}
            disabled={loading}
            minLength={8}
            required
            type="password"
          />
        </div>
        <div className="space-y-2">
          <label
            className="text-base font-bold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-700"
            htmlFor="password">
            Confirm Password
          </label>
          <input
            className={`flex h-10 bg-background text-base disabled:cursor-not-allowed disabled:opacity-50 w-full px-3 py-2 border border-gray-300 rounded-md ${
              error ? "border-red-500 bg-red-100" : ""
            }`}
            id="confirmPassword"
            name="confirmPassword"
            placeholder="*******"
            value={data.confirmPassword}
            minLength={8}
            onChange={handleChange}
            disabled={loading}
            required
            type="password"
          />
        </div>
        <div className="h-5 min-h-5 max-h-5 space-y-1 py-1">
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
            data.confirmPassword === data.password && (
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
        <button
          className="inline-flex items-center justify-center  disabled:pointer-events-none disabled:bg-gray-100 disabled:text-black hover:bg-primary/90 px-4  w-full bg-blue-500 text-white rounded-md h-10 py-1.5 mt-2 mb-4"
          type="submit"
          disabled={error || loading}
          title="reset">
          {loading ? <Loader size={30} /> : "Submit"}
        </button>
      </div>
      <GoogleReCaptcha
        onVerify={(token) => {
          setToken(token);
        }}
      />
    </form>
  );
};
