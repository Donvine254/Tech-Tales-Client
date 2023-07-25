"use client";
import Axios from "axios";
import Swal from "sweetalert2";

//helper functions here

const registerApi = "http://localhost:9292/user";
const blogsApi = "http://localhost:9292/blogs";
const commentsApi = "http://localhost:9292/comments";
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
        text: "Thank you for registering! Proceed to log in with your new credentials",
      });
      navigate.replace("/login");
    })
    .catch((error) => {
      console.error("Error during user registration:", error);
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: "There was an error during registration. Please try again later.",
      });
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
        title: "Something went wrong",
        text: "There was an error while publishing your blog. Please try again later.",
      });
    });
}
//function to fetch blogs
export async function fetchBlogs(baseUrl) {
  try {
    const response = await Axios.get(baseUrl);
    return response.data;
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return [];
  }
}
//function to calculate blog reading tim
export function calculateReadingTime(blog) {
  const words = blog.trim().split(/\s+/).length;
  const readingTime = Math.ceil(words / 300);
  return readingTime;
}

//function to post comments
export function postComment(e, setComments, commentData) {
  e.preventDefault();
  if (newComment === "") {
    return false;
  }
  Axios.post(commentsApi, commentData)
    .then((response) => {
      setComments((prevComments) => [...prevComments, response.data.comment]);
    })
    .catch((error) => console.error("Error posting comment:", error));
}

//function to delete blog
export function deleteBlog(blogId, setBlogs) {
  const url = `http://localhost:9292/blogs/${blogId}`;
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
