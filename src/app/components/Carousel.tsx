import { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
export default function ImageCarousel({
  images,
}: {
  images: Content.ImageGallerySliceDefaultItem[];
}) {
  return (
    <div className="relative">
      <div
        className="flex snap-x snap-mandatory gap-2 overflow-x-scroll overscroll-contain scroll-smooth px-6 sm:px-12 md:px-24"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {images.map((image, index) => (
          <PrismicNextImage
            key={index}
            field={image.image}
            loading="lazy"
            className="shrink-0 snap-center rounded-lg object-cover"
            fallbackAlt=""
          />
        ))}
      </div>
    </div>
  );
}
