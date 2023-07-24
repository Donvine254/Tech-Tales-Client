"use client";
import { useEffect, useState } from "react";
import { fetchBlogs, postComment } from "@/lib";
import { MdOutlineBookmarkAdd } from "react-icons/md";
import { BiLike } from "react-icons/bi";
import {AiFillLike} from 'react-icons/ai';
import { FaRegComment } from "react-icons/fa";
import {MdEdit} from 'react-icons/md'
import {GoTrash} from 'react-icons/go'
import Image from "next/image";

const url = "https://basalt-equatorial-paw.glitch.me/blogs";

export default function BlogsPage({ params }) {
  const [blogs, setBlogs] = useState([]);
  const [currentBlog, setCurrentBlog] = useState([]);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [likes, setLikes]= useState(0)
  const [liked, setLiked]= useState(false)

  function handleLikeClick(){
    setLiked(!liked);
    if(!liked){
      setLikes(likes+1)
    }
    else {
      setLikes(likes-1)
    }
  }

  const commentData = {
    author: "Donvine Mugendi",
    comment: newComment,
  };

  useEffect(() => {
    fetchBlogs(url)
      .then((fetchedBlogs) => {
        setBlogs(fetchedBlogs);
        // Find the blog with the matching slug
        const foundBlog = fetchedBlogs.find(
          (blog) => blog.slug === params.slug
        );
        setCurrentBlog(foundBlog);
        setComments(currentBlog.comments);
      })
      .catch((error) => {
        console.error("Error fetching blogs:", error);
      });
  }, [params.slug, comments]);

  function handleSubmit(e) {
    e.preventDefault();
    if (newComment === "") {
      return false;
    }
    postComment(currentBlog.id, url, commentData, setBlogs);
    setNewComment("");
    console.log(currentBlog.id);
  }

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
                Donvine Mugendi
              </p>
            </div>

            <p className="text-base font-medium xsm:px-14 xsm:mb-0">
              2022-07-24
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
          {comments? comments.length : null}  Comments
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
      <form className="mt-4" onSubmit={handleSubmit}>
        <div className="flex gap-1 xsm:gap-0">
          <Image
            src="https://d2win24dv6pngl.cloudfront.net/media/generated/profile-photos/profile-1298663/60cc7564d4a37d90.af828114ed82.jpg"
            className="avatar xsm:mr-0 xsm:p-0"
            width={32}
            height={32}
            alt="user-avatar"
          />
          <textarea
            placeholder="add to the discussion"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="p-4 xsm:p-2 xsm:ml-2 w-full border-none shadow-lg bg-gray-200  focus:outline-none md:text-xl h-16 focus:h-20 rounded-lg text-black"
          />
        </div>
        <div className="flex align-center gap-2 py-5 ml-16 xsm:ml-10 lg:gap-4">
          <button
            type="submit"
            className="bg-blue-500 text-white font-bold px-4 py-2 lg:mr-4 rounded-md hover:bg-blue-800">
            Respond
          </button>
          <button
            type="button"
            className="bg-transparent hover:bg-slate-300 border hover:text-blue-500 border-blue-500 px-2 p-2 rounded-md">
            Cancel
          </button>
        </div>
      </form>
      {comments ? (
        comments.map((comment) => (
          <div className="py-2 mt-2" key={comment.id}>
            <div className="flex gap-0 items-center">
              <Image
                src="https://d2win24dv6pngl.cloudfront.net/media/generated/profile-photos/profile-1298663/60cc7564d4a37d90.af828114ed82.jpg"
                className="avatar"
                width={32}
                height={32}
                alt="user-avatar"
              />
              <p className="font-bold xsm:text-base text-xl">
                {comment.author}
              </p>
            </div>
            <p className="text-base py-2 leading-normal ml-16 xsm:ml-10">
              {comment.comment}
            </p>
            <div className='py-2 flex items-center gap-4 ml-16 xsm:ml-10'>
              <p className="flex items center gap-2"> <MdEdit className="text-xl font-bold hover:text-blue-500"/>Edit</p>
              <p className="flex items center gap-2"><GoTrash className="text-xl font-bold hover:text-red-500"/>Delete</p>
            </div>
          </div>
        ))
      ) : (
        <p>No comments found.</p>
      )}
    </div>
  );
}
