"use client";
import Axios from "axios";
import axiosInstance from "@/axiosConfig";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
// const SecretKey = process.env.NEXT_APP_SECTET_KEY;
// import { encryptUserId, decryptUserId } from "./decrypt";
//helper functions here

const registerApi = "https://techtales.up.railway.app/users";
const blogsApi = "https://techtales.up.railway.app/blogs";
const commentsApi = "https://techtales.up.railway.app/comments";
//function to convert blog title to a slug
export function slugify(blogTitle) {
  blogTitle = blogTitle.toLowerCase();
  blogTitle = blogTitle.replace(/[^\w-]/g, "-");
  blogTitle = blogTitle.replace(/-+/g, "-");
  return blogTitle;
}

export function getCurrentUser() {
  let userData;
  if (typeof window !== "undefined") {
    userData = localStorage.getItem("loggedInUser");
  }
  return userData ? JSON.parse(userData) : null;
}
export function clearCurrentUser() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("loggedInUser");
  }
}
//function to login users
export async function handleLogin(loginData, setLoading, navigate) {
  try {
    const response = await axiosInstance.post(
      "https://techtales.up.railway.app/login",
      loginData
    );
    const data = response.data;
    if (typeof window !== "undefined") {
      localStorage.setItem("loggedInUser", JSON.stringify(data));
    }
    setLoading(false);
    toast.success("Logged in successfully!");
    navigate.replace("/featured");
  } catch (error) {
    setLoading(false);
    toast.error(error?.response?.data?.errors);
  }
}
//function to register users

export async function registerUser(formData, setLoading, navigate) {
  try {
    const response = await axiosInstance.post(registerApi, formData);
    const data = await response.data;
    if (typeof window !== "undefined") {
      localStorage.setItem("loggedInUser", JSON.stringify(data));
    }
    toast.success("Welcome on board!");
    setLoading(false);
    navigate.replace("/featured");
  } catch (error) {
    setLoading(false);
    toast.error(error?.response?.data?.errors);
  }
}

//function to post blogs

export function createBlog(blogData, navigate, setBlogData) {
  Axios.post(blogsApi, blogData)
    .then(() => {
      toast.success("Your blog has been submitted successfully");
      setBlogData({
        title: "",
        image: "",
        body: "",
        slug: "",
      });
      navigate.replace("/my-blogs");
    })
    .catch((error) => {
      console.error("Error during user publishing:", error);
      toast.error("Something went wrong, kindly try again later");
    });
}
//function to fetch blogs
//!important do not delete this function by all means!
export async function fetchBlogs(baseUrl) {
  try {
    const response = await Axios.get(baseUrl);
    return response.data;
  } catch (error) {
    console.error("Error fetching blogs:", error);
  }
}
//function to calculate blog reading tim
export function calculateReadingTime(blog) {
  const words = blog.trim().split(/\s+/).length;
  const readingTime = Math.ceil(words / 300);
  return readingTime;
}

//function to post comments
export function deleteComment(commentId, setComments) {
  Axios.delete(`${commentsApi}/${commentId}`)
    .then((response) => {
      console.log(response);
      setComments((prevComments) =>
        prevComments.filter((comment) => comment.id !== commentId)
      );
      toast.success("comment deleted successfully");
    })
    .catch((error) => console.error("Error deleting blog:", error));
}
export function patchComment(id, setBlog, newComment) {
  const url = `${commentsApi}/${id}`;
  fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ body: newComment }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      setBlog((prev) => ({ ...prev, comments: [...prev.comments, data] }));
    })
    .catch((error) => {
      console.error("Error updating comment:", error);
    });
}

//function to delete blog
export function deleteBlog(blogId, setBlogs) {
  const url = `${blogsApi}/${blogId}`;
  Swal.fire({
    icon: "warning",
    text: "Are you sure you want to delete this blog?",
    showCloseButton: true,
    confirmButtonText: "Delete",
    showCancelButton: true,
    cancelButtonText: "Nevermind",
    confirmButtonColor: "#FF0000",
    cancelButtonColor: "#0056f1",
  }).then((result) => {
    if (result.isConfirmed) {
      Axios.delete(url).then(() => {
        setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== blogId));
        toast.success("Blog deleted successfully!");
      });
    }
  });
}

//function to clear cookies on logout
export function clearAllCookies() {
  const cookies = document.cookie.split(";");

  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i];
    const eqPos = cookie.indexOf("=");
    const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = `${name}=; max-age=-1; path=/;`;
  }
}
