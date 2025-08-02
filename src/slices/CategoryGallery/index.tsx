"use client";
import { useEffect, useMemo, useState } from "react";
import { Content } from "@prismicio/client";

import { PrismicRichText, SliceComponentProps } from "@prismicio/react";

import ToggleBlock from "@/app/components/toggleBlock/ToggleBlock";
import { ChevronRight } from "lucide-react";
import { PrismicNextImage } from "@prismicio/next";
import useIsMobile from "@/hooks/useIsMobile";
import Button from "@/app/components/Button";
import Link from "next/link";

type Image = {
  dimensions: {
    width: number;
    height: number;
  };
  alt: string | null;
  copyright: string | null;
  url: string;
  id: string;
  edit: {
    x: number;
    y: number;
    zoom: number;
    background: string;
  };
  thumbnail?: {
    dimensions: {
      width: number;
      height: number;
    };
    alt: string | null;
    copyright: string | null;
    url: string;
    id: string;
    edit: {
      x: number;
      y: number;
      zoom: number;
      background: string;
    };
  };
};

type Subtitle = Array<{
  type: string;
  text: string;
  spans: any[];
  direction: string;
}>;

type CategoryOrLocation = {
  id: string;
  uid: string;
  url: string | null;
  type: string;
  href: string;
  tags: string[];
  first_publication_date: string;
  last_publication_date: string;
  slugs: string[];
  linked_documents: any[];
  lang: string;
  alternate_languages: any[];
  data: {
    title: string;
    subtitle: Subtitle;
    image: Image;
    siblings?: any[];
    slices?: any[];
  };
};

type CategoryGalleryState = {
  categories: CategoryOrLocation[];
  locations: CategoryOrLocation[];
  activities: {
    categoryActivities: Record<string, number>;
    locationActivities: Record<string, number>;
  };
};

type CategoryGalleryProps = SliceComponentProps<Content.CategoryGallerySlice>;

interface ExtendedCategoryGalleryProps
  extends Omit<CategoryGalleryProps, "slice"> {
  slice: Content.CategoryGallerySlice & {
    state: CategoryGalleryState;
  };
}

const CategoryGallery = ({
  slice,
}: ExtendedCategoryGalleryProps): JSX.Element => {
  const [query, setQuery] = useState<"City" | "Category">("City");
  const state = slice.state;
  const records = {
    City: state.locations,
    Category: state.categories,
  };
  const activities = {
    City: state.activities.locationActivities,
    Category: state.activities.categoryActivities,
  };
  const [showAll, setShowAll] = useState(false);
  const isMobile = useIsMobile();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const displayedRecords = useMemo(() => {
    if (!isClient) return records[query];
    return (isMobile && !showAll) ? records[query].slice(0, 6) : records[query];
  }, [isClient, isMobile, showAll, query, records]);

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      id={slice.id}
      className="lg:h-max[718px] overflow-none h-auto max-w-[700px] py-[7.5rem] md:mx-auto md:max-w-[1200px] md:px-0"
    >
      <div className="mb-3 flex flex-col justify-center gap-y-[0.75rem] text-center md:gap-y-6 lg:gap-y-6">
        <h3 className="text-center text-2xl font-semibold md:text-7xl md:font-medium">
          {slice.primary.title}
        </h3>
        <div className="mx-w-[62.25rem] text-sm text-[#333333] md:text-[1.125rem] lg:text-[1.125rem]">
          <PrismicRichText field={slice.primary.subtitle} />
        </div>
      </div>
      <div className="mt-[1.5rem] md:mt-16 lg:mt-16">
        <ToggleBlock
          query={query}
          choices={["City", "Category"]}
          setQuery={setQuery}
        />
      </div>
      <div className="mt-[1.5rem] grid grid-cols-2 gap-4 px-4 md:mt-16 lg:mt-16 lg:grid-cols-4">
        {displayedRecords.map((record) => {
          const activityCount = activities[query][record.uid];
          if (activityCount > 0) {
            return (
              <Link
                id="gallery-container"
                className="group relative flex flex-1 flex-col overflow-hidden rounded-2xl border border-borderGray hover:border-[#cccccc] md:flex-row md:place-items-center md:p-[0.75rem] lg:flex-row lg:place-items-center lg:p-[0.75rem]"
                key={record.uid}
                href={`/experiences/${query === "City" ? "location" : "category"}/${record.uid}#${slice.id}`}
                scroll={false}
              >
                <PrismicNextImage
                  field={record.data.image}
                  imgixParams={{
                    fit: "crop",
                    q: 75,
                    ar: "1:1",
                  }}
                  sizes="(min-width: 640px) 4.75rem, 7.75rem"
                  className="h-full w-full bg-[#E5E7EB] object-cover md:h-[4.75rem] md:w-[4.75rem] md:rounded-[0.5rem] lg:h-[4.75rem] lg:w-[4.75rem] lg:rounded-[0.5rem]"
                  fallbackAlt=""
                  style={{
                    maxHeight: "124px",
                  }}
                />
                <div className="flex flex-col p-2 md:p-0 md:pl-2 lg:p-0 lg:pl-2">
                  <span className="text-sm font-[600] md:text-base lg:text-base">
                    {record.data.title}
                  </span>
                  <span className="text-xs md:text-[0.875rem] lg:text-[0.875rem]">
                    {activityCount}{" "}
                    {activityCount === 1 ? "activity" : "activities"}
                  </span>
                </div>
                <span
                  className="absolute bottom-3 right-3 flex h-8 w-8 place-items-center justify-center rounded-lg bg-gray-200 text-[#666666] opacity-0 transition-opacity duration-300 md:group-hover:opacity-100 lg:group-hover:opacity-100"
                  id="gallery-link"
                >
                  <ChevronRight className="" size={16} />
                </span>
              </Link>
            );
          }
        })}
      </div>
      {isMobile && records[query].length > 6 && (
        <div className="mt-8 text-center">
          <Button onClick={() => setShowAll(!showAll)} variant="secondary">
            {showAll ? "Show Less" : "View All"}
          </Button>
        </div>
      )}
    </section>
  );
};

export default CategoryGallery;
