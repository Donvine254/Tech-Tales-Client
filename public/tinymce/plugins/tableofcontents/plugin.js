tinymce.PluginManager.add("tableofcontents", (editor) => {
  const generateTOC = () => {
    const content = editor.getContent();
    const tocContainer = document.createElement("div");
    tocContainer.className = "mce-toc";
    const tocHeading = "Table of Contents";

    // Use a unique heading class to avoid including it in the TOC
    tocContainer.innerHTML = `<h2 class="toc-title">${tocHeading}</h2>`;

    const tocWrapper = document.createElement("div");
    tocWrapper.className = "toc-wrapper";

    let h1Count = 0,
      h2Count = 0,
      h3Count = 0;

    content.replace(
      /<(h[1-6])([^>]*)>(.*?)<\/\1>/gi,
      (match, tag, attrs, text) => {
        // Skip the TOC heading itself
        if (text.trim() === tocHeading) return match;
        const idMatch = attrs.match(/id="([^"]+)"/);
        const id = idMatch
          ? idMatch[1]
          : text.trim().toLowerCase().replace(/\s+/g, "-");
        // Add ID to heading if missing
        if (id && !attrs.includes(`id="${id}"`)) {
          const headingEl = editor.dom
            .select(tag)
            .find((el) => el.innerHTML.includes(text));
          if (headingEl) editor.dom.setAttrib(headingEl, "id", id);
        }
        // Create the TOC item
        const tocItem = document.createElement("div");
        tocItem.className = `toc-item toc-${tag}`;
        let numbering = "";
        switch (tag) {
          case "h1":
            h1Count++;
            h2Count = 0;
            h3Count = 0;
            numbering = `${h1Count}. `;
            break;
          case "h2":
            h2Count++;
            numbering = `${h1Count}.${h2Count} `;
            break;
          case "h3":
            h3Count++;
            numbering = `${h1Count}.${h2Count}.${h3Count} `;
            break;
          default:
            numbering = ""; // Optional: add support for h4-h6 numbering
        }

        tocItem.innerHTML = `<a href="#${id}">${numbering}${text}</a>`;
        tocWrapper.appendChild(tocItem);
      }
    );

    tocContainer.appendChild(tocWrapper);
    return tocContainer.outerHTML;
  };

  const insertOrUpdateTOC = () => {
    const tocHTML = generateTOC();
    const existingTOC = editor.dom.select(".mce-toc");

    if (existingTOC.length) {
      editor.dom.setHTML(existingTOC[0], tocHTML); // Update TOC
    } else {
      editor.insertContent(tocHTML); // Insert new TOC
    }
  };

  editor.ui.registry.addMenuItem("tableofcontents", {
    text: "Table of contents",
    icon: "unordered-list",
    onAction: () => insertOrUpdateTOC()
  });
});