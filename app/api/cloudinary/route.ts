import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  try {
    const formData = await req.formData();
    console.log(formData);
    const file = formData.get("file") as Blob | null;
    const newImage = new FormData();
    newImage.append("file", file);
    newImage.append("cloud_name", "dipkbpinx");
    newImage.append("upload_preset", "ekomtspw");

    const response = await fetch(
      "https://api.cloudinary.com/v1_1/dipkbpinx/image/upload",
      {
        method: "POST",
        body: newImage,
      }
    );

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error during image upload:", error);
    return NextResponse.json(
      { error: "Failed to upload image" },
      { status: 500 }
    );
  }
}
