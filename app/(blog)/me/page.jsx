"use client";
import React, { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import toast from "react-hot-toast";
import axios from "axios";
import { handleSignOut, baseUrl } from "@/lib";
import {
  Clipboard,
  Facebook,
  GithubIcon,
  NewTwitterIcon,
  Comment,
  IconEye,
} from "@/assets";
import { calculateReadingTime } from "@/lib";
import SocialMediaModal from "@/components/alerts/SocialMediaModal";
import { useUserContext } from "@/providers";
import UserStats from "@/components/stats";
import DeleteButton from "@/components/ui/deleteButton";
import { formatDate } from "@/lib/utils";
import { ProfileImage, Loader } from "@/components";
import { Tooltip } from "react-tooltip";
export const dynamic = "auto";

export default function Profile() {
  const user = useUserContext();
  const [blogs, setBlogs] = useState([]);
  const [topAuthor, setTopAuthor] = useState(null);
  const [pinnedBlogs, setPinnedBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  // Fetch blogs when user data changes
  const fetchBlogs = useCallback(async () => {
    try {
      const response = await fetch(`${baseUrl}/my-blogs`, {
        next: { cache: "force-cache", revalidate: 60 },
      });
      const data = await response.json();
      setBlogs(data);
      setPinnedBlogs(data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const getTopAuthor = useCallback(async () => {
    try {
      const res = await fetch(`${baseUrl}/analytics/top-author`);
      const data = await res.json();
      setTopAuthor(data);
      if (user && user.id === data.authorId) {
        toast.success("Congratulations! You are the top author");
        confetti({
          particleCount: 1000,
          spread: 70,
        });
      }
    } catch (error) {
      console.error("Could not get the top author", error);
    }
  }, [user]);

  useEffect(() => {
    fetchBlogs();
    getTopAuthor();
  }, [fetchBlogs, getTopAuthor]);

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="loader"></div>
      </div>
    );
  }

  function getSocialUrl(platform) {
    return (
      user?.socials?.find((social) => social.platform === platform)?.url || null
    );
  }

  let facebookUrl = getSocialUrl("facebook");
  let linkedinUrl = getSocialUrl("linkedin");
  let githubUrl = getSocialUrl("github");
  let twitterUrl = getSocialUrl("x");
  let instagramUrl = getSocialUrl("instagram");
  let youtubeUrl = getSocialUrl("youtube");
  let tiktokUrl = getSocialUrl("tiktok");

  //function to show modals
  const showModal = () => {
    const modal = document.getElementById(`social_media_modal`);
    if (modal) {
      modal.showModal();
    } else {
      console.log("modal not found");
    }
  };
  //function to delete social account
  async function deleteSocialAccount(platform) {
    try {
      await axios.post(`${baseUrl}/users/socials`, {
        platform: platform,
        userId: user.id,
      });
      toast.success(`${platform} account deleted successfully!`);
      // if (typeof window !== "undefined") {
      //   window.location.reload();
      // }
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete social account");
    }
  }
  return (
    <section className="font-poppins md:mt-10">
      <Script src="https://cdn.jsdelivr.net/npm/@tsparticles/confetti@3.0.2/tsparticles.confetti.bundle.min.js"></Script>
      <div
        className="w-full  lg:min-h-[180px] min-h-[150px] p-6"
        style={{
          backgroundColor: user.branding,
        }}></div>
      <div className="w-full min-h-[400px] mx-auto xsm:px-2 sm:px-8 md:w-4/5">
        <div className="px-6 py-4 w-full relative -top-20 rounded-md bg-white">
          <ProfileImage url={user?.picture} color={user.branding} />
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
            <div className="flex items-center justify-between flex-wrap w-fit gap-x-4 mx-auto  py-2 text-gray-600 xsm:text-xs">
              <p className="flex items-center gap-1 flex-1 p-1 hover:bg-gray-200 rounded-md">
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
              <Link
                href="/me/settings"
                className="hover:bg-gray-200 border border-transparent hover:text-blue-600 p-1 w-full rounded-md  flex flex-1 items-center gap-2 ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round">
                  <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
                <span className="whitespace-nowrap"> Edit Profile</span>
              </Link>
            </div>
          </div>
        </div>
        {/* have two cards rendered as flexbox */}
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
                      data-tooltip-id="admin-badge"
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
                        data-tooltip-id="welcome-badge"
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
                        data-tooltip-id="veteran-badge"
                        alt="veteran badge"
                        title="veteran badge"
                      />
                    )}
                  {blogs && blogs.length > 0 && blogs.length <= 10 && (
                    <Image
                      width={30}
                      src="https://res.cloudinary.com/dipkbpinx/image/upload/v1724779829/badges/m0edwdlv6hvbdkvxeevz.svg"
                      height={30}
                      data-tooltip-id="writing-debut"
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
                      data-tooltip-id="notable-contributor"
                      title="notable contributor"
                    />
                  )}
                  {topAuthor && topAuthor.authorId === user.id && (
                    <Image
                      width={30}
                      src="https://res.cloudinary.com/dipkbpinx/image/upload/v1728757940/badges/nwczihvezgmn1pdxkfs4.svg"
                      height={30}
                      alt="Top Author"
                      data-tooltip-id="top-author"
                      title="top-author"
                      onMouseOver={(e) => {
                        const rect = e.target.getBoundingClientRect();
                        const x =
                          (rect.left + rect.right) / 2 / window.innerWidth;
                        const y =
                          (rect.top + rect.bottom) / 2 / window.innerHeight;

                        confetti({
                          particleCount: 100,
                          spread: 70,
                          origin: { x, y },
                        });
                      }}
                    />
                  )}
                </div>
                <Tooltip
                  id="admin-badge"
                  content="admin badge"
                  style={{ padding: "5px" }}
                  variant="info"
                />
                <Tooltip
                  id="welcome-badge"
                  content="welcome badge"
                  style={{ padding: "5px" }}
                  variant="info"
                />
                <Tooltip
                  id="veteran-badge"
                  content="veteran badge"
                  style={{ padding: "5px" }}
                  variant="info"
                />
                <Tooltip
                  id="writing-debut"
                  content="writing debut"
                  style={{ padding: "5px" }}
                  variant="info"
                />
                <Tooltip
                  id="top-author"
                  content="top author"
                  style={{ padding: "5px" }}
                  variant="info"
                />
                <Tooltip
                  id="notable-contributor"
                  content="notable contributor"
                  style={{ padding: "5px" }}
                  variant="info"
                />
              </div>
              <hr />
              {/* skills */}
              <p className="text-gray-700 font-semibold mb-2 ">
                Skills/ Languages
              </p>
              <p className="bg-gray-200 p-1 my-2 rounded-sm text-blue-600">
                {user.skills === "Living life"
                  ? "You have not updated your skills"
                  : user.skills}
              </p>
              <hr />
              <p className="text-gray-700 font-semibold mb-2 ">Manage Blogs</p>
              {user.role === "admin" && (
                <div className="w-full flex items-center justify-start border bg-gray-100 hover:bg-gray-200 my-2 px-6 py-1 cursor-pointer hover:text-blue-500 h-8 rounded-md gap-2">
                  <svg
                    fill="currentColor"
                    viewBox="0 0 16 16"
                    height="1em"
                    width="1em">
                    <path d="M5.338 1.59a61.44 61.44 0 00-2.837.856.481.481 0 00-.328.39c-.554 4.157.726 7.19 2.253 9.188a10.725 10.725 0 002.287 2.233c.346.244.652.42.893.533.12.057.218.095.293.118a.55.55 0 00.101.025.615.615 0 00.1-.025c.076-.023.174-.061.294-.118.24-.113.547-.29.893-.533a10.726 10.726 0 002.287-2.233c1.527-1.997 2.807-5.031 2.253-9.188a.48.48 0 00-.328-.39c-.651-.213-1.75-.56-2.837-.855C9.552 1.29 8.531 1.067 8 1.067c-.53 0-1.552.223-2.662.524zM5.072.56C6.157.265 7.31 0 8 0s1.843.265 2.928.56c1.11.3 2.229.655 2.887.87a1.54 1.54 0 011.044 1.262c.596 4.477-.787 7.795-2.465 9.99a11.775 11.775 0 01-2.517 2.453 7.159 7.159 0 01-1.048.625c-.28.132-.581.24-.829.24s-.548-.108-.829-.24a7.158 7.158 0 01-1.048-.625 11.777 11.777 0 01-2.517-2.453C1.928 10.487.545 7.169 1.141 2.692A1.54 1.54 0 012.185 1.43 62.456 62.456 0 015.072.56z" />
                    <path d="M9.5 6.5a1.5 1.5 0 01-1 1.415l.385 1.99a.5.5 0 01-.491.595h-.788a.5.5 0 01-.49-.595l.384-1.99a1.5 1.5 0 112-1.415z" />
                  </svg>
                  <Link href="/admin/dashboard?tab=0" className="">
                    Go to Dashboard
                  </Link>
                </div>
              )}
              <Link
                href="/me/blogs"
                className="w-full flex items-center justify-start border bg-gray-100 hover:bg-gray-200 my-2 px-6 py-1 cursor-pointer hover:text-blue-500 h-8 rounded-md gap-2">
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  viewBox="0 0 24 24"
                  height="1em"
                  width="1em">
                  <path d="M8 21h12a2 2 0 002-2v-2H10v2a2 2 0 11-4 0V5a2 2 0 10-4 0v3h4" />
                  <path d="M19 17V5a2 2 0 00-2-2H4M15 8h-5M15 12h-5" />
                </svg>
                My Blogs
              </Link>
              <Link
                href="/me/replies"
                className="w-full flex items-center justify-start border bg-gray-100 hover:bg-gray-200 my-2 px-6 py-1 cursor-pointer hover:text-blue-500 h-8 rounded-md gap-2 group">
                <Comment
                  size="16"
                  className="text-gray-500 group-hover:text-blue-500"
                />
                Replies
              </Link>
              <p className="font-bold">Activity</p>
              <Link
                href="/me/bookmarks"
                className="w-full flex items-center justify-start border bg-gray-100 hover:bg-gray-200 my-2 px-6 py-1 cursor-pointer hover:text-blue-500 h-8 rounded-md gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round">
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                </svg>
                Reading List
              </Link>
              <Link
                href="/me/history"
                className="w-full flex items-center justify-start border bg-gray-100 hover:bg-gray-200 my-2 px-6 py-1 cursor-pointer hover:text-blue-500 h-8 rounded-md gap-2 group">
                <IconEye
                  size="16"
                  className="text-gray-500 group-hover:text-blue-500"
                />
                History
              </Link>
              <hr />
              <p className="font-bold">Connected Accounts</p>
              <button
                onClick={showModal}
                className="bg-gray-100 hover:bg-gray-200 flex items-center justify-start py-0.5 border hover:text-blue-500 px-6 rounded-md w-full gap-2">
                {" "}
                <span className="text-xl font-bold">+</span>
                <p>Connect Account</p>
              </button>
              {user.socials && user.socials.length > 0 ? (
                <div className="flex items-center space-y-1 my-2  gap-4  flex-wrap ">
                  {facebookUrl && (
                    <span className="relative group" id="facebook-link">
                      <a
                        href={facebookUrl}
                        target="_blank"
                        title="facebook"
                        className="">
                        {" "}
                        <Facebook size={24} />
                      </a>
                      <DeleteButton
                        handleClick={() => {
                          deleteSocialAccount("facebook");
                          document.getElementById("facebook-link").remove();
                        }}
                      />
                    </span>
                  )}

                  {linkedinUrl && (
                    <span className="relative group" id="linkedin-link">
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
                      <DeleteButton
                        handleClick={() => {
                          deleteSocialAccount("linkedin");
                          document.getElementById("linkedin-link").remove();
                        }}
                      />
                    </span>
                  )}

                  {githubUrl && (
                    <span className="relative group" id="github-link">
                      <a href={githubUrl} target="_blank" title="github">
                        {" "}
                        <GithubIcon size={24} />
                      </a>
                      <DeleteButton
                        handleClick={() => {
                          deleteSocialAccount("github");
                          document.getElementById("github-link").remove();
                        }}
                      />
                    </span>
                  )}

                  {twitterUrl && (
                    <span className="relative group" id="twitter-link">
                      <a href={twitterUrl} target="_blank" title="twitter">
                        <NewTwitterIcon size={24} />
                      </a>
                      <DeleteButton
                        handleClick={() => {
                          deleteSocialAccount("twitter");
                          document.getElementById("twitter-link").remove();
                        }}
                      />
                    </span>
                  )}
                  {instagramUrl && (
                    <span className="relative group" id="instagram-link">
                      <a href={instagramUrl} target="_blank" title="instagram">
                        <svg
                          viewBox="0 0 1024 1024"
                          fill="#E1306C"
                          height="24"
                          width="24">
                          <path d="M512 378.7c-73.4 0-133.3 59.9-133.3 133.3S438.6 645.3 512 645.3 645.3 585.4 645.3 512 585.4 378.7 512 378.7zM911.8 512c0-55.2.5-109.9-2.6-165-3.1-64-17.7-120.8-64.5-167.6-46.9-46.9-103.6-61.4-167.6-64.5-55.2-3.1-109.9-2.6-165-2.6-55.2 0-109.9-.5-165 2.6-64 3.1-120.8 17.7-167.6 64.5C132.6 226.3 118.1 283 115 347c-3.1 55.2-2.6 109.9-2.6 165s-.5 109.9 2.6 165c3.1 64 17.7 120.8 64.5 167.6 46.9 46.9 103.6 61.4 167.6 64.5 55.2 3.1 109.9 2.6 165 2.6 55.2 0 109.9.5 165-2.6 64-3.1 120.8-17.7 167.6-64.5 46.9-46.9 61.4-103.6 64.5-167.6 3.2-55.1 2.6-109.8 2.6-165zM512 717.1c-113.5 0-205.1-91.6-205.1-205.1S398.5 306.9 512 306.9 717.1 398.5 717.1 512 625.5 717.1 512 717.1zm213.5-370.7c-26.5 0-47.9-21.4-47.9-47.9s21.4-47.9 47.9-47.9 47.9 21.4 47.9 47.9a47.84 47.84 0 01-47.9 47.9z" />
                        </svg>
                      </a>
                      <DeleteButton
                        handleClick={() => {
                          deleteSocialAccount("instagram");
                          document.getElementById("instagram-link").remove();
                        }}
                      />
                    </span>
                  )}
                  {youtubeUrl && (
                    <span className="relative group" id="youtube-link">
                      <a href={youtubeUrl} target="_blank" title="youtube">
                        <svg
                          viewBox="0 0 512 512"
                          fill="#FF0000"
                          height="24"
                          width="24">
                          <path d="M508.64 148.79c0-45-33.1-81.2-74-81.2C379.24 65 322.74 64 265 64h-18c-57.6 0-114.2 1-169.6 3.6C36.6 67.6 3.5 104 3.5 149 1 184.59-.06 220.19 0 255.79q-.15 53.4 3.4 106.9c0 45 33.1 81.5 73.9 81.5 58.2 2.7 117.9 3.9 178.6 3.8q91.2.3 178.6-3.8c40.9 0 74-36.5 74-81.5 2.4-35.7 3.5-71.3 3.4-107q.34-53.4-3.26-106.9zM207 353.89v-196.5l145 98.2z" />
                        </svg>
                      </a>
                      <DeleteButton
                        handleClick={() => {
                          deleteSocialAccount("youtube");
                          document.getElementById("youtube-link").remove();
                        }}
                      />
                    </span>
                  )}
                  {tiktokUrl && (
                    <span className="relative group" id="tiktok-link">
                      <a href={tiktokUrl} target="_blank" title="tiktok">
                        <svg
                          viewBox="0 0 448 512"
                          fill="currentColor"
                          height="24"
                          width="24">
                          <path d="M448 209.91a210.06 210.06 0 01-122.77-39.25v178.72A162.55 162.55 0 11185 188.31v89.89a74.62 74.62 0 1052.23 71.18V0h88a121.18 121.18 0 001.86 22.17A122.18 122.18 0 00381 102.39a121.43 121.43 0 0067 20.14z" />
                        </svg>
                      </a>
                      <DeleteButton
                        handleClick={() => {
                          deleteSocialAccount("tiktok");
                          document.getElementById("tiktok-link").remove();
                        }}
                      />
                    </span>
                  )}
                </div>
              ) : (
                <p className="bg-gray-200 p-1 my-2 rounded-sm text-blue-600">
                  You have no connected accounts
                </p>
              )}
              <hr />
              <div className="flex items-center gap-2 justify-between text-sm  py-2 ">
                <button
                  onClick={() => handleSignOut(user.id)}
                  className="bg-gray-100 hover:bg-gray-200 hover:text-red-500  py-.05  px-6 w-full rounded-md h-8  border hover:border-red-500 flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                    <polyline points="16 17 21 12 16 7" />
                    <line x1="21" x2="9" y1="12" y2="12" />
                  </svg>
                  <span>Log Out</span>
                </button>
              </div>
            </div>
            <SocialMediaModal user={user} />
          </div>
          {/* second card */}

          <div className="lg:w-2/3 p-6 space-y-2 bg-gray-50 border shadow rounded-md">
            {loading && (
              <div className="flex items-center justify-center">
                <Loader size={30} />
              </div>
            )}
            <div>
              {!loading && <UserStats blogs={blogs} />}
              <hr />
              {pinnedBlogs && pinnedBlogs.length >= 1 ? (
                <>
                  <h2 className="my-1">Pinned Posts</h2>
                  {pinnedBlogs
                    .sort(() => 0.5 - Math.random())
                    .slice(0, 5)
                    .map((blog) => (
                      <div
                        key={blog.id}
                        className="mb-4 mt-2 border-2 rounded-md border-gray-200 p-2 relative">
                        <button
                          className="cursor-pointer absolute -top-3 left-2 bg-gray-200 px-6 py-0.5 rounded-md "
                          disabled={pinnedBlogs.length <= 5}
                          title="unpin blog"
                          onClick={() => {
                            setPinnedBlogs((prev) =>
                              prev.filter((prevBlog) => prevBlog.id !== blog.id)
                            );
                            toast.success("Blog unpinned");
                          }}>
                          <svg
                            fill="#ef4444"
                            viewBox="0 0 16 16"
                            height="1em"
                            width="1em">
                            <path d="M9.828.722a.5.5 0 01.354.146l4.95 4.95a.5.5 0 010 .707c-.48.48-1.072.588-1.503.588-.177 0-.335-.018-.46-.039l-3.134 3.134a5.927 5.927 0 01.16 1.013c.046.702-.032 1.687-.72 2.375a.5.5 0 01-.707 0l-2.829-2.828-3.182 3.182c-.195.195-1.219.902-1.414.707-.195-.195.512-1.22.707-1.414l3.182-3.182-2.828-2.829a.5.5 0 010-.707c.688-.688 1.673-.767 2.375-.72a5.922 5.922 0 011.013.16l3.134-3.133a2.772 2.772 0 01-.04-.461c0-.43.108-1.022.589-1.503a.5.5 0 01.353-.146z" />
                          </svg>{" "}
                        </button>
                        <div className="p-2 mt-5 border rounded-md shadow">
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
                          <div className="flex items-center justify-between gap-x-1 space-y-1 outline-2 ">
                            <p className="text-sm xsm:text-xs inline-flex items-center   text-black ">
                              <svg
                                viewBox="0 0 512 512"
                                fill="#ef4444"
                                height="1.5em"
                                width="1.5em">
                                <path
                                  fill="none"
                                  stroke="currentColor"
                                  strokeMiterlimit={10}
                                  strokeWidth={2}
                                  d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z"
                                />
                                <path d="M256 360a16 16 0 01-9-2.78c-39.3-26.68-56.32-45-65.7-56.41-20-24.37-29.58-49.4-29.3-76.5.31-31.06 25.22-56.33 55.53-56.33 20.4 0 35 10.63 44.1 20.41a6 6 0 008.72 0c9.11-9.78 23.7-20.41 44.1-20.41 30.31 0 55.22 25.27 55.53 56.33.28 27.1-9.31 52.13-29.3 76.5-9.38 11.44-26.4 29.73-65.7 56.41A16 16 0 01256 360z" />
                              </svg>
                              <span>
                                {blog.likes}{" "}
                                <span className="xsm:hidden">likes</span>
                              </span>
                            </p>
                            <p className="text-sm xsm:text-xs inline-flex items-center gap-1">
                              <Comment size={16} />
                              <span>
                                {blog?._count?.comments}{" "}
                                <span className="xsm:hidden">comments</span>
                              </span>
                            </p>

                            <p
                              className={`text-sm xsm:text-xs inline-flex items-center r ${
                                blog.status === "PUBLISHED"
                                  ? "text-green-600"
                                  : " text-amber-600 "
                              }`}>
                              <svg
                                viewBox="0 0 220 1000"
                                fill="currentColor"
                                className={`text-sm  ${
                                  blog.status === "PUBLISHED"
                                    ? "text-green-600"
                                    : " text-amber-600 "
                                }`}
                                height="20"
                                width="20">
                                <path d="M110 390c30.667 0 56.667 10.667 78 32s32 47.333 32 78c0 29.333-10.667 55-32 77s-47.333 33-78 33-56.667-11-78-33-32-47.667-32-77c0-30.667 10.667-56.667 32-78s47.333-32 78-32" />
                              </svg>
                              <span>{blog.status.toLowerCase()}</span>
                            </p>
                            <p className="text-sm xsm:text-xs  text-black ">
                              &#128337;
                              {calculateReadingTime(blog.body)}&nbsp;min{" "}
                              <span className="xsm:hidden">read</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                </>
              ) : (
                !loading && (
                  <div>
                    <div className="flex items-center justify-center py-1">
                      <Clipboard />
                    </div>
                    <p className="text-gray-600 text-center w-2/3 mx-auto xsm:text-xs">
                      Looks like you have not written any blogs yet! Your
                      published blogs will appear here.
                    </p>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
