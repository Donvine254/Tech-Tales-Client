"use client";

import { generateSummary } from "@/lib/generateSummary";
import { useState } from "react";
import toast from "react-hot-toast";
import { Tooltip } from "react-tooltip";

const TagInput = ({ setBlogData, blogTags, title }) => {
  const [inputValue, setInputValue] = useState("");
  const [showAIButton, setShowAIButton] = useState(false);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag(inputValue.trim());
    }
    if (e.key === "Backspace" && !inputValue) {
      removeTag(blogTags.length - 1);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (value.includes(",")) {
      const newTags = value
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag);
      newTags.forEach((tag) => addTag(tag));
      setInputValue("");
    } else {
      setInputValue(value);
    }
  };

  const addTag = (tag) => {
    if (tag && !blogTags.includes(tag) && blogTags.length < 4) {
      const updatedTags = [...blogTags, tag];
      setBlogData((prev) => ({
        ...prev,
        tags: updatedTags.join(", "),
      }));
    }
    setInputValue("");
  };

  const removeTag = (index) => {
    const updatedTags = blogTags.filter((_, i) => i !== index);
    setBlogData((prev) => ({
      ...prev,
      tags: updatedTags.join(", "),
    }));
  };

  function handleClick(tag, index) {
    setInputValue(tag);
    removeTag(index);
    const input = document.getElementById("tag-input");
    setTimeout(() => {
      const input = document.getElementById("tag-input");
      if (input) input.focus();
    }, 10);
  }

  async function generateTags() {
    if (!title || title === "") {
      toast.error("Kindly write a title first");
      setShowAIButton(false);
      return false;
    }
    const button = document.getElementById("generateTags");
    button.classList.add("animate-spin");
    const requestData = {
      message:
        "Tags help search engines categorize and index your content, making it more likely to appear in relevant search results. Tags also help readers to quickly find content related to specific topics or interests. For this blog title, generate four tags and return them as comma separated sentence in this format: 'tag1,tag2, tag3,tag4'. Do not say here are the four tags, just be direct to the point",
      body: title,
    };
    try {
      setBlogData((prev) => ({
        ...prev,
        tags: "",
      }));
      const data = await generateSummary(requestData);
      setBlogData((prev) => ({
        ...prev,
        tags: data.message,
      }));
      toast.success("Tags generated successfully");
      setShowAIButton(false);
      button.classList.remove("animate-spin");
    } catch (error) {
      toast.error("Failed to generate tags");
      button.classList.remove("animate-spin");
    }
  }

  return (
    <section className="flex flex-wrap items-center gap-2 my-2 border-b relative  ">
      {blogTags?.map((tag, index) => (
        <div
          key={index}
          className={`flex items-center px-2 mb-1 border border-blue-500  rounded-md highlight-tag-${index}`}>
          <span onClick={() => handleClick(tag, index)}> # {tag}</span>
          <button
            className="ml-2 text-lg font-semibold  hover:text-red-500"
            onClick={() => removeTag(index)}
            title="remove">
            &times;
          </button>
        </div>
      ))}

      <input
        type="text"
        required
        name="tag"
        id="tag-input"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onInput={() => setShowAIButton(false)}
        maxLength={15}
        onFocus={() => {
          if (title) setShowAIButton(true);
        }}
        disabled={blogTags.length >= 4}
        placeholder={
          blogTags.length >= 4
            ? ""
            : blogTags.length >= 1
            ? "Add another"
            : "Add up to 4 tags"
        }
        className="p-1 mb-1 bg-transparent outline-none  text-lg placeholder-gray-600"
      />
      {showAIButton && title && (
        <button
          id="generateTags"
          className="text-sm   absolute right-5 hover:bg-gray-900 px-1 py-0.5 rounded-md "
          type="button"
          onClick={generateTags}
          data-tooltip-id="generate-tags">
          <svg viewBox="0 0 576 512" fill="#FF822D" height="14" width="14">
            <path d="M234.7 42.7L197 56.8c-3 1.1-5 4-5 7.2s2 6.1 5 7.2l37.7 14.1 14.1 37.7c1.1 3 4 5 7.2 5s6.1-2 7.2-5l14.1-37.7L315 71.2c3-1.1 5-4 5-7.2s-2-6.1-5-7.2l-37.7-14.1L263.2 5c-1.1-3-4-5-7.2-5s-6.1 2-7.2 5l-14.1 37.7zM46.1 395.4c-18.7 18.7-18.7 49.1 0 67.9l34.6 34.6c18.7 18.7 49.1 18.7 67.9 0l381.3-381.4c18.7-18.7 18.7-49.1 0-67.9l-34.6-34.5c-18.7-18.7-49.1-18.7-67.9 0L46.1 395.4zM484.6 82.6l-105 105-23.3-23.3 105-105 23.3 23.3zM7.5 117.2C3 118.9 0 123.2 0 128s3 9.1 7.5 10.8L64 160l21.2 56.5c1.7 4.5 6 7.5 10.8 7.5s9.1-3 10.8-7.5L128 160l56.5-21.2c4.5-1.7 7.5-6 7.5-10.8s-3-9.1-7.5-10.8L128 96l-21.2-56.5c-1.7-4.5-6-7.5-10.8-7.5s-9.1 3-10.8 7.5L64 96 7.5 117.2zm352 256c-4.5 1.7-7.5 6-7.5 10.8s3 9.1 7.5 10.8L416 416l21.2 56.5c1.7 4.5 6 7.5 10.8 7.5s9.1-3 10.8-7.5L480 416l56.5-21.2c4.5-1.7 7.5-6 7.5-10.8s-3-9.1-7.5-10.8L480 352l-21.2-56.5c-1.7-4.5-6-7.5-10.8-7.5s-9.1 3-10.8 7.5L416 352l-56.5 21.2z" />
          </svg>
          <Tooltip
            id="generate-tags"
            content="generate tags with AI"
            variant="info"
            style={{ padding: "5px" }}
          />
        </button>
      )}
    </section>
  );
};

export default TagInput;
