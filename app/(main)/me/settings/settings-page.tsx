"use client";
import React, { useState } from "react";
import { User, Bell, Settings as SettingsIcon, Shield } from "lucide-react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import PersonalDetails from "@/components/pages/settings/personal-details";
import { Preferences, UserProfileData } from "@/types";
import Notifications from "@/components/pages/settings/notifications";
import SecurityAccount from "@/components/pages/settings/security";
import PreferenceSettings from "@/components/pages/settings/preferences";

const tabs = [
  {
    id: "personal",
    label: "Personal Details",
    icon: User,
  },
  {
    id: "notifications",
    label: "Notifications",
    icon: Bell,
  },
  {
    id: "preferences",
    label: "Preferences",
    icon: SettingsIcon,
  },
  {
    id: "security",
    label: "Security & Account",
    icon: Shield,
  },
];

export default function SettingsPage({ user }: { user: UserProfileData }) {
  const [activeTab, setActiveTab] = useState("personal");

  const tabButtonClass = (isActive: boolean) =>
    `flex items-center cursor-pointer w-full px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 whitespace-nowrap ${
      isActive
        ? "bg-blue-500 text-white hover:text-white shadow"
        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
    }`;

  const mobileTabClass = (isActive: boolean) =>
    `flex gap-2 p-2 justify-start items-center cursor-pointer  text-xs font-medium  transition-all duration-200 whitespace-nowrap flex-shrink-0 ${
      isActive
        ? "border-blue-500 border-b-2"
        : "text-muted-foreground hover:bg-accent"
    }`;

  const TabComponents: Record<string, React.ReactNode> = {
    personal: (
      <PersonalDetails
        initialData={{
          bio: user.bio,
          branding: user.branding || "#155dfc",
          handle: user.handle,
          username: user.username,
          picture: user.picture,
          skills: user.skills,
        }}
        userId={user.id}
      />
    ),
    notifications: (
      <Notifications
        initialData={user.preferences as Preferences}
        userId={user.id}
      />
    ),
    security: <SecurityAccount userId={user.id} />,
    preferences: <PreferenceSettings />,
  };

  return (
    <div className="min-h-screen sm:bg-muted transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold">Settings</h1>
          <p className="mt-2 text-muted-foreground">
            Manage your account settings and preferences.
          </p>
        </div>

        <div className="lg:grid lg:grid-cols-4 lg:gap-8">
          {/* Sidebar Navigation (Desktop) */}
          <div className="hidden lg:block lg:col-span-1">
            <nav className="sticky top-16 rounded-xl p-6 shadow-sm bg-card border border-border">
              <ul className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;

                  return (
                    <li key={tab.id}>
                      <button
                        onClick={() => setActiveTab(tab.id)}
                        className={tabButtonClass(isActive)}
                        aria-current={isActive ? "page" : undefined}
                        aria-label={`Go to ${tab.label}`}>
                        <Icon className="mr-3 h-5 w-5" />
                        {tab.label}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>

          {/* Tab Navigation (Mobile) */}
          <div className="lg:hidden">
            <ScrollArea className="w-full whitespace-nowrap border-0">
              <div className="flex items-center space-x-2 min-w-max max-w-max">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;

                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={mobileTabClass(isActive)}
                      aria-label={`Switch to ${tab.label}`}>
                      <Icon className="h-4 w-4" />
                      <span className="text-sm leading-tight">
                        {tab.label.split(" ")[0]}
                      </span>
                    </button>
                  );
                })}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </div>

          {/* Content Area */}
          <div className="lg:col-span-3">
            <hr className="md:hidden" />
            <div className="rounded-xl sm:shadow-sm sm:border sm:border-border sm:bg-card transition-all duration-300">
              {TabComponents[activeTab]}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
