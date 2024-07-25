import Axios from "axios";
import axiosInstance from "@/axiosConfig";
import axios from "axios";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import {
  revalidateBlogs,
  revalidatePage,
  updateUserRole,
  updateUserStatus,
} from "./actions";
import secureLocalStorage from "react-secure-storage";
import { convertToHandle } from "./utils";

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

//function to login users
export async function handleLogin(
  loginData,
  setLoading,
  setError,
  router,
  redirect
) {
  const toastId = toast.loading("Processing login...", {
    position: "bottom-center",
  });

  try {
    const response = await axiosInstance.post(
      `${baseUrl}/auth/login`,
      loginData
    );
    const data = response.data;
    setError(null);
    if (typeof window !== "undefined") {
      secureLocalStorage.setItem("react_auth_token__", JSON.stringify(data));
    }
    setLoading(false);
    toast.success("Logged in successfully", {
      position: "bottom-center",
    });
    router.replace(`/${redirect}`);
  } catch (error) {
    setLoading(false);
    setError(error?.response?.data?.error);
  } finally {
    toast.dismiss(toastId);
  }
}
//function to register users

export async function registerUser(formData, setLoading, router, setError) {
  const toastId = toast.loading("Processing Request...", {
    position: "bottom-center",
  });
  try {
    const response = await axios.post(`${baseUrl}/auth/register`, formData);
    const data = await response.data;
    if (typeof window !== "undefined") {
      secureLocalStorage.setItem("react_auth_token__", JSON.stringify(data));
    }
    confetti({
      particleCount: 1000,
      spread: 100,
      origin: { y: 0.5 },
    });
    toast.success("Welcome on board!");
    setLoading(false);
    router.replace("/relevant");
  } catch (error) {
    setLoading(false);
    toast.error("Something went wrong!");
    setError(error?.response?.data?.error);
    console.error(error);
  } finally {
    toast.dismiss();
  }
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
    handle: convertToHandle(userInfo.name),
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
    handle: convertToHandle(userInfo.name),
    password: accessToken.substring(0, 10) ?? "$bre2@aih8!55",
  };
  return user;
}

// //function to clear localstorage data when the user logs out
export async function clearLocalStorage() {
  secureLocalStorage.removeItem("react_auth_token__");
  sessionStorage.removeItem("subscription_form_status");
}
// function to login oauth users
export async function authenticateUser(user, router, server, origin) {
  if (!user) {
    toast.error("User is not defined!");
    return false;
  }

  try {
    const response = await axiosInstance.post(`${baseUrl}/auth/oauth-login`, {
      email: user.email,
    });
    const data = response.data;

    // User found, save the data and redirect
    saveUserData(data);
    toast.success("Logged in successfully!");

    if (origin === "home" && typeof window !== "undefined") {
      window.location.reload();
    } else {
      router.replace("/relevant");
    }
  } catch (error) {
    console.error("Error during authentication:", error);

    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error(
        "Server responded with status code:",
        error.response.status
      );
      console.error("Server response data:", error.response.data);

      if (error.response.status === 404) {
        secureLocalStorage.setItem("unauthorized_user", user);
        toast.error("No user with a matching email was found!");
        router.replace(`/login/account_not_found?referrer=${server}`);
      } else {
        toast.error("Server error occurred. Please try again later.");
      }
    } else if (error.request) {
      // The request was made but no response was received
      console.error("No response received:", error.request);
      toast.error("No response from server. Please check your connection.");
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Error in request setup:", error.message);
      toast.error("Error occurred in request setup. Please try again.");
    }
  }
}

// function to signout users
export async function handleSignOut(id) {
  Swal.fire({
    icon: "warning",
    text: "Are you sure you want to sign out?",
    showCancelButton: true,
    confirmButtonText: "Sign out",
    showCloseButton: "true",
    customClass: {
      confirmButton:
        "px-2 py-1 mx-2 rounded-md bg-red-500 text-white hover:text-white hover:bg-red-500",
      cancelButton: "px-2 py-1 mx-2 rounded-md bg-green-500 text-white",
    },
    buttonsStyling: false,
  }).then(async (result) => {
    if (result.isConfirmed) {
      const response = await fetch(`${baseUrl}/auth/logout?id=${id}`);
      clearLocalStorage();
      toast.success("logged out successfully");
      if (typeof window !== undefined) {
        window.location.reload();
      }
    }
  });
}
//function to change user roles
export async function handleRoleUpdate(id, role, username, setUsers) {
  const confirmText = role === "admin" ? "demote" : "promote";
  const newRole = role === "admin" ? "user" : "admin";

  const confirmation = await Swal.fire({
    icon: "warning",
    text: `Do you want to ${confirmText} ${username} to ${newRole}? This action cannot be undone.`,
    confirmButtonText: confirmText,
    cancelButtonText: "Nevermind",
    showCancelButton: true,
    showCloseButton: true,
    footer: "Changes will reflect after 60 seconds",
    customClass: {
      confirmButton:
        "px-2 py-1 mx-2 bg-red-500 text-white rounded-md hover:text-white hover:bg-red-500 capitalize",
      cancelButton: "px-2 py-1 mx-2 bg-green-500 rounded-md text-white",
    },
    buttonsStyling: false,
  });

  if (confirmation.isConfirmed) {
    try {
      const data = await updateUserRole(id, newRole);
      setUsers((prev) =>
        prev.map((user) => (user.id === data.id ? data : user))
      );
      toast.success("User role updated successfully.");
      if (typeof window !== "undefined" && window) {
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  }
}
export async function handleUserStatusUpdate(id, username, status, setUsers) {
  const statusText = status === "SUSPENDED" ? "suspend" : "unsuspend";
  if (id) {
    Swal.fire({
      icon: "warning",
      text: `Are sure you want to ${statusText} ${username}.`,
      confirmButtonText: statusText,
      cancelButtonText: "Nevermind",
      showCancelButton: true,
      showCloseButton: true,
      footer: "Changes will reflect after 60 seconds",
      customClass: {
        confirmButton:
          "px-2 py-1 mx-2 bg-red-500 text-white rounded-md hover:text-white hover:bg-red-500 capitalize",
        cancelButton: "px-2 py-1 mx-2 bg-green-500 rounded-md text-white",
      },
      buttonsStyling: false,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const data = await updateUserStatus(id, status);
          setUsers((prev) =>
            prev.map((user) => (user.id === data.id ? data : user))
          );
          toast.success("User status updated successfully");
          if (typeof window !== "undefined" && window) {
            window.location.reload();
          }
        } catch (error) {
          toast.error("Oops! Something went wrong");
          console.error(error);
        }
      }
    });
  }
}
//function to get user data
export function getCurrentUser() {
  let userData;
  if (typeof window !== "undefined") {
    userData = secureLocalStorage.getItem("react_auth_token__");
  }
  return userData ? JSON.parse(userData) : null;
}
//function to update blog status:
export async function handleUpdateStatus(status, id, setBlogs) {
  const toastId = toast.loading("Processing Request...", {
    position: "bottom-center",
  });
  try {
    const response = await Axios.patch(`${baseUrl}/blogs?id=${id}`, {
      status,
    });
    const data = await response.data;
    // Update the blogs array with the new updated blog
    setBlogs((prevBlogs) =>
      prevBlogs.map((blog) => (blog.id === id ? data : blog))
    );
    toast.success("Blog status updated successfully");
  } catch (error) {
    console.error(error);
    toast.error("An error occurred while updating");
  } finally {
    toast.dismiss(toastId);
  }
}

//function to post blogs

export function createBlog(blogData, navigate, setBlogData) {
  Axios.post(`${baseUrl}/blogs`, blogData)
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
      });
      revalidateBlogs();
      revalidatePage("latest");
      revalidatePage("blogs");
      revalidatePage("admin/dashboard");
      setTimeout(() => {
        navigate.replace("/me/blogs");
      }, 2000);
    })
    .catch((error) => {
      console.error("An error occurs while publishing:", error);
      toast.error("Something went wrong, kindly try again later");
    });
}
//function to delete blog. Update this to use blog slug in revalidation
export function deleteBlog(blogId, slug, setBlogs) {
  const url = `${baseUrl}/blogs/?id=${blogId}`;
  Swal.fire({
    icon: "warning",
    text: "Are you sure you want to delete this blog?",
    showCloseButton: true,
    confirmButtonText: "Delete",
    showCancelButton: true,
    cancelButtonText: "Nevermind",
    customClass: {
      confirmButton:
        "px-2 py-1 mx-2 bg-red-500 text-white rounded-md hover:text-white hover:bg-red-500",
      cancelButton: "px-2 py-1 mx-2 bg-green-500 rounded-md text-white",
    },
    buttonsStyling: false,
  }).then((result) => {
    if (result.isConfirmed) {
      Axios.delete(url).then(() => {
        setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== blogId));
        toast.success("Blog deleted successfully!");
      });
    }
  });
  revalidateBlogs(slug);
  revalidatePage("latest");
  revalidatePage("relevant");
}

//function to fetch blogs
//!important do not delete this function by all means!
export async function fetchBlogs(baseUrl) {
  try {
    const response = await Axios.get(`${baseUrl}/blogs`);
    return response.data;
  } catch (error) {
    console.error("Error fetching blogs:", error);
  }
}
//function to calculate blog reading tim
export function calculateReadingTime(blog) {
  const words = blog.trim().split(/\s+/).length;
  const readingTime = Math.ceil(words / 200);
  return readingTime;
}

//function to delete comments
export function deleteComment(commentId, setComments) {
  Axios.delete(`${baseUrl}/comments?id=${commentId}`)
    .then(() => {
      setComments((prev) => prev.filter((comment) => comment.id !== commentId));
      toast.success("comment deleted successfully");
    })
    .catch((error) => console.error("Error deleting blog:", error));
}
export function patchComment(id, setComments, newComment) {
  const url = `${baseUrl}/comments?id=${id}`;
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
      toast.success("Comment updated successfully");
    })
    .catch((error) => {
      console.error("Error updating comment:", error);
    });
}
