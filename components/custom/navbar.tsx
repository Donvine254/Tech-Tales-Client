"use client";
import { Search, BookOpen, CircleUserRound, Edit } from "lucide-react";
import UserDropdown from "./user-dropdown";
import { Button } from "../ui/button";
import { useState } from "react";
import Link from "next/link";

const Navbar = () => {
  // Mock login state - you can replace this with actual authentication logic
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Set to false to see logged-out state

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

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
              className="text-gray-700 dark:text-accent-foreground hover:text-blue-600 transition-colors font-medium">
              Latest
            </Link>
            <Link
              href="/trending"
              className="text-gray-700 dark:text-accent-foreground  hover:text-blue-600 transition-colors font-medium">
              Trending
            </Link>
            <Link
              href="/top"
              className="text-gray-700 dark:text-accent-foreground  hover:text-blue-600 transition-colors font-medium">
              Top
            </Link>
          </nav>

          {/* Right side - conditional rendering based on login state */}
          <div className="flex items-center space-x-4">
            {/* Search icon - hidden on small screens */}
            <Link href="/search" passHref>
              <Button
                variant="outline"
                className="hidden md:block p-2 text-gray-500 dark:text-accent-foreground hover:text-blue-600 cursor-pointer transition-colors"
                title="search articles">
                <Search className="h-5 w-5" />
              </Button>
            </Link>

            {isLoggedIn ? (
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
                <UserDropdown onLogout={handleLogout} isLoggedIn={true} />
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
                  <UserDropdown onLogin={handleLogin} isLoggedIn={false} />
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
