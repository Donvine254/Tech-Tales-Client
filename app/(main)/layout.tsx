import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { ThemeProvider } from "next-themes";
import Footer from "@/components/layout/footer";
import ScrollButton from "@/components/custom/scroll-button";
import { Toaster } from "@/components/ui/sonner";
import Navbar from "@/components/layout/navbar";
import { metaobject } from "@/lib/metadata";
import CookieAlert from "@/components/custom/cookie";
import { SessionProvider } from "@/providers/session";
import { GoogleOneTapLogin } from "@/components/auth/google";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
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

export default function RootLayout({
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
                  <Navbar />
                  {children}
                </GoogleOAuthProvider>
              </SessionProvider>
            </main>
            <Footer />
            <CookieAlert />
            <ScrollButton />
            <Toaster richColors closeButton />
          </ThemeProvider>
          <GoogleAnalytics gaId="G-12QCPH9MS1" />
          <GoogleTagManager gtmId="GTM-5QD9S2NG" />
        </body>
      </html>
    </>
  );
}
