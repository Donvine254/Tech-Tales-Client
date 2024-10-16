import { BlogsComponent } from "@/components";
import Image from "next/image";
import { formatDate, formatViews } from "@/lib/utils";
import { Facebook, GithubIcon, NewTwitterIcon, Comment, Graph } from "@/assets";
import { baseUrl } from "@/lib";
const color = "#01142d";

export default async function Explore({ blogs, user }) {
  const totalViews = blogs.reduce((sum, blog) => sum + blog.views, 0);
  const totalLikes = blogs.reduce((sum, blog) => sum + blog.likes, 0);
  function getSocialUrl(platform) {
    return (
      user?.socials?.find((social) => social.platform === platform)?.url || null
    );
  }

  const facebookUrl = getSocialUrl("facebook");
  const linkedinUrl = getSocialUrl("linkedin");
  const githubUrl = getSocialUrl("github");
  const twitterUrl = getSocialUrl("x");
  const instagramUrl = getSocialUrl("instagram");
  const youtubeUrl = getSocialUrl("youtube");
  const tiktokUrl = getSocialUrl("tiktok");

  const getTopAuthor = async () => {
    const res = await fetch(`${baseUrl}/analytics/top-author`);
    const data = await res.json();
    return user.id === data.authorId;
  };
  let isTopAuthor = (await getTopAuthor()) || false;

  return (
    <section className="md:mt-10 font-poppins">
      <div
        className="w-full  lg:min-h-[180px] min-h-[150px] p-6"
        style={{
          backgroundColor: color,
        }}></div>
      <div className="w-full min-h-[400px] mx-auto xsm:px-2 sm:px-8 md:w-4/5">
        <div className="px-6 py-4 w-full relative -top-20 rounded-md bg-white">
          <Image
            src={
              user.picture
                ? user.picture
                : "https://ui-avatars.com/api/?background=random&name=john+doe"
            }
            title={user.username}
            height={120}
            width={120}
            alt={user.username}
            style={{ border: `0.5rem solid ${color}` }}
            priority
            className="w-[120px] h-[120px] relative -top-20 rounded-full m-auto  italic "
            referrerPolicy="no-referrer"
          />
          <div className="-mt-20">
            <p className="text-gray-600 font-semibold  flex items-center justify-center text-lg ">
              <span className="capitalize">{user.username} </span>
              <>
                {user.role === "admin" ? (
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
            <p className="text-gray-700 mb-1 break-words text-sm text-center">
              {user.email}
            </p>
            <p className="xsm:text-xs text-center max-w-md mx-auto">
              {user?.bio === "This user has no bio"
                ? "You have have no bio yet. Update your bio  to let others know who you are, your competencies, and what you do."
                : user.bio}
            </p>
            <p className="flex items-center justify-center gap-1 flex-1 p-1 rounded-md">
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                height="1em"
                width="1em">
                <path fill="none" d="M0 0h24v24H0z" />
                <path d="M8 6v3.999h3V6h2v3.999h3V6h2v3.999L19 10a3 3 0 012.995 2.824L22 13v1c0 1.014-.377 1.94-.999 2.645L21 21a1 1 0 01-1 1H4a1 1 0 01-1-1v-4.36a4.025 4.025 0 01-.972-2.182l-.022-.253L2 14v-1a3 3 0 012.824-2.995L5 10l1-.001V6h2zm1.002 10.641l-.054.063a3.994 3.994 0 01-2.514 1.273l-.23.018L6 18c-.345 0-.68-.044-1-.126V20h14v-2.126a4.007 4.007 0 01-3.744-.963l-.15-.15-.106-.117-.107.118a3.99 3.99 0 01-2.451 1.214l-.242.02L12 18a3.977 3.977 0 01-2.797-1.144l-.15-.157-.051-.058zM19 12H5a1 1 0 00-.993.883L4 13v.971l.003.147A2 2 0 006 16a1.999 1.999 0 001.98-1.7l.015-.153.005-.176c.036-1.248 1.827-1.293 1.989-.134l.01.134.004.147a2 2 0 003.992.031l.012-.282c.124-1.156 1.862-1.156 1.986 0l.012.282a2 2 0 003.99 0L20 14v-1a1 1 0 00-.883-.993L19 12zM7 1c1.32.871 1.663 2.088 1.449 2.888a1.5 1.5 0 01-2.898-.776C5.85 2.002 7 2.5 7 1zm5 0c1.32.871 1.663 2.088 1.449 2.888a1.5 1.5 0 11-2.898-.776C10.85 2.002 12 2.5 12 1zm5 0c1.32.871 1.663 2.088 1.449 2.888a1.5 1.5 0 11-2.898-.776C15.85 2.002 17 2.5 17 1z" />
              </svg>
              <span className="whitespace-nowrap ">
                Joined on {formatDate(user.createdAt)}
              </span>
            </p>
          </div>
        </div>
        {/* div for two cards */}
        <div className="flex flex-col gap-2 md:flex-row md:justify-between md:items-start md:gap-5 -mt-16">
          {/* first card */}
          <div className="lg:w-1/3  bg-gray-50 border shadow rounded-md ">
            <div className="px-6 py-4 space-y-2">
              {/* div for badges */}
              <div className="mb-2 ">
                <p className="text-gray-700 font-semibold mb-2 ">Badges</p>
                <div className="flex items-center  my-2  gap-x-2 flex-wrap ">
                  {user && user.role === "admin" && (
                    <Image
                      width={30}
                      height={30}
                      src="https://res.cloudinary.com/dipkbpinx/image/upload/v1724780586/badges/qkphllyptlbfxsmhihnh.png"
                      alt="admin badge"
                      title="admin"
                    />
                  )}
                  {user &&
                    new Date().getTime() - new Date(user.createdAt).getTime() <
                      90 * 24 * 60 * 60 * 1000 && (
                      <Image
                        width={30}
                        height={30}
                        src="https://res.cloudinary.com/dipkbpinx/image/upload/v1724781261/badges/ve5jrrevzjft7up36syp.png"
                        alt="welcome badge"
                        title="welcome badge"
                      />
                    )}
                  {user &&
                    new Date().getTime() - new Date(user.createdAt).getTime() >=
                      365 * 24 * 60 * 60 * 1000 && (
                      <Image
                        width={30}
                        src="https://res.cloudinary.com/dipkbpinx/image/upload/v1724780825/badges/kotckmmr92ph9mayk2ds.webp"
                        height={30}
                        alt="veteran badge"
                        title="veteran badge"
                      />
                    )}
                  {blogs && blogs.length > 0 && blogs.length <= 10 && (
                    <Image
                      width={30}
                      src="https://res.cloudinary.com/dipkbpinx/image/upload/v1724779829/badges/m0edwdlv6hvbdkvxeevz.svg"
                      height={30}
                      alt="writing debut"
                      title="writing debut badge"
                    />
                  )}
                  {blogs && blogs.length >= 10 && (
                    <Image
                      width={30}
                      src="https://res.cloudinary.com/dipkbpinx/image/upload/v1724779829/badges/q86vokn45db0hfkklpud.svg"
                      height={30}
                      alt="Notable contributor"
                      title="notable contributor"
                    />
                  )}
                  {isTopAuthor && (
                    <Image
                      width={30}
                      src="https://res.cloudinary.com/dipkbpinx/image/upload/v1728757940/badges/nwczihvezgmn1pdxkfs4.svg"
                      height={30}
                      alt="Top Author"
                      title="top-author"
                    />
                  )}
                </div>
              </div>
              <hr />
              <p className="font-bold">Socials</p>
              {user.socials && user.socials.length > 0 && (
                <div className="flex items-center space-y-1 my-2  gap-4  flex-wrap ">
                  {facebookUrl && (
                    <a href={facebookUrl} target="_blank" title="facebook">
                      {" "}
                      <Facebook size={24} />
                    </a>
                  )}

                  {linkedinUrl && (
                    <a href={linkedinUrl} target="_blank" title="linkedin">
                      {" "}
                      <svg
                        viewBox="0 0 960 1000"
                        fill="#0284C7"
                        height="24"
                        width="24">
                        <path d="M480 20c133.333 0 246.667 46.667 340 140s140 206.667 140 340c0 132-46.667 245-140 339S613.333 980 480 980c-132 0-245-47-339-141S0 632 0 500c0-133.333 47-246.667 141-340S348 20 480 20M362 698V386h-96v312h96m-48-352c34.667 0 52-16 52-48s-17.333-48-52-48c-14.667 0-27 4.667-37 14s-15 20.667-15 34c0 32 17.333 48 52 48m404 352V514c0-44-10.333-77.667-31-101s-47.667-35-81-35c-44 0-76 16.667-96 50h-2l-6-42h-84c1.333 18.667 2 52 2 100v212h98V518c0-12 1.333-20 4-24 8-25.333 24.667-38 50-38 32 0 48 22.667 48 68v174h98" />
                        <title>Linkedin</title>
                      </svg>
                    </a>
                  )}

                  {githubUrl && (
                    <a href={githubUrl} target="_blank" title="github">
                      {" "}
                      <GithubIcon size={24} />
                    </a>
                  )}

                  {twitterUrl && (
                    <a href={twitterUrl} target="_blank" title="twitter">
                      <NewTwitterIcon size={24} />
                    </a>
                  )}
                  {instagramUrl && (
                    <a href={instagramUrl} target="_blank" title="instagram">
                      <svg
                        viewBox="0 0 1024 1024"
                        fill="#E1306C"
                        height="24"
                        width="24">
                        <path d="M512 378.7c-73.4 0-133.3 59.9-133.3 133.3S438.6 645.3 512 645.3 645.3 585.4 645.3 512 585.4 378.7 512 378.7zM911.8 512c0-55.2.5-109.9-2.6-165-3.1-64-17.7-120.8-64.5-167.6-46.9-46.9-103.6-61.4-167.6-64.5-55.2-3.1-109.9-2.6-165-2.6-55.2 0-109.9-.5-165 2.6-64 3.1-120.8 17.7-167.6 64.5C132.6 226.3 118.1 283 115 347c-3.1 55.2-2.6 109.9-2.6 165s-.5 109.9 2.6 165c3.1 64 17.7 120.8 64.5 167.6 46.9 46.9 103.6 61.4 167.6 64.5 55.2 3.1 109.9 2.6 165 2.6 55.2 0 109.9.5 165-2.6 64-3.1 120.8-17.7 167.6-64.5 46.9-46.9 61.4-103.6 64.5-167.6 3.2-55.1 2.6-109.8 2.6-165zM512 717.1c-113.5 0-205.1-91.6-205.1-205.1S398.5 306.9 512 306.9 717.1 398.5 717.1 512 625.5 717.1 512 717.1zm213.5-370.7c-26.5 0-47.9-21.4-47.9-47.9s21.4-47.9 47.9-47.9 47.9 21.4 47.9 47.9a47.84 47.84 0 01-47.9 47.9z" />
                      </svg>
                    </a>
                  )}
                  {youtubeUrl && (
                    <a href={youtubeUrl} target="_blank" title="youtube">
                      <svg
                        viewBox="0 0 512 512"
                        fill="#FF0000"
                        height="24"
                        width="24">
                        <path d="M508.64 148.79c0-45-33.1-81.2-74-81.2C379.24 65 322.74 64 265 64h-18c-57.6 0-114.2 1-169.6 3.6C36.6 67.6 3.5 104 3.5 149 1 184.59-.06 220.19 0 255.79q-.15 53.4 3.4 106.9c0 45 33.1 81.5 73.9 81.5 58.2 2.7 117.9 3.9 178.6 3.8q91.2.3 178.6-3.8c40.9 0 74-36.5 74-81.5 2.4-35.7 3.5-71.3 3.4-107q.34-53.4-3.26-106.9zM207 353.89v-196.5l145 98.2z" />
                      </svg>
                    </a>
                  )}
                  {tiktokUrl && (
                    <a href={tiktokUrl} target="_blank" title="tiktok">
                      <svg
                        viewBox="0 0 448 512"
                        fill="currentColor"
                        height="24"
                        width="24">
                        <path d="M448 209.91a210.06 210.06 0 01-122.77-39.25v178.72A162.55 162.55 0 11185 188.31v89.89a74.62 74.62 0 1052.23 71.18V0h88a121.18 121.18 0 001.86 22.17A122.18 122.18 0 00381 102.39a121.43 121.43 0 0067 20.14z" />
                      </svg>
                    </a>
                  )}
                </div>
              )}
              <hr />
              <p className="font-bold">Activity</p>
              <div className="space-y-2 py-2">
                <div className="flex items-center gap-2 font-extralight text-gray-600 ">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    viewBox="0 0 24 24"
                    height="24"
                    width="24">
                    <path d="M8 21h12a2 2 0 002-2v-2H10v2a2 2 0 11-4 0V5a2 2 0 10-4 0v3h4" />
                    <path d="M19 17V5a2 2 0 00-2-2H4M15 8h-5M15 12h-5" />
                  </svg>
                  <p className="">{user._count.blogs} Total Authored Posts</p>
                </div>
                <div className="flex items-center gap-2 font-extralight text-gray-600 ">
                  <Graph size="24" />
                  <p className="">
                    {formatViews(totalViews)} Total Post Impressions
                  </p>
                </div>
                <div className="flex items-center gap-2 font-extralight text-gray-600 ">
                  <svg
                    fill="currentColor"
                    viewBox="0 0 16 16"
                    height="24"
                    width="24">
                    <path d="M8 2.748l-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 01.176-.17C12.72-3.042 23.333 4.867 8 15z" />
                  </svg>
                  <p className="">{formatViews(totalLikes)} Total Post Likes</p>
                </div>
                <div className="flex items-center gap-2 font-extralight text-gray-600 ">
                  <Comment size="24" />
                  <p className="">
                    {user._count.comments} Total Authored comments
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* second card */}
          <div className="lg:w-2/3 p-6 space-y-2 bg-gray-50 border shadow rounded-md">
            <BlogsComponent blogs={blogs} />
          </div>
        </div>
      </div>
    </section>
  );
}
