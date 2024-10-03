const languages = [
  { text: "HTML/XML", value: "haml" },
  { text: "JavaScript", value: "javascript" },
  { text: "TypeScript", value: "typescript" },
  { text: "Json", value: "json" },
  { text: "CSS", value: "css" },
  { text: "Bash", value: "bash" },
  { text: "PHP", value: "php" },
  { text: "Ruby", value: "ruby" },
  { text: "Python", value: "python" },
  { text: "Java", value: "java" },
  { text: "C", value: "c" },
  { text: "C#", value: "csharp" },
  { text: "C++", value: "cpp" },
  { text: "Go", value: "go" },
  { text: "Kotlin", value: "kotlin" },
  { text: "Markdown", value: "markdown" },
  { text: "PowerShell", value: "powershell" },
  { text: "SQL", value: "sql" },
  { text: "Swift", value: "swift" },
  { text: "YAML", value: "yaml" },
];

tinymce.PluginManager.add("advcodesample", (editor) => {
  const createCustomDialog = () => {
    const dialogHTML = `
          <dialog
          id="advcodesampleDialog"
          style="
            width: 95%;
            height: 90%;
            background-color: #fff;
            border: 1px solid #ccc;
            border-radius: 8px;
            padding: 10px;
            position:relative;
          ">
          <div
            style="
              display: flex;
              justify-content: space-between;
              align-items: center;
              margin: 0;
              padding: 0;
              height: fit-content;
            ">
            <p
              style="
                font-size: 1.2rem;
                font-family: Poppins;
                font-weight: normal;
                margin: 0;
                line-height: 1;
              ">
              Insert / Edit Code Sample
            </p>
            <button
              id="closeBtn"
              style="
                padding: 0.25rem;
                cursor: pointer;
                font-size: 1.5rem;
                z-index: 50;
                background-color: transparent;
                outline: none;
                border: none;
              "
              title="Close"
              onmouseenter="this.style.color='#ef4444';"
              onmouseleave="this.style.color='#222';">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round">
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
          </div>
          <div style="margin: 0">
            <p style="color: #696969; margin: 0; line-height: 1">Language</p>
            <select
              id="language"
              style="
                max-width: 100%;
                width:100%;
                padding: 10px 5px;
                font: 14px;
                border-radius: 8px;
                margin: 5px 0;
                border: 1px solid #ccc;
              "
              onfocus="this.style.border='2px solid #006ce7'; this.style.outline='none';"
              onblur="this.style.border='1px solid #ccc';">
              ${languages
                .map(
                  (lang) => `
              <option value="${lang.value}">${lang.text}</option>
              `
                )
                .join("")}
            </select>
          </div>
          <div
      id="codesample"
      style="
        max-width: 100%;
        height: calc(90% - 120px);
        padding: 5px;
        scroll-behavior: smooth;
        border-radius: 5px;
        border: 2px solid #ccc; 
        margin-bottom: 10px;
        transition: border-color 0.3s ease, outline-color 0.3s ease;
      "
      z-index="1000"
      tabindex="0"
    ></div>
          <div
            style="
              display: flex;
              flex-wrap: wrap;
              gap: 10px;
              align-items: center;
              float:right;
            ">
            <div id="format-btns" style="display:flex; gap:10px; align-items:center; flex-wrap:wrap">
              <button
                id="saveBtn"
                class="dialog-btn"
                style="
                  border-radius: 5px;
                  padding: 5px 10px;
                  border: none;
                  cursor: pointer;
                  background-color: #006ce7;
                  color: white;
                  height:32px;
                ">
                Save
              </button>
              <button
                id="formatBtn"
                class="dialog-btn"
                style="
                  border-radius: 5px;
                  padding: 5px 10px;
                  border: none;
                  cursor: pointer;
                  display: inline-flex;
                  align-items: center;
                  gap: 2px;
                  height:32px;
                  background-color: #e5e7eb;
                "
                onmouseover="this.style.backgroundColor='#006ce7'; this.style.color='white';"
                onmouseout="this.style.backgroundColor='#e5e7eb'; this.style.color='#222';">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="lucide lucide-zap">
                  <path
                    d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" /></svg>
      Format Code
              </button>
            </div>
            <div id="font-size-btns" style="display:flex; gap:10px; align-items:center; flex-wrap:wrap">
              <button
                id="themeBtn"
                class="dialog-btn"
                style="
                  border-radius: 5px;
                  padding: 5px 10px;
                  border: none;
                  cursor: pointer;
                  background-color: #222;
                  color: #fff;
                  height:32px;
                ">
                Dark Theme
              </button>
              <button
                id="fontPlusBtn"
                class="dialog-btn"
                title="Increase font size"
                style="
                  border-radius: 5px;
                  padding: 5px 10px;
                  border: none;
                  cursor: pointer;
                  background-color: #e5e7eb;
                  height:32px;
                ">
                T+
              </button>
              <button
                id="fontMinusBtn"
                class="dialog-btn"
                title="Decrease font size"
                style="
                  border-radius: 5px;
                  padding: 5px 10px;
                  border: none;
                  cursor: pointer;
                  background-color: #e5e7eb;
                  height:32px;
                ">
                T-
              </button>
            </div>
          </div>
        </dialog>
        `;

    document.body.insertAdjacentHTML("beforeend", dialogHTML);

    // Add event listeners to the buttons
    const toggleTheme = () => {
      const aceEditor = ace.edit("codesample");
      const currentTheme = aceEditor.getTheme();
      const themeButton = document.getElementById("themeBtn");

      if (currentTheme === "ace/theme/tomorrow") {
        aceEditor.setTheme("ace/theme/tomorrow_night");
        themeButton.textContent = "Light Theme";
        themeButton.style.backgroundColor = "#f2f3f4";
        themeButton.style.color = "#333";
      } else {
        aceEditor.setTheme("ace/theme/tomorrow");
        themeButton.textContent = "Dark Theme";
        themeButton.style.backgroundColor = "#222";
        themeButton.style.color = "#fff";
      }
    };
    document
      .getElementById("fontPlusBtn")
      .addEventListener("click", increaseFontSize);
    document
      .getElementById("fontMinusBtn")
      .addEventListener("click", decreaseFontSize);
    document.getElementById("themeBtn").addEventListener("click", toggleTheme);
    document.getElementById("formatBtn").addEventListener("click", () => {
      ace.config.loadModule("ace/ext/beautify", function (beautify) {
        beautify.beautify(ace.edit("codesample").session);
      });
    });
    document
      .getElementById("language")
      .addEventListener("click", switchLanguage);
    document.getElementById("saveBtn").addEventListener("click", () => {
      const aceEditor = ace.edit("codesample");
      const languageInput = document.getElementById("language");
      const language = languageInput.value;
      const codeContent = escapeHTML(aceEditor.getValue());
      editor.insertContent(
        `<pre class="language-${language}"><code>${codeContent}</code></pre>`
      );
      closeCustomDialog();
    });

    document
      .getElementById("closeBtn")
      .addEventListener("click", closeCustomDialog);
  };
  //function to escape html
  function escapeHTML(html) {
    const text = document.createElement("textarea");
    text.textContent = html;
    return text.innerHTML;
  }
  //function to increase font size
  const minFontSize = 10;
  const maxFontSize = 26;
  let fontSize = 12;
  const increaseFontSize = () => {
    const aceEditor = ace.edit("codesample");
    if (fontSize < maxFontSize) {
      fontSize += 2;
      aceEditor.setFontSize(fontSize);
    }
  };
  const decreaseFontSize = () => {
    const aceEditor = ace.edit("codesample");
    if (fontSize > minFontSize) {
      fontSize -= 2;
      aceEditor.setFontSize(fontSize);
    }
  };
  //function to switch languages
  function switchLanguage(event) {
    const aceEditor = ace.edit("codesample");
    const selectedLanguage = event.target.value;
    console.log(selectedLanguage);
    aceEditor.session.setMode(`ace/mode/${selectedLanguage}`);
  }

  // Function to show the dialog
  const showCustomDialog = () => {
    createCustomDialog();
    ace.config.loadModule("ace/ext/language_tools", function () {
      const aceEditor = ace.edit("codesample");
      aceEditor.session.setMode("ace/mode/html");
      aceEditor.setOptions({
        wrap: true,
        indentedSoftWrap: false,
        enableAutoIndent: true,
        selectionStyle: "text",
        behavioursEnabled: true,
        showLineNumbers: true,
        showPrintMargin: false,
        enableBasicAutocompletion: true,
        enableSnippets: true,
        enableLiveAutocompletion: true,
        autoScrollEditorIntoView: true,
        foldStyle: "markbegin",
        showFoldWidgets: true,
        fontSize: "14px",
        tabSize: 2,
        theme: "ace/theme/tomorrow",
      });
      aceEditor.setValue(editor.getContent({ source_code: true }));
    });

    document.getElementById("advcodesampleDialog").showModal();
  };

  // Function to close the dialog
  const closeCustomDialog = () => {
    document.getElementById("advcodesampleDialog").remove();
  };

  editor.ui.registry.addButton("advcodesample", {
    icon: "code-sample",
    tooltip: "Insert/Edit Code Sample",
    shortcut: "meta+alt+c",
    onAction: showCustomDialog,
  });
  editor.ui.registry.addMenuItem("advcodesample", {
    text: "Insert/Edit Code Sample",
    icon: "code-sample",
    onAction: showCustomDialog,
  });
});
