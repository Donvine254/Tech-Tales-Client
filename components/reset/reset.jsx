import { GithubIcon, GoogleIcon } from "@/assets";

export default function ResetMainPage() {
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
          <form>
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
                  placeholder="you@example.com"
                  required
                  type="email"
                />
              </div>

              <button
                className="inline-flex items-center justify-center  disabled:pointer-events-none disabled:bg-gray-100 disabled:text-black hover:bg-primary/90 px-4  w-full bg-blue-500 text-white rounded-md h-10 py-1.5 my-2"
                type="submit"
                title="reset">
                Send OTP
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
                  type="button">
                  <GoogleIcon />
                  <span>Login with Google</span>
                </button>
                <button
                  className="rounded-md font-medium  border  hover:bg-black hover:text-white  h-10 px-4 py-2 w-full flex justify-center items-center space-x-2 "
                  type="button">
                  <GithubIcon />
                  <span>Login with Github</span>
                </button>
              </div>
            </div>
          </form>
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
