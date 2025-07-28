"use client";

import Image from "next/image";
import { FC } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface UserBadgesProps {
  role?: "user" | "admin";
  createdAt: Date | string;
  blogCount?: number;
  isTopAuthor?: boolean;
}
type Badge = {
  src: string;
  alt: string;
  label: string;
};

const UserBadges: FC<UserBadgesProps> = ({
  role = "user",
  createdAt,
  blogCount = 0,
  isTopAuthor = false,
}) => {
  const now = Date.now();
  const createdTime = new Date(createdAt).getTime();
  const isNewUser = now - createdTime < 90 * 24 * 60 * 60 * 1000; // < 90 days
  const isVeteran = now - createdTime >= 365 * 24 * 60 * 60 * 1000; // >= 1 year

  // Determine which badges apply
  const badges: Badge[] = [
    role === "admin" && {
      src: "https://res.cloudinary.com/dipkbpinx/image/upload/v1724780586/badges/qkphllyptlbfxsmhihnh.png",
      alt: "admin badge",
      label: "Admin",
    },
    isNewUser && {
      src: "https://res.cloudinary.com/dipkbpinx/image/upload/v1724781261/badges/ve5jrrevzjft7up36syp.png",
      alt: "welcome badge",
      label: "Welcome badge",
    },
    isVeteran && {
      src: "https://res.cloudinary.com/dipkbpinx/image/upload/v1724780825/badges/kotckmmr92ph9mayk2ds.webp",
      alt: "veteran badge",
      label: "Veteran badge",
    },
    blogCount > 0 &&
      blogCount <= 10 && {
        src: "https://res.cloudinary.com/dipkbpinx/image/upload/v1724779829/badges/m0edwdlv6hvbdkvxeevz.svg",
        alt: "writing debut badge",
        label: "Writing debut badge",
      },
    blogCount > 10 && {
      src: "https://res.cloudinary.com/dipkbpinx/image/upload/v1724779829/badges/q86vokn45db0hfkklpud.svg",
      alt: "notable contributor badge",
      label: "Notable contributor",
    },
    isTopAuthor && {
      src: "https://res.cloudinary.com/dipkbpinx/image/upload/v1728757940/badges/nwczihvezgmn1pdxkfs4.svg",
      alt: "top author badge",
      label: "Top author",
    },
  ].filter(Boolean) as Badge[]; // remove false values

  return (
    <TooltipProvider>
      <div className="flex items-center my-2 gap-x-2 flex-wrap">
        {badges.length > 0 ? (
          badges.map((badge, index) => (
            <Tooltip key={index}>
              <TooltipTrigger asChild>
                <Image
                  width={30}
                  height={30}
                  src={badge!.src}
                  alt={badge!.alt}
                />
              </TooltipTrigger>
              <TooltipContent>{badge!.label}</TooltipContent>
            </Tooltip>
          ))
        ) : (
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="w-fit px-1.5 py-1 rounded-md bg-muted text-xs text-muted-foreground border">
                You&apos;ve not earned any badges😔
              </div>
            </TooltipTrigger>
            <TooltipContent>You have not earned any badges yet</TooltipContent>
          </Tooltip>
        )}
      </div>
    </TooltipProvider>
  );
};

export default UserBadges;
