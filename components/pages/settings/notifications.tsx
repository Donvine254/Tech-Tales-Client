import React, { useState } from "react";
import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Preferences } from "@/types";

export default function Notifications({
  preferences,
  userId,
}: {
  preferences: Preferences;
  userId: number;
}) {
  const [settings, setSettings] = useState<Preferences>(preferences);

  const handleToggle = (key: keyof typeof settings) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };
  const notificationOptions = [
    {
      key: "email_notifications" as const,
      title: "Allow Email Notifications",
      description:
        "You'll still receive administrative emails even if this setting is off.",
      enabled: settings.email_notifications,
    },
    {
      key: "newsletter_subscription" as const,
      title: "Subscribe to Newsletters",
      description:
        "We will send you weekly newsletters to keep you in the know.",
      enabled: settings.newsletter_subscription,
    },
    {
      key: "analytics" as const,
      title: "Analytics Report",
      description: "We will send you analytics reports each month.",
      enabled: settings.analytics,
    },
  ];
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log(userId);
    // call api and submit the form
  }
  return (
    <form className="py-4 sm:p-6 lg:p-8 space-y-8 " onSubmit={handleSubmit}>
      <div className="mb-8">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
          Notifications
        </h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
          Manage your email preferences and notification settings
        </p>
      </div>

      <div className="space-y-6">
        {notificationOptions.map((option) => (
          <div
            key={option.key}
            className="bg-card dark:bg-background border p-4 sm:p-6 rounded-lg border-border shadow-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 hover:shadow-md">
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  {option.title}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                  {option.description}
                </p>
              </div>
              <div className="ml-4 sm:ml-6 flex-shrink-0">
                <Switch
                  checked={option.enabled}
                  onCheckedChange={() => handleToggle(option.key)}
                  aria-label={option.title}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex space-x-2 md:space-x-4 justify-between sm:justify-end">
        <Button
          variant="outline"
          type="reset"
          onClick={() => setSettings(preferences)}>
          Cancel
        </Button>
        <Button
          type="submit"
          variant="ghost"
          onClick={handleSubmit}
          className="bg-gradient-to-tr from-blue-500 to-blue-600 hover:shadow-md hover:scale-[1.02] transition-all duration-200 ease-in-out text-white">
          <Save className="w-4 h-4" />
          <span>Save Changes</span>
        </Button>
      </div>
    </form>
  );
}
