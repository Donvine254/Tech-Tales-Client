import "../globals.css";
import Footer from "@/components/Footer";
import ScrollIndicator from "@/components/ui/ScrollIndicator";
import Newsletter from "@/components/Newsletter";
import { SearchMD } from "@/components/SearchMD";
import { Toaster } from "react-hot-toast";
import ScrollToTopButton from "@/components/ui/ScrollButton";
import { CookieAlert } from "@/components";
import dynamic from "next/dynamic";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { UserContextProvider } from "@/providers";
import { metaobject } from "@/components/metadata";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";

const NoSSRNavbar = dynamic(() => import("@/components/Navbar"), {
  ssr: false,
});
export const metadata = {
  ...metaobject,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ScrollIndicator />
        <Toaster />
        <UserContextProvider>
          <GoogleOAuthProvider
            clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
            <NoSSRNavbar />
            <SearchMD />
            <main className="max-w-7xl mx-auto overflow-x-hidden">
              {children}
            </main>
            <Newsletter />
            <ScrollToTopButton />
            <CookieAlert />
            <Footer />
          </GoogleOAuthProvider>
        </UserContextProvider>
        <GoogleAnalytics gaId="G-12QCPH9MS1" />
        <GoogleTagManager gtmId="GTM-5QD9S2NG" />
      </body>
    </html>
  );
}
