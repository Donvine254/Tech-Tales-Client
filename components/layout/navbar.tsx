"use client";
import { BookOpen, CircleUserRound, Edit } from "lucide-react";
import UserDropdown from "../custom/user-dropdown";
import { Button } from "../ui/button";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { deleteSession } from "@/lib/actions/session";
import { toast } from "sonner";
import { useSession } from "@/providers/session";
import { setCookie } from "@/lib/cookie";
import SearchBar from "../custom/search";
import { useState } from "react";
import { createNewBlog } from "@/lib/actions/blogs";

const Navbar = () => {
  const { session, setSession } = useSession();
  // state for loading when creating blog
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  async function handleLogout() {
    const id = toast("Are you sure you want to sign out?", {
      position: "top-center",
      duration: 10000,
      action: {
        label: "Sign out",
        onClick: async () => {
          toast.dismiss(id);
          const loadingId = toast.loading("Processing logout request...");
          try {
            await deleteSession();
            setSession(null);
            toast.success("Logged out successfully");
          } catch (error) {
            console.log(error);
            toast.error("Failed to log out");
          } finally {
            toast.dismiss(loadingId);
          }
        },
      },
      cancel: {
        label: "Cancel",
        onClick: () => toast.dismiss(id),
      },
    });
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
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <Link href="/">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent focus:outline-none">
                Tech Tales
              </h1>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/latest"
              className={cn(
                "text-gray-700 dark:text-accent-foreground  hover:text-blue-600 transition-colors font-medium",
                pathname.startsWith("/latest") &&
                  "text-blue-600 dark:text-blue-500 underline underline-offset-4 font-bold"
              )}>
              Latest
            </Link>
            <Link
              href="/trending"
              className={cn(
                "text-gray-700 dark:text-accent-foreground  hover:text-blue-600 transition-colors font-medium",
                pathname.startsWith("/trending") &&
                  "text-blue-600 dark:text-blue-500 underline underline-offset-4 font-bold"
              )}>
              Trending
            </Link>
            <Link
              href="/featured"
              className={cn(
                "text-gray-700 dark:text-accent-foreground  hover:text-blue-600 transition-colors font-medium",
                pathname.startsWith("/featured") &&
                  "text-blue-600 dark:text-blue-500 underline underline-offset-4 font-bold"
              )}>
              Featured
            </Link>
          </nav>

          {/* Right side - conditional rendering based on login state */}
          <div className="flex items-center space-x-4">
            {/* Search icon - hidden on small screens */}
            <SearchBar className="hidden md:block" />
            {session ? (
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
