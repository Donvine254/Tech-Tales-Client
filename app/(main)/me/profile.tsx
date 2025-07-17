"use client";
import { FC, useState } from "react";
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
  ChevronRight,
  ArrowUpRight,
  FileText,
  BookOpenIcon,
  LogOutIcon,
} from "lucide-react";
import Image from "next/image";
import { useSession } from "@/providers/session";
import { CakeIcon, ChartNoAxesColumn, MailIcon, Settings } from "lucide-react";
import { cn, formatDate, formatViews } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { getUserData } from "@/lib/actions/user";
import { SocialLinks } from "@/components/custom/social-links";
import UserBadges from "@/components/pages/profile/badge";
import { Badge } from "@/components/ui/badge";
import MinimalBlogCard from "@/components/pages/blogs/minimal-blog-card";
import CreateButton from "@/components/pages/profile/create-button";
import SocialMediaDialog from "@/components/pages/profile/social-media-dialog";
import { SocialLink } from "@/types";

type UserAndBlogs = Awaited<ReturnType<typeof getUserData>>;

export default function Profile({
  data,
  isTopAuthor = false,
}: {
  data: UserAndBlogs;
  isTopAuthor?: boolean;
}) {
  const { session } = useSession();
  const { user, blogs } = data;
  const [socials, setSocials] = useState<SocialLink[]>(
    (user.socials ?? []) as unknown as SocialLink[]
  );
  const totalViews = blogs?.reduce((sum, blog) => sum + blog.views, 0);
  const totalLikes = blogs?.reduce((sum, blog) => sum + blog.likes, 0);
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
            href="/me/settings"
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
                  Joined on {formatDate(new Date(user.createdAt))}
                </span>
              </div>
              <div className="hidden md:flex items-center justify-center gap-1 flex-1 p-1 rounded-md text-xs sm:text-sm font-serif text-primary/80 font-medium">
                <MailIcon className="h-4 w-4" />
                <span className="truncate">{session?.email}</span>
              </div>
              <Link
                href="/me/settings"
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
        {/* two grid cards */}
        <div className="-mt-36">
          <MenuList isAdmin={session?.role === "admin"} />
          {/* <StatCards
            totalBlogs={user._count.blogs ?? 0}
            totalComments={user._count.comments}
            totalLikes={totalLikes ?? 0}
            totalViews={totalViews ?? 0}
          /> */}
          {/* two divs */}
          <div className="flex flex-col gap-2 md:flex-row md:justify-between md:items-start md:gap-5  relative">
            {/* first child */}
            <div className="md:w-min lg:w-1/3 space-y-4 md:sticky md:top-20">
              {/* First card */}
              <div className="space-y-4 bg-card shadow border px-6 py-4 rounded-md">
                <div className="mb-2 ">
                  <p className="text-primary/90 font-semibold mb-2 ">Badges</p>
                  <UserBadges
                    role={user.role}
                    createdAt={new Date(user.createdAt)}
                    isTopAuthor={isTopAuthor}
                    blogCount={user._count.blogs ?? 0}
                  />
                </div>
              </div>
              {/* second card */}
              <div className="space-y-4 bg-card shadow border px-6 py-4 rounded-md">
                <div className="mb-2">
                  <p className="text-primary/90 font-semibold mb-2">
                    Skills / Languages
                  </p>
                  {user.skills ? (
                    <div className="flex flex-wrap gap-2">
                      {user?.skills
                        ?.split(",")
                        .map((skill) => skill.trim())
                        .filter((skill) => skill.length > 0)
                        .map((skill, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="text-xs sm:text-sm hover:bg-primary/10">
                            {skill}
                          </Badge>
                        ))}
                    </div>
                  ) : (
                    <p className="text-blue-600">
                      I have not updated my skills yet.
                    </p>
                  )}
                </div>
              </div>
              {/* Third card */}
              {/* <div className="space-y-4 bg-card shadow border px-6 py-4 rounded-md">
                <div className="mb-2 ">
                  <p className="text-primary/90 font-semibold mb-2 ">
                    Contact Information
                  </p>
                  <div className="space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                      <span className="text-muted-foreground text-sm font-medium">
                        Email:
                      </span>
                      <span className="text-foreground text-sm truncate break-all">
                        {session?.email}
                      </span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                      <span className="text-muted-foreground text-sm font-medium">
                        Handle:
                      </span>
                      <span className="text-foreground text-sm break-all">
                        @{user.handle}
                      </span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                      <span className="text-muted-foreground text-sm font-medium">
                        Member since:
                      </span>
                      <span className="text-foreground text-sm">
                        {formatDate(new Date(user.createdAt))}
                      </span>
                    </div>
                  </div>
                </div>
              </div> */}
              <div className="space-y-4 bg-card shadow border px-6 py-4 rounded-md">
                <div className="mb-2 space-y-2">
                  <p className="text-primary/90 font-semibold mb-2 ">
                    User Stats
                  </p>
                  <div className="flex items-center space-x-2 whitespace-nowrap">
                    <BookOpenIcon className="h-4 w-4" />
                    <p className="text-sm">
                      {user._count.blogs} Authored Posts
                    </p>
                  </div>
                  <div className="flex items-center space-x-2 whitespace-nowrap">
                    <ChartNoAxesColumn className="h-4 w-4" />
                    <p className="text-sm">
                      {formatViews(totalViews)} Post Impressions
                    </p>
                  </div>
                  <div className="flex items-center space-x-2 whitespace-nowrap">
                    <Heart className="h-4 w-4" />
                    <p className="text-sm">
                      {formatViews(totalLikes)} Post Reactions
                    </p>
                  </div>
                  <div className="flex items-center space-x-2 whitespace-nowrap">
                    <MessageSquarePlus className="h-4 w-4" />
                    <p className="text-sm">
                      {user._count.comments} Comments written
                    </p>
                  </div>
                </div>
              </div>
              {/* Fourth card */}
              <div className="space-y-6 bg-card shadow border px-6 py-4 rounded-md">
                <div className="mb-4">
                  <div className="text-primary/90 flex items-center gap-2 font-semibold mb-2 ">
                    Connected Accounts{" "}
                    <Badge variant="secondary">{socials.length}</Badge>
                  </div>
                  {socials && socials.length > 0 ? (
                    <SocialLinks socials={socials} variant="card" />
                  ) : (
                    "I have not updated my socials yet"
                  )}
                </div>
                <SocialMediaDialog
                  existingSocials={socials}
                  onSave={(updatedSocials: SocialLink[]) => {
                    setSocials(updatedSocials);
                  }}
                />
              </div>
            </div>
            {/* second child */}
            <div className="lg:w-2/3">
              <div className="flex items-center flex-wrap justify-between gap-x-4 mb-4">
                <h2 className="font-bold text-lg md:text-2xl lg:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500 via-purple-500 dark:from-cyan-400 dark:to-blue-400">
                  Top Blogs
                </h2>
                <Link
                  href="/me/posts"
                  className={buttonVariants({ variant: "link" })}>
                  View All <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="space-y-4">
                {blogs.length > 0 ? (
                  blogs.map((blog) => (
                    <MinimalBlogCard
                      onUpdate={() => null}
                      key={blog.id}
                      blog={blog}
                      onDelete={() => null}
                    />
                  ))
                ) : (
                  <div className="py-16 flex flex-col items-center justify-center space-y-4">
                    {/* scouting lens */}
                    <FileText className="w-12 h-12 md:h-16 md:w-16 mb-4 text-muted-foreground" />
                    <h3 className="text-xl md:text-2xl font-semibold">
                      Nothing to see here
                    </h3>
                    <p className="mb-4 max-w-md text-center">
                      You haven&apos;t published any blogs yet. Create your
                      first blog post to get started!
                    </p>
                    <CreateButton />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export const StatCards: FC<{
  totalBlogs: number;
  totalViews: number;
  totalLikes: number;
  totalComments: number;
}> = ({ totalBlogs, totalViews, totalLikes, totalComments }) => {
  const statsData = [
    {
      label: "Authored Blogs",
      value: totalBlogs,
      icon: BookOpen,
      trend: "+12% this month",
      trendIcon: <TrendingUp className="w-4 h-4 text-green-500 mr-1" />,
      trendColor: "text-green-500",
    },
    {
      label: "Total Views",
      value: formatViews(totalViews),
      icon: ChartNoAxesColumn,
      trend: "+8% this month",
      trendIcon: <TrendingUp className="w-4 h-4 text-green-500 mr-1" />,
      trendColor: "text-green-500",
    },
    {
      label: "Likes on Blogs",
      value: formatViews(totalLikes),
      icon: Heart,
      trend: "+15% this month",
      trendIcon: <TrendingUp className="w-4 h-4 text-green-500 mr-1" />,
      trendColor: "text-green-500",
    },
    {
      label: "Comments Written",
      value: totalComments,
      icon: MessageSquarePlus,
      trend: "-2% this month",
      trendIcon: <TrendingDown className="w-4 h-4 text-red-500 mr-1" />,
      trendColor: "text-red-500",
    },
  ];
  return (
    <div className="grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
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
  const pathname = usePathname();
  const menuItems = [
    { label: "Settings", icon: Edit, link: "/me/settings" },
    ...(isAdmin
      ? [{ label: "Dashboard", icon: Shield, link: "/dashboard" }]
      : []),
    { label: "My Blogs", icon: BookOpen, link: "/me/posts" },
    { label: "Replies", icon: MessageSquarePlus, link: "/me/replies" },
    { label: "Reading List", icon: Heart, link: "/me/bookmarks" },
    { label: "History", icon: HistoryIcon, link: "/me/history" },
    { label: "Sign Out", icon: LogOutIcon, link: "/api/auth/logout" },
  ];

  return (
    <ScrollArea className="w-full whitespace-nowrap border-b border-border pb-2 mb-4 ">
      <div className="flex items-center mx-auto w-max gap-2">
        {menuItems.map((item, index) => {
          const isActive = pathname === item.link;
          const Icon = item.icon;
          return (
            <div key={item.link} className="flex items-center">
              <Link
                href={item.link}
                className={cn(
                  "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium bg-secondary text-primary-foreground shadow-xs hover:bg-primary/90",
                  "hover:bg-muted-foreground/10 hover:text-blue-500 transition-colors",
                  isActive
                    ? "bg-blue-100 text-blue-600 font-semibold"
                    : "text-foreground"
                )}>
                <Icon className={cn("w-4 h-4", isActive && "text-blue-600")} />
                <span>{item.label}</span>
              </Link>
              {index !== menuItems.length - 1 && (
                <ChevronRight className="w-4 h-4 text-muted-foreground mx-1" />
              )}
            </div>
          );
        })}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};
