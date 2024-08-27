// "use client";
// import { useState, useEffect } from "react";
// import Link from "next/link";
// import parse from "html-react-parser";
// import { UserImage } from "../ui/Avatar";
// import { formatDate } from "@/lib/utils";
// import { calculateReadingTime, baseUrl } from "@/lib";
// import axios from "axios";
// export default function Recommendations({ tags, id }) {
//   const [blogs, setBlogs] = useState(null);
//   console.log(tags);
//   useEffect(() => {
//     (async () => {
//       try {
//         const response = await axios.post(`${baseUrl}/search`, {
//           search: tags,
//         });
//         const data = response.data;

//         if (data.length >= 1) {
//           const filteredBlogs = data.filter(
//             (blog) => blog.id.toString() !== id.toString()
//           );
//           setBlogs(filteredBlogs);
//         } else {
//           setBlogs(data);
//         }
//       } catch (error) {
//         console.error(error);
//       }
//     })();
//   }, [tags, id]);

//   return (
//     <div className="my-2">
//       {blogs && blogs.length > 0 && (
//         <>
//           <hr className="my-2 border-blue-500" />
//           <h1 className="font-bold text-xl">Read Next</h1>
//           <div className="sm:flex sm:gap-2 sm:overflow-x-auto snap-x">
//             {blogs.map((blog) => (
//               <div
//                 key={blog.id}
//                 className=" my-4 p-4 rounded-md border shadow bg-gray-50 hover:bg-[#FEFEFE] sm:flex-shrink-0 sm:w-1/2 snap-normal snap-center">
//                 <div className="">
//                   <div className="flex gap-2 xsm:items-center">
//                     <UserImage url={blog.author.picture} />
//                     <div className="">
//                       <p className=" text-base capitalize font-medium ">
//                         {blog.author.username}
//                       </p>
//                       <p className="text-base xsm:text-sm xsm:mb-0">
//                         <span className="xsm:hidden">Published on </span>{" "}
//                         <time dateTime={blog?.createdAt}>
//                           {formatDate(blog.createdAt)} {""}
//                         </time>
//                         &#x2022; &#128337;{calculateReadingTime(blog.body)} min
//                       </p>
//                     </div>
//                   </div>
//                   <hr className="h-2 mt-1" />
//                   <Link
//                     href={`/blogs/${blog.slug}`}
//                     className="space-y-3 xl:col-span-3"
//                     prefetch>
//                     <h1 className="font-bold  py-2 ">{blog.title}</h1>
//                   </Link>
//                   {/* div for blog tags */}
//                   <div className="py-1">
//                     {blog.tags ? (
//                       <div className="flex gap-2 flex-wrap text-sm xsm:text-xs">
//                         {blog.tags.split(",").map((tag, index) => (
//                           <Link
//                             key={index}
//                             href={`/search?search=${tag.trim()}`}
//                             className={` text-blue-500  highlight-tag-${index}`}>
//                             <span>#</span>
//                             {tag.trim()}
//                           </Link>
//                         ))}
//                       </div>
//                     ) : (
//                       <></>
//                     )}
//                   </div>
//                   <article className="text-sm md:text-base leading-8 md:pb-1 line-clamp-2  overflow-hidden trimmed-blog-body ">
//                     {blog ? parse(blog.body) : blog.body}
//                   </article>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </>
//       )}
//     </div>
//   );
// }
