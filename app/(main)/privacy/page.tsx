import Privacy from "./component";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Read our privacy policy - Tech Tales",
  description: "Stay updated with the newest stories in the world of tech.",
};
export default async function page() {
  return (
    <>
      <Privacy />
    </>
  );
}
