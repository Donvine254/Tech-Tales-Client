import {
  ChevronDown,
  Settings,
  LogOut,
  BookOpen,
  Menu,
  CircleUserRound,
  FeatherIcon,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Link from "next/link";
import { Session } from "@/types";
import SearchBar from "./search";
import { cn } from "@/lib/utils";
import { FeaturedIcon, LatestIcon, TrendingIcon } from "@/assets/icons";

interface UserDropdownProps {
  onLogout?: () => void;
  onLogin?: () => void;
  session: Session | null;
  createBlog: () => void;
  loading: boolean;
  pathname: string;
}

const UserDropdown = ({
  onLogout,
  onLogin,
  session,
  createBlog,
  loading,
  pathname,
}: UserDropdownProps) => {
  const isActive = (path: string, exact: boolean = false) => {
    if (exact) {
      return pathname === path;
    }
    return pathname.startsWith(path);
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center space-x-2 hover:opacity-80 transition-opacity outline-0">
        {session ? (
          // Logged in state - show avatar and chevron
          <>
            <Avatar className="h-8 w-8 ring-2 ring-cyan-500 ring-offset-2 cursor-pointer">
              <AvatarImage src={session.picture} alt={session.username} />
              <AvatarFallback className="capitalize">
                {session.username
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <ChevronDown className="h-4 w-4 cursor-pointer text-gray-600 dark:text-white" />
          </>
        ) : (
          // Logged out state - show menu icon for mobile
          <Menu className="h-6 w-6 text-gray-600 dark:text-white" />
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-72 bg-white dark:bg-accent border border-gray-200 shadow-lg"
        align="end">
        {session ? (
          // Logged in dropdown content
          <>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none capitalize">
                  {session.username}
                </p>
                <p className="text-xs leading-none text-muted-foreground">
                  {session.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {/* Search - only visible on small screens */}
            <SearchBar className="md:hidden p-2" />
            {/* Create Blog - only visible on small screens */}
            <div className="md:hidden ">
              <DropdownMenuItem
                className="cursor-pointer hover:text-blue-500 dark:hover:bg-blue-500 dark:hover:text-white group"
                onClick={createBlog}
                disabled={loading}>
                <FeatherIcon className="mr-2 h-4 w-4 text-blue-500 group-hover:text-white" />
                Create Blog
              </DropdownMenuItem>
            </div>
            <div className="flex flex-col gap-1">
              <Link href="/featured" passHref>
                <DropdownMenuItem
                  className={cn(
                    "cursor-pointer hover:text-blue-500 dark:hover:bg-blue-500 dark:hover:text-white group",
                    isActive("/featured", true) &&
                      "bg-blue-500 dark:hover:text-white text-white"
                  )}>
                  <FeaturedIcon
                    className={cn(
                      "mr-2 h-4 w-4 ",
                      isActive("/featured", true)
                        ? "fill-white text-white"
                        : "fill-cyan-500"
                    )}
                  />
                  <span>Featured Stories</span>
                </DropdownMenuItem>
              </Link>
              <Link href="/trending" passHref>
                <DropdownMenuItem
                  className={cn(
                    "cursor-pointer hover:text-blue-500 dark:hover:bg-blue-500 dark:hover:text-white group",
                    isActive("/trending", true) &&
                      "bg-blue-500 dark:hover:text-white text-white"
                  )}>
                  <TrendingIcon className="mr-2 h-4 w-4 fill-amber-500" />
                  <span>Trending Stories</span>
                </DropdownMenuItem>
              </Link>
              <Link href="/latest" passHref>
                <DropdownMenuItem
                  className={cn(
                    "cursor-pointer hover:text-blue-500 dark:hover:bg-blue-500 dark:hover:text-white group",
                    isActive("/latest", true) &&
                      "bg-blue-500 dark:hover:text-white text-white"
                  )}>
                  <LatestIcon className="h-4 w-4 fill-orange-500 mr-2" />
                  <span>Latest Stories</span>
                </DropdownMenuItem>
              </Link>
              <Link href="/me/posts" passHref>
                <DropdownMenuItem
                  className={cn(
                    "cursor-pointer hover:text-blue-500 dark:hover:bg-blue-500 dark:hover:text-white group",
                    isActive("/me/posts") &&
                      "bg-blue-500 dark:hover:text-white text-white"
                  )}>
                  <BookOpen
                    className={cn(
                      "mr-2 h-4 w-4 text-blue-500 dark:group-hover:text-white",
                      isActive("/me/posts") && "text-white"
                    )}
                  />
                  <span>My Blogs</span>
                </DropdownMenuItem>
              </Link>
              <Link href="/me" passHref>
                <DropdownMenuItem
                  className={cn(
                    "cursor-pointer hover:text-blue-500 dark:hover:bg-blue-500 dark:hover:text-white group",
                    isActive("/me", true) &&
                      "bg-blue-500 dark:hover:text-white text-white"
                  )}>
                  <svg
                    fill="none"
                    viewBox="0 0 24 24"
                    height="16"
                    width="16"
                    className={cn(
                      "mr-2 h-4 w-4 fill-blue-500 dark:group-hover:fill-white",
                      isActive("/me", true) &&
                        "fill-white group-hover:fill-primary"
                    )}>
                    <path
                      className=""
                      d="M15 4h6v6h-6V4zM3 12a9 9 0 1018 0h-4a5 5 0 01-10 0H3zM6 10a3 3 0 100-6 3 3 0 000 6z"
                    />
                  </svg>
                  <span>My Profile</span>
                </DropdownMenuItem>
              </Link>
              <Link href="/me/settings" passHref>
                <DropdownMenuItem
                  className={cn(
                    "cursor-pointer hover:text-blue-500 dark:hover:bg-blue-500 dark:hover:text-white group",
                    isActive("/me/settings") &&
                      "bg-blue-500 dark:hover:text-white text-white"
                  )}>
                  <Settings
                    className={cn(
                      "mr-2 h-4 w-4 dark:group-hover:text-white",
                      isActive("/me/settings") &&
                        "text-white group-hover:text-primary"
                    )}
                  />
                  <span>Settings</span>
                </DropdownMenuItem>
              </Link>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer text-red-500 hover:bg-destructive/90 focus:bg-destructive/90 hover:text-white group"
              onClick={onLogout}>
              <LogOut className="mr-2 h-4 w-4 text-red-500 group-hover:text-white" />
              <span className="group-hover:text-white">Sign Out</span>
            </DropdownMenuItem>
          </>
        ) : (
          // Logged out dropdown content (mobile menu)
          <>
            {/* Search - mobile only */}
            <SearchBar className="md:hidden p-2" />
            <DropdownMenuSeparator />

            <div className="flex flex-col gap-1">
              {/* Navigation items for mobile */}
              <Link href="/featured" passHref>
                <DropdownMenuItem
                  className={cn(
                    "cursor-pointer hover:text-blue-500 dark:hover:bg-blue-500 dark:hover:text-white group",
                    isActive("/featured") &&
                      "bg-blue-500 dark:hover:text-white text-white"
                  )}>
                  <FeaturedIcon
                    className={cn(
                      "mr-2 h-4 w-4 ",
                      isActive("/featured")
                        ? "fill-white text-white"
                        : "fill-cyan-500"
                    )}
                  />
                  <span>Featured Stories</span>
                </DropdownMenuItem>
              </Link>
              <Link href="/trending" passHref>
                <DropdownMenuItem
                  className={cn(
                    "cursor-pointer hover:text-blue-500 dark:hover:bg-blue-500 dark:hover:text-white group",
                    isActive("/trending") &&
                      "bg-blue-500 dark:hover:text-white text-white"
                  )}>
                  <TrendingIcon className="mr-2 h-4 w-4 fill-amber-500" />
                  <span>Trending Stories</span>
                </DropdownMenuItem>
              </Link>
              <Link href="/latest" passHref>
                <DropdownMenuItem
                  className={cn(
                    "cursor-pointer hover:text-blue-500 dark:hover:bg-blue-500 dark:hover:text-white group",
                    isActive("/latest") &&
                      "bg-blue-500 dark:hover:text-white text-white"
                  )}>
                  <LatestIcon className="h-4 w-4 fill-orange-500 mr-2" />
                  <span>Latest Stories</span>
                </DropdownMenuItem>
              </Link>
            </div>
            <DropdownMenuSeparator />

            {/* Sign in button */}
            {/* Add link to login page */}
            <DropdownMenuItem
              className="cursor-pointer  font-medium text-center flex items-center justify-center gap-1 w-full my-2 border border-blue-200 dark:border-none rounded-lg bg-gradient-to-r from-cyan-600 via-purple-600 to-blue-600 text-white  hover:from-blue-600 hover:to-cyan-600"
              onClick={onLogin}>
              <CircleUserRound className="h-4 w-4 text-blue-500 dark:text-white " />
              <span>Login/Register</span>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;
