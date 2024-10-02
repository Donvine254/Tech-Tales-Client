tinymce.PluginManager.add("code", (editor) => {
  const createCustomDialog = () => {
    const dialogHTML = `
     <dialog id="customDialog" style="width:100%;height:85%;background-color:#fff;border:1px solid #ccc;border-radius:8px;padding:5px 10px;">
  <div style="display:flex;justify-content:space-between;align-items:center;">
    <p style="font-size:1.2rem;font-family:Poppins;font-weight:normal;color:#696969">
      Source Code
    </p>
    <button id="closeDialogBtn" style="padding:0.25rem;cursor:pointer;font-size:1.5rem;z-index:50;background-color:transparent;outline:none;border:none;" title="Close" onmouseenter="this.style.color='#ef4444';" onmouseleave="this.style.color='#222';"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg></button>
  </div>
  <div id="editor" style="width:99%;height:400px;max-height:75%;padding:5px;scroll-behavior:smooth;border-radius:5px;border:2px solid #006ce7;margin-bottom:10px;"></div>
  <div style="display:inline-flex; flex-wrap:wrap; gap:10px; align-items:center;">
    <div id="format-btns">
  <button id="saveCode" class="dialog-btn" style="border-radius:5px;padding:5px 10px;border:none;cursor:pointer;background-color: #006ce7;
  color: white;">Save</button>
  <button id="format" class="dialog-btn" style="margin-left:8px;border-radius:5px;padding:5px 10px;border:none;cursor:pointer;display:inline-flex;align-items:center;gap:2px;background-color:#e5e7eb;"  onmouseover="this.style.backgroundColor='#006ce7'; this.style.color='white';" 
onmouseout="this.style.backgroundColor='#e5e7eb'; this.style.color='#222';"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-zap"><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" /></svg>Format Code</button>
</div>
<div id="font-size-btns">
  <button id="theme" class="dialog-btn" style="margin-left:8px;border-radius:5px;padding:5px 10px;border:none;cursor:pointer;background-color:#222; color:#fff;">Dark Theme</button>
  <button id="increaseFontBtn" class="dialog-btn" title="Increase font size" style="margin-left:8px;border-radius:5px;padding:5px 10px;border:none;cursor:pointer;background-color:#e5e7eb;">T+</button>
  <button id="decreaseFontBtn" class="dialog-btn" title="Decrease font size" style="margin-left:8px;border-radius:5px;padding:5px 10px;border:none;cursor:pointer;background-color:#e5e7eb;">T-</button>
</div>
  </div>
</dialog>
    `;

    document.body.insertAdjacentHTML("beforeend", dialogHTML);

    // Add event listeners to the buttons
    const toggleTheme = () => {
      const aceEditor = ace.edit("editor");
      const currentTheme = aceEditor.getTheme();
      const themeButton = document.getElementById("theme");

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
      .getElementById("increaseFontBtn")
      .addEventListener("click", increaseFontSize);
    document
      .getElementById("decreaseFontBtn")
      .addEventListener("click", decreaseFontSize);
    document.getElementById("theme").addEventListener("click", toggleTheme);
    document.getElementById("format").addEventListener("click", () => {
      ace.config.loadModule("ace/ext/beautify", function (beautify) {
        beautify.beautify(ace.edit("editor").session);
      });
    });

    document.getElementById("saveCode").addEventListener("click", () => {
      const aceEditor = ace.edit("editor");
      editor.setContent(aceEditor.getValue());
      closeCustomDialog();
    });

    document
      .getElementById("closeDialogBtn")
      .addEventListener("click", closeCustomDialog);
  };

  //function to increase font size
  const minFontSize = 10;
  const maxFontSize = 26;
  let fontSize = 12;
  const increaseFontSize = () => {
    const aceEditor = ace.edit("editor");
    if (fontSize < maxFontSize) {
      fontSize += 2;
      aceEditor.setFontSize(fontSize);
    }
  };

  const decreaseFontSize = () => {
    const aceEditor = ace.edit("editor");
    if (fontSize > minFontSize) {
      fontSize -= 2;
      aceEditor.setFontSize(fontSize);
    }
  };

  // Function to show the dialog
  const showCustomDialog = () => {
    ace.config.loadModule("ace/ext/language_tools", function () {
      const aceEditor = ace.edit("editor");
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
    document.getElementById("customDialog").showModal();
  };
  const closeCustomDialog = () => {
    document.getElementById("customDialog").close();
  };

  createCustomDialog();
  editor.ui.registry.addButton("code", {
    icon: "sourcecode",
    tooltip: "Source code",
    shortcut: "meta+Space",
    onAction: showCustomDialog,
  });
  editor.ui.registry.addMenuItem("code", {
    text: "Source Code",
    icon: "sourcecode",
    onAction: showCustomDialog,
  });
  editor.on("keydown", function (e) {
    if (e.key === " " && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      document.getElementById("customDialog").showModal();
    }
  });
});
