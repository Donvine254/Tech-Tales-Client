import React, { useRef, useEffect } from "react";

export default function CodeInput({ setCode, loading }) {
  const inputsRef = useRef([]);
  useEffect(() => {
    const form = document.querySelector("#verify-token");
    const inputs = inputsRef.current;
    const handleInput = (e) => {
      const input = e.target;
      const newCodeArray = Array.from(inputs).map((input) => input.value);
      setCode(newCodeArray.join(""));
      const nextInput = input.nextElementSibling;
      if (nextInput && input.value) {
        nextInput.focus();
        if (nextInput.value) {
          nextInput.select();
        }
      }
    };

    const handlePaste = (e) => {
      e.preventDefault();
      const paste = e.clipboardData.getData("text");
      setCode(paste);
      inputs.forEach((input, i) => {
        input.value = paste[i] || "";
      });
    };

    const handleBackspace = (e) => {
      const input = e.target;
      if (input.value) {
        input.value = "";
        setCode(
          Array.from(inputs)
            .map((input) => input.value)
            .join("")
        );
        return;
      }
      if (input.previousElementSibling) {
        input.previousElementSibling.focus();
      }
    };

    const handleArrowLeft = (e) => {
      const previousInput = e.target.previousElementSibling;
      if (previousInput) previousInput.focus();
    };

    const handleArrowRight = (e) => {
      const nextInput = e.target.nextElementSibling;
      if (nextInput) nextInput.focus();
    };

    inputs.forEach((input) => {
      input.addEventListener("focus", (e) => {
        setTimeout(() => {
          e.target.select();
        }, 0);
      });

      input.addEventListener("keydown", (e) => {
        switch (e.keyCode) {
          case 8: // Backspace
            handleBackspace(e);
            break;
          case 37: // ArrowLeft
            handleArrowLeft(e);
            break;
          case 39: // ArrowRight
            handleArrowRight(e);
            break;
          default:
        }
      });
    });

    form.addEventListener("input", handleInput);
    inputs[0].addEventListener("paste", handlePaste);

    return () => {
      return () => {
        form.removeEventListener("input", handleInput);
        if (inputs[0]) {
          inputs[0].removeEventListener("paste", handlePaste);
        }
      };
    };
  }, [setCode]);

  return (
    <div className="flex items-center justify-between gap-1">
      {Array(6)
        .fill(0)
        .map((_, index) => (
          <input
            key={index}
            type="tel"
            maxLength="1"
            pattern="[0-9]"
            disabled={loading}
            placeholder="—"
            required
            className="h-10 bg-background text-base disabled:cursor-not-allowed disabled:opacity-50 text-center  w-1/6 px-3 py-2 border border-gray-300 rounded-md invalid:border-red-400"
            ref={(el) => (inputsRef.current[index] = el)}
          />
        ))}
    </div>
  );
}
