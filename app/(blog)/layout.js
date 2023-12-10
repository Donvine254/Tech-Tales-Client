import "../globals.css";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";
import dynamic from "next/dynamic";

const NoSSRNavbar = dynamic(() => import("@/components/Navbar"), {
  ssr: false,
});
export const metadata = {
  title: "Tech Tales",
  description:
    "Tech Tales is a simple school blog for software developers students and senior developers who would like to share their solutions to various coding problems or practice blogging as a way of learning",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Toaster />
        <NoSSRNavbar />
        <main className="max-w-7xl mx-auto overflow-x-hidden m-5">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
