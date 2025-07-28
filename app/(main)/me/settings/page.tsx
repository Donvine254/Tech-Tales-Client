import { getSession } from "@/lib/actions/session";
import { Session } from "@/types";
import { redirect } from "next/navigation";
import SettingsPage from "./settings-page";
import { fetchProfileData } from "@/lib/actions/user";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Update your profile settings - Tech Tales",
  description: "Explore our top-picked tech stories curated just for you.",
};
export default async function Page() {
  const session = (await getSession()) as Session | null;
  if (!session || !session.userId) {
    redirect("/");
  }
  const user = await fetchProfileData(session.userId);
  if (!user) {
    redirect("/login");
  }
  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      <SettingsPage user={user} />
    </div>
  );
}
