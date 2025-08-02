"use client";
import React, { useState } from "react";
import Image, { ImageProps } from "next/image";
import Lightbox from "yet-another-react-lightbox";
import PhotoAlbum from "react-photo-album";
import type { RenderPhotoProps } from "react-photo-album";
import "yet-another-react-lightbox/styles.css";

import NextJsImage from "./NextJsImage";

function NextJsImageRender({
  photo,
  imageProps: { alt, title, sizes, className, onClick },
  wrapperStyle,
}: RenderPhotoProps) {
  return (
    <div style={{ ...wrapperStyle, position: "relative" }}>
      <Image
        fill
        src={photo}
        placeholder={"blurDataURL" in photo ? "blur" : undefined}
        {...{ alt, title, sizes, className, onClick }}
      />
    </div>
  );
}

type Image = {
  src: string;
  width: number;
  height: number;
  blurDataURL?: string;
  alt?: string;
};

type ImageGalleryLightboxProps = {
  images: Image[];
};

export default function ImageGalleryLightbox({
  images,
}: ImageGalleryLightboxProps) {
  const [index, setIndex] = useState(-1);
  return (
    <>
      
      <div className="mx-auto max-w-[1200px] p-2 md:px-0 py-16 grid gap-2 grid-cols-2">
        {images.map((image, i) => (
          <div
            key={i}
            className={
              i % 3 === 0
                ? "col-span-2"
                : "col-span-1"
            }
            style={{ aspectRatio: image.width / image.height }}
          >
            <Image
              src={image.src}
              alt={image.alt || `Image ${i + 1}`}
              width={image.width}
              height={image.height}
              blurDataURL={image.blurDataURL}
              placeholder={image.blurDataURL ? "blur" : undefined}
              className="w-full h-full object-cover cursor-pointer"
              onClick={() => setIndex(i)}
            />
          </div>
        ))}
      </div>

      <Lightbox
        index={index}
        open={index >= 0}
        close={() => setIndex(-1)}
        slides={images}
        render={{
          // @ts-ignore custom render
          slide: NextJsImage,
        }}
      />
    </>
  );
}
