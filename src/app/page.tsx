import QUERIES from "@/lib/queries";
import { components } from "@/slices";
import { SliceZone } from "@prismicio/react";
import { MetaTags } from "./components/MetaTags";
import { Content } from "@prismicio/client";
import { client } from "@/lib/prismicClient";
import { categoryGraphQuery } from "@/lib/queries/graphs";
import { PrismicDocument } from "@/lib/enums";
import { getFilteredExperiences } from "@/lib/queries/experiences";

export default async function Home() {
  const homepage = await QUERIES.homepage.get();

  const curatedContentSlice = homepage.data.slices.find(
    (slice) => slice.slice_type === "curated_content",
  );

  const { results: categories } =
    await client.getByType<Content.CategoryDocument>(PrismicDocument.CATEGORY, {
      pageSize: 12,
      graphQuery: categoryGraphQuery,
    });
  const { results: locations } =
    await client.getByType<Content.LocationDocument>(PrismicDocument.LOCATION, {
      pageSize: 12,
      graphQuery: categoryGraphQuery,
    });
  const categoryCount: {
    [key: string]: number;
  } = {};
  const locationCount: {
    [key: string]: number;
  } = {};

  if (categories.length > 0) {
    for (const category of categories) {
      const categoryExperiences = await getFilteredExperiences({
        type: PrismicDocument.CATEGORY,
        slug: category.uid,
        filters: [],
        pagination: {
          page: 1,
          pageSize: 12,
        },
      }, false);
      
      Object.assign(categoryCount, {
        [category.uid]: categoryExperiences.experiences.results.length,
      })
    }
  }

  if (locations.length > 0) {
    for (const location of locations) {
      const locationExperiences = await getFilteredExperiences({
        type: PrismicDocument.LOCATION,
        slug: location.uid,
        filters: [],
        pagination: {
          page: 1,
          pageSize: 12,
        },
      }, false);
      Object.assign(locationCount, {
        [location.uid]: locationExperiences.experiences.results.length,
      })
    }
  }
  const slices = homepage.data.slices.filter(
    (slice) => slice.slice_type !== "curated_content",
  ).map((slice) => {
    if (slice.slice_type === "category_gallery") {
      const state = {
        categories,
        locations,
        activities: {
          categoryActivities: categoryCount,
          locationActivities: locationCount,
        }
      }
      return {
        ...slice,
        state,
      }
    }
    return slice
  })
  return (
    <main className="">
      <MetaTags
        title={homepage.data.meta_title}
        description={homepage.data.meta_description}
        image={homepage.data.meta_image}
        pageUrl={process.env.NEXT_PUBLIC_BASE_URL!}
      />
      <div className="mx-auto sm:max-w-[768px] md:max-w-[1800px]">
        <SliceZone slices={slices} components={components} />
      </div>
      {curatedContentSlice && (
        <SliceZone slices={[curatedContentSlice]} components={components} />
      )}
    </main>
  );
}
