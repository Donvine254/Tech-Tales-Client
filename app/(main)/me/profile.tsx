"use client";
import { FC } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  BookOpen,
  Heart,
  TrendingUp,
  TrendingDown,
  MessageSquarePlus,
  Shield,
  Edit,
  HistoryIcon,
} from "lucide-react";
import Image from "next/image";
import { useSession } from "@/providers/session";
import { CakeIcon, ChartNoAxesColumn, MailIcon, Settings } from "lucide-react";
import { cn, formatDate, formatViews } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
const user = {
  branding: "#0366F3",
  bio: "Hey, I have not updated my bio yet. Let's chat in the comments",
  handle: "thedon",
  totalLikes: 1200,
  totalViews: 15000,
  totalBlogs: 18,
  totalComments: 26,
};

export default function Profile() {
  const { session } = useSession();
  return (
    <section>
      {/* branding */}
      <div
        className="w-full  lg:min-h-[180px] min-h-[150px] p-6"
        style={{
          backgroundColor: user.branding ?? "#0366F3",
        }}></div>
      <div className="w-full min-h-[400px] mx-auto px-4 sm:px-6 lg:px-8 py-16 max-w-7xl">
        {/* user card */}
        <div className="px-6 py-4 w-full relative -top-40 rounded-md bg-card shadow border">
          <Link
            href="/settings"
            className="hidden md:inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all cursor-pointer md:absolute md:right-2 h-10 px-4 py-2 has-[>svg]:px-3 bg-blue-600 text-white top-2 hover:bg-blue-500">
            <Settings className="h-4 w-4" />
            Edit Profile
          </Link>
          <Image
            src={
              session?.picture
                ? session?.picture
                : "https://ui-avatars.com/api/?background=random&name=john+doe"
            }
            title={session?.username}
            height={120}
            width={120}
            alt={session?.username ?? ""}
            style={{ border: `0.5rem solid ${user.branding}` }}
            priority
            className="w-[120px] h-[120px] relative -top-20 rounded-full m-auto  italic "
            referrerPolicy="no-referrer"
          />
          <div className="-mt-20">
            {/* username */}
            <p className="text-muted-foreground font-semibold  flex items-center justify-center text-lg md:text-2xl leading-snug ">
              <span className="capitalize font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500 via-purple-500 dark:from-cyan-400 dark:to-blue-400">
                {session?.username}
              </span>
              <>
                {session?.role === "admin" ? (
                  <Image
                    src="https://res.cloudinary.com/dipkbpinx/image/upload/v1723863889/badges/on4c9g21udqs4oqrucdo.png"
                    width={18}
                    height={18}
                    className="h-auto w-auto max-w-[18px] "
                    alt="verification-badge"
                  />
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="#1D9BF0"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mb-1 ">
                    <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
                    <path d="m9 12 2 2 4-4" stroke="#ffffff" />
                  </svg>
                )}
              </>
            </p>
            {/* email /handle */}
            <p className="text-semibold hidden md:block text-center mx-auto text-lg">
              @{user.handle}
            </p>
            <div className="flex md:hidden items-center justify-center gap-1 flex-1 p-1 rounded-md text-xs sm:text-sm font-serif text-primary/80 font-medium">
              <MailIcon className="h-3 w-3" />
              <span className="truncate">{session?.email}</span>
            </div>
            {/* bio */}
            <p className="text-xs font-serif sm:text-sm text-center max-w-md mx-auto my-2">
              {user?.bio === "This user has no bio"
                ? "Hey, I have not updated my bio yet. Let's chat in the comments."
                : user.bio}
            </p>
            <div className="flex items-center justify-between flex-wrap w-fit gap-x-4 mx-auto">
              <div className="flex items-center justify-center gap-1 flex-1 p-1 rounded-md text-xs sm:text-sm font-serif text-primary/80 font-medium overflow-hidden">
                <CakeIcon className="h-4 w-4" />
                <span className="whitespace-nowrap truncate ">
                  {/* replace this with user created at */}
                  Joined on {formatDate(new Date())}
                </span>
              </div>
              <div className="hidden md:flex items-center justify-center gap-1 flex-1 p-1 rounded-md text-xs sm:text-sm font-serif text-primary/80 font-medium">
                <MailIcon className="h-4 w-4" />
                <span className="truncate">{session?.email}</span>
              </div>
              <Link
                href="/settings"
                title="edit profile"
                className={cn(
                  buttonVariants({ variant: "link" }),
                  "text-primary/80 md:hidden"
                )}>
                <Settings className="h-4 w-4" />{" "}
                <span className="hidden sm:block">Edit Profile</span>
              </Link>
            </div>
          </div>
        </div>
        {/* Stat cards */}
        <StatCards />
        {/* two grid cards */}
        <div className="flex flex-col gap-2 md:flex-row md:justify-between md:items-start md:gap-5 relative">
          {/* first child, navmenu */}
          <div className="md:w-min space-y-4 md:sticky md:top-20">
            <MenuList isAdmin={session?.role === "admin"} />
          </div>
        </div>
      </div>
    </section>
  );
}

const statsData = [
  {
    label: "Authored Blogs",
    value: user.totalBlogs,
    icon: BookOpen,
    trend: "+12% this month",
    trendIcon: <TrendingUp className="w-4 h-4 text-green-500 mr-1" />,
    trendColor: "text-green-500",
  },
  {
    label: "Total Views",
    value: formatViews(user.totalViews),
    icon: ChartNoAxesColumn,
    trend: "+8% this month",
    trendIcon: <TrendingUp className="w-4 h-4 text-green-500 mr-1" />,
    trendColor: "text-green-500",
  },
  {
    label: "Likes on Blogs",
    value: formatViews(user.totalLikes),
    icon: Heart,
    trend: "+15% this month",
    trendIcon: <TrendingUp className="w-4 h-4 text-green-500 mr-1" />,
    trendColor: "text-green-500",
  },
  {
    label: "Comments Written",
    value: user.totalComments,
    icon: MessageSquarePlus,
    trend: "-2% this month",
    trendIcon: <TrendingDown className="w-4 h-4 text-red-500 mr-1" />,
    trendColor: "text-red-500",
  },
];

const StatCards: FC = () => {
  return (
    <div className="grid grid-cols-1 -mt-36 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {statsData.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card key={index} className="relative overflow-hidden">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-foreground mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
                <div className="p-2 sm:p-3 bg-blue-50 rounded-full">
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500" />
                </div>
              </div>
              <div className="flex items-center mt-3 text-xs">
                {stat.trendIcon}
                <span className={stat.trendColor}>{stat.trend}</span>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

// menu list

const MenuList: FC<{ isAdmin: boolean }> = ({ isAdmin }) => {
  const menuItems = [
    { label: "Settings", icon: Edit, link: "/me/settings" },
    ...(isAdmin
      ? [{ label: "Dashboard", icon: Shield, link: "/dashboard" }]
      : []),
    { label: "My Blogs", icon: BookOpen, link: "/me/posts" },
    { label: "Replies", icon: MessageSquarePlus, link: "/me/replies" },
    { label: "Reading List", icon: Heart, link: "/me/bookmarks" },
    { label: "History", icon: HistoryIcon, link: "/me/history" },
  ];

  return (
    <Card>
      <CardContent className="space-y-2">
        <h3 className="text-lg font-semibold">Quick Menu</h3>
        {menuItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <Link
              key={item.label}
              href={item.link}
              className={cn(
                buttonVariants({ variant: "ghost", size: "sm" }),
                "w-full justify-start"
              )}>
              <IconComponent className="w-4 h-4 mr-2" />
              {item.label}
            </Link>
          );
        })}
      </CardContent>
    </Card>
  );
};
