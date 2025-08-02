"use client";
import { useEffect, useState } from "react";
import { Content } from "@prismicio/client";
import { PrismicPaginationReponse } from "@/lib/types";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import QUERIES from "@/lib/queries";
import SearchBlock from "@/app/components/searchBlock/SearchBlock";
import { PrismicDocumentTypeValues } from "@/lib/enums";
import ExperienceGrid from "@/app/components/experience/ExperienceGrid";
import Button from "@/app/components/Button";

/**
 * Props for `ExperienceSearchBlock`.
 */
export type ExperienceSearchBlockProps =
  SliceComponentProps<Content.ExperienceSearchBlockSlice>;

type ExperiencesData = PrismicPaginationReponse & {
  results: Content.ExperienceDocument[];
};
/**
 * Component for "ExperienceSearchBlock" Slices.
 */
const ExperienceSearchBlock = ({
  slice,
}: ExperienceSearchBlockProps): JSX.Element => {
  const [query, setQuery] = useState<Record<string, string | undefined>>({
    type: undefined,
    slug: undefined,
  });
  const [experiences, setExperiences] = useState<ExperiencesData | undefined>();
  const pageSize = 8;
  const viewMoreLink =
    (query.type && query.slug && `/experiences/${query.type}/${query.slug}`) ||
    "/experiences";

  useEffect(() => {
    const fetchData = async () => {
      const data = await QUERIES.experience.getFilteredList({
        type: query.type as PrismicDocumentTypeValues | undefined,
        slug: query.slug,
        filters: [],
        pagination: {
          page: 1,
          pageSize,
        },
      });
      return setExperiences(data.experiences);
    };
    fetchData();
  }, [query]);

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="max-w-[700px] px-4 md:mx-auto md:max-w-[1200px] md:px-0 md:py-2"
    >
      <div className="mb-6 text-center md:mb-16">
        <h2 className="pb-3 text-2xl md:pb-6 md:text-7xl font-semibold md:font-medium">
          {slice.primary.title}
        </h2>
        <div className="text-black_333 text-base md:mx-40 md:text-lg">
          <PrismicRichText field={slice.primary.subtitle} />
        </div>
      </div>
      <SearchBlock setQuery={setQuery} query={query} />
      {experiences && (
        <ExperienceGrid experiences={experiences} showResultCount={false} />
      )}
      {experiences?.results_size! >= pageSize && (
        <div className="mt-6 w-full text-center md:mt-16">
          <Button
            linkString={viewMoreLink}
            variant="secondary"
            // className="mt-4"
          >
            View More
          </Button>
        </div>
      )}
    </section>
  );
};

export default ExperienceSearchBlock;
