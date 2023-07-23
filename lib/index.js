"use client";
import Axios from "axios";
import Swal from "sweetalert2";

//helper functions here

const usersApi = "https://basalt-equatorial-paw.glitch.me/users";
const blogsApi = "https://basalt-equatorial-paw.glitch.me/blogs";
//function to convert blog title to a slug
export function slugify(blogTitle) {
  blogTitle = blogTitle.toLowerCase();
  blogTitle = blogTitle.replace(/[^\w-]/g, "-");
  blogTitle = blogTitle.replace(/-+/g, "-");
  return blogTitle;
}

//function to validate login
export function validateLogin(loginData, userData) {
  if (userData) {
    const foundUser = userData.find(
      (user) =>
        user.email === loginData.email && user.password === loginData.password
    );
    if (foundUser) {
      localStorage.setItem("loggedInUser", JSON.stringify(foundUser)); // Store the user in localStorage
      return true; // Login is successful
    }
  }

  return false; // Login is unsuccessful
}
export function getCurrentUser() {
  // Retrieve the logged-in user data from local storage
  const userData = localStorage.getItem("loggedInUser");
  return userData ? JSON.parse(userData) : null;
}
export function clearCurrentUser() {
  // Clear the logged-in user data from local storage
  localStorage.removeItem("loggedInUser");
}

//function to register users
export function registerUser(formData, navigate) {
  Axios.post(usersApi, formData)
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
      console.error("Error during user registration:", error);
      Swal.fire({
        icon: "error",
        title: "Something went wrong",
        text: "There was an error while publishing your blog. Please try again later.",
      });
    });
}
//function to savedraft
function saveDraft() {
  localStorage.setItem('draftBlog', JSON.stringify(blogData));
  Swal.fire("✅ draft saved successfully")
}