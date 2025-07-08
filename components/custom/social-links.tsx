import {
  GithubIcon,
  FacebookRect,
  TwitterXLine,
  Instagram,
  Linkedin,
  LogoYoutube,
  Tiktok,
} from "@/assets/icons";
import { FC } from "react";

interface SocialLink {
  platform: string;
  url: string;
}
export const SocialLinks: FC<{ socials?: SocialLink[] }> = ({ socials }) => {
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
