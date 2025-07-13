import {
  GithubIcon,
  FacebookRect,
  TwitterXLine,
  Instagram,
  Linkedin,
  LogoYoutube,
  Tiktok,
} from "@/assets/icons";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { FC } from "react";

interface SocialLink {
  platform: string;
  url: string;
}
export const SocialLinks: FC<{
  socials?: SocialLink[];
  variant?: "icon" | "card";
}> = ({ socials, variant = "icon" }) => {
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
  if (variant === "card") {
    return (
      <div className="space-y-3">
        {platforms
          .filter((p) => p.url)
          .map(({ name, icon, url }) => (
            <div
              key={name}
              className="flex items-center gap-3 px-1.5 py-0.5 border rounded-lg bg-muted">
              <div className="flex items-center justify-center w-8 h-8 rounded-md bg-gray-300 dark:bg-gray-900">
                {icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm capitalize">{name}</p>
                <p className="text-xs text-muted-foreground truncate">{url}</p>
              </div>
              <Link
                href={url!}
                target="_blank"
                className="inline-flex items-center justify-center h-8 w-8 p-0 hover:text-blue-600">
                <ExternalLink className="h-3 w-3" />
              </Link>
            </div>
          ))}
      </div>
    );
  }

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
