"use client";
import { BookOpen, CircleUserRound, Edit, XIcon } from "lucide-react";
import UserDropdown from "../custom/user-dropdown";
import { Button } from "../ui/button";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useSession } from "@/providers/session";
import { setCookie } from "@/lib/cookie";
import SearchBar from "../custom/search";
import { useState } from "react";
import { createNewBlog } from "@/lib/actions/blogs";
import { clearUserFavorites } from "@/lib/helpers";

const Navbar = () => {
  const { session, loading } = useSession();
  // state for loading when creating blog
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const isActive = (path: string) => {
    return pathname.includes(path);
  };
  function handleLogout() {
    toast.custom(
      (t) => (
        <div className="bg-card  border border-border rounded-lg p-4 shadow flex flex-col gap-4 max-w-sm relative">
          <button
            onClick={() => toast.dismiss(t)}
            className="absolute text-sm -top-2 -left-2 text-muted-foreground hover:text-destructive bg-inherit border border-border rounded-full p-1 shadow"
            aria-label="Close">
            <XIcon className="size-4" />
          </button>
          <p className="text-sm text-muted-foreground">
            Are you sure you want to sign out? Any unsaved changes might be
            lost.
          </p>
          <div className="flex justify-end gap-2">
            <Button variant="ghost" size="sm" onClick={() => toast.dismiss(t)}>
              Cancel
            </Button>
            <Link
              href="/api/auth/logout"
              passHref
              onNavigate={() => {
                clearUserFavorites();
              }}>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => toast.dismiss(t)}>
                Sign out
              </Button>
            </Link>
          </div>
        </div>
      ),
      {
        position: "top-center",
        duration: 10000,
      }
    );
  }
  // trim the pathname
  function handleLogin() {
    setCookie("post_login_redirect", pathname, 1);
    router.push("/login");
  }

  async function createBlog() {
    setIsLoading(true);
    const toastId = toast.loading("processing request");
    const res = await createNewBlog();
    if (res.success && res.data) {
      router.replace(`/posts/new/${res.data.uuid}`);
    } else {
      toast.error(res.message);
    }
    setIsLoading(false);
    toast.dismiss(toastId);
  }

  return (
    <header className="sticky top-0 z-50 bg-white/90 dark:bg-accent/80 backdrop-blur-md border-b border-gray-200/50 dark:border-gray-700/50 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-1">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-1 rounded-sm">
              <BookOpen className="h-4 w-4 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500 via-purple-500 dark:from-cyan-400 dark:to-blue-400 focus:outline-none">
              Techtales.
            </h1>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/latest"
              className={cn(
                "text-gray-700 dark:text-accent-foreground  hover:text-blue-600 transition-colors font-medium",
                isActive("/latest") &&
                  "text-blue-600 dark:text-blue-500 underline underline-offset-4 font-bold"
              )}>
              Latest
            </Link>
            <Link
              href="/trending"
              className={cn(
                "text-gray-700 dark:text-accent-foreground  hover:text-blue-600 transition-colors font-medium",
                isActive("/trending") &&
                  "text-blue-600 dark:text-blue-500 underline underline-offset-4 font-bold"
              )}>
              Trending
            </Link>
            <Link
              href="/featured"
              className={cn(
                "text-gray-700 dark:text-accent-foreground  hover:text-blue-600 transition-colors font-medium",
                isActive("/featured") &&
                  "text-blue-600 dark:text-blue-500 underline underline-offset-4 font-bold"
              )}>
              Featured
            </Link>
          </nav>

          {/* Right side - conditional rendering based on login state */}
          <div className="flex items-center space-x-4">
            {/* Search icon - hidden on small screens */}
            <SearchBar className="hidden md:block" />
            {!loading && session ? (
              // Logged in state
              <>
                {/* Create Blog button - hidden on small screens */}
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={createBlog}
                  className="hidden md:flex bg-gradient-to-r from-cyan-600 to-blue-600 text-white cursor-pointer "
                  disabled={isLoading}>
                  <Edit className="h-4 w-4 mr-2" />
                  Create Blog
                </Button>
                <UserDropdown
                  onLogout={handleLogout}
                  session={session}
                  createBlog={createBlog}
                  loading={isLoading}
                  pathname={pathname}
                />
              </>
            ) : (
              // Logged out state
              <>
                {/* Desktop Login Button */}
                <Button
                  variant="secondary"
                  size="sm"
                  className="hidden md:flex gap-1 items-center bg-gradient-to-r from-cyan-600 to-blue-600 text-white"
                  onClick={handleLogin}>
                  <CircleUserRound className="h-4 w-4 " />
                  Login/Register
                </Button>

                {/* Mobile Menu Button */}
                <div className="md:hidden">
                  <UserDropdown
                    onLogin={handleLogin}
                    session={session}
                    createBlog={createBlog}
                    loading={isLoading}
                    pathname={pathname}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
