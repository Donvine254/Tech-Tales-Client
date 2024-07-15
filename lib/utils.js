import { saveAs } from "file-saver";
import parse from "html-react-parser";
export const formatDate = (dateString) => {
  const options = { year: "numeric", month: "short", day: "numeric" };
  return new Date(dateString).toLocaleDateString("en-US", options);
};

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

// export function encodeId(id) {
//   return Buffer.from(id.toString()).toString("base64");
// }

// export function decodeId(encodedId) {
//   return Buffer.from(encodedId.toString(), "base64").toString("utf-8");
// }
export function convertToHandle(name) {
  return name.toLowerCase().replace(/\s+/g, "");
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
