const options = [
  "ai",
  "html",
  "css",
  "react",
  "rails",
  "nextjs",
  "ruby on rails",
  "web dev",
  "backend",
  "hosting",
  "python",
  "javascript",
  "education",
  "authentication",
  "prisma",
  "crime",
  "chatgpt",
  "gemini",
  "security",
  "typography",
  "fonts",
  "node",
  "javascript",
  "vercel",
  "rendering",
  "server",
  "server-actions",
  "postgresql",
  "css tricks",
];

const input = document.getElementById("combobox-input");
const optionsContainer = document.getElementById("options-container");

input.addEventListener("input", function () {
  const query = input.value.toLowerCase();
  console.log(query);
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
