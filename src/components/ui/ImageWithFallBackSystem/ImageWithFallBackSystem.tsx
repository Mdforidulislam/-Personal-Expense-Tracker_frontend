"use client";
import { cn } from "@/lib/utils"; // Ensure this utility exists or remove it
import Image, { StaticImageData } from "next/image";
import React, { FC, useState } from "react";

interface BlogCardProps {
  imageSrc: string | StaticImageData ;
  className?: string;
  alt?: string;
}

const ImageWithFallBackSystem: FC<BlogCardProps> = ({ imageSrc, alt, className }) => {
  const [currentImage, setCurrentImage] = useState(imageSrc);

  return (
    <div className={cn("relative w-full h-full", className)}>
      <Image
        src={currentImage}
        onError={() =>
          setCurrentImage(
            "https://img.freepik.com/premium-vector/photo-icon-picture-icon-image-sign-symbol-vector-illustration_64749-4409.jpg"
          )
        }
        alt={alt ?? "fallback image"}
        fill
        style={{ objectFit: "cover" }}
        className={cn(className)}
      />
    </div>
  );
};

export default ImageWithFallBackSystem;
