import PaginationFooter from "@/app/components/PaginationFooter";
import SiblingDocumentSelector from "@/app/components/SiblingDocumentSelector";
import ExperienceGrid from "@/app/components/experience/ExperienceGrid";
import { ArchiveData, SiblingData } from "@/lib/types";
import { ViewContext } from "@/lib/enums";
import { PrismicDocumentTypeValues } from "@/lib/enums";
import QUERIES from "@/lib/queries";
import { PrismicRichText, SliceZone } from "@prismicio/react";
import { Content } from "@prismicio/client";
import { formatSiblings } from "@/utils";
import { components } from "@/slices";

export default async function Page({
  params,
  searchParams,
}: {
  params: { slug: string[] };
  searchParams: { page?: string };
}) {
  const page =
    (searchParams.page && +searchParams.page && +searchParams.page) || 1;

  const type = params.slug && (params.slug[0] as PrismicDocumentTypeValues);
  const slug =
    (params.slug && params.slug[1] !== "all" && params.slug[1]) || undefined;
  const data = await QUERIES.experience.getFilteredList({
    type,
    slug,
    filters: [],
    pagination: {
      page,
      pageSize: 12,
    },
  });

  let siblingDocuments: SiblingData[] | Content.AllDocumentTypes[] | undefined =
    data.archive?.data.siblings;

  if (!siblingDocuments?.length && slug) {
    const fetchDefaultSiblings = await QUERIES.common.getSiblingDocuments(
      params.slug[0] as PrismicDocumentTypeValues,
    );
    siblingDocuments = fetchDefaultSiblings.results;
  }

  const archiveData = data.archive?.data as unknown as ArchiveData;

  return (
    <section>
      <div className="mx-auto px-2 md:max-w-[1200px] md:px-0">
        {archiveData && (
          <div className="md:w-2/3">
            <h1 className="my-3 text-3xl font-normal md:text-7xl">
              {archiveData.title as string}
            </h1>
            <PrismicRichText field={archiveData.subtitle} />
          </div>
        )}

        {siblingDocuments?.length && (
          <SiblingDocumentSelector
            siblings={formatSiblings(siblingDocuments)}
          />
        )}
        <ExperienceGrid experiences={data.experiences} />
        <PaginationFooter
          baseURL={`/experiences/${(params.slug && params.slug.join("/")) || ""}`}
          currentPage={page}
          totalPages={data.experiences.total_pages}
        />
      </div>

      {archiveData && (
        <SliceZone
          slices={archiveData.slices}
          components={components}
          context={{ view: ViewContext.ARCHIVE }}
        />
      )}
    </section>
  );
}
