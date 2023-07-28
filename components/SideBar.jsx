'use client'
import Link from "next/link"
import { useRef } from "react"
import Swal from 'sweetalert2'

export default function Component (){
  const inputRef= useRef('')

  function handleSubscribe(e){
    e.preventDefault();
    if(inputRef.current.value !== ''){
      Swal.fire({
        icon:"success",
        title:"Subscription successful",
        text:`${inputRef.current.value} has been successfully subscribed to receive our newsletters`,
        showCloseButton: true,
        showCancelButton: true,
        timer:3000,
        footer:'<a href="">made a mistake? click here to unsubscribe </a>'
      })
      inputRef.current.value = '';
    }else{
      Swal.fire({
        icon:"info",
        text:"Kindly type your email address",
        showCloseButton: true,
        showConfirmButton: false,
        timer:3000,
      })
    }
  }
    return (
        <div className="hidden lg:block bg-slate-200 absolute left-0 w-1/6 top-0 p-5 ml-5 dark:bg-slate-900 shadow">
        <h1 className="font-bold py-2 ">Subscribe to our Newsletter</h1>
        <p className="text-sm dark:text-gray-300 leading-8">
          Stay updated on new blog posts, updates and announcements
        </p>
        <input
          type="email"
          ref={inputRef}
          placeholder="you@domain.com"
          minLength={10}
          required
          className="bg-slate-500 dark:bg-gray-900 py-2 px-2 w-full focus:outline-none dark:text-white invalid:border-red-500 invalid:border"
        />
        <button className="mt-2 dark:text-gray-300 bg-slate-400 hover:bg-slate-300 text-base border py-1 shadow-xl dark:bg-slate-800 hover:text-black dark:border-none px-2" onClick={handleSubscribe}>
          Subscribe
        </button>
        <h1 className="font-bold py-2 mt-4">
          Time to Change!
        </h1>
        <p className="text-sm dark:text-gray-300 leading-8">
          You can your feed and see more relevant posts by favoriting blogs and
          leaving comments!
        </p>
        <h1 className="font-bold py-2 mt-4">
          Discover the author in you
        </h1>
        <p className="text-sm dark:text-gray-300 leading-8 mt-2">At Tech Tales, everyone is an author. Share your mind today by creating a <Link href="/create"className="underline text-blue-500 hover:text-blue-800 font-bold">blog &#8599;</Link></p>
      </div>
    )
}