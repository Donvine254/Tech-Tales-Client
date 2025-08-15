export const createCroppedImage = (
  imageSrc: string,
  crop: { x: number; y: number; width: number; height: number },
  mimeType: string = "image/jpeg", // allow passing original type
  originalFileName?: string // keep name if available
): Promise<File> => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.crossOrigin = "anonymous";

    image.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        reject(new Error("Canvas context not available"));
        return;
      }

      canvas.width = crop.width;
      canvas.height = crop.height;

      ctx.drawImage(
        image,
        crop.x,
        crop.y,
        crop.width,
        crop.height,
        0,
        0,
        crop.width,
        crop.height
      );

      canvas.toBlob(
        (blob) => {
          if (blob) {
            // Keep original name but add '-cropped'
            const ext = mimeType.split("/")[1] || "jpg";
            const baseName = originalFileName
              ? originalFileName.replace(/\.[^/.]+$/, "")
              : "image";
            const fileName = `${baseName}-cropped.${ext}`;

            const file = new File([blob], fileName, {
              type: mimeType,
              lastModified: Date.now(),
            });
            resolve(file);
          } else {
            reject(new Error("Failed to create cropped image"));
          }
        },
        mimeType,
        0.9 // quality for lossy formats
      );
    };

    image.onerror = () => {
      reject(new Error("Failed to load image"));
    };

    image.src = imageSrc;
  });
};
