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
import { getSession } from "@/lib/actions/session";
import { Session } from "@/types";
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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = (await getSession()) as Session;
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
              <SessionProvider initialSession={session}>
                <GoogleOAuthProvider
                  clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
                  <GoogleOneTapLogin session={session} />
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
        </body>
      </html>
    </>
  );
}
