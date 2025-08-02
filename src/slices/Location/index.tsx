"use client";
import { generateGeoPoint, generateInfoMarkers, infoMarkerType } from "@/utils";
import Image from "next/image";
import { Content } from "@prismicio/client";
import { MarkerWithInfowindow } from "@/app/components/map/MarkerWithInfo";
import { SliceComponentProps, PrismicRichText } from "@prismicio/react";

import {
  APIProvider,
  Map,
  Marker,
  InfoWindow,
} from "@vis.gl/react-google-maps";

/**
 * Props for `Location`.
 */
export type LocationProps = SliceComponentProps<Content.LocationSlice>;

/**
 * Component for "Location" Slices.
 */
const Location = ({ slice }: LocationProps): JSX.Element => {
  const startGeopoint = generateGeoPoint(slice.primary.start_geopoint);
  const endGeopoint = generateGeoPoint(slice.primary.end_geopoint);
  const infoMarkers: infoMarkerType = generateInfoMarkers(slice);

  const styling = {
    hyperlink: ({
      node,
      children,
    }: {
      node: any;
      children: React.ReactNode;
    }) => {
      const url = node.data.url;
      return (
        <a
          className="font-semibold underline"
          target={"_blank"}
          rel="noopener"
          href={url}
        >
          {children}
        </a>
      );
    },
  };

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="mt-6 border-b border-borderGray pb-6 md:mt-10 md:pb-10"
    >
      <h2 className="mb-4 text-base font-semibold md:mb-8 md:text-2xl">
        Meeting points
      </h2>
      <div className="h-[320px] overflow-hidden rounded-xl">
        {startGeopoint && (
          <APIProvider
            apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string}
          >
            <Map
              disableDefaultUI={true}
              defaultCenter={startGeopoint}
              defaultZoom={6}
              gestureHandling={"greedy"}
              scrollwheel={false}
            >
              <MarkerWithInfowindow
                info={infoMarkers.start!}
                position={startGeopoint}
              />
              {endGeopoint && infoMarkers.end && (
                <MarkerWithInfowindow
                  info={infoMarkers.end}
                  position={endGeopoint}
                />
              )}
            </Map>
          </APIProvider>
        )}
      </div>
      <div className="mt-4 md:mt-8">
        <div className="custom_pera_space flex flex-1 flex-wrap items-center text-sm tracking-mobLetterSpacing md:col-span-1 md:text-base xl:tracking-deskLetterSpacing">
          <PrismicRichText
            field={slice.primary.information}
            components={styling}
          />
        </div>
        {slice.primary.distance_reykjavic && (
          <>
            <h3 className="mt-4 text-sm font-semibold tracking-mobLetterSpacing md:mt-8 md:text-xl xl:tracking-deskLetterSpacing">
              Distance from Reykjavic
            </h3>
            <div className="mt-3 flex flex-1 items-center gap-2 text-sm tracking-mobLetterSpacing md:col-span-1 md:text-base xl:tracking-deskLetterSpacing">
              <Image
                src={`/icons/Location.svg`}
                alt="location icon"
                width={20}
                height={20}
              />
              <PrismicRichText field={slice.primary.distance_reykjavic} />
            </div>
          </>
        )}
        <h3 className="mt-4 text-sm font-semibold tracking-mobLetterSpacing md:mt-8 md:text-xl xl:tracking-deskLetterSpacing">
          {slice.variation === "default" ? "Start point" : "Pick up point"}
        </h3>
        <div className="custom_link_style mt-3 flex flex-1 items-start gap-2 text-sm tracking-mobLetterSpacing md:col-span-1 md:text-base xl:tracking-deskLetterSpacing">
          <Image
            src={`/icons/Location.svg`}
            alt="location icon"
            width={20}
            height={20}
          />
          <PrismicRichText
            field={slice.primary.start_info}
            components={styling}
          />
        </div>
        <div className="mt-3 flex flex-1 items-center gap-2 text-sm tracking-mobLetterSpacing md:col-span-1 md:text-base xl:tracking-deskLetterSpacing">
          <Image
            src={`/icons/Clock.svg`}
            alt="clock icon"
            width={20}
            height={20}
          />
          <PrismicRichText field={slice.primary.start_time} />
        </div>
        <h3 className="mt-4 text-sm font-semibold tracking-mobLetterSpacing md:mt-8 md:text-xl xl:tracking-deskLetterSpacing">
          {slice.variation === "default" ? "End point" : "Drop off point"}
        </h3>
        <div className="mt-3 flex flex-1 items-center gap-2 text-sm tracking-mobLetterSpacing md:col-span-1 md:text-base xl:tracking-deskLetterSpacing">
          <Image
            src={`/icons/Location.svg`}
            alt="location icon"
            width={20}
            height={20}
          />
          <PrismicRichText
            field={slice.primary.end_info}
            components={styling}
          />
        </div>
        <div className="mt-3 flex flex-1 items-center gap-2 text-sm tracking-mobLetterSpacing md:col-span-1 md:text-base xl:tracking-deskLetterSpacing">
          <Image
            src={`/icons/Clock.svg`}
            alt="clock icon"
            width={20}
            height={20}
          />
          <PrismicRichText field={slice.primary.end_time} />
        </div>
      </div>
    </section>
  );
};

export default Location;
