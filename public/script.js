let options = [
  "ai",
  "ai regulation",
  "backend",
  "beginner",
  "beginners",
  "caching",
  "chatgpt",
  "context api",
  "censorship",
  "css",
  "css-frameworks",
  "css tricks",
  "data flow",
  "deep-fakes",
  "developers",
  "dishonesty",
  "education",
  "fetch",
  "fonts",
  "frontend",
  "front-end",
  "gemini",
  "governments",
  "html",
  "javascript",
  "jobs",
  "jwt",
  "node",
  "nextjs",
  "otp",
  "postgresql",
  "prisma",
  "programming",
  "react",
  "recaptcha",
  "rendering",
  "ruby",
  "ruby on rails",
  "security",
  "server",
  "server-actions",
  "typography",
  "vercel",
  "video-generation",
  "web dev",
  "web service",
];
const fetchOptions = async () =>
  await fetch("https://techtales.vercel.app/api/blogs/tags").then((response) =>
    response.json()
  );

try {
  const newOptions = await fetchOptions();
  options = Array.from(new Set([...options, ...newOptions]));
} catch (error) {
  console.error("Failed to fetch options:", error);
}

const input = document.getElementById("combobox-input");
const optionsContainer = document.getElementById("options-container");

input.addEventListener("input", function () {
  const query = input.value.toLowerCase();
  optionsContainer.innerHTML = ""; // Clear previous options

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(query)
  );

  if (filteredOptions.length > 0) {
    filteredOptions.forEach((option) => {
      const optionElement = document.createElement("div");
      optionElement.classList.add("option");
      optionElement.textContent = option;
      optionElement.addEventListener("click", function () {
        input.value = option;
        input.focus();
        optionsContainer.innerHTML = "";
        optionsContainer.style.display = "none";
      });
      optionsContainer.appendChild(optionElement);
    });
    optionsContainer.style.display = "block";
  } else {
    const noOptionsElement = document.createElement("div");
    noOptionsElement.classList.add("no-options");
    noOptionsElement.textContent = "No Results Found";
    optionsContainer.appendChild(noOptionsElement);
    optionsContainer.style.display = "block";
  }
});

document.addEventListener("click", function (e) {
  if (!input.contains(e.target) && !optionsContainer.contains(e.target)) {
    optionsContainer.style.display = "none";
  }
});
