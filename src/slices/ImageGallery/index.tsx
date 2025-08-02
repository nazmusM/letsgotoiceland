"use client";
import { useState } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";

import Button from "@/app/components/Button";
import Image from "next/image";

import ImageGalleryLightbox from "@/app/components/ImageGallery/ImageGallery";

/**
 * Props for `ImageGallery`.
 */
export type ImageGalleryProps = SliceComponentProps<Content.ImageGallerySlice>;

/**
 * Component for "ImageGallery" Slices.
 */
const ImageGallery = ({ slice }: ImageGalleryProps): JSX.Element => {
  const [showModal, setShowModal] = useState(false);
  const openModal = () => {
    setShowModal(true);
    document.body.classList.add("no-scroll");
  };

  const closeModal = () => {
    setShowModal(false);
    document.body.classList.remove("no-scroll");
  };

  const images = slice.items.map((doc) => ({
    src: doc.image.url!,
    width: doc.image.dimensions?.width!,
    height: doc.image.dimensions?.height!,
    alt: doc.image.alt || "",
  }));

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative"
    >
      <div className="grid-row-3 mt-6 grid h-[278px] grid-cols-4 overflow-hidden rounded-2xl md:h-[500px] md:grid-cols-3 md:grid-rows-2 md:rounded-3xl">
        {slice.items.map((item, index) => {
          return (
            <div
              key={index}
              className={`${index > 0 ? "row-span-1" : "col-span-3 row-span-3 h-full md:col-span-2 md:row-span-2"} ${(index > 3 && "hidden") || ""} ${(index > 2 && "md:hidden") || ""} relative`}
            >
              <PrismicNextImage
                field={item.image}
                fill={true}
                className="object-cover p-0.5"
                priority={index === 0}
                imgixParams={{
                  fit: "crop",
                  crop: "face",
                  q: (index === 0 && 50) || 30,
                  h: (index === 0 && 500) || 250,
                  ar: "16:9",
                }}
                placeholder="empty"
                sizes={(index === 0 && "80vw") || "25vw"}
                fallbackAlt=""
              />
            </div>
          );
        })}
        <Button
          className="border-1 absolute bottom-2 right-2 border border-black bg-white"
          onClick={() => openModal()}
        >
          <span className="text-smTitle md:text-mdTitle flex gap-1 font-medium text-black">
            <Image
              src="/icons/Grid.svg"
              height={20}
              width={20}
              alt="grid icon"
            />
            View all photos
          </span>
        </Button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed left-0 top-0 z-10 flex h-screen w-screen items-center justify-center overflow-x-scroll overscroll-y-none bg-white">
          <div className="h-screen w-full">
            <div className="sticky top-0 z-20">
              <button
                className="absolute right-3 top-3 text-6xl "
                onClick={closeModal}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full">
                  <span className="text-black"> &times;</span>
                </div>
              </button>
            </div>

            <ImageGalleryLightbox images={images} />
          </div>
        </div>
      )}
    </section>
  );
};

export default ImageGallery;
