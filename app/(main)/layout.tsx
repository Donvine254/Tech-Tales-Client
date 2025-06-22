import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { ThemeProvider } from "next-themes";
import Footer from "@/components/custom/footer";
import ScrollButton from "@/components/custom/scroll-button";
import { Toaster } from "@/components/ui/sonner";
import Navbar from "@/components/custom/navbar";
import { metaobject } from "@/lib/metadata";
import CookieAlert from "@/components/custom/cookie";
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
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange>
          <main>
            <Navbar />
            {children}
          </main>
          <Footer />
          <CookieAlert />
          <ScrollButton />
          <Toaster richColors closeButton />
        </ThemeProvider>
      </body>
    </html>
  );
}
