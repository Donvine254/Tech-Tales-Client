import SettingsPage from "./settings-page";
import { fetchProfileData } from "@/lib/actions/user";
import { Metadata } from "next";
import { isVerifiedUser } from "@/dal/auth-check";
import { UserProfileData } from "@/types";

export const metadata: Metadata = {
  title: "Update your profile settings - Tech Tales",
  description: "Explore our top-picked tech stories curated just for you.",
};
export default async function Page() {
  const user = await isVerifiedUser();
  const userData = (await fetchProfileData(user.userId)) as UserProfileData;
  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      <SettingsPage user={userData} />
    </div>
  );
}
