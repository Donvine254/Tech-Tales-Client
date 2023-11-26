"use client";
import Axios from "axios";
import Swal from "sweetalert2";

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

//function to register users

export function registerUser(formData, navigate) {
  Axios.post(registerApi, formData)
    .then((response) => {
      console.log(response.data);
      Swal.fire({
        icon: "success",
        title: "Registration Successful",
        text: response.data.message,
      });
      navigate.replace("/login");
    })
    .catch((error) => {
      console.error("Error during user registration:", error);
      handleRegistrationError(error.response.data.errors);
    });
}

function handleRegistrationError(error) {
  const errorMessage = error ? error : "something went wrong";
  Swal.fire({
    icon: "error",
    title: "Registration Failed",
    text: errorMessage,
  });
}

//function to post blogs

export function createBlog(blogData, navigate, setBlogData) {
  Axios.post(blogsApi, blogData)
    .then((response) => {
      console.log(response.data);
      Swal.fire({
        icon: "success",
        title: "Blog submitted successfully",
        text: "You have successfully submitted your blog for publishing, it will appear on your blogs list shortly",
        confirmButtonColor: "#007500",
        showCloseButton: true,
        timer: 3000,
      });
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
      Swal.fire({
        icon: "error",
        text: error.response.data.errors,
      });
    });
}
//function to fetch blogs
//!important
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
      Swal.fire("✅ Bye Bye Comment");
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
    .then((updatedComment) => {
      setComments((prevComments) => [...prevComments, updatedComment]);
    })
    .catch((error) => {
      console.error("Error updating comment:", error);
    });
}

//function to delete blog
export function deleteBlog(blogId, setBlogs) {
  const url = `${blogsApi}/${blogId}`;
  console.log(url);
  Axios.delete(url)
    .then((response) => {
      console.log(response);
      setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== blogId)); // Remove the deleted blog from the state
      Swal.fire({
        icon: "success",
        title: "Blog deleted successfully",
        text: "You have successfully deleted your blog, here is to new beginnings",
        confirmButtonColor: "#007500",
        showCloseButton: true,
        timer: 3000,
      });
    })
    .catch((error) => {
      console.error("Error deleting blog:", error);
      Swal.fire({
        icon: "error",
        title: "Something went wrong",
        text: "There was an error while deleting your blog. Please try again later.",
      });
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
