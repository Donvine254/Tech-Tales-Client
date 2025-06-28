"use client";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
export function GoogleContextProviders({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <GoogleReCaptchaProvider
            reCaptchaKey={process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA_SITE_KEY!}>
            {children}
        </GoogleReCaptchaProvider>
    );
}
