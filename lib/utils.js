import { saveAs } from "file-saver";
import toast from "react-hot-toast";
export const getRandomColor = () => {
  const colors = [
    "#cffafe",
    "#e0f2fe",
    "#bae6fd",
    "#dbeafe",
    "#e2e8f0",
    "#ccfbf1",
    "#99f6e4",
    "#f5f5f5",
    "#dcfce7",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

export function convertToHandle(name) {
  return name.toLowerCase().replace(/\s+/g, "");
}

export const createUserAvatar = (username) => {
  return `https://ui-avatars.com/api/?background=random&name=${username}`;
};

export function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export const exportCSV = (data) => {
  const transformedData = data.map((blog) => ({
    ID: BigInt(blog.id),
    Title: blog.title,
    Tags: blog.tags,
    Author: blog.author,
    Link: `https://techtales.vercel.app/blogs/${blog.slug}`,
  }));

  const csvRows = [];
  const headers = Object.keys(transformedData[0]);
  csvRows.push(headers.join(","));

  for (const row of transformedData) {
    const values = headers.map((header) => {
      const escaped = ("" + row[header]).replace(/"/g, '\\"');
      return `"${escaped}"`;
    });
    csvRows.push(values.join(","));
  }

  const csvString = csvRows.join("\n");
  const blob = new Blob([csvString], { type: "text/csv" });
  saveAs(blob, "blogs.csv");
};
export const exportUsersCSV = (data) => {
  const transformedData = data.map((user) => ({
    Id: BigInt(user.id),
    Name: user.username,
    Email: user.email,
    Role: user.role,
  }));

  const csvRows = [];
  const headers = Object.keys(transformedData[0]);
  csvRows.push(headers.join(","));

  for (const row of transformedData) {
    const values = headers.map((header) => {
      const escaped = ("" + row[header]).replace(/"/g, '\\"');
      return `"${escaped}"`;
    });
    csvRows.push(values.join(","));
  }

  const csvString = csvRows.join("\n");
  const blob = new Blob([csvString], { type: "text/csv" });
  saveAs(blob, "users.csv");
};

export function slugify(blogTitle) {
  return blogTitle
    .toLowerCase()
    .replace(/[^\w-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export const formatDate = (dateString) => {
  const options = { year: "numeric", month: "short", day: "numeric" };
  return new Date(dateString).toLocaleDateString("en-US", options);
};

export async function handleSharing(title, slug) {
  if (navigator.share) {
    try {
      await navigator.share({
        title: `${title}`,
        text: "See this interesting blog i found on Techtales!",
        url: `https://techtales.vercel.app/blogs/${slug}`,
      });
    } catch (error) {
      toast.error("Something went wrong");
      console.error("Error sharing content:", error);
    }
  } else {
    toast.error("Web Share API not supported in this browser.");
  }
}

// Function to set a cookie
export const setCookie = (cname, cvalue, exdays) => {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  const expires = "expires=" + d.toUTCString();
  document.cookie = `${cname}=${cvalue};${expires};path=/`;
};

// Function to get a cookie by name
export const getCookie = (cname) => {
  const name = cname + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
};

//function to generate password
export function generatePassword() {
  let pass = "";
  let str =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ" + "abcdefghijklmnopqrstuvwxyz0123456789@#$";

  for (let i = 1; i <= 9; i++) {
    let char = Math.floor(Math.random() * str.length + 1);

    pass += str.charAt(char);
  }

  return pass;
}

//function to format blog views
export function formatViews(views) {
  if (views < 1000) {
    return views.toString();
  } else if (views >= 1000 && views < 1000000) {
    const formattedViews = (views / 1000).toFixed(views % 1000 === 0 ? 0 : 1);
    return `${formattedViews}K`;
  } else if (views >= 500000) {
    const formattedViews = (views / 1000000).toFixed(1);
    return `${formattedViews}M`;
  } else if (views >= 1000000) {
    const formattedViews = (views / 1000000).toFixed(
      views % 1000000 === 0 ? 0 : 1
    );
    return `${formattedViews}M`;
  }
}
