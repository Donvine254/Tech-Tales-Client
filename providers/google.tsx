"use client";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { GoogleOAuthProvider } from "@react-oauth/google";
export function GoogleContextProviders({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <GoogleReCaptchaProvider
            reCaptchaKey={process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA_SITE_KEY!}>
            <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
                {children}
            </GoogleOAuthProvider>
        </GoogleReCaptchaProvider>
    );
}
