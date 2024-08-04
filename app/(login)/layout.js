import "../globals.css";
import { Toaster } from "react-hot-toast";
import { GoogleContextProviders } from "@/providers/google";
export const metadata = {
  title: "Tech Tales",
  description:
    "Tech Tales is a simple blog for tech students and professionals who would like to share their solutions to various coding problems or practice blogging as a way of learning",
  verification: { google: "9SOlFuK-ili9ZVjwR08EAyntbaai9SO1QKx9Se4tOXk" },
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
