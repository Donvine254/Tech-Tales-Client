import {
  ChevronDown,
  User,
  Settings,
  LogOut,
  BookOpen,
  TrendingUp,
  Star,
  Edit,
  FileText,
  Search,
  Menu,
} from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface UserDropdownProps {
  onLogout?: () => void;
  onLogin?: () => void;
  isLoggedIn: boolean;
}

const UserDropdown = ({ onLogout, onLogin, isLoggedIn }: UserDropdownProps) => {
  const [searchValue, setSearchValue] = useState("");

  // Mock user data
  const user = {
    name: "Sarah Chen",
    email: "sarah.chen@example.com",
    image:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=100&h=100&fit=crop&auto=format",
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
        {isLoggedIn ? (
          // Logged in state - show avatar and chevron
          <>
            <Avatar className="h-8 w-8">
              <AvatarImage src={user.image} alt={user.name} />
              <AvatarFallback>
                {user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <ChevronDown className="h-4 w-4 text-gray-600" />
          </>
        ) : (
          // Logged out state - show menu icon for mobile
          <Menu className="h-6 w-6 text-gray-600" />
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-72 bg-white border border-gray-200 shadow-lg"
        align="end">
        {isLoggedIn ? (
          // Logged in dropdown content
          <>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{user.name}</p>
                <p className="text-xs leading-none text-muted-foreground">
                  {user.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />

            {/* Search - only visible on small screens */}
            <div className="md:hidden p-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Create Blog - only visible on small screens */}
            <div className="md:hidden">
              <DropdownMenuItem className="cursor-pointer hover:bg-gray-50">
                <Edit className="mr-2 h-4 w-4" />
                <span>Create Blog</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
            </div>

            <DropdownMenuItem className="cursor-pointer hover:bg-gray-50">
              <Star className="mr-2 h-4 w-4" />
              <span>Featured Stories</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer hover:bg-gray-50">
              <TrendingUp className="mr-2 h-4 w-4" />
              <span>Trending</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer hover:bg-gray-50">
              <BookOpen className="mr-2 h-4 w-4" />
              <span>Latest</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer hover:bg-gray-50">
              <FileText className="mr-2 h-4 w-4" />
              <span>My Blogs</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer hover:bg-gray-50">
              <User className="mr-2 h-4 w-4" />
              <span>My Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer hover:bg-gray-50">
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer hover:bg-gray-50 text-red-600"
              onClick={onLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Sign Out</span>
            </DropdownMenuItem>
          </>
        ) : (
          // Logged out dropdown content (mobile menu)
          <>
            {/* Search - mobile only */}
            <div className="p-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                />
              </div>
            </div>
            <DropdownMenuSeparator />

            {/* Navigation items for mobile */}
            <DropdownMenuItem className="cursor-pointer hover:bg-gray-50">
              <Star className="mr-2 h-4 w-4" />
              <span>Featured Stories</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer hover:bg-gray-50">
              <TrendingUp className="mr-2 h-4 w-4" />
              <span>Trending</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer hover:bg-gray-50">
              <BookOpen className="mr-2 h-4 w-4" />
              <span>Latest</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />

            {/* Sign in button */}
            <DropdownMenuItem
              className="cursor-pointer hover:bg-cyan-50 text-cyan-700 font-medium"
              onClick={onLogin}>
              <User className="mr-2 h-4 w-4" />
              <span>Sign In</span>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;
