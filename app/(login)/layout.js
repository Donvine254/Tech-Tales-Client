import "../globals.css";
import { Toaster } from "react-hot-toast";
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
          {children}
      </body>
    </html>
  );
}
