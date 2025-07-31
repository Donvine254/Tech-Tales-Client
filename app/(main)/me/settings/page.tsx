import SettingsPage from "./settings-page";
import { getUserData } from "@/lib/actions/user";
import { Metadata } from "next";
import { UserProfileData } from "@/types";

export const metadata: Metadata = {
  title: "Update your profile settings - Tech Tales",
  description: "Explore our top-picked tech stories curated just for you.",
};
export default async function Page() {
  const userData = (await getUserData()) as UserProfileData;
  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      <SettingsPage user={userData} />
    </div>
  );
}
