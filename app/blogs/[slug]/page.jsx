"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Axios from "axios";
import { BiLike } from "react-icons/bi";
import { AiFillLike } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { Comments, Bookmark, Avatar } from "@/components";
import FullSkeletonBlog from "@/components/fullSkeletonBlog";
import parse from "html-react-parser";
import { useRouter } from "next/navigation";
import Link from "next/link";

//I will need to fetch all blogs and generate static params for faster load time

export default function BlogsPage({ params }) {
  const [blog, setBlog] = useState();
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
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
  }, [params.slug]);

  useEffect(() => {
    if (error || !id) {
      navigate.replace("/not-found");
    }
  }, [error, blog, navigate]);

  return (
    <div className="w-full mx-auto m-4 px-8 md:w-2/3 font-poppins">
      {loading && <FullSkeletonBlog />}
      {blog && !loading ? (
        <div key={blog.id}>
          <h1 className="font-bold xsm:text-xl text-2xl md:text-4xl lg:text-5xl dark:text-blue-500 py-4 balance">
            {blog?.title}
          </h1>
          <div className="flex xsm:block gap-5 items-center py-4">
            <div className="flex gap-2 md:gap-4 items-center">
              <Avatar name={blog?.author} />
              <p className="font-bold xsm:text-base text-xl md:text-2xl">
                {blog.author ?? ""}
              </p>
            </div>
            <p className="text-base font-medium xsm:px-10 xsm:mb-0">
              {blog?.created_at}
            </p>
          </div>
          <div
            className="h-[300px] md:h-[400px] w-full bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${blog.image})` }}></div>
          <article
            className="text-base md:text-xl leading-8 md:leading-10 mt-3 subpixel-antialiased indent-10 blog-body"
            id="blog-body">
            {blog.body ? parse(blog?.body) : blog.body}
          </article>
          <div className="flex items-center justify-between">
            <p className="blog__icons">
              {!liked ? (
                <BiLike className="hover:scale-125" onClick={handleLikeClick} />
              ) : (
                <AiFillLike
                  className="text-blue-500"
                  onClick={handleLikeClick}
                />
              )}
              <span className="text-base dark:text-gray-200 xsm:hidden">
                {likes ? likes : null} {!liked ? "Add Reaction" : "likes"}
              </span>
            </p>
            <p className="blog__icons">
              <FaRegComment className="hover:scale-125" />
              <span className="text-base dark:text-gray-200 xsm:hidden">
                {blog.comments ? blog?.comments?.length : null}{" "}
                <Link href="#write-comment">Comments</Link>
              </span>
            </p>
            <Bookmark
              blogId={blog?.id}
              className="text-xl md:text-2xl font-bold"
            />
          </div>
          <h1 className="text-bold text-xl md:text-2xl py-4 font-bold">
            Comments
          </h1>
          <hr className="divide-blue-500" />
          <Comments blogId={blog?.id} />
        </div>
      ) : null}
    </div>
  );
}
