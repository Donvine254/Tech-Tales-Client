import Image from "next/image";
import Link from "next/link";
import { formatDate, formatViews } from "@/lib/utils";
import { calculateReadingTime } from "@/lib";
import { Bookmark, ShareButton } from "@/components";
import {
  Facebook,
  GithubIcon,
  NewTwitterIcon,
  Comment,
  Graph,
  Like,
} from "@/assets";
import { baseUrl } from "@/lib";
import { redirect } from "next/navigation";

export default async function Explore({ blogs, user }) {
  if (!user) {
    redirect("/");
  }
  const totalViews = blogs?.reduce((sum, blog) => sum + blog.views, 0);
  const totalLikes = blogs?.reduce((sum, blog) => sum + blog.likes, 0);
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
          backgroundColor: user.branding,
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
            style={{ border: `0.5rem solid ${user.branding}` }}
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
            <p className="xsm:text-xs text-center max-w-md mx-auto">
              {user?.bio === "This user has no bio"
                ? "Hey, I have not updated my bio yet. Let's chat in the comments."
                : user.bio}
            </p>
            <p className="flex items-center justify-center gap-1 flex-1 p-1 rounded-md xsm:text-xs">
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
              {/* skills */}
              <p className="text-gray-700 font-semibold mb-2 ">
                Skills/ Languages
              </p>
              <p className="bg-gray-200 p-1 my-2 rounded-sm text-blue-600">
                {user.skills ?? "I have not updated my skills yet."}
              </p>
              <hr />
              <p className="font-bold">Socials</p>
              {user.socials && user.socials.length > 0 ? (
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
              ) : (
                <p>This user has no socials</p>
              )}
              <hr />
              <p className="font-bold">Statistics</p>
              <div className="space-y-2  divide-y-2 divide-dotted">
                <div className="flex items-center gap-2 font-extralight hover:text-blue-500 xsm:text-xs ">
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
                  <p className="">{user._count.blogs} Authored Posts</p>
                </div>
                <div className="flex items-center gap-2 font-extralight hover:text-blue-500 xsm:text-xs ">
                  <svg
                    fill="currentColor"
                    viewBox="0 0 16 16"
                    height="24"
                    width="24">
                    <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 011.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0114.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 011.172 8z" />
                    <path d="M8 5.5a2.5 2.5 0 100 5 2.5 2.5 0 000-5zM4.5 8a3.5 3.5 0 117 0 3.5 3.5 0 01-7 0z" />
                  </svg>
                  <p className="">{formatViews(totalViews)} Post Impressions</p>
                </div>
                <div className="flex items-center gap-2 font-extralight hover:text-blue-500 xsm:text-xs  ">
                  <svg
                    viewBox="0 0 512 512"
                    fill="currentColor"
                    height="24"
                    width="24">
                    <path
                      fill="none"
                      stroke="currentColor"
                      strokeMiterlimit={10}
                      strokeWidth={10}
                      d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z"
                    />
                    <path d="M256 360a16 16 0 01-9-2.78c-39.3-26.68-56.32-45-65.7-56.41-20-24.37-29.58-49.4-29.3-76.5.31-31.06 25.22-56.33 55.53-56.33 20.4 0 35 10.63 44.1 20.41a6 6 0 008.72 0c9.11-9.78 23.7-20.41 44.1-20.41 30.31 0 55.22 25.27 55.53 56.33.28 27.1-9.31 52.13-29.3 76.5-9.38 11.44-26.4 29.73-65.7 56.41A16 16 0 01256 360z" />
                  </svg>
                  <p className="">{formatViews(totalLikes)} Post Reactions</p>
                </div>
                <div className="flex items-center gap-2 font-extralight hover:text-blue-500 xsm:text-xs  ">
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    height="24"
                    width="24">
                    <path d="M9 22c-.55 0-1-.45-1-1v-3H4a2 2 0 01-2-2V4a2 2 0 012-2h16a2 2 0 012 2v12c0 1.11-.89 2-2 2h-6.1l-3.7 3.71c-.2.19-.45.29-.7.29H9m1-6v3.08L13.08 16H20V4H4v12h6m5.84-7.8l-1.01 1.01-2.07-2.03 1.01-1.02c.2-.21.54-.22.78 0l1.29 1.25c.21.21.22.55 0 .79M8 11.91l4.17-4.19 2.07 2.08-4.16 4.2H8v-2.09z" />
                  </svg>
                  <p className="">{user._count.comments} Comments written</p>
                </div>
              </div>
            </div>
          </div>
          {/* second card */}
          <div className="lg:w-2/3 p-6 space-y-2 bg-gray-50 border shadow rounded-md">
            {blogs && blogs.length > 0 && (
              <div>
                {blogs.map((blog) => (
                  <div key={blog.id}>
                    <div className="p-2 mt-5 border rounded-md shadow">
                      <div className="flex gap-2 xsm:items-center py-2">
                        <Image
                          className="h-5 w-5 rounded-full md:h-8 md:w-8 cursor-pointer "
                          src={user.picture}
                          width="32"
                          height="32"
                          title="User Profile Photo"
                          alt="user profile avatar"
                          referrerPolicy="no-referrer"
                        />
                        <div className="">
                          <p className="text-sm xsm:text-xs capitalize">
                            {user.username}
                          </p>
                          <p className="text-sm xsm:text-xs xsm:mb-0">
                            <time dateTime={blog?.createdAt}>
                              {formatDate(blog.createdAt)} {""}
                            </time>
                            &#x2022; &#128337;{calculateReadingTime(blog.body)}{" "}
                            min
                          </p>
                        </div>
                      </div>
                      <Link
                        href={`/blogs/${blog.slug}`}
                        className={`hover:underline ${
                          blog.status !== "PUBLISHED"
                            ? "pointer-events-none cursor-not-allowed  text-gray-400"
                            : ""
                        }`}
                        prefetch>
                        <span className="font-semibold xsm:text-sm  py-1 text-gray-700 hover:text-blue-500 ">
                          {blog.title}
                        </span>
                      </Link>

                      <div className="flex gap-2 flex-wrap text-sm">
                        {blog.tags.split(",").map((tag, index) => (
                          <Link
                            key={index}
                            href={`/search?search=${tag.trim()}`}
                            className={` text-blue-500  highlight-tag-${index}`}>
                            <span>#</span>
                            {tag.trim()}
                          </Link>
                        ))}
                      </div>
                      <div className="flex items-center justify-between xsm:gap-2 md:gap-4 py-2 text-sm xsm:text-xs">
                        <Link
                          href={`/blogs/${blog.slug}`}
                          className="inline-flex items-center gap-x-1 ">
                          <Comment
                            size={16}
                            className="stroke-none fill-gray-400"
                          />
                          <span>{blog?._count?.comments}</span>
                        </Link>
                        <Link
                          href={`/blogs/${blog.slug}`}
                          prefetch
                          className="inline-flex items-center gap-x-0.5  ">
                          <Like
                            className="stroke-gray-400 fill-none"
                            size={16}
                          />
                          <span className="">{blog.likes}</span>
                        </Link>
                        <Link
                          href={`/blogs/${blog.slug}`}
                          prefetch
                          className="inline-flex xsm:items-center  sm:items-start gap-x-0.5 ">
                          <Graph
                            className="stroke-gray-500 fill-none "
                            size={16}
                          />
                          <p className=" sm:align-text-bottom  xsm:pt-1.5">
                            {formatViews(blog.views)}
                          </p>
                        </Link>
                        <ShareButton
                          size={16}
                          className="h-[16px] w-[16px] text-gray-500"
                          title={blog.title}
                          slug={blog.slug}
                          blogId={blog.id}
                          image={blog.image.secure_url}
                        />
                        <Bookmark blogId={blog.id} size={16} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
