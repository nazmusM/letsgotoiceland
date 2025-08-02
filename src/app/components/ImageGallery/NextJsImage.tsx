import Image from "next/image";
import {
  isImageFitCover,
  isImageSlide,
  useLightboxProps,
  useLightboxState,
} from "yet-another-react-lightbox";
import { CSSProperties } from "react";

interface Slide {
  src: string;
  width: number;
  height: number;
  blurDataURL?: string;
  altText?: string;
}

interface NextJsImageProps {
  slide: Slide;
  offset: number;
  rect: {
    width: number;
    height: number;
  };
}

function isNextJsImage(slide: Slide): boolean {
  return (
    isImageSlide(slide) &&
    typeof slide.width === "number" &&
    typeof slide.height === "number"
  );
}

export default function NextJsImage({ slide, offset, rect }: NextJsImageProps) {
  const {
    on: { click },
    carousel: { imageFit },
  } = useLightboxProps();
  const { currentIndex } = useLightboxState();

  const cover = isImageSlide(slide) && isImageFitCover(slide, imageFit);

  if (!isNextJsImage(slide)) return null;

  const width = !cover
    ? Math.round(
        Math.min(rect.width, (rect.height / slide.height) * slide.width),
      )
    : rect.width;
  const height = !cover
    ? Math.round(
        Math.min(rect.height, (rect.width / slide.width) * slide.height),
      )
    : rect.height;

  const imageStyle: CSSProperties = {
    objectFit: cover ? "cover" : "contain",
    cursor: click ? "pointer" : undefined,
  };

  return (
    <div style={{ position: "relative", width, height }}>
      <Image
        fill
        alt={slide.altText || ""}
        src={slide.src}
        loading="eager"
        draggable={false}
        blurDataURL={slide.blurDataURL}
        placeholder={slide.blurDataURL ? "blur" : undefined}
        style={imageStyle}
        sizes={`${Math.ceil((width / window.innerWidth) * 100)}vw`}
        onClick={
          offset === 0 ? () => click?.({ index: currentIndex }) : undefined
        }
      />
    </div>
  );
}
