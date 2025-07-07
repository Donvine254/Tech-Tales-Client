import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { FC } from "react";
import {
  GithubIcon,
  FacebookRect,
  TwitterXLine,
  Instagram,
  Linkedin,
  LogoYoutube,
  Tiktok,
} from "@/assets/icons";

interface SocialLink {
  platform: string;
  url: string;
}

interface Author {
  username: string;
  handle: string;
  picture: string;
  bio?: string;
  branding?: string;
  role?: string;
  socials?: SocialLink[];
}

interface UserCardProps {
  author: Author;
}

const SocialLinks: FC<{ socials?: SocialLink[] }> = ({ socials }) => {
  const getUrl = (platform: string) =>
    socials?.find((s) => s.platform === platform)?.url || null;

  const platforms = [
    {
      name: "facebook",
      icon: <FacebookRect className="h-4 w-4" />,
      url: getUrl("facebook"),
    },
    {
      name: "linkedin",
      icon: <Linkedin className="h-4 w-4" />,
      url: getUrl("linkedin"),
    },
    {
      name: "github",
      icon: <GithubIcon className="h-4 w-4" />,
      url: getUrl("github"),
    },
    { name: "x", icon: <TwitterXLine className="h-4 w-4" />, url: getUrl("x") },
    {
      name: "instagram",
      icon: <Instagram className="h-4 w-4" />,
      url: getUrl("instagram"),
    },
    {
      name: "youtube",
      icon: <LogoYoutube className="h-4 w-4" />,
      url: getUrl("youtube"),
    },
    {
      name: "tiktok",
      icon: <Tiktok className="h-4 w-4" />,
      url: getUrl("tiktok"),
    },
  ];

  return (
    <div className="flex flex-wrap gap-2 items-center">
      {platforms
        .filter((p) => p.url)
        .map((p) => (
          <a key={p.name} href={p.url!} target="_blank" title={p.name}>
            {p.icon}
          </a>
        ))}
    </div>
  );
};

const UserCard: FC<UserCardProps> = ({ author }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="h-12 w-12 ring-2 ring-cyan-500 ring-offset-2">
          <AvatarImage
            src={author.picture ?? "/placeholder.svg"}
            alt={author.username}
          />
          <AvatarFallback className="bg-gradient-to-r from-cyan-100 to-blue-100 text-cyan-700 text-sm">
            {author.username
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-slate-50 border shadow w-fit rounded-md min-w-[250px] z-50">
        <div
          className="flex items-center gap-2 w-full rounded-t-md px-4 py-2 border-b"
          style={{
            backgroundImage: `linear-gradient(to top, #f9fafb, #f3f4f6, ${author.branding})`,
          }}>
          <Link href={`/explore/${author.handle}`} prefetch>
            <Image
              src={author.picture}
              width={48}
              height={48}
              alt={author.username}
              className="h-10 w-10 md:h-12 md:w-12 rounded-full cursor-pointer"
            />
          </Link>
          <div className="capitalize font-bold text-lg">
            <p className="w-full flex items-center gap-1">
              <Link href={`/explore/${author.handle}`} prefetch>
                {author.username}
              </Link>
              {author.role === "admin" ? (
                <Image
                  src="https://res.cloudinary.com/dipkbpinx/image/upload/v1723863889/badges/on4c9g21udqs4oqrucdo.png"
                  width={18}
                  height={18}
                  alt="verification-badge"
                  className="h-auto w-auto max-w-[18px] mb-1"
                />
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="#1D9BF0">
                  <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
                  <path d="m9 12 2 2 4-4" stroke="#ffffff" />
                </svg>
              )}
            </p>
          </div>
        </div>
        <div className="px-2 py-2">
          <p className="font-medium text-[#1D9BF0] my-1 text-xs md:text-sm p-1 bg-gray-200 rounded-sm shadow">
            {author.bio ?? "This author has not updated their bio yet"}
          </p>
          {author.socials?.length ? (
            <>
              <p className="font-medium text-sm text-gray-600">Follow me on:</p>
              <SocialLinks socials={author.socials} />
            </>
          ) : null}
        </div>
        <hr className="border border-gray-200" />
        <Link
          href={`/explore/${author.handle}`}
          prefetch
          className="text-sm text-blue-500 hover:text-sky-600 hover:underline px-2 py-2 block">
          View more posts from{" "}
          <span className="capitalize">{author.username}</span> &#8599;
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserCard;
