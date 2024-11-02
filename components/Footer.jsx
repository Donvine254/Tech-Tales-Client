import Link from "next/link";
import { GithubIcon, NewTwitterIcon } from "@/assets";
export default function Footer() {
  return (
    <footer class=" text-center p-5  max-w-7xl w-full mx-auto m-2 divide-blue-500 bg-[#f4f3f2] border shadow xsm:text-xs">
      <p>
        <a href="/" class="text-cyan-500 font-medium hover:underline">
          Tech Tales
        </a>{" "}
        ― An inclusive social network blog for tech enthusiasts and
        professionals to share, learn and grow.
      </p>
      <div class="mt-3">
        <Link
          href="/"
          class="text-gray-700 hover:text-cyan-400 hover:underline mr-2">
          • Home
        </Link>
        <Link
          href="/about"
          class="text-gray-700 hover:text-cyan-400 hover:underline mr-2">
          • About
        </Link>
        <Link
          href="/contact"
          class="text-gray-700 hover:text-cyan-400 hover:underline mr-2">
          • Contact Us
        </Link>
        <Link
          href="/community"
          class="text-gray-700 hover:text-cyan-400 hover:underline mr-2">
          • Community Guidelines
        </Link>
        <Link
          href="/privacy"
          class="text-gray-700 hover:text-cyan-400 hover:underline mr-2">
          • Privacy Policy
        </Link>
        <Link
          href="/terms"
          class="text-gray-700 hover:text-cyan-400 hover:underline mr-2">
          • Terms of Use
        </Link>
        <a
          href="/api"
          class="text-gray-700 hover:text-cyan-400 hover:underline mr-2">
          API
        </a>
        <Link
          href="/docs"
          class="text-gray-700 hover:text-cyan-400 hover:underline mr-2">
          • Docs
        </Link>

        <a
          href="/features"
          class="text-gray-700 hover:text-cyan-400 hover:underline">
          • Feature Requests
        </a>
      </div>
      <p class="mt-3">
        Built with{" "}
        <a href="https://nextjs.org/" class="text-cyan-500 hover:underline">
          Next Js ❤️
        </a>{" "}
        by Donvine
      </p>
      <hr className="border-2 shadow my-2" />
      <div className="flex justify-between flex-wrap items-center gap-2">
        <h1 className="xsm:text-sm font-poppins ">
          &copy; {new Date().getFullYear()} Tech Tales
        </h1>
        <div className="flex items-center space-x-1 md:gap-5">
          <Link href="https://www.facebook.com" className="" target="_blank">
            <svg
              fill="currentColor"
              viewBox="0 0 448 512"
              height="2em"
              title="Facebook"
              width="2em"
              className="text-blue-600 font-bold cursor-pointer">
              <title>Facebook</title>
              <path d="M400 32H48A48 48 0 000 80v352a48 48 0 0048 48h137.25V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.27c-30.81 0-40.42 19.12-40.42 38.73V256h68.78l-11 71.69h-57.78V480H400a48 48 0 0048-48V80a48 48 0 00-48-48z" />
            </svg>
          </Link>
          <Link href="https://x.com/diamonddegesh" className="" target="_blank">
            <NewTwitterIcon size="2em" />
          </Link>
          <Link
            href="https://github.com/Donvine254"
            className=""
            target="_blank">
            <GithubIcon
              className="hover:text-white hover:bg-black hover:rounded-full"
              size="2em"
            />
          </Link>
          <div className="w-[30px]"></div>
        </div>
      </div>
    </footer>
  );
}
