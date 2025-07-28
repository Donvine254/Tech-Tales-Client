import { GithubIcon } from "@/assets/icons";
import { Button } from "../ui/button";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { toast } from "sonner";
import { baseUrl } from "@/lib/utils";

type Props = {
  origin_url?: string;
  router: AppRouterInstance;
  setStatus: React.Dispatch<React.SetStateAction<FormStatus>>;
};
type FormStatus = "pending" | "loading" | "success" | "error";
export default function GithubButton({ router, setStatus }: Props) {
  const clientID = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID!;
  const loginWithGithub = () => {
    toast.loading("Processing github auth..");
    setStatus("loading");
    router.replace(
      `https://github.com/login/oauth/authorize?client_id=${clientID}&redirect_uri=${baseUrl}/api/auth/callback&scope=read:user user:email`
    );
  };
  return (
    <Button
      variant="outline"
      className="w-full hover:bg-black hover:text-white dark:hover:text-black dark:hover:bg-white"
      title="login with github"
      type="button"
      onClick={loginWithGithub}>
      <GithubIcon />
      <span className="sr-only">Login with Github</span>
    </Button>
  );
}
