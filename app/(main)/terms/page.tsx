import Terms from "./terms";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Read our terms of service - Tech Tales",
  description: "Stay updated with the newest stories in the world of tech.",
};
export default async function page() {
  return (
    <>
      <Terms />
    </>
  );
}
