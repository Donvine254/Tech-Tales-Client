import Terms from "./terms";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Tech Tales",
  description: "Stay updated with the newest stories in the world of tech.",
};
export default async function page() {
  return (
    <>
      <Terms />
    </>
  );
}
