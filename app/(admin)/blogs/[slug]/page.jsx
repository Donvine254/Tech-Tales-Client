"use client";
import { useEffect, useState } from "react";
import { fetchBlogs, postComment ,getCurrentUser } from "@/lib";
import { MdOutlineBookmarkAdd } from "react-icons/md";
import { BiLike } from "react-icons/bi";
import {AiFillLike} from 'react-icons/ai';
import { FaRegComment } from "react-icons/fa";
import {Comments} from "@/components"
import Image from "next/image";


export default function BlogsPage({ params }) {

  const [currentBlog, setCurrentBlog] = useState([]);
  const [likes, setLikes]= useState(0)
  const [liked, setLiked]= useState(false)
 
  
  const user = getCurrentUser()

  console.log(user.id)
  function handleLikeClick(){
    setLiked(!liked);
    if(!liked){
      setLikes(likes+1)
    }
    else {
      setLikes(likes-1)
    }
  }

  useEffect(() => {
   fetchBlogs( params.slug)
      .then((response) => {
        setCurrentBlog(response);
      })
      .catch((error) => {
        console.error("Error fetching blogs:", error);
      });
  }, [params.slug]);

  console.log(currentBlog)
  return (
    <div className="w-full mx-auto m-4 px-8 md:w-2/3">
      {currentBlog ? (
        <div>
          <h1 className='className="font-extra-bold xsm:text-xl text-2xl md:text-4xl dark:text-blue-500 py-4"'>
            {currentBlog.title}
          </h1>
          <div className="flex xsm:block gap-5 items-center py-4">
            <div className="flex gap-0 items-center">
              <Image
                src="https://d2win24dv6pngl.cloudfront.net/media/generated/profile-photos/profile-1298663/60cc7564d4a37d90.af828114ed82.jpg"
                className="avatar"
                width={32}
                height={32}
                alt="user-avatar"
              />
              <p className="font-bold xsm:text-base text-xl md:text-2xl">
                {currentBlog.user.username}
              </p>
            </div>

            <p className="text-base font-medium xsm:px-14 xsm:mb-0">
            {new Date(currentBlog.created_at).toISOString().split('T')[0]}
            </p>
          </div>
          <Image src={currentBlog.image} width={680} height={680} alt='blog-image' className='h-full w-full'/>
          <p className="text-base md:text-xl leading-8 md:leading-10 ">
            {currentBlog.body}
          </p>
        </div>
      ) : (
        <p>Blog not found</p>
      )}
      <div className="flex items-center justify-between">
        <p className="blog__icons">
          {!liked? <BiLike className="hover:scale-125" onClick={handleLikeClick} /> :<AiFillLike className="text-blue-500" onClick={handleLikeClick}/>}
          <span className="text-base dark:text-gray-200 xsm:hidden">
           {likes? likes : null} {!liked? "Add Reaction": "likes"}
          </span>
        </p>
        <p className="blog__icons">
          <FaRegComment className="hover:scale-125" />
          <span className="text-base dark:text-gray-200 xsm:hidden">
          {currentBlog.comments? currentBlog.comments.length : null}  Comments
          </span>
        </p>
        <p className="blog__icons">
          <MdOutlineBookmarkAdd className="hover:scale-125" />
          <span className="text-base dark:text-gray-200 xsm:hidden">
            Bookmark Blog
          </span>
        </p>
      </div>
      <h1 className="text-bold text-xl md:text-2xl py-4 font-bold">Comments</h1>
      <hr className="divide-blue-500" />
      <Comments blogId={currentBlog.id}/>
    </div>
  );
}
