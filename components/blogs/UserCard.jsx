import { NewTwitterIcon, Facebook, GithubIcon } from "@/assets";
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

  const facebookUrl = getSocialUrl("facebook");
  const linkedinUrl = getSocialUrl("linkedin");
  const githubUrl = getSocialUrl("github");
  const twitterUrl = getSocialUrl("x");
  const instagramUrl = getSocialUrl("instagram");
  const youtubeUrl = getSocialUrl("youtube");
  const tikTokUrl = getSocialUrl("tiktok");

  return (
    <div className=" bg-slate-50 absolute border shadow w-fit rounded-md xsm:w-full min-w-[250px] z-50">
      <div className="flex items-center gap-2 bg-gradient-to-t from-gray-50 via-gray-100 to-cyan-400 w-full rounded-t-md px-4 py-2 border-b ">
        <Image
          src={author.picture}
          width={48}
          height={48}
          alt={author.username}
          className="h-10 w-10 md:h-12 md:w-12 rounded-full cursor-pointer"
        />
        <div className="capitalize font-bold text-lg ">
          <p className="w-full flex items-center">
            <span className="">{author.username}</span>

            {author.role === "admin" ? (
              <Image
                src="https://res.cloudinary.com/dipkbpinx/image/upload/v1723863889/badges/on4c9g21udqs4oqrucdo.png"
                width={18}
                height={18}
                className="h-auto w-auto max-w-[18px] mb-1 "
                alt="verification-badge"
              />
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="#1D9BF0"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className=" ">
                <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
                <path d="m9 12 2 2 4-4" stroke="#ffffff" />
              </svg>
            )}
          </p>
        </div>
      </div>
      <div className="px-2 ">
        <p className="font-medium text-[#1D9BF0] my-1 text-xs md:text-sm p-1 bg-gray-200 rounded-sm shadow">
          {author.bio ?? "This author has not updated their bio yet"}
        </p>
        {author.socials && author.socials.length > 0 && (
          <>
            <p className="font-medium text-sm xsm:text-sm text-gray-600">
              Follow me on:{" "}
            </p>
            <div className="flex items-center my-1 justify-between gap-2  flex-wrap ">
              {facebookUrl && (
                <a href={facebookUrl} target="_blank" title="facebook">
                  {" "}
                  <Facebook size={18} />
                </a>
              )}

              {linkedinUrl && (
                <a href={linkedinUrl} target="_blank" title="linkedin">
                  {" "}
                  <svg
                    viewBox="0 0 960 1000"
                    fill="#0284C7"
                    height="18"
                    width="18">
                    <path d="M480 20c133.333 0 246.667 46.667 340 140s140 206.667 140 340c0 132-46.667 245-140 339S613.333 980 480 980c-132 0-245-47-339-141S0 632 0 500c0-133.333 47-246.667 141-340S348 20 480 20M362 698V386h-96v312h96m-48-352c34.667 0 52-16 52-48s-17.333-48-52-48c-14.667 0-27 4.667-37 14s-15 20.667-15 34c0 32 17.333 48 52 48m404 352V514c0-44-10.333-77.667-31-101s-47.667-35-81-35c-44 0-76 16.667-96 50h-2l-6-42h-84c1.333 18.667 2 52 2 100v212h98V518c0-12 1.333-20 4-24 8-25.333 24.667-38 50-38 32 0 48 22.667 48 68v174h98" />
                    <title>Linkedin</title>
                  </svg>
                </a>
              )}

              {githubUrl && (
                <a href={githubUrl} target="_blank" title="github">
                  {" "}
                  <GithubIcon size={18} />
                </a>
              )}

              {twitterUrl && (
                <a href={twitterUrl} target="_blank" title="twitter">
                  <NewTwitterIcon size={18} />
                </a>
              )}
              {instagramUrl && (
                <a href={instagramUrl} target="_blank" title="instagram">
                  <svg
                    viewBox="0 0 1024 1024"
                    fill="#E1306C"
                    height="18"
                    width="18">
                    <path d="M512 378.7c-73.4 0-133.3 59.9-133.3 133.3S438.6 645.3 512 645.3 645.3 585.4 645.3 512 585.4 378.7 512 378.7zM911.8 512c0-55.2.5-109.9-2.6-165-3.1-64-17.7-120.8-64.5-167.6-46.9-46.9-103.6-61.4-167.6-64.5-55.2-3.1-109.9-2.6-165-2.6-55.2 0-109.9-.5-165 2.6-64 3.1-120.8 17.7-167.6 64.5C132.6 226.3 118.1 283 115 347c-3.1 55.2-2.6 109.9-2.6 165s-.5 109.9 2.6 165c3.1 64 17.7 120.8 64.5 167.6 46.9 46.9 103.6 61.4 167.6 64.5 55.2 3.1 109.9 2.6 165 2.6 55.2 0 109.9.5 165-2.6 64-3.1 120.8-17.7 167.6-64.5 46.9-46.9 61.4-103.6 64.5-167.6 3.2-55.1 2.6-109.8 2.6-165zM512 717.1c-113.5 0-205.1-91.6-205.1-205.1S398.5 306.9 512 306.9 717.1 398.5 717.1 512 625.5 717.1 512 717.1zm213.5-370.7c-26.5 0-47.9-21.4-47.9-47.9s21.4-47.9 47.9-47.9 47.9 21.4 47.9 47.9a47.84 47.84 0 01-47.9 47.9z" />
                  </svg>
                </a>
              )}
              {youtubeUrl && (
                <a href={youtubeUrl} target="_blank" title="youtube">
                  <svg
                    viewBox="0 0 512 512"
                    fill="#FF0000"
                    height="18"
                    width="18">
                    <path d="M508.64 148.79c0-45-33.1-81.2-74-81.2C379.24 65 322.74 64 265 64h-18c-57.6 0-114.2 1-169.6 3.6C36.6 67.6 3.5 104 3.5 149 1 184.59-.06 220.19 0 255.79q-.15 53.4 3.4 106.9c0 45 33.1 81.5 73.9 81.5 58.2 2.7 117.9 3.9 178.6 3.8q91.2.3 178.6-3.8c40.9 0 74-36.5 74-81.5 2.4-35.7 3.5-71.3 3.4-107q.34-53.4-3.26-106.9zM207 353.89v-196.5l145 98.2z" />
                  </svg>
                </a>
              )}
              {tikTokUrl && (
                <a href={tikTokUrl} target="_blank" title="tiktok">
                  <svg
                    viewBox="0 0 448 512"
                    fill="currentColor"
                    height="18"
                    width="18">
                    <path d="M448 209.91a210.06 210.06 0 01-122.77-39.25v178.72A162.55 162.55 0 11185 188.31v89.89a74.62 74.62 0 1052.23 71.18V0h88a121.18 121.18 0 001.86 22.17A122.18 122.18 0 00381 102.39a121.43 121.43 0 0067 20.14z" />
                  </svg>
                </a>
              )}
            </div>
          </>
        )}
      </div>
      <hr className="border border-gray-200" />
      <Link
        href={`/explore/${author.handle}`}
        prefetch
        className="text-sm xsm:text-xs text-blue-500 hover:text-sky-600 hover:underline  my-2 whitespace-nowrap px-2">
        View more posts from{" "}
        <span className="capitalize">{author.username}</span> &#8599;
      </Link>
    </div>
  );
}
