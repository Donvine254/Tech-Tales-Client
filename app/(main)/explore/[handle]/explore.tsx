import { SocialLinks } from "@/components/custom/social-links";
import { getUserAndBlogsByHandle } from "@/lib/actions/blogs";
import { formatDate, formatViews } from "@/lib/utils";
import { getTopAuthor } from "@/lib/actions/analytics";
import {
  BookOpenIcon,
  CakeIcon,
  ChartNoAxesColumn,
  Heart,
  MessageSquarePlus,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Image from "next/image";
import UserBlogs from "./user-blogs";
import { BlogWithComments } from "@/types";
type UserAndBlogs = Awaited<ReturnType<typeof getUserAndBlogsByHandle>>;

export default async function ExplorePage({ data }: { data: UserAndBlogs }) {
  const { user, blogs } = data;
  const isTopAuthor = await getTopAuthor(user.id);
  const socials = (user.socials ?? []) as { platform: string; url: string }[];
  const totalViews = blogs?.reduce((sum, blog) => sum + blog.views, 0);
  const totalLikes = blogs?.reduce((sum, blog) => sum + blog.likes, 0);
  return (
    <section>
      {/* branding div */}
      <div
        className="w-full  lg:min-h-[180px] min-h-[150px] p-6"
        style={{
          backgroundColor: data.user.branding ?? "0366F3",
        }}></div>
      <div className="w-full min-h-[400px] mx-auto px-4 sm:px-6 lg:px-8 py-16 max-w-5xl">
        {/* user card */}
        <div className="px-6 py-4 w-full relative -top-40 rounded-md bg-card shadow border">
          <Image
            src={
              data.user.picture
                ? data.user.picture
                : "https://ui-avatars.com/api/?background=random&name=john+doe"
            }
            title={data.user.username}
            height={120}
            width={120}
            alt={data.user.username}
            style={{ border: `0.5rem solid ${data.user.branding}` }}
            priority
            className="w-[120px] h-[120px] relative -top-20 rounded-full m-auto  italic "
            referrerPolicy="no-referrer"
          />
          <div className="-mt-20">
            <p className="text-muted-foreground font-semibold  flex items-center justify-center text-lg ">
              <span className="capitalize font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500 via-purple-500 dark:from-cyan-400 dark:to-blue-400">
                {data.user.username}
              </span>
              <>
                {data.user.role === "admin" ? (
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
            <p className="text-xs font-serif sm:text-sm text-center max-w-md mx-auto my-1">
              {data.user?.bio === "This user has no bio"
                ? "Hey, I have not updated my bio yet. Let's chat in the comments."
                : data.user.bio}
            </p>
            <p className="flex items-center justify-center gap-1 flex-1 p-1 rounded-md text-xs sm:text-sm font-serif text-primary/80 font-medium">
              <CakeIcon className="h-4 w-4" />
              <span className="whitespace-nowrap truncate ">
                Joined on {formatDate(data.user.createdAt)}
              </span>
            </p>
          </div>
        </div>
        {/* two cards div */}
        <div className="flex flex-col gap-2 md:flex-row md:justify-between md:items-start md:gap-5 -mt-36 relative">
          {/* first child */}
          <div className="md:w-min lg:w-1/3 space-y-4 md:sticky md:top-20">
            {/* First card */}
            <div className="space-y-4 bg-card shadow border px-6 py-4 rounded-md">
              <div className="mb-2 ">
                <p className="text-primary/90 font-semibold mb-2 ">Badges</p>
                <TooltipProvider>
                  <div className="flex items-center my-2 gap-x-2 flex-wrap">
                    {user && user.role === "admin" && (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Image
                            width={30}
                            height={30}
                            src="https://res.cloudinary.com/dipkbpinx/image/upload/v1724780586/badges/qkphllyptlbfxsmhihnh.png"
                            alt="admin badge"
                          />
                        </TooltipTrigger>
                        <TooltipContent>Admin</TooltipContent>
                      </Tooltip>
                    )}

                    {user &&
                      new Date().getTime() -
                        new Date(user.createdAt).getTime() <
                        90 * 24 * 60 * 60 * 1000 && (
                        // 90 days
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Image
                              width={30}
                              height={30}
                              src="https://res.cloudinary.com/dipkbpinx/image/upload/v1724781261/badges/ve5jrrevzjft7up36syp.png"
                              alt="welcome badge"
                            />
                          </TooltipTrigger>
                          <TooltipContent>Welcome badge</TooltipContent>
                        </Tooltip>
                      )}

                    {user &&
                      new Date().getTime() -
                        new Date(user.createdAt).getTime() >=
                        365 * 24 * 60 * 60 * 1000 && (
                        // One year
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Image
                              width={30}
                              height={30}
                              src="https://res.cloudinary.com/dipkbpinx/image/upload/v1724780825/badges/kotckmmr92ph9mayk2ds.webp"
                              alt="veteran badge"
                            />
                          </TooltipTrigger>
                          <TooltipContent>Veteran badge</TooltipContent>
                        </Tooltip>
                      )}

                    {blogs && blogs.length > 0 && blogs.length <= 10 && (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Image
                            width={30}
                            height={30}
                            src="https://res.cloudinary.com/dipkbpinx/image/upload/v1724779829/badges/m0edwdlv6hvbdkvxeevz.svg"
                            alt="writing debut badge"
                          />
                        </TooltipTrigger>
                        <TooltipContent>Writing debut badge</TooltipContent>
                      </Tooltip>
                    )}

                    {blogs && blogs.length >= 10 && (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Image
                            width={30}
                            height={30}
                            src="https://res.cloudinary.com/dipkbpinx/image/upload/v1724779829/badges/q86vokn45db0hfkklpud.svg"
                            alt="notable contributor badge"
                          />
                        </TooltipTrigger>
                        <TooltipContent>Notable contributor</TooltipContent>
                      </Tooltip>
                    )}

                    {isTopAuthor && (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Image
                            width={30}
                            height={30}
                            src="https://res.cloudinary.com/dipkbpinx/image/upload/v1728757940/badges/nwczihvezgmn1pdxkfs4.svg"
                            alt="top author badge"
                          />
                        </TooltipTrigger>
                        <TooltipContent>Top author</TooltipContent>
                      </Tooltip>
                    )}
                  </div>
                </TooltipProvider>
              </div>

              {/* Third card */}
            </div>
            {/* second card */}
            <div className="space-y-4 bg-card shadow border px-6 py-4 rounded-md">
              <div className="mb-2 ">
                <p className="text-primary/90 font-semibold mb-2 ">
                  Skills/Languages
                </p>
                <p className=" text-blue-600">
                  {user.skills ?? "I have not updated my skills yet."}
                </p>
              </div>
            </div>
            {/* Third Card */}
            <div className="space-y-4 bg-card shadow border px-6 py-4 rounded-md">
              <div className="mb-2 space-y-2">
                <p className="text-primary/90 font-semibold mb-2 ">
                  User Stats
                </p>
                <div className="flex items-center space-x-2 whitespace-nowrap">
                  <BookOpenIcon className="h-4 w-4" />
                  <p className="text-sm">{user._count.blogs} Authored Posts</p>
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
            <div className="space-y-4 bg-card shadow border px-6 py-4 rounded-md">
              <div className="mb-2 ">
                <p className="text-primary/90 font-semibold mb-2 ">Socials</p>
                {socials && socials.length > 0 ? (
                  <SocialLinks socials={socials} />
                ) : (
                  "I have not updated my socials yet"
                )}
              </div>
            </div>
          </div>
          {/* second child */}
          <hr className="block md:hidden border border-border my-2" />
          <div className="md:w-2/3">
            <UserBlogs blogs={blogs as BlogWithComments[]} />
          </div>
        </div>
      </div>
    </section>
  );
}
