import Link from "next/link";
import { GithubIcon, NewTwitterIcon } from "@/assets";
export default function Footer() {
  return (
    <footer className="max-w-7xl w-full mx-auto m-2 p-4 divide-blue-500 font-poppins text-xl bg-[#f4f3f2] border shadow">
      <h1 className="p-2 px-4">
        <span className="md:text-xl font-bold">Tech Tales</span>
        <span className="xsm:text-sm">
          &#x2015; An inclusive social network blog for tech enthusiasts and
          professionals
        </span>
      </h1>
      <div className="flex flex-wrap md:justify-between md:flex-row align-center md:gap-2">
        <Link href="/about" className="navigation__footer" target="_blank">
          About
        </Link>
        <Link href="/contact" className="navigation__footer" target="_blank">
          Contact Us
        </Link>
        <Link href="/community" className="navigation__footer" target="_blank">
          Community Guidelines
        </Link>
        <Link href="/privacy" target="_blank" className="navigation__footer">
          Privacy Policy
        </Link>
        <Link href="/terms" className="navigation__footer">
          Terms of Use
        </Link>
      </div>
      <hr className="border-2 shadow" />
      <div className="flex justify-between flex-wrap items-center gap-2 mt-2">
        <h1 className="text-xl xsm:text-sm ">
          &copy; {new Date().getFullYear()} Tech Tales
        </h1>
        <div className="flex items-center space-x-1 md:gap-5">
          <Link href="https://www.facebook.com" className="" target="_blank">
            <svg
              fill="currentColor"
              viewBox="0 0 448 512"
              height="28"
              title="Facebook"
              width="28"
              className="md:text-xl text-blue-600 font-bold cursor-pointer">
              <title>Facebook</title>
              <path d="M400 32H48A48 48 0 000 80v352a48 48 0 0048 48h137.25V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.27c-30.81 0-40.42 19.12-40.42 38.73V256h68.78l-11 71.69h-57.78V480H400a48 48 0 0048-48V80a48 48 0 00-48-48z" />
            </svg>
          </Link>
          <Link href="https://x.com/diamonddegesh" className="" target="_blank">
            <NewTwitterIcon />
          </Link>
          <Link
            href="https://github.com/Donvine254"
            className=""
            target="_blank">
            <GithubIcon className="hover:text-white hover:bg-black hover:rounded-full" />
          </Link>
          <Link
            href="https://youtube.com/tech-tales"
            className=""
            target="_blank">
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              height="30"
              width="30"
              className="md:text-2xl text-red-500 fill-red-500 font-bold ">
              <path d="M21.593 7.203a2.506 2.506 0 00-1.762-1.766C18.265 5.007 12 5 12 5s-6.264-.007-7.831.404a2.56 2.56 0 00-1.766 1.778c-.413 1.566-.417 4.814-.417 4.814s-.004 3.264.406 4.814c.23.857.905 1.534 1.763 1.765 1.582.43 7.83.437 7.83.437s6.265.007 7.831-.403a2.515 2.515 0 001.767-1.763c.414-1.565.417-4.812.417-4.812s.02-3.265-.407-4.831zM9.996 15.005l.005-6 5.207 3.005-5.212 2.995z" />
            </svg>
          </Link>
        </div>
      </div>
    </footer>
  );
}
