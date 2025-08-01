import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/sonner";
import { metaobject } from "@/lib/metadata";
import { SessionProvider } from "@/providers/session";
import { GoogleOneTapLogin } from "@/components/auth/google";
import { GoogleOAuthProvider } from "@react-oauth/google";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  ...metaobject,
};

export default function CreateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange>
            <main>
              <SessionProvider>
                <GoogleOAuthProvider
                  clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
                  <GoogleOneTapLogin />
                  {children}
                </GoogleOAuthProvider>
              </SessionProvider>
            </main>
            <Toaster richColors closeButton />
          </ThemeProvider>
        </body>
      </html>
    </>
  );
}
