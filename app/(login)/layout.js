import "../globals.css";
import { Toaster } from "react-hot-toast";
import { GoogleContextProviders } from "@/providers/google";
import { metaobject } from "@/components/metadata";
export const metadata = {
  ...metaobject,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <main>
          <Toaster />
          <GoogleContextProviders>{children}</GoogleContextProviders>
        </main>
      </body>
    </html>
  );
}
