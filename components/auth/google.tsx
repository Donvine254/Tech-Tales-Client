"use client";
import { useGoogleLogin, useGoogleOneTapLogin } from "@react-oauth/google";
import { toast } from "sonner";
import { GoogleIcon } from "@/assets/icons";
import { authenticateSSOLogin } from "@/lib/actions/auth";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

type Props = {
    router: AppRouterInstance;
    origin_url: string;
};
const GoogleAuthButton = ({ router, origin_url }: Props) => {
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
    async function loginGoogleUsers(access_token: string) {
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
            const result = await authenticateSSOLogin(userInfo.email);
            if (result.success) {
                toast.success("Logged in successfully", {
                    position: "bottom-center",
                });
                router.replace(origin_url);
            } else {
                // if there is data, register the user.
                if (result.error === "User not found") {
                    toast.error(result.error);
                    router.replace(
                        `/login/account_not_found?referrer=google&token=${access_token}`
                    );
                }
                toast.error(result.error);
                return false;
            }
            // eslint-disable-next-line
        } catch (error: any) {
            console.error(error);
            toast.error(error.message || "something went wrong");
        }
    }

    return (
        <Button variant="outline" className="w-full hover:bg-blue-100 dark:hover:bg-white" title="login with google" onClick={() => handleGoogleLogin()} type="button">
            <GoogleIcon />
            <span className="sr-only">Login with Google</span>
        </Button>

    );
};

export default GoogleAuthButton;
// eslint-disable-next-line
export function GoogleOneTapLogin({ session }: { session: any | null }) {
    const router = useRouter();
    useGoogleOneTapLogin({
        onSuccess: async (credentialResponse) => {
            try {
                const response = await fetch(
                    `https://oauth2.googleapis.com/tokeninfo?id_token=${credentialResponse.credential}`
                );
                const userInfo = await response.json();
                const result = await authenticateSSOLogin(userInfo.email);
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
        disabled: session,
        promptMomentNotification: (notification) => {
            console.log("Prompt moment notification:", notification);
        },
        auto_select: true,
        use_fedcm_for_prompt: true,
    });

    return null;
}
