"use client";
import { useGoogleLogin, useGoogleOneTapLogin } from "@react-oauth/google";
import { toast } from "sonner";
import { GoogleIcon } from "@/assets/icons";
import { authenticateSSOLogin } from "@/lib/actions/auth";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { useSession } from "@/providers/session";
import { type LoginMethod } from "@/lib/actions/login-method";
import { Badge } from "../ui/badge";

type Props = {
  origin_url: string;
  setStatus: React.Dispatch<React.SetStateAction<FormStatus>>;
  lastLoginMethod?: LoginMethod | null;
};
type FormStatus = "pending" | "loading" | "success" | "error";
const GoogleAuthButton = ({
  origin_url,
  setStatus,
  lastLoginMethod,
}: Props) => {
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
        },
      );
      const userInfo = await response.json();
      const result = await authenticateSSOLogin(
        {
          email: userInfo.email,
          username: userInfo.name || userInfo.email.split("@")[0],
          picture: userInfo.picture,
        },
        "google",
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
      className="w-full bg-gray-950 text-white font-bold dark:bg-white/90 dark:text-gray-950 relative"
      title="login with google"
      onClick={() => handleGoogleLogin()}
      type="button">
      <GoogleIcon /> Google
      <span className="sr-only">Login with Google</span>
      {lastLoginMethod === "google" && (
        <Badge
          variant="category"
          className="absolute -top-2 -right-1 rounded-full border-none shadow">
          Last
        </Badge>
      )}
    </Button>
  );
};

export default GoogleAuthButton;
/*
This component is used to handle Google authentication in the login form.
It uses the `useGoogleLogin` hook from `@react-oauth/google` to initiate the login process. 
*/
export function GoogleOneTapLogin() {
  const { session, loading } = useSession();
  const router = useRouter();
  useGoogleOneTapLogin({
    onSuccess: async (credentialResponse) => {
      try {
        const response = await fetch(
          `https://oauth2.googleapis.com/tokeninfo?id_token=${credentialResponse.credential}`,
        );
        const userInfo = await response.json();
        const result = await authenticateSSOLogin(
          {
            email: userInfo.email,
            username: userInfo.name || userInfo.email.split("@")[0],
            picture: userInfo.picture,
          },
          "google",
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
              `/login/?action=login&token=${credentialResponse.credential}`,
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
    disabled: loading || !!session,
    promptMomentNotification: (notification) => {
      console.log("Prompt moment notification:", notification);
    },
    auto_select: true,
    use_fedcm_for_prompt: true,
  });

  return null;
}
