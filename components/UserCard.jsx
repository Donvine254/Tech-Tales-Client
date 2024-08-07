import { NewTwitterIcon } from "@/assets";
import Image from "next/image";
import Link from "next/link";

export default function UserCard({ author }) {
  // function to get author social media links
  function getSocialUrl(platform) {
    return (
      author.socials?.find((social) => social.platform === platform)?.url ||
      null
    );
  }

  return (
    <div className=" bg-slate-50 absolute border shadow w-fit px-4 py-2 rounded-md xsm:w-full min-w-[250px] z-50">
      <div className="flex items-center gap-2">
        <Image
          src={author.picture}
          width={48}
          height={48}
          alt={author.username}
          className="h-10 w-10 md:h-12 md:w-12 rounded-full cursor-pointer"
        />
        <div className="capitalize font-bold text-lg ">
          <p className="w-full inline-block relative pr-6">
            <span className="relative">{author.username}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="#09A3E5"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="absolute top-0 right-0">
              <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
              <path d="m9 12 2 2 4-4" />
            </svg>
          </p>
        </div>
      </div>
      <p className="text-base font-medium text-gray-600 my-1">
        {author.bio ?? "This author has not updated their bio yet"}
      </p>

      <div className="flex items-center gap-2">
        <p>Follow Author on: </p>
        <div className="flex items-center my-2 justify-end gap-2">
          <a
            href={
              getSocialUrl("facebook") ??
              `https://www.facebook.com/${author.handle}`
            }
            target="_blank">
            {" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#09A3E5"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
            </svg>
          </a>
          <a
            href={
              getSocialUrl("twitter") ??
              `https://www.twitter.com/${author.handle}`
            }
            target="_blank">
            <NewTwitterIcon />
          </a>
          <a
            href={
              getSocialUrl("github") ??
              `https://www.github.com/${author.handle}`
            }
            target="_blank">
            {" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              className="cursor-pointer">
              <title>Github</title>
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
              <path d="M9 18c-4.51 2-5-2-7-2" />
            </svg>
          </a>
        </div>
      </div>
      <hr className="border border-gray-200" />
      <Link
        href={`/explore/${author.handle}?status=published&select=all`}
        prefetch
        className="text-sm text-sky-400 hover:text-sky-600 cursor-pointer my-2">
        View more posts from this author &#8599;
      </Link>
    </div>
  );
}
