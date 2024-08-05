import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { formatDate } from "./utils";
export async function downloadPDF(title, body, author, date, image) {
  const doc = new jsPDF("p", "mm", "a4");
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = `
    <div style="text-align: center; margin-bottom: 20px;">
      ${
        image
          ? `<img src="${image}" alt="blog-image" style="width: 100%; height: auto;"/>`
          : ""
      }
      <h1 style="font-size: 18px; font-weight: bold;">${title}</h1>
      <p style="font-style: italic;">By ${author} published on ${formatDate(
    date
  ).toLocaleDateString()}</p>
    </div>
    <div>${body}</div>
  `;

  document.body.appendChild(tempDiv);

  const canvas = await html2canvas(tempDiv);
  const imgData = canvas.toDataURL("image/png");
  const imgProps = doc.getImageProperties(imgData);
  const pdfWidth = doc.internal.pageSize.getWidth();
  const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
  doc.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

  document.body.removeChild(tempDiv);
  doc.save(`${title}.pdf`);
}
