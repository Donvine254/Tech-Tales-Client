import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trash2, PlusIcon } from "lucide-react";
import {
  FacebookRect,
  GithubIcon,
  Instagram,
  Linkedin,
  LogoYoutube,
  Tiktok,
  TwitterXLine,
} from "@/assets/icons";
interface SocialLink {
  platform: string;
  url: string;
}

interface SocialMediaDialogProps {
  existingSocials?: SocialLink[];
  onSave: (socials: SocialLink[]) => void;
  onCancel?: () => void;
}
type SocialPlatform =
  | "github"
  | "facebook"
  | "twitter"
  | "instagram"
  | "youtube"
  | "tiktok"
  | "linkedin";
const platformConfig = {
  github: {
    icon: GithubIcon,
    label: "GitHub",
    placeholder: "https://github.com/username",
    domain: "github.com",
  },
  facebook: {
    icon: FacebookRect,
    label: "Facebook",
    placeholder: "https://facebook.com/username",
    domain: "facebook.com",
  },
  twitter: {
    icon: TwitterXLine,
    label: "Twitter",
    placeholder: "https://x.com/username",
    domain: "x.com",
  },
  instagram: {
    icon: Instagram,
    label: "Instagram",
    placeholder: "https://instagram.com/username",
    domain: "instagram.com",
  },
  youtube: {
    icon: LogoYoutube,
    label: "YouTube",
    placeholder: "https://youtube.com/@username",
    domain: "youtube.com",
  },
  tiktok: {
    icon: Tiktok,
    label: "TikTok",
    placeholder: "https://tiktok.com/@username",
    domain: "tiktok.com",
  },
  linkedin: {
    icon: Linkedin,
    label: "LinkedIn",
    placeholder: "https://linkedin.com/in/username",
    domain: "linkedin.com",
  },
};

export default function SocialMediaDialog({
  existingSocials = [],
  onSave,
}: SocialMediaDialogProps) {
  const [open, setOpen] = useState(false);
  const [socials, setSocials] = useState<SocialLink[]>([]);

  useEffect(() => {
    if (open) {
      const initialSocials: SocialLink[] = Object.keys(platformConfig).map(
        (platform) => {
          const existing = existingSocials.find((s) => s.platform === platform);
          return existing || { platform, url: "" };
        }
      );
      setSocials(initialSocials);
    }
  }, [open, existingSocials]);

  const handleUrlChange = (platform: string, url: string) => {
    setSocials((prev) =>
      prev.map((social) =>
        social.platform === platform ? { ...social, url } : social
      )
    );
  };

  const handleRemove = (platform: string) => {
    setSocials((prev) =>
      prev.map((social) =>
        social.platform === platform ? { ...social, url: "" } : social
      )
    );
  };

  const handleSave = () => {
    // Only save socials with non-empty URLs
    const validSocials = socials.filter((social) => social.url.trim() !== "");
    onSave(validSocials);
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const isValidUrl = (platform: string, url: string) => {
    if (!url.trim()) return true;

    try {
      const parsed = new URL(url);
      const expectedDomain = platformConfig[platform as SocialPlatform]?.domain;

      const isCorrectDomain =
        parsed.hostname === expectedDomain ||
        parsed.hostname === `www.${expectedDomain}`;

      const hasPath =
        parsed.pathname &&
        parsed.pathname !== "/" &&
        parsed.pathname.length > 1;

      return isCorrectDomain && hasPath;
    } catch {
      return false;
    }
  };

  const hasChanges = () => {
    const currentValid = socials.filter((s) => s.url.trim() !== "");
    const existingValid = existingSocials.filter((s) => s.url.trim() !== "");

    if (currentValid.length !== existingValid.length) return true;

    return currentValid.some((current) => {
      const existing = existingValid.find(
        (e) => e.platform === current.platform
      );
      return !existing || existing.url !== current.url;
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogOverlay className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm dark:bg-black/70 transition-all" />
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="cursor-pointer w-full hover:text-blue-500">
          <PlusIcon className="h-4 w-4" /> Connect Account
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Connect Social Media Accounts</DialogTitle>
          <DialogDescription>
            Add your social media profiles to showcase your online presence.
          </DialogDescription>
        </DialogHeader>
        <div className="flex-1 overflow-y-auto py-4 pr-2 space-y-4 min-h-0">
          {socials.map((social) => {
            const config = platformConfig[social.platform as SocialPlatform];
            const IconComponent = config.icon;
            const hasUrl = social.url.trim() !== "";
            const urlIsValid = isValidUrl(social.platform, social.url);

            return (
              <div key={social.platform} className="space-y-2">
                <Label
                  htmlFor={social.platform}
                  className="text-sm font-medium">
                  {config.label}
                </Label>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-muted">
                      <IconComponent className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <Input
                      id={social.platform}
                      type="url"
                      value={social.url}
                      onChange={(e) =>
                        handleUrlChange(social.platform, e.target.value)
                      }
                      placeholder={config.placeholder}
                      className={`flex-1 ${
                        !urlIsValid ? "border-destructive" : ""
                      }`}
                    />
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemove(social.platform)}
                    disabled={!hasUrl}
                    className="h-10 w-10 p-0 text-muted-foreground hover:text-destructive disabled:opacity-30">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                {!urlIsValid && social.url.trim() !== "" && (
                  <p className="text-sm text-destructive">
                    URL must start with <strong>{config.domain}</strong> and
                    include a <strong>username</strong>
                  </p>
                )}
              </div>
            );
          })}
        </div>
        <DialogFooter className="gap-2 flex-shrink-0">
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={
              socials.some(
                (s) => s.url.trim() !== "" && !isValidUrl(s.platform, s.url)
              ) || !hasChanges()
            }>
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
