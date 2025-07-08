import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import {
  TooltipProvider,
  TooltipTrigger,
  Tooltip,
  TooltipContent,
} from "@/components/ui/tooltip";

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
      icon: <FacebookRect className="h-5 w-5" />,
      url: getUrl("facebook"),
    },
    {
      name: "linkedin",
      icon: <Linkedin className="h-5 w-5" />,
      url: getUrl("linkedin"),
    },
    {
      name: "github",
      icon: <GithubIcon className="h-5 w-5" />,
      url: getUrl("github"),
    },
    { name: "x", icon: <TwitterXLine className="h-5 w-5" />, url: getUrl("x") },
    {
      name: "instagram",
      icon: <Instagram className="h-5 w-5" />,
      url: getUrl("instagram"),
    },
    {
      name: "youtube",
      icon: <LogoYoutube className="h-5 w-5" />,
      url: getUrl("youtube"),
    },
    {
      name: "tiktok",
      icon: <Tiktok className="h-5 w-5" />,
      url: getUrl("tiktok"),
    },
  ];

  return (
    <div className="flex flex-wrap space-x-4 items-center">
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
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Avatar
            className="h-12 w-12 ring-2 ring-offset-2 cursor-pointer"
            style={{ boxShadow: `0 0 0 2px ${author.branding}` }}>
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
        </TooltipTrigger>
        <TooltipContent className="w-fit min-w-[250px] max-w-72" side="bottom">
          <div className="flex items-center gap-2 w-full rounded-t-md px-4 py-2 border-b border-gray-600 dark:border-gray-300">
            <Link href={`/explore/${author.handle}`} prefetch>
              <Avatar
                className="h-10 md:h-12 w-10 md:w-12 ring-2 ring-offset-2 cursor-pointer"
                style={{ boxShadow: `0 0 0 2px ${author.branding}` }}>
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
            <p className="font-medium font-serif text-sm leading-loose my-2">
              {author.bio ?? "This author has not updated their bio yet"}
            </p>
            {author.socials?.length ? (
              <div className="space-y-3">
                <p className="font-medium text-sm text-secondary/80">
                  Follow me on:
                </p>
                <SocialLinks socials={author.socials} />
              </div>
            ) : null}
          </div>
          <hr className="border border-gray-600 dark:border-gray-300" />
          <Link
            href={`/explore/${author.handle}`}
            prefetch
            className="text-sm text-blue-500 hover:text-sky-600 hover:underline px-2 py-2 block">
            View more posts from{" "}
            <span className="capitalize">{author.username}</span> &#8599;
          </Link>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default UserCard;
