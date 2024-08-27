import React, { useRef } from "react";
import { Tooltip } from "react-tooltip";

export default function ColorPicker({ color, setColor }) {
  const colorInputRef = useRef(null);

  const handleIconClick = () => {
    if (colorInputRef.current) {
      colorInputRef.current.click();
    }
  };
  const handleColorChange = (e) => {
    setColor(e.target.value);
  };

  return (
    <>
      <input
        type="color"
        id="color"
        hidden
        name="color"
        onInput={handleColorChange}
        ref={colorInputRef}
        style={{ display: "none" }} // Hide the color input
      />
      <svg
        onClick={handleIconClick}
        fill="none"
        viewBox="0 0 24 24"
        height="24"
        width="24"
        className="bg-white"
        data-tooltip-id="color"
        style={{
          // Use inline style for dynamic background color
          color: color,
          cursor: "pointer",
          padding: "4px",
          border: "1px solid white",
          borderRadius: "50%",
        }}>
        <path
          fill="currentColor"
          d="M20.385 2.879a3 3 0 00-4.243 0L14.02 5l-.707-.708a1 1 0 10-1.414 1.415l5.657 5.656A1 1 0 0018.97 9.95l-.707-.707 2.122-2.122a3 3 0 000-4.242z"
        />
        <path
          fill="currentColor"
          fillRule="evenodd"
          d="M11.93 7.091L4.152 14.87a3.001 3.001 0 00-.587 3.415L2 19.85l1.414 1.415 1.565-1.566a3.001 3.001 0 003.415-.586l7.778-7.778L11.93 7.09zm1.414 4.243L11.93 9.92l-6.364 6.364a1 1 0 001.414 1.414l6.364-6.364z"
          clipRule="evenodd"
        />
      </svg>
      <Tooltip
        id="color"
        variant="info"
        content="update styling"
        position="bottom"
        style={{ padding: "5px" }}
      />
    </>
  );
}
