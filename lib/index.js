import Axios from "axios";
import axiosInstance from "@/axiosConfig";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { revalidateBlogs, revalidatePage } from "./actions";
import secureLocalStorage from "react-secure-storage";

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
    userData = secureLocalStorage.getItem("react_auth_token__");
    const expiry = JSON.parse(
      secureLocalStorage.getItem("session_expiry_time__")
    );
    if (expiry && new Date().getTime() > expiry) {
      secureLocalStorage.removeItem("react_auth_token__");
      secureLocalStorage.removeItem("session_expiry_time__");
      toast.error("Session has expired. Kindly login again");
      window.location.href = "/login";
      return null;
    }
  }
  return userData ? JSON.parse(userData) : null;
}

//function to login users
export async function handleLogin(loginData, setLoading, setErrors, navigate) {
  try {
    const response = await axiosInstance.post(
      "https://techtales.up.railway.app/login",
      loginData
    );
    const data = response.data;
    setErrors(null);
    const expiresAt = new Date().getTime() + 8 * 60 * 60 * 1000; //8hrs
    if (typeof window !== "undefined") {
      secureLocalStorage.setItem("react_auth_token__", JSON.stringify(data));
      secureLocalStorage.setItem(
        "session_expiry_time__",
        JSON.stringify(expiresAt)
      );
    }
    setLoading(false);
    toast.success("Logged in successfully", {
      position: "bottom-center",
    });
    navigate.replace("/featured");
  } catch (error) {
    setLoading(false);
    setErrors(error?.response?.data?.errors);
  }
}
//function to register users

export async function registerUser(formData, setLoading, router) {
  try {
    const response = await axiosInstance.post(registerApi, formData);
    const data = await response.data;
    const expiresAt = new Date().getTime() + 8 * 60 * 60 * 1000;
    if (typeof window !== "undefined") {
      secureLocalStorage.setItem("react_auth_token__", JSON.stringify(data));
      secureLocalStorage.setItem(
        "session_expiry_time__",
        JSON.stringify(expiresAt)
      );
    }
    confetti({
      particleCount: 1000,
      spread: 100,
      origin: { y: 0.5 },
    });
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
      confetti({
        particleCount: 1000,
        spread: 70,
        origin: { y: 0.6 },
      });
      toast.success("Your blog has been published successfully");
      setBlogData({
        title: "",
        image: "",
        body: "",
        slug: "",
      });
      revalidateBlogs();
      revalidatePage("latest");
      setTimeout(() => {
        navigate.replace("/my-blogs");
      }, 2000);
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
    .then(() => {
      setComments((prev) => prev.filter((comment) => comment.id !== commentId));
      toast.success("comment deleted successfully");
    })
    .catch((error) => console.error("Error deleting blog:", error));
}
export function patchComment(id, setComments, newComment) {
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
      setComments((prev) => [...prev, data]);
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
  revalidateBlogs(blogId);
  revalidatePage("latest");
  revalidatePage("featured");
}

export function saveUserData(data) {
  if (data) {
    const expiresAt = new Date().getTime() + 8 * 60 * 60 * 1000; //8hrs
    if (typeof window !== undefined) {
      secureLocalStorage.setItem("react_auth_token__", JSON.stringify(data));
      secureLocalStorage.setItem(
        "session_expiry_time__",
        JSON.stringify(expiresAt)
      );
    }
  }
}

export async function getUserData(accessToken) {
  const response = await fetch(
    "https://www.googleapis.com/oauth2/v3/userinfo",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  const userInfo = await response.json();

  const user = {
    username: userInfo.name,
    email: userInfo.email,
    picture: userInfo.picture,
    password: accessToken.substring(0, 50),
  };

  return user;
}

//function to handle Github login
export async function handleGithubLogin(router) {
  
}
