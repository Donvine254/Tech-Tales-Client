let options = [
  "ai",
  "censorship",
  "governments",
  "ai regulation",
  "css",
  "frontend",
  "web-dev",
  "beginner",
  "webdev",
  "html",
  "beginners",
  "nextjs",
  "react",
  "authentication",
  "otp",
  "security",
  "web dev",
  "programming",
  "javascript",
  "python",
  "c++",
  "prisma",
  "postgresql",
  "backend",
  "server",
  "typography",
  "fonts",
  "front-end",
  "gemini",
  "node",
  "resources",
  "jwt",
  "server-actions",
  "vercel",
  "rendering",
  "forms",
  "css-frameworks",
  "video-generation",
  "deep-fakes",
  "crime",
  "css tricks",
  "developers",
  "jobs",
  "chatgpt",
  "context api",
  "data flow",
  "education",
  "dishonesty",
  "ruby",
  "ruby on rails",
  "hosting",
  "web service",
  "fetch",
  "caching",
  "revalidate",
  "recaptcha",
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
