"use client";

import "@uploadthing/react/styles.css";

import { useState } from "react";
import { UploadDropzone } from "@/lib/uploadthing";

export default function CreatePostForm() {
  const [images, setImages] = useState<
    {
      fileUrl: string;
      fileKey: string;
    }[]
  >([]);

  return (
    <form>
      <UploadDropzone
        endpoint="postImages"
        onClientUploadComplete={(res) => {
          if (res) {
            setImages(res);
          }
        }}
        onUploadError={(error: Error) => {
          console.log(`ERROR! ${error.message}`);
        }}
      />
    </form>
  );
}
