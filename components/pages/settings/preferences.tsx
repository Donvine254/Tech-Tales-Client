"use client";

import React, { useEffect, useState } from "react";
import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { ThemeToggle } from "@/components/custom/theme-toggle";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { getCookie, setCookie } from "@/lib/cookie";
import { toast } from "sonner";

export default function PreferenceSettings() {
  const [settings, setSettings] = useState({
    cookies: true,
    language: "en",
    timezone: "UTC-5",
  });

  useEffect(() => {
    const storedLanguage = getCookie("language");
    const storedTimezone = getCookie("timezone");

    setSettings((prev) => ({
      ...prev,
      language: storedLanguage || prev.language,
      timezone: storedTimezone || prev.timezone,
    }));
  }, []);
  const handleToggle = (key: keyof typeof settings) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSelectChange = (key: keyof typeof settings, value: string) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const languages = [
    { value: "en", label: "English" },
    { value: "es", label: "Español" },
    { value: "fr", label: "Français" },
    { value: "de", label: "Deutsch" },
    { value: "it", label: "Italiano" },
    { value: "pt", label: "Português" },
  ];

  const timezones = [
    { value: "UTC-12", label: "(UTC-12:00) International Date Line West" },
    { value: "UTC-8", label: "(UTC-08:00) Pacific Time (US & Canada)" },
    { value: "UTC-5", label: "(UTC-05:00) Eastern Time (US & Canada)" },
    { value: "UTC+0", label: "(UTC+00:00) Greenwich Mean Time" },
    { value: "UTC+1", label: "(UTC+01:00) Central European Time" },
    { value: "UTC+8", label: "(UTC+08:00) China Standard Time" },
    { value: "UTC+9", label: "(UTC+09:00) Japan Standard Time" },
  ];

  const handleSubmit = () => {
    setCookie("language", settings.language, 365);
    setCookie("timezone", settings.timezone, 365);
    toast.success("changes saved successfully");
  };

  return (
    <div className="py-4 sm:p-6 lg:p-8 space-y-6">
      <div className="mb-8">
        <h2 className="text-xl md:text-2xl  font-bold text-gray-900 dark:text-white">
          Preferences
        </h2>
        <p className="mt-2 text-xs md:text-sm text-gray-600 dark:text-gray-300">
          Customize your experience and application settings
        </p>
      </div>

      <div className="space-y-6">
        {/* Cookies Setting */}
        <div className="bg-card dark:bg-background border p-4 sm:p-6 rounded-lg border-border shadow-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 hover:shadow-md">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Enable Cookies
              </h3>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                We use cookies to provide you with the best experience.
              </p>
            </div>
            <Switch
              checked={settings.cookies}
              disabled
              aria-disabled
              onCheckedChange={() => handleToggle("cookies")}
            />
          </div>
        </div>

        {/* Theme Toggle */}
        <div className="bg-card dark:bg-background border p-4 sm:p-6 rounded-lg border-border shadow-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 hover:shadow-md">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Theme
              </h3>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                Choose between light and dark mode
              </p>
            </div>
            <ThemeToggle />
          </div>
        </div>

        {/* Language Selector */}
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-200">
            Language
          </label>
          <Select
            value={settings.language}
            onValueChange={(value) => handleSelectChange("language", value)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a language" />
            </SelectTrigger>
            <SelectContent>
              {languages.map((lang) => (
                <SelectItem key={lang.value} value={lang.value}>
                  {lang.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Timezone Selector */}
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-200">
            Timezone
          </label>
          <Select
            value={settings.timezone}
            onValueChange={(value) => handleSelectChange("timezone", value)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a timezone" />
            </SelectTrigger>
            <SelectContent>
              {timezones.map((tz) => (
                <SelectItem key={tz.value} value={tz.value}>
                  {tz.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex space-x-2 md:space-x-4 justify-between sm:justify-end">
        <Button
          variant="outline"
          type="reset"
          onClick={() =>
            setSettings({
              cookies: true,
              language: "en",
              timezone: "UTC-5",
            })
          }>
          Cancel
        </Button>
        <Button
          type="submit"
          variant="ghost"
          onClick={handleSubmit}
          className="bg-gradient-to-tr from-blue-500 to-blue-600 hover:shadow-md hover:scale-[1.02] transition-all duration-200 ease-in-out text-white hover:text-whit">
          <Save className="w-4 h-4" />
          <span>Save Changes</span>
        </Button>
      </div>
    </div>
  );
}
