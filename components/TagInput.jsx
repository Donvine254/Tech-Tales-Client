"use client";

import { useState } from "react";

const TagInput = ({ setBlogData, blogTags }) => {
  const [tags, setTags] = useState(blogTags);
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag(inputValue.trim());
    }
    if (e.key === "Backspace" && !inputValue) {
      removeTag(tags.length - 1);
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
    if (tag && !tags.includes(tag) && tags.length < 4) {
      const updatedTags = [...tags, tag];
      setTags(updatedTags);
      setBlogData((prev) => ({
        ...prev,
        tags: updatedTags.join(", "),
      }));
    }
    setInputValue("");
  };

  const removeTag = (index) => {
    const updatedTags = tags.filter((_, i) => i !== index);
    setTags(updatedTags);
    setBlogData((prev) => ({
      ...prev,
      tags: updatedTags.join(", "),
    }));
  };

  return (
    <section className="flex flex-wrap items-center gap-2 my-2 border-b ">
      {tags.map((tag, index) => (
        <div
          key={index}
          className="flex items-center px-2 mb-1  bg-blue-600 text-white rounded-md">
          {tag}
          <button
            className="ml-2 text-lg font-semibold text-white hover:text-red-500"
            onClick={() => removeTag(index)}
            title="remove">
            &times;
          </button>
        </div>
      ))}

      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        disabled={tags.length >= 4}
        placeholder={
          tags.length >= 4
            ? ""
            : tags.length >= 1
            ? "Add another"
            : "Add up to 4 tags"
        }
        className="p-1 mb-1 bg-transparent outline-none text-lg placeholder-gray-600"
      />
    </section>
  );
};

export default TagInput;
