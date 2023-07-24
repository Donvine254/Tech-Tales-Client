'use client'
import {useEffect, useState} from 'react'
import { fetchBlogs } from "@/lib"

const url = "https://basalt-equatorial-paw.glitch.me/blogs"

export default function BlogsPage({ params }) {
    const [blogs, setBlogs] = useState([]);
    const [currentBlog, setCurrentBlog] = useState(null);
  
    useEffect(() => {
      fetchBlogs(url)
        .then((fetchedBlogs) => {
          setBlogs(fetchedBlogs);
          // Find the blog with the matching slug
          const foundBlog = fetchedBlogs.find((blog) => blog.slug === params.slug);
          setCurrentBlog(foundBlog);
        })
        .catch((error) => {
          console.error('Error fetching blogs:', error);
        });
    }, [params.slug]);
  
    return (
      <div className='w-full mx-auto m-4 px-8 md:w-2/3'>
        {currentBlog ? (
          <div>
            <h1 className='className="font-extra-bold xsm:text-xl text-2xl md:text-4xl dark:text-blue-500 py-4"'>{currentBlog.title}</h1>
            <div className="flex xsm:block gap-5 items-center py-4">
              <div className="flex gap-0 items-center">
                <picture className="avatar">
                  <source
                    media="(min-width:1280px )"
                    srcSet="https://d2win24dv6pngl.cloudfront.net/media/generated/profile-photos/profile-1298663/60cc7564d4a37d90.af828114ed82.jpg"
                  />
                  <img
                    src="https://d2win24dv6pngl.cloudfront.net/media/generated/profile-photos/profile-1298663/60cc7564d4a37d90.af828114ed82.jpg"
                    className="avatar md:mr-8 "
                    alt="user-avatar"
                  />
                </picture>
                <p className="font-bold xsm:text-base text-xl md:text-2xl">
                  Donvine Mugendi
                </p>
              </div>

              <p className="text-base font-medium xsm:px-14 xsm:mb-0">
                2022-07-24
              </p>
            </div>
            <picture className="avatar">
                  <img
                    src={currentBlog.image}
                    className="prose"
                    alt="blog image"
                  />
                </picture>
            <p className='text-base md:text-xl leading-8 md:leading-10 '>{currentBlog.body}</p>
          </div>
        ) : (
          <p>Blog not found</p>
        )}
      </div>
    );
  }