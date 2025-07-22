"use client";
import { useGoogleLogin, useGoogleOneTapLogin } from "@react-oauth/google";
import { toast } from "sonner";
import { GoogleIcon } from "@/assets/icons";
import { authenticateSSOLogin } from "@/lib/actions/auth";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { useSession } from "@/providers/session";

type Props = {
  origin_url: string;
  setStatus: React.Dispatch<React.SetStateAction<FormStatus>>;
};
type FormStatus = "pending" | "loading" | "success" | "error";
const GoogleAuthButton = ({ origin_url, setStatus }: Props) => {
  const router = useRouter();
  //function to login google users
  async function loginGoogleUsers(access_token: string) {
    setStatus("loading");
    try {
      const response = await fetch(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      const userInfo = await response.json();
      const result = await authenticateSSOLogin(
        {
          email: userInfo.email,
          username: userInfo.name || userInfo.email.split("@")[0],
          picture: userInfo.picture,
        },
        "google"
      );
      if (result.success) {
        toast.success("Logged in successfully", {
          position: "bottom-center",
        });
        router.replace(origin_url);
      } else {
        setStatus("error");
        toast.error(result.error);
        return false;
      }
      // eslint-disable-next-line
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "something went wrong");
    }
  }
  //function to handle google login button click
  const handleGoogleLogin = useGoogleLogin({
    flow: "implicit",
    onSuccess: (tokenResponse) => {
      loginGoogleUsers(tokenResponse.access_token);
    },
    onError: (error) => {
      console.error("Login Failed:", error);
      toast.error(error.error_description || "Something went wrong");
    },
  });

  return (
    <Button
      variant="outline"
      className="w-full hover:bg-blue-100 dark:hover:bg-white"
      title="login with google"
      onClick={() => handleGoogleLogin()}
      type="button">
      <GoogleIcon />
      <span className="sr-only">Login with Google</span>
    </Button>
  );
};

export default GoogleAuthButton;
// eslint-disable-next-line
export function GoogleOneTapLogin() {
  const { session } = useSession();
  const router = useRouter();
  useGoogleOneTapLogin({
    onSuccess: async (credentialResponse) => {
      try {
        const response = await fetch(
          `https://oauth2.googleapis.com/tokeninfo?id_token=${credentialResponse.credential}`
        );
        const userInfo = await response.json();
        const result = await authenticateSSOLogin(
          {
            email: userInfo.email,
            username: userInfo.name || userInfo.email.split("@")[0],
            picture: userInfo.picture,
          },
          "google"
        );
        if (result.success) {
          toast.success("Logged in successfully", {
            position: "bottom-center",
          });
          if (typeof window !== "undefined") {
            window.location.reload();
          }
        } else {
          // change this to automatically register users
          if (result.error === "User not found") {
            toast.error(result.error);
            router.replace(
              `/login/account_not_found?action=login&token=${credentialResponse.credential}`
            );
          }
          toast.error(result.error);
          return false;
        }
      } catch (error) {
        console.error("Login Failed:", error);
      }
    },
    onError: () => {
      console.error("Login Failed");
      if (typeof window !== "undefined") {
        document.cookie =
          "g_state=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      }
    },
    disabled: !!session,
    promptMomentNotification: (notification) => {
      console.log("Prompt moment notification:", notification);
    },
    auto_select: true,
    use_fedcm_for_prompt: true,
  });

  return null;
}
