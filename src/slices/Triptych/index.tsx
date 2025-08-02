"use client";
import { useEffect, useRef, useState } from "react";
import { Content, isFilled } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import LandmarkCard from "@/app/components/landmark/LandmarkCard";
import AdvertisementBlock from "@/app/components/Advertisement";

/**
 * Props for `Triptych`.
 */
export type TriptychProps = SliceComponentProps<Content.TriptychSlice>;

/**
 * Component for "Triptych" Slices.
 */
const Triptych = ({ slice }: TriptychProps): JSX.Element => {
  const variant = slice.variation;

  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      const scrollMiddle =
        (scrollContainer.scrollWidth - scrollContainer.clientWidth) / 2;
      scrollContainer.scrollLeft = scrollMiddle;
    }
  }, []);

  if (!variant) return <></>;
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={variant}
      className={`w-screen px-4 md:px-0 ${(variant === "promoted" && "max-w-[1200px] md:mx-auto") || "md: max-w-[1800px] md:mx-auto md:overflow-x-scroll "}`}
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
    >
      {(variant === "default" && (
        <div
          ref={scrollContainerRef}
          className="flex snap-x snap-mandatory items-center gap-6 overflow-x-scroll overscroll-contain scroll-smooth px-3 md:mx-auto"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {slice.items?.map((item, index) => {
            return (
              <LandmarkCard
                key={index}
                landmark={item.link}
                className={`shrink-0 snap-center md:shrink ${(index === 1 && "h-[280px] w-[280px] sm:h-[392px] md:w-[792px] lg:h-[592px] ") || "h-[264px] w-[264px] sm:h-[352px] md:w-[480px] lg:h-[552px]"}`}
              />
            );
          })}
        </div>
      )) || (
        <div>
          <h3 className="text-center text-2xl font-semibold md:text-7xl md:font-medium">
            {slice.primary.title}
          </h3>
          <div className="md:flex1 mt-4 md:mt-16 md:flex md:gap-6">
            {slice.items?.map((item, index) => {
              const data =
                isFilled.contentRelationship(item.link) &&
                (item.link.data as Content.AdvertisementDocumentData);
              if (!data) return <></>;

              return (
                <div
                  key={index}
                  className={(index !== 1 && "md:mt-[20px]") || ""}
                >
                  <AdvertisementBlock
                    advertisement={data}
                    className={
                      index === 1
                        ? "h-[140px] w-[140px] md:h-[404px] md:w-full md:max-w-[486px]"
                        : "h-[140px] w-[140px] md:h-[364px] md:w-full "
                    }
                    variant="triptych"
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
};

export default Triptych;
