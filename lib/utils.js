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

export async function downloadPDF(title, body, author, date, image) {
  //return the blog as a PDF file to be downloaded on click of the button. The blog should be a PDF with blog image, this is the sample styling of how it should look like:
  {
    /* <div >
  {image && (
            <Image
              src={blog.image}
              alt="blog-image"
              height={450}
              width={900}
              priority
              className="italic h-full w-full  mt-2 border-2 "
            />
          )}
            <h1 className="text-xl font-bold">{title}</h1>
            <p className="italic">
              By {author} published on{" "}
              {formatDate(date)}
            </p>
            <div className="blog-body">{parse(blog.body)}</div>
          </div> */
  }
}
