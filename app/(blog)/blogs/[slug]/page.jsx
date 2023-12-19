"use client";
import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "next/navigation";
import Axios from "axios";
import { Like, Comment, Share } from "@/assets";
import { Comments, Bookmark, SideNav } from "@/components";
import { UserImage } from "@/components/Avatar";
import FullSkeletonBlog from "@/components/fullSkeletonBlog";
import parse from "html-react-parser";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ShareModal from "@/components/ShareModal";
//I will need to fetch all blogs and generate static params for faster load time

export default function BlogsPage() {
  const [blog, setBlog] = useState();
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const popupRef = useRef(null);
  const searchParams = useSearchParams();
  const navigate = useRouter();
  const id = searchParams.get("id");

  function handleLikeClick() {
    setLiked(!liked);
    if (!liked) {
      setLikes(likes + 1);
    } else {
      setLikes(likes - 1);
    }
  }

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const response = await Axios.get(
          `https://techtales.up.railway.app/blogs/${id}`
        );
        setBlog(response.data);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    })();

    return () => {
      isMounted = false;
    };
  }, [id]);

  useEffect(() => {
    if (error || !id) {
      navigate.replace("/not-found");
    }
  }, [error, blog, navigate, id]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setPopupOpen(false);
      }
    };

    // Add event listener when the component mounts
    document.addEventListener("mousedown", handleClickOutside);

    // Remove event listener when the component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [popupRef]);

  return (
    <div className="w-full mx-auto m-2 px-8 md:w-2/3 font-poppins">
      <SideNav />
      {loading && <FullSkeletonBlog />}
      {blog && !loading ? (
        <div key={blog.id}>
          <h1 className="font-bold xsm:text-xl text-2xl md:text-4xl">
            {blog?.title}
          </h1>
          <div className="flex xsm:block gap-5 items-center py-4">
            <div className="flex gap-2 md:gap-4 items-center">
              <UserImage url={blog.user_avatar} />
              <p className="font-bold text-xl md:text-2xl capitalize">
                {blog.author ?? ""}
              </p>
            </div>
            <p className="text-base font-medium xsm:px-10 xsm:mb-0">
              {blog?.created_at_date}
            </p>
          </div>
          <div
            className="h-[300px] md:h-[400px] w-full bg-cover bg-center bg-no-repeat rounded-md"
            style={{ backgroundImage: `url(${blog.image})` }}></div>
          <article
            className="text-base md:text-xl leading-8 md:leading-10 mt-3 subpixel-antialiased blog-body"
            id="blog-body">
            {blog.body ? parse(blog?.body) : blog.body}
          </article>
          <div className="flex items-center justify-between mt-2">
            <p className="blog__icons">
              {!liked ? (
                <Like
                  handleClick={handleLikeClick}
                  className="cursor-pointer font-bold"
                />
              ) : (
                <Like
                  handleClick={handleLikeClick}
                  className="text-red-500 cursor-pointer fill-red-500 font-bold"
                />
              )}
              <span className="text-base  xsm:hidden">
                {likes ? likes : null} {!liked ? "Add Reaction" : "likes"}
              </span>
            </p>
            <p className="blog__icons">
              <Comment />
              <span className="text-base ">
                {blog.comments ? blog?.comments?.length : null}{" "}
                <Link href="#write-comment" className="xsm:hidden">
                  Comments
                </Link>
              </span>
            </p>
            <div className="relative">
              <Share
                size={30}
                className="font-bold cursor-pointer"
                handleClick={() => setPopupOpen(true)}
              />
              {isPopupOpen && (
                <div
                  className="absolute right-0 md:left-0  bottom-8 bg-white border shadow-lg rounded-md min-w-[200px] w-fit h-fit py-4 z-50"
                  ref={popupRef}>
                  <ShareModal id={blog.id} slug={blog.slug} />
                </div>
              )}
            </div>
            <Bookmark blogId={blog?.id} className="font-bold" size={30} />
          </div>
          <h1 className="text-bold text-xl md:text-2xl py-4 font-bold">
            Comments
          </h1>
          <hr className="text-blue-500" />
          <Comments
            comments={blog?.comments}
            setBlog={setBlog}
            blogId={blog.id}
          />
        </div>
      ) : null}
    </div>
  );
}
