import Axios from "axios";
import axiosInstance from "@/axiosConfig";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { revalidateBlogs, revalidatePage } from "./actions";
import secureLocalStorage from "react-secure-storage";

const registerApi = "https://techtales.up.railway.app/users";
const blogsApi = "https://techtales.up.railway.app/blogs";
const commentsApi = "https://techtales.up.railway.app/comments";

export const baseUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000/api"
    : "https://techtales.vercel.app/api";
//function to convert blog title to a slug
export function slugify(blogTitle) {
  blogTitle = blogTitle.toLowerCase();
  blogTitle = blogTitle.replace(/[^\w-]/g, "-");
  blogTitle = blogTitle.replace(/-+/g, "-");
  return blogTitle;
}

export async function getCurrentUser() {
  try {
    const response = await fetch(`${baseUrl}/me`);
    const userData = await response.json();
    return userData;
  } catch (error) {
    console.error("Failed to fetch user data:", error.message);
    return null;
  }
}

//function to login users
export async function handleLogin(
  loginData,
  setLoading,
  setErrors,
  router,
  redirect
) {
  try {
    const response = await axiosInstance.post(`${baseUrl}/login`, loginData);
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
    router.replace(`/${redirect}`);
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
    router.replace("/featured");
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

//function to delete comments
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
//function to login users with Google account
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
export async function getAccessToken(code) {
  const client_id = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID;
  const client_secret = process.env.NEXT_PUBLIC_GITHUB_CLIENT_SECRET;
  const params = `client_id=${client_id}&client_secret=${client_secret}&code=${code}`;
  const response = await fetch(
    `https://github.com/login/oauth/access_token?${params}`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
    }
  );
  const data = await response.json();
  const accessToken = await data.access_token;
  return accessToken;
}

export async function fetchUserInfo(accessToken) {
  const response = await fetch("https://api.github.com/user", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const userInfo = await response.json();
  const user = {
    username: userInfo.name,
    picture: userInfo.avatar_url,
    email: userInfo.email,
    bio: userInfo.bio,
    password: accessToken.substring(0, 10) ?? "$bre2@aih8!55",
  };
  return user;
}

//function to save or register users with github and google account
export async function authenticateUser(user, router, server, origin) {
  if (!user) {
    toast.error("User is not defined!");
    return false;
  }
  try {
    const response = await fetch(
      `https://techtales.up.railway.app/users?email=${user.email}`
    );
    const data = await response.json();
    // User found, save the data and redirect
    saveUserData(data);
    toast.success("Logged in successfully!");
    if (origin == "home" && typeof window !== "undefined") {
      window.location.reload();
    } else {
      router.replace("/featured");
    }
  } catch (error) {
    // Handle errors (show a message and redirect)
    console.error(error);
    secureLocalStorage.setItem("unauthorized_user", user);
    toast.error("No user with a matching email was found!", {
      icon: "⚠️",
    });
    router.replace(`/login/account_not_found?referrer=${server}`);
  }
}
//function to clear localstorage data when the user logs out
export async function clearLocalStorage() {
  secureLocalStorage.removeItem("react_auth_token__");
  secureLocalStorage.removeItem("session_expiry_time__");
  sessionStorage.removeItem("subscription_form_status");
}

// function to signout users
export async function handleSignOut() {
  const response = await fetch(`${baseUrl}/logout`);
  clearLocalStorage();
  toast.success("logged out successfully");
  revalidatePage("/my-blogs");
  if (typeof window !== undefined) {
    window.location.reload();
  }
}
