"use client";
import { Search, BookOpen, CircleUserRound, Edit } from "lucide-react";
import UserDropdown from "../custom/user-dropdown";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { deleteSession, getSession } from "@/lib/actions/session";
import { Session } from "@/types";
import { toast } from "sonner";

const Navbar = () => {
  const [session, setSession] = useState<Session | null>(null);
  const router = useRouter();
  const pathname = usePathname()
  useEffect(() => {
    (async () => {
      const session = await getSession() as Session;
      setSession(session);

    })();
  }, []);
  async function handleLogout() {
    const id = toast.loading("Processing logout request...")
    await deleteSession()
    toast.dismiss(id)
    setSession(null)
    toast.success("Logged out successfully")
  }
  // trim the pathname
  async function handleLogin() {
    router.push(`/login?post_login_redirect_url=${pathname}`)
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
              <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
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
            <Link href="/search" passHref>
              <Button
                variant="outline"
                className="hidden p-2 text-gray-500 dark:text-accent-foreground hover:text-blue-600 cursor-pointer transition-colors md:flex items-center gap-1"
                title="search articles">
                <Search className="h-5 w-5" />
                <span>Ctrl+K</span>
              </Button>
            </Link>

            {session ? (
              // Logged in state
              <>
                {/* Create Blog button - hidden on small screens */}
                <Link href="/create" passHref>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="hidden md:flex bg-gradient-to-r from-cyan-600 to-blue-600 text-white cursor-pointer ">
                    <Edit className="h-4 w-4 mr-2" />
                    Create Blog
                  </Button>
                </Link>
                <UserDropdown onLogout={handleLogout} session={session} />
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
                  <UserDropdown onLogin={handleLogin} session={session} />
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
