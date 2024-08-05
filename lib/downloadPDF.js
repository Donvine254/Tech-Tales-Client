import jsPDF from "jspdf";
import { formatDate } from "./utils";
import toast from "react-hot-toast";

export async function downloadPDF(title, body, author, date, image) {
  toast.success("Processing PDF file...");

  const doc = new jsPDF("p", "mm", "a4");
  const pageHeight = doc.internal.pageSize.height;
  const pageWidth = doc.internal.pageSize.width;
  let y = 10; // Starting y position

  // Add Title
  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.text(title, 10, y);
  y += 10;

  // Add Author and Date
  doc.setFontSize(12);
  doc.setFont("helvetica", "italic");
  doc.text(`By ${author} published on ${formatDate(date)}`, 10, y);
  y += 10;

  // Add Image if available
  if (image) {
    const img = new Image();
    img.src = image;
    img.onload = function () {
      const imgWidth = pageWidth - 20;
      const imgHeight = (img.height * imgWidth) / img.width;
      if (y + imgHeight > pageHeight) {
        doc.addPage();
        y = 10;
      }
      doc.addImage(img, "JPEG", 10, y, imgWidth, imgHeight);
      y += imgHeight + 10;
      addFormattedBody(y);
    };
  } else {
    addFormattedBody(y);
  }

  function addFormattedBody(startY) {
    // Convert HTML body to a DOM object
    const parser = new DOMParser();
    const docBody = parser.parseFromString(body, "text/html").body;

    let y = startY;

    function addText(text, fontSize, fontStyle, color) {
      doc.setFontSize(fontSize);
      doc.setFont("helvetica", fontStyle);
      doc.setTextColor(color || 0);
      const lines = doc.splitTextToSize(text, pageWidth - 20);
      lines.forEach((line) => {
        if (y + 10 > pageHeight) {
          doc.addPage();
          y = 10;
        }
        doc.text(line, 10, y);
        y += 10;
      });
    }

    function parseElement(element) {
      switch (element.tagName.toLowerCase()) {
        case "h1":
          addText(element.innerText, 18, "bold");
          break;
        case "h2":
        case "h3":
        case "h4":
          addText(element.innerText, 14, "bold");
          break;
        case "p":
          addText(element.innerText, 12, "normal");
          break;
        case "a":
          addText(element.innerText, 12, "normal", [30, 64, 175]);
          break;
        case "ul":
        case "ol":
          element.querySelectorAll("li").forEach((li) => {
            addText(`• ${li.innerText}`, 12, "italic");
          });
          break;
        case "pre":
          element.querySelectorAll("code").forEach((code) => {
            addText(code.innerText, 10, "italic");
          });
          break;
        default:
          addText(element.innerText, 12, "normal");
      }
    }

    Array.from(docBody.children).forEach((child) => {
      parseElement(child);
    });

    // Save the PDF
    doc.save(`${title}.pdf`);
  }
}
