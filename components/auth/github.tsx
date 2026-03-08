import { GithubIcon } from "@/assets/icons";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { baseUrl } from "@/lib/utils";
import { Badge } from "../ui/badge";
import { type LoginMethod } from "@/lib/actions/login-method";
import { type AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

type Props = {
  origin_url?: string;
  router: AppRouterInstance;
  setStatus: React.Dispatch<React.SetStateAction<FormStatus>>;
  lastLoginMethod?: LoginMethod | null;
};
type FormStatus = "pending" | "loading" | "success" | "error";
export default function GithubButton({
  router,
  setStatus,
  lastLoginMethod,
}: Props) {
  const clientID = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID!;
  const loginWithGithub = () => {
    toast.loading("Processing github auth..");
    setStatus("loading");
    router.replace(
      `https://github.com/login/oauth/authorize?client_id=${clientID}&redirect_uri=${baseUrl}/api/auth/callback&scope=read:user user:email`,
    );
  };
  return (
    <Button
      variant="outline"
      className="w-full bg-gray-950 font-bold text-white dark:bg-white/90 dark:text-gray-950 relative"
      title="login with github"
      type="button"
      onClick={loginWithGithub}>
      <GithubIcon /> Github
      <span className="sr-only">Login with Github</span>
      {lastLoginMethod === "github" && (
        <Badge
          variant="category"
          className="absolute -top-2 -right-1 rounded-full border-none shadow">
          Last
        </Badge>
      )}
    </Button>
  );
}
