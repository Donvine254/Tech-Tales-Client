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

interface UserDropdownProps {
  onLogout?: () => void;
  onLogin?: () => void;
  session: Session | null;
  createBlog: () => void;
  loading: boolean;
}

const UserDropdown = ({
  onLogout,
  onLogin,
  session,
  createBlog,
  loading,
}: UserDropdownProps) => {
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
            <div className="md:hidden">
              <DropdownMenuItem
                className="cursor-pointer hover:text-blue-500 dark:hover:bg-blue-500 dark:hover:text-white group"
                onClick={createBlog}
                disabled={loading}>
                <FeatherIcon className="mr-2 h-4 w-4 text-blue-500 group-hover:text-white" />
                Create Blog
              </DropdownMenuItem>
            </div>
            <Link href="/featured" passHref>
              <DropdownMenuItem className="cursor-pointer hover:text-blue-500 dark:hover:bg-blue-500 dark:hover:text-white group">
                <svg
                  viewBox="0 0 384 512"
                  fill="currentColor"
                  height="16"
                  width="16"
                  className="mr-2 h-4 w-4 fill-cyan-500">
                  <path d="M173.8 5.5c11-7.3 25.4-7.3 36.4 0L228 17.2c6 3.9 13 5.8 20.1 5.4l21.3-1.3c13.2-.8 25.6 6.4 31.5 18.2l9.6 19.1c3.2 6.4 8.4 11.5 14.7 14.7l19.3 9.7c11.8 5.9 19 18.3 18.2 31.5l-1.3 21.3c-.4 7.1 1.5 14.2 5.4 20.1l11.8 17.8c7.3 11 7.3 25.4 0 36.4L366.8 228c-3.9 6-5.8 13-5.4 20.1l1.3 21.3c.8 13.2-6.4 25.6-18.2 31.5l-19.1 9.6c-6.4 3.2-11.5 8.4-14.7 14.7l-9.7 19.3c-5.9 11.8-18.3 19-31.5 18.2l-21.3-1.3c-7.1-.4-14.2 1.5-20.1 5.4l-17.8 11.8c-11 7.3-25.4 7.3-36.4 0L156 366.8c-6-3.9-13-5.8-20.1-5.4l-21.3 1.3c-13.2.8-25.6-6.4-31.5-18.2l-9.6-19.1c-3.2-6.4-8.4-11.5-14.7-14.7L39.5 301c-11.8-5.9-19-18.3-18.2-31.5l1.3-21.3c.4-7.1-1.5-14.2-5.4-20.1L5.5 210.2c-7.3-11-7.3-25.4 0-36.4L17.2 156c3.9-6 5.8-13 5.4-20.1l-1.3-21.3c-.8-13.2 6.4-25.6 18.2-31.5l19.1-9.6C65 70.2 70.2 65 73.4 58.6L83 39.5c5.9-11.8 18.3-19 31.5-18.2l21.3 1.3c7.1.4 14.2-1.5 20.1-5.4l17.9-11.7zM272 192c0-44.2-35.8-80-80-80s-80 35.8-80 80 35.8 80 80 80 80-35.8 80-80zM1.3 441.8l43.1-102.5c.2.1.3.2.4.4l9.6 19.1c11.7 23.2 36 37.3 62 35.8l21.3-1.3c.2 0 .5 0 .7.2l17.8 11.8c5.1 3.3 10.5 5.9 16.1 7.7l-37.6 89.3c-2.3 5.5-7.4 9.2-13.3 9.7s-11.6-2.2-14.8-7.2l-32.2-49.3-56.1 8.3c-5.7.8-11.4-1.5-15-6s-4.3-10.7-2.1-16zm248 60.4L211.7 413c5.6-1.8 11-4.3 16.1-7.7l17.8-11.8c.2-.1.4-.2.7-.2l21.3 1.3c26 1.5 50.3-12.6 62-35.8l9.6-19.1c.1-.2.2-.3.4-.4l43.2 102.5c2.2 5.3 1.4 11.4-2.1 16s-9.3 6.9-15 6l-56.1-8.3-32.2 49.2c-3.2 5-8.9 7.7-14.8 7.2s-11-4.3-13.3-9.7z" />
                </svg>
                <span>Featured Stories</span>
              </DropdownMenuItem>
            </Link>
            <Link href="/trending" passHref>
              <DropdownMenuItem className="cursor-pointer hover:text-blue-500 dark:hover:bg-blue-500 dark:hover:text-white group">
                <svg
                  viewBox="0 0 448 512"
                  fill="currentColor"
                  height="1rem"
                  width="1rem"
                  className="mr-2 h-4 w-4 fill-amber-500">
                  <path d="M414.9 161.5C340.2 29 121.1 0 121.1 0S222.2 110.4 93 197.7C11.3 252.8-21 324.4 14 402.6c26.8 59.9 83.5 84.3 144.6 93.4-29.2-55.1-6.6-122.4-4.1-129.6 57.1 86.4 165 0 110.8-93.9 71 15.4 81.6 138.6 27.1 215.5 80.5-25.3 134.1-88.9 148.8-145.6 15.5-59.3 3.7-127.9-26.3-180.9z" />
                </svg>
                <span>Trending Stories</span>
              </DropdownMenuItem>
            </Link>
            <Link href="/latest" passHref>
              <DropdownMenuItem className="cursor-pointer hover:text-blue-500 dark:hover:bg-blue-500 dark:hover:text-white group">
                <svg
                  height="16"
                  width="16"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  fill="currentColor"
                  className="h-4 w-4 fill-orange-500 mr-2">
                  <path d="M512,255.996l-63.305-51.631l29.002-76.362l-80.633-13.07L383.993,34.3l-76.361,29.002L256,0.004 l-51.646,63.298L128.008,34.3l-13.07,80.634l-80.633,13.07l28.988,76.362L0,255.996l63.292,51.632l-28.988,76.368l80.633,13.07 l13.07,80.633l76.347-29.002L256,511.996l51.632-63.299l76.361,29.002l13.07-80.633l80.633-13.07l-29.002-76.368L512,255.996z M212.829,313.648l-14.382,2.834c-0.973,0.183-1.649-0.056-2.298-0.811l-39.266-45.872l-0.606,0.12l10.151,51.596 c0.142,0.726-0.253,1.304-0.972,1.452l-13.662,2.686c-0.719,0.141-1.297-0.254-1.438-0.98l-15.678-79.746 c-0.155-0.734,0.24-1.304,0.959-1.445l14.508-2.855c0.846-0.169,1.635,0.056,2.284,0.811l39.181,46.013l0.592-0.12l-10.166-51.716 c-0.14-0.733,0.254-1.304,0.973-1.452l13.662-2.686c0.719-0.141,1.297,0.24,1.438,0.973l15.678,79.745 C213.942,312.929,213.548,313.507,212.829,313.648z M283.663,299.718l-52.689,10.364c-0.733,0.14-1.296-0.247-1.452-0.973 l-15.678-79.745c-0.141-0.734,0.24-1.312,0.973-1.452l52.688-10.364c0.719-0.14,1.298,0.247,1.438,0.98l2.538,12.922 c0.155,0.726-0.24,1.305-0.959,1.445l-35.418,6.966c-0.479,0.092-0.676,0.38-0.578,0.867l3.201,16.312 c0.099,0.48,0.395,0.677,0.874,0.586l29.495-5.802c0.719-0.141,1.297,0.253,1.438,0.972l2.524,12.81 c0.141,0.726-0.254,1.297-0.972,1.438l-29.496,5.802c-0.479,0.099-0.676,0.388-0.577,0.867l3.355,17.039 c0.084,0.486,0.38,0.676,0.86,0.578l35.417-6.965c0.719-0.141,1.298,0.254,1.438,0.98l2.538,12.93 C284.777,298.999,284.382,299.577,283.663,299.718z M371.896,281.107c0.014,0.754-0.493,1.361-1.339,1.523l-12.083,2.376 c-0.846,0.169-1.424-0.226-1.805-0.902L332.362,235.8l-0.24,0.049l-4.328,53.937c-0.099,0.768-0.494,1.354-1.34,1.515 l-12.083,2.383c-0.719,0.141-1.297-0.254-1.692-0.931l-36.94-75.565c-0.268-0.705-0.127-1.234,0.719-1.403l15.594-3.059 c0.846-0.17,1.423,0.212,1.678,0.923l21.995,49.263l0.24-0.049l3.877-54.346c0.099-0.782,0.493-1.353,1.326-1.523l10.518-2.066 c0.719-0.141,1.297,0.24,1.692,0.931l24.631,48.734l0.254-0.05l1.212-53.816c-0.042-0.874,0.367-1.34,1.213-1.502l15.467-3.038 c0.846-0.17,1.17,0.261,1.198,1.015L371.896,281.107z"></path>{" "}
                </svg>
                <span>Latest Stories</span>
              </DropdownMenuItem>
            </Link>
            <Link href="/me/posts" passHref>
              <DropdownMenuItem className="cursor-pointer hover:bg-blue-100 hover:text-blue-500 dark:hover:bg-blue-500 dark:hover:text-white group">
                <BookOpen className="mr-2 h-4 w-4 text-blue-500 dark:group-hover:text-white" />
                <span>My Blogs</span>
              </DropdownMenuItem>
            </Link>
            <Link href="/me" passHref>
              <DropdownMenuItem className="cursor-pointer hover:bg-blue-100 hover:text-blue-500 dark:hover:bg-blue-500 dark:hover:text-white group">
                <svg
                  fill="none"
                  viewBox="0 0 24 24"
                  height="16"
                  width="16"
                  className="mr-2 h-4 w-4 ">
                  <path
                    className="fill-blue-500 dark:group-hover:fill-white"
                    d="M15 4h6v6h-6V4zM3 12a9 9 0 1018 0h-4a5 5 0 01-10 0H3zM6 10a3 3 0 100-6 3 3 0 000 6z"
                  />
                </svg>
                <span>My Profile</span>
              </DropdownMenuItem>
            </Link>
            <Link href="/me/settings" passHref>
              <DropdownMenuItem className="cursor-pointer hover:bg-blue-100 hover:text-blue-500 dark:hover:bg-blue-500 dark:hover:text-white group">
                <Settings className="mr-2 h-4 w-4 dark:group-hover:text-white" />
                <span>Settings</span>
              </DropdownMenuItem>
            </Link>
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

            {/* Navigation items for mobile */}
            <Link href="/featured" passHref>
              <DropdownMenuItem className="cursor-pointer hover:bg-gray-50">
                <svg
                  viewBox="0 0 384 512"
                  fill="currentColor"
                  height="16"
                  width="16"
                  className="mr-2 h-4 w-4 fill-cyan-500">
                  <path d="M173.8 5.5c11-7.3 25.4-7.3 36.4 0L228 17.2c6 3.9 13 5.8 20.1 5.4l21.3-1.3c13.2-.8 25.6 6.4 31.5 18.2l9.6 19.1c3.2 6.4 8.4 11.5 14.7 14.7l19.3 9.7c11.8 5.9 19 18.3 18.2 31.5l-1.3 21.3c-.4 7.1 1.5 14.2 5.4 20.1l11.8 17.8c7.3 11 7.3 25.4 0 36.4L366.8 228c-3.9 6-5.8 13-5.4 20.1l1.3 21.3c.8 13.2-6.4 25.6-18.2 31.5l-19.1 9.6c-6.4 3.2-11.5 8.4-14.7 14.7l-9.7 19.3c-5.9 11.8-18.3 19-31.5 18.2l-21.3-1.3c-7.1-.4-14.2 1.5-20.1 5.4l-17.8 11.8c-11 7.3-25.4 7.3-36.4 0L156 366.8c-6-3.9-13-5.8-20.1-5.4l-21.3 1.3c-13.2.8-25.6-6.4-31.5-18.2l-9.6-19.1c-3.2-6.4-8.4-11.5-14.7-14.7L39.5 301c-11.8-5.9-19-18.3-18.2-31.5l1.3-21.3c.4-7.1-1.5-14.2-5.4-20.1L5.5 210.2c-7.3-11-7.3-25.4 0-36.4L17.2 156c3.9-6 5.8-13 5.4-20.1l-1.3-21.3c-.8-13.2 6.4-25.6 18.2-31.5l19.1-9.6C65 70.2 70.2 65 73.4 58.6L83 39.5c5.9-11.8 18.3-19 31.5-18.2l21.3 1.3c7.1.4 14.2-1.5 20.1-5.4l17.9-11.7zM272 192c0-44.2-35.8-80-80-80s-80 35.8-80 80 35.8 80 80 80 80-35.8 80-80zM1.3 441.8l43.1-102.5c.2.1.3.2.4.4l9.6 19.1c11.7 23.2 36 37.3 62 35.8l21.3-1.3c.2 0 .5 0 .7.2l17.8 11.8c5.1 3.3 10.5 5.9 16.1 7.7l-37.6 89.3c-2.3 5.5-7.4 9.2-13.3 9.7s-11.6-2.2-14.8-7.2l-32.2-49.3-56.1 8.3c-5.7.8-11.4-1.5-15-6s-4.3-10.7-2.1-16zm248 60.4L211.7 413c5.6-1.8 11-4.3 16.1-7.7l17.8-11.8c.2-.1.4-.2.7-.2l21.3 1.3c26 1.5 50.3-12.6 62-35.8l9.6-19.1c.1-.2.2-.3.4-.4l43.2 102.5c2.2 5.3 1.4 11.4-2.1 16s-9.3 6.9-15 6l-56.1-8.3-32.2 49.2c-3.2 5-8.9 7.7-14.8 7.2s-11-4.3-13.3-9.7z" />
                </svg>
                <span>Featured Stories</span>
              </DropdownMenuItem>
            </Link>
            <Link href="/trending" passHref>
              <DropdownMenuItem className="cursor-pointer hover:bg-gray-50">
                <svg
                  viewBox="0 0 448 512"
                  fill="currentColor"
                  height="1rem"
                  width="1rem"
                  className="mr-2 h-4 w-4 fill-amber-500">
                  <path d="M414.9 161.5C340.2 29 121.1 0 121.1 0S222.2 110.4 93 197.7C11.3 252.8-21 324.4 14 402.6c26.8 59.9 83.5 84.3 144.6 93.4-29.2-55.1-6.6-122.4-4.1-129.6 57.1 86.4 165 0 110.8-93.9 71 15.4 81.6 138.6 27.1 215.5 80.5-25.3 134.1-88.9 148.8-145.6 15.5-59.3 3.7-127.9-26.3-180.9z" />
                </svg>
                <span>Trending Stories</span>
              </DropdownMenuItem>
            </Link>
            <Link href="/latest" passHref>
              <DropdownMenuItem className="cursor-pointer hover:bg-gray-50">
                <svg
                  height="16"
                  width="16"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  fill="currentColor"
                  className="h-4 w-4 fill-orange-500 mr-2">
                  <path d="M512,255.996l-63.305-51.631l29.002-76.362l-80.633-13.07L383.993,34.3l-76.361,29.002L256,0.004 l-51.646,63.298L128.008,34.3l-13.07,80.634l-80.633,13.07l28.988,76.362L0,255.996l63.292,51.632l-28.988,76.368l80.633,13.07 l13.07,80.633l76.347-29.002L256,511.996l51.632-63.299l76.361,29.002l13.07-80.633l80.633-13.07l-29.002-76.368L512,255.996z M212.829,313.648l-14.382,2.834c-0.973,0.183-1.649-0.056-2.298-0.811l-39.266-45.872l-0.606,0.12l10.151,51.596 c0.142,0.726-0.253,1.304-0.972,1.452l-13.662,2.686c-0.719,0.141-1.297-0.254-1.438-0.98l-15.678-79.746 c-0.155-0.734,0.24-1.304,0.959-1.445l14.508-2.855c0.846-0.169,1.635,0.056,2.284,0.811l39.181,46.013l0.592-0.12l-10.166-51.716 c-0.14-0.733,0.254-1.304,0.973-1.452l13.662-2.686c0.719-0.141,1.297,0.24,1.438,0.973l15.678,79.745 C213.942,312.929,213.548,313.507,212.829,313.648z M283.663,299.718l-52.689,10.364c-0.733,0.14-1.296-0.247-1.452-0.973 l-15.678-79.745c-0.141-0.734,0.24-1.312,0.973-1.452l52.688-10.364c0.719-0.14,1.298,0.247,1.438,0.98l2.538,12.922 c0.155,0.726-0.24,1.305-0.959,1.445l-35.418,6.966c-0.479,0.092-0.676,0.38-0.578,0.867l3.201,16.312 c0.099,0.48,0.395,0.677,0.874,0.586l29.495-5.802c0.719-0.141,1.297,0.253,1.438,0.972l2.524,12.81 c0.141,0.726-0.254,1.297-0.972,1.438l-29.496,5.802c-0.479,0.099-0.676,0.388-0.577,0.867l3.355,17.039 c0.084,0.486,0.38,0.676,0.86,0.578l35.417-6.965c0.719-0.141,1.298,0.254,1.438,0.98l2.538,12.93 C284.777,298.999,284.382,299.577,283.663,299.718z M371.896,281.107c0.014,0.754-0.493,1.361-1.339,1.523l-12.083,2.376 c-0.846,0.169-1.424-0.226-1.805-0.902L332.362,235.8l-0.24,0.049l-4.328,53.937c-0.099,0.768-0.494,1.354-1.34,1.515 l-12.083,2.383c-0.719,0.141-1.297-0.254-1.692-0.931l-36.94-75.565c-0.268-0.705-0.127-1.234,0.719-1.403l15.594-3.059 c0.846-0.17,1.423,0.212,1.678,0.923l21.995,49.263l0.24-0.049l3.877-54.346c0.099-0.782,0.493-1.353,1.326-1.523l10.518-2.066 c0.719-0.141,1.297,0.24,1.692,0.931l24.631,48.734l0.254-0.05l1.212-53.816c-0.042-0.874,0.367-1.34,1.213-1.502l15.467-3.038 c0.846-0.17,1.17,0.261,1.198,1.015L371.896,281.107z"></path>{" "}
                </svg>
                <span>Latest Stories</span>
              </DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator />

            {/* Sign in button */}
            {/* Add link to login page */}
            <DropdownMenuItem
              className="cursor-pointer hover:bg-blue-50 text-blue-700 font-medium text-center flex items-center justify-center gap-2 w-full my-2 border border-blue-200 dark:border-none rounded-lg dark:bg-blue-500 dark:text-white dark:hover:bg-blue-600"
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
