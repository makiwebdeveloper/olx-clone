"use client";

import Button from "@/components/ui/Button";
import { useToast } from "@/hooks/useToast";
import { UploadDropzone } from "@/lib/uploadthing";
import Image from "next/image";
import Icons from "./Icons";

interface Props {
  images: string[];
  setImages: (v: string[]) => void;
}

export default function UploadImages({ images, setImages }: Props) {
  const { toast } = useToast();

  const removeAllImage = () => {
    setImages([]);
  };

  const removeByUrl = (url: string) => {
    setImages(images.filter((image) => image !== url));
  };

  const Dropzone = (
    <UploadDropzone
      endpoint="postImages"
      onClientUploadComplete={(res) => {
        if (res) {
          const newImagesArray = [
            ...images,
            ...res.map((item) => item.fileUrl),
          ];
          if (newImagesArray.length > 3) {
            toast({
              title: "Uploading error",
              description: "You can upload maximum 3 images",
              variant: "destructive",
            });
          } else {
            setImages(newImagesArray);
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
          description:
            "Try again and make sure you upload no more than 3 images",
          variant: "destructive",
        });
      }}
    />
  );

  const Preview = (
    <div className="space-y-2">
      <div className="flex flex-col sm:flex-row gap-5">
        {images.map((image) => (
          <div className="relative sm:flex-1 h-[200px]" key={image}>
            <Image
              src={image}
              fill
              alt="uploaded image"
              className="peer/image object-cover rounded-lg bg-zinc-100"
            />

            <Button
              variant="destructive"
              className="transition hidden hover:block peer-hover/image:block absolute top-3 right-3 p-1 h-auto"
              onClick={() => removeByUrl(image)}
            >
              <Icons.x className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>
      <Button size="sm" variant="destructive" onClick={removeAllImage}>
        Remove all images
      </Button>
    </div>
  );

  return (
    <div className="space-y-2">
      {images.length < 3 ? Dropzone : null}
      {images.length > 0 ? Preview : null}
    </div>
  );
}
