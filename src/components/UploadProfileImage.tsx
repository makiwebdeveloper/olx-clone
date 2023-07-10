"use client";

import "@uploadthing/react/styles.css";

import Button from "@/components/ui/Button";
import { useToast } from "@/hooks/useToast";
import { UploadDropzone } from "@/lib/uploadthing";
import Image from "next/image";
import Icons from "./Icons";
import { useState } from "react";

interface Props {
  image: string | undefined;
  setImage: (v: string | undefined) => void;
}

export default function UploadProfileImage({ image, setImage }: Props) {
  const { toast } = useToast();
  const [maxImagesLength] = useState(1);

  const removeImage = () => {
    setImage(undefined);
  };

  const Dropzone = (
    <UploadDropzone
      endpoint="profileImages"
      onClientUploadComplete={(res) => {
        if (res) {
          const newImagesArray = [...res.map((item) => item.fileUrl)];
          if (newImagesArray.length > maxImagesLength) {
            toast({
              title: "Uploading error",
              description: `You can upload maximum ${maxImagesLength} images`,
              variant: "destructive",
            });
          } else {
            setImage(newImagesArray[0]);
            toast({
              title: "Success",
              description: "Your images was uplaoding",
              variant: "success",
            });
          }
        }
      }}
      onUploadError={(error: Error) => {
        toast({
          title: "Something went wrong",
          description: `Try again and make sure you upload no more than ${maxImagesLength} images`,
          variant: "destructive",
        });
      }}
    />
  );

  const Preview = (
    <div className="space-y-2">
      <div className="flex flex-col sm:flex-row gap-5 items-center">
        {image && (
          <div className="relative w-[200px] h-[200px]" key={image}>
            <Image
              src={image}
              fill
              alt="uploaded image"
              className="peer/image object-cover rounded-lg bg-zinc-100"
            />

            <Button
              variant="destructive"
              className="transition hidden hover:block peer-hover/image:block absolute top-3 right-3 p-1 h-auto"
              onClick={() => removeImage()}
            >
              <Icons.x className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );

  return <div>{image ? Preview : Dropzone}</div>;
}
