"use client";
import React, { useState } from "react";
import BlogsTable from "@/components/Dashboard/Blogs";
import UsersTable from "@/components/Dashboard/Users";
import CommentsTable from "@/components/Dashboard/Comments";

export default function Dashboard({ blogs, totalComments, users }) {
  const [activeTab, setActiveTab] = useState("tab-0");

  return (
    <section className="w-full min-h-[320px] py-4 md:mt-10" id="dashboard-page">
      <div className="grid grid-cols-1 gap-4  py-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 ">
        {/* first card */}
        <div
          className=" bg-gray-100 hover:bg-gray-200 p-6 space-y-4 text-center  shadow rounded-md hover:-translate-y-1 transition-transform duration-300"
          onClick={() => setActiveTab("tab-0")}>
          <div className=" inline-flex items-center justify-center w-full text-cyan-500">
            <svg
              version="1.1"
              id="_x32_"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              fill="#06b6d4 "
              height={48}
              width={48}>
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <g>
                  {" "}
                  <rect
                    x="293.186"
                    y="307.184"
                    width="131.572"
                    height="112.986"></rect>{" "}
                  <rect
                    x="87.243"
                    y="308.893"
                    width="154.448"
                    height="17.162"></rect>{" "}
                  <rect
                    x="87.243"
                    y="401.298"
                    width="154.448"
                    height="17.162"></rect>{" "}
                  <rect
                    x="87.243"
                    y="355.1"
                    width="154.448"
                    height="17.162"></rect>{" "}
                  <path d="M416.428,0.004H95.58C42.787,0.013,0.016,42.792,0,95.577v303.685 c0.025,62.262,50.463,112.717,112.742,112.734h286.524c62.27-0.017,112.717-50.464,112.734-112.734V95.577 C511.992,42.792,469.212,0.013,416.428,0.004z M464.805,399.262c-0.008,18.15-7.308,34.424-19.198,46.34 c-11.916,11.891-28.19,19.19-46.34,19.198H112.742c-18.15-0.009-34.433-7.308-46.348-19.198 c-11.892-11.916-19.182-28.19-19.198-46.34V118.696h417.61V399.262z"></path>{" "}
                  <path d="M88.96,267.908h34.583c19.71,0,31.642-8.581,31.642-26.548c0-10.852-6.167-18.368-12.2-20.648v-0.268 c6.034-3.352,10.592-9.519,10.592-19.432c0-14.489-9.251-24.268-29.086-24.268H88.96c-0.796,0-1.332,0.536-1.332,1.34v88.475 C87.628,267.371,88.164,267.908,88.96,267.908z M107.338,193.495c0-0.528,0.251-0.804,0.804-0.804h13.944 c7.5,0,11.925,3.888,11.925,10.584c0,6.712-4.425,10.734-11.925,10.734h-13.944c-0.553,0-0.804-0.268-0.804-0.804V193.495z M107.338,229.955c0-0.528,0.251-0.795,0.804-0.795h15c8.061,0,12.343,4.424,12.343,11.405c0,7.097-4.282,11.396-12.343,11.396h-15 c-0.553,0-0.804-0.276-0.804-0.812V229.955z"></path>{" "}
                  <path d="M181.516,267.908h59.404c0.796,0,1.332-0.536,1.332-1.349v-14.874c0-0.813-0.536-1.341-1.332-1.341h-40.224 c-0.544,0-0.804-0.268-0.804-0.812v-71.447c0-0.804-0.528-1.34-1.341-1.34h-17.036c-0.805,0-1.332,0.536-1.332,1.34v88.475 C180.183,267.371,180.711,267.908,181.516,267.908z"></path>{" "}
                  <path d="M292.708,269.374c15.963,0,28.558-7.366,33.251-22.115c2.011-6.301,2.539-11.396,2.539-24.938 c0-13.542-0.528-18.637-2.539-24.939c-4.693-14.739-17.288-22.114-33.251-22.114c-15.956,0-28.558,7.375-33.243,22.114 c-2.02,6.302-2.556,11.397-2.556,24.939c0,13.542,0.536,18.637,2.556,24.938C264.149,262.009,276.752,269.374,292.708,269.374z M278.361,202.746c2.011-6.301,6.847-10.055,14.346-10.055c7.508,0,12.335,3.754,14.346,10.055 c1.073,3.226,1.474,7.634,1.474,19.576c0,11.924-0.402,16.357-1.474,19.567c-2.011,6.31-6.838,10.072-14.346,10.072 c-7.5,0-12.335-3.763-14.346-10.072c-1.064-3.21-1.475-7.643-1.475-19.567C276.886,210.38,277.297,205.972,278.361,202.746z"></path>{" "}
                  <path d="M387.961,269.374c16.081,0,28.685-8.171,33.251-22.794c1.6-4.952,2.263-12.46,2.263-20.505v-7.517 c0-0.788-0.536-1.333-1.332-1.333h-31.366c-0.813,0-1.349,0.545-1.349,1.333v12.888c0,0.796,0.536,1.332,1.349,1.332h12.326 c0.536,0,0.805,0.277,0.805,0.805c0,3.879-0.403,6.703-1.073,8.991c-1.878,6.026-7.777,9.386-14.614,9.386 c-7.91,0-12.88-3.763-14.891-10.072c-1.064-3.21-1.466-7.643-1.466-19.567c0-11.941,0.402-16.223,1.466-19.441 c2.011-6.302,6.847-10.19,14.631-10.19c7.5,0,12.05,3.218,15.678,9.385c0.269,0.67,0.939,0.939,1.886,0.67l14.338-6.033 c0.796-0.402,0.947-1.206,0.536-2.019c-4.299-10.995-15.419-19.425-32.439-19.425c-16.232,0-28.835,7.375-33.527,22.114 c-2.012,6.302-2.556,11.397-2.556,24.939c0,13.542,0.545,18.637,2.556,24.938C359.126,262.009,371.73,269.374,387.961,269.374z"></path>{" "}
                </g>{" "}
              </g>
            </svg>
          </div>
          <h1 className="text-6xl text-center font-bold font-sans">
            {blogs.length}
          </h1>
          <p className="text-gray-600">Total published blogs.</p>
          <hr />
          <p className="text-gray-600 "> Manage and publish blogs.</p>
        </div>
        {/* second card */}
        <div
          className=" bg-gray-100 hover:bg-gray-200 p-6 space-y-4 text-center shadow rounded-md hover:-translate-y-1 transition-transform duration-300"
          onClick={() => setActiveTab("tab-1")}>
          <div className=" inline-flex items-center justify-center w-full text-cyan-500">
            <svg
              viewBox="0 0 640 512"
              fill="currentColor"
              height="48"
              width="48">
              <path d="M41 7C31.6-2.3 16.4-2.3 7 7s-9.3 24.6 0 34l72 72c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9L41 7zm558 0l-72 72c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l72-72c9.4-9.4 9.4-24.6 0-33.9S608.3-2.4 599 7zM7 505c9.4 9.4 24.6 9.4 33.9 0l72-72c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0L7 471c-9.4 9.4-9.4 24.6 0 33.9zm592 0c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-72-72c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l72 72zM320 256c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm-107.9 80c-2.7 7.5-4.1 15.6-4.1 24 0 13.3 10.7 24 24 24h176c13.3 0 24-10.7 24-24 0-8.4-1.4-16.5-4.1-24-.5-1.4-1-2.7-1.6-4-9.4-22.3-29.8-38.9-54.3-43-3.9-.7-7.9-1-12-1h-80c-4.1 0-8.1.3-12 1-.8.1-1.7.3-2.5.5-24.9 5.1-45.1 23-53.4 46.5zm-36.3-112c26.5 0 48-21.5 48-48s-21.5-48-48-48-48 21.5-48 48 21.5 48 48 48zm-26.5 32c-29.4 0-53.3 23.9-53.3 53.3 0 14.7 11.9 26.7 26.7 26.7h56.1c8-34.1 32.8-61.7 65.2-73.6-7.5-4.1-16.2-6.4-25.3-6.4h-69.4zm368 80c14.7 0 26.7-11.9 26.7-26.7 0-29.5-23.9-53.3-53.3-53.3h-69.4c-9.2 0-17.8 2.3-25.3 6.4 32.4 11.9 57.2 39.5 65.2 73.6h56.1zM464 224c26.5 0 48-21.5 48-48s-21.5-48-48-48-48 21.5-48 48 21.5 48 48 48z" />
            </svg>
          </div>
          <h1 className="text-6xl text-center font-bold font-sans">
            {users.length ?? 0}
          </h1>
          <p className="text-gray-600"> Total Users.</p>
          <hr />
          <p className="text-gray-600">
            {" "}
            Keep track of your registered authors.
          </p>
        </div>
        {/* third card */}
        <div
          className=" bg-gray-100 hover:bg-gray-200 p-6 space-y-4  shadow rounded-md hover:-translate-y-1 transition-transform duration-300 text-center"
          onClick={() => setActiveTab("tab-2")}>
          <div className=" inline-flex items-center justify-center w-full text-cyan-500">
            <svg viewBox="0 0 24 24" fill="currentColor" height="48" width="48">
              <path d="M20 2H4a2 2 0 00-2 2v12a2 2 0 002 2h4v3c0 .55.45 1 1 1h.5c.25 0 .5-.1.7-.29L13.9 18H20c1.11 0 2-.89 2-2V4a2 2 0 00-2-2m-9.53 12L7 10.5l1.4-1.41 2.07 2.08L15.6 6 17 7.41 10.47 14z" />
            </svg>
          </div>

          <h1 className="text-6xl font-sans font-bold">
            {totalComments.length}
          </h1>

          <p className="text-gray-600 "> Total comments</p>
          <hr />
          <p className="text-gray-600 ">
            {" "}
            Moderate and respond to user comments.
          </p>
        </div>
        {/* end of cards  */}
      </div>
      <div className="text-xl  my-2  flex items-center gap-2 md:gap-4 lg:gap-6 border-b border-b-gray-400 bg-gray-100 rounded-t-md  transition-all duration-300 shadow">
        <p
          onClick={() => setActiveTab("tab-0")}
          className={`px-4 cursor-pointer py-2 hover:text-blue-600 font-medium ${
            activeTab === "tab-0" ? "border-b-2  border-b-blue-600 text- " : ""
          }`}>
          Blogs
        </p>
        <p
          onClick={() => setActiveTab("tab-1")}
          className={`px-4 cursor-pointer py-2 hover:text-blue-600 font-medium ${
            activeTab === "tab-1"
              ? "border-b-2 border-b-blue-600 text-blue-500 "
              : ""
          }`}>
          Users
        </p>
        <p
          onClick={() => setActiveTab("tab-2")}
          className={`px-4 cursor-pointer py-2 hover:text-blue-600 font-medium  ${
            activeTab === "tab-2"
              ? "border-b-2 border-b-blue-600 text-blue-500 "
              : ""
          }`}>
          Comments
        </p>
      </div>
      {/* add sections from here based on the tab */}
      {activeTab === "tab-0" && <BlogsTable blogs={blogs} />}
      {activeTab === "tab-1" && <UsersTable users={users} />}
      {activeTab === "tab-2" && <CommentsTable comments={totalComments} />}
    </section>
  );
}
