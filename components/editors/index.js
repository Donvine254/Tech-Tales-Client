export const handleImageUpload = (blobInfo, progress) =>
  new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.withCredentials = false;
    xhr.open("POST", "https://api.cloudinary.com/v1_1/dipkbpinx/image/upload");

    // Update progress as the image is uploading
    xhr.upload.onprogress = (e) => {
      progress(((e.loaded / e.total) * 100).toFixed(0));
    };

    xhr.onload = () => {
      if (xhr.status === 403) {
        reject({ message: "HTTP Error: " + xhr.status, remove: true });
        return;
      }

      if (xhr.status < 200 || xhr.status >= 300) {
        reject("HTTP Error: " + xhr.status);
        return;
      }

      const json = JSON.parse(xhr.responseText);

      if (!json || typeof json.secure_url !== "string") {
        reject("Invalid JSON: " + xhr.responseText);
        return;
      }

      resolve(json.secure_url); // Return the Cloudinary image URL
    };

    xhr.onerror = () => {
      reject(
        "Image upload failed due to a XHR Transport error. Code: " + xhr.status
      );
    };

    // Create a FormData object to send the image file
    const formData = new FormData();
    formData.append("file", blobInfo.blob(), blobInfo.filename());
    formData.append("cloud_name", "dipkbpinx");
    formData.append("upload_preset", "ekomtspw");
    formData.append("folder", "Tech_Tales_Blog_Images");

    xhr.send(formData); // Send the form data with the image file
  });
