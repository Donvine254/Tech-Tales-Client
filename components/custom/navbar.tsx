import { Search, BookOpen, User, Edit } from "lucide-react";
import UserDropdown from "./user-dropdown";
import { Button } from "../ui/button";
import { useState } from "react";

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
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-cyan-600 to-blue-600 p-2 rounded-lg">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
              TechTales
            </h1>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a
              href="#"
              className="text-gray-700 hover:text-cyan-600 transition-colors font-medium">
              Latest
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-cyan-600 transition-colors font-medium">
              Trending
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-cyan-600 transition-colors font-medium">
              Top
            </a>
          </nav>

          {/* Right side - conditional rendering based on login state */}
          <div className="flex items-center space-x-4">
            {/* Search icon - hidden on small screens */}
            <button className="hidden md:block p-2 text-gray-500 hover:text-cyan-600 transition-colors">
              <Search className="h-5 w-5" />
            </button>

            {isLoggedIn ? (
              // Logged in state
              <>
                {/* Create Blog button - hidden on small screens */}
                <Button
                  variant="outline"
                  size="sm"
                  className="hidden md:flex border-cyan-200 text-cyan-700 hover:bg-cyan-50 hover:text-cyan-800">
                  <Edit className="h-4 w-4 mr-2" />
                  Create Blog
                </Button>
                <UserDropdown onLogout={handleLogout} isLoggedIn={true} />
              </>
            ) : (
              // Logged out state
              <>
                {/* Desktop Login Button */}
                <Button
                  variant="outline"
                  size="sm"
                  className="hidden md:flex border-cyan-200 text-cyan-700 hover:bg-cyan-50 hover:text-cyan-800"
                  onClick={handleLogin}>
                  <User className="h-4 w-4 mr-2" />
                  Login
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
