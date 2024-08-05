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
  doc.setFont("tahoma");
  doc.text(title, 10, y);
  y += 10;

  // Add Author and Date
  doc.setFontSize(12);
  doc.setFont("helvetica");
  doc.text(`By ${author}. Published on ${formatDate(date)}`, 10, y);
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
      addBody(y);
    };
  } else {
    addBody(y);
  }

  function addBody(startY) {
    // Convert HTML body to plain text
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = body;
    const plainTextBody = tempDiv.innerText || tempDiv.textContent;

    // Split the body text into lines
    const lines = doc.splitTextToSize(plainTextBody, pageWidth - 20);
    let y = startY;
    lines.forEach((line) => {
      if (y + 10 > pageHeight) {
        doc.addPage();
        y = 10;
      }
      doc.text(line, 10, y);
      y += 10;
    });

    // Save the PDF
    doc.save(`${title}.pdf`);
  }
}
