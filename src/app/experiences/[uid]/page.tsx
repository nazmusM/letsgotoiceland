import React from "react";
import QUERIES from "@/lib/queries";
import { redirect } from "next/navigation";
import { isFilled } from "@prismicio/client";
import { PrismicRichText, SliceZone } from "@prismicio/react";
import CarouselBlock from "@/app/components/CarouselBlock";
import Overview from "@/app/components/Overview";
import { PrismicDocument } from "@/lib/enums";
import { components } from "@/slices";
import { filter } from "@prismicio/client";
import BokunWidget from "@/app/components/BokunWidget";
import { formatCurrency, formatUID } from "@/utils";
import ExperienceInfo from "@/app/components/experience/ExperienceInfo";
import { MetaTags } from "@/app/components/MetaTags";

const Experience = async ({ params }: { params: { uid: string } }) => {
  const experience = await QUERIES.experience.getByUID(params.uid);
  if (!experience) {
    redirect("/experiences");
  }
  const closeExperiences =
    (isFilled.geoPoint(experience.data.geopoint) &&
      (await QUERIES.experience.getFilteredList({
        type: PrismicDocument.CATEGORY,
        slug:
          (isFilled.contentRelationship(experience.data.category[0]?.name) &&
            (experience.data.category[0]?.name.uid as string)) ||
          "",
        filters: [
          filter.geopointNear(
            "my.experience.geopoint",
            experience.data.geopoint.latitude,
            experience.data.geopoint.longitude,
            1000,
          ),
          filter.not("my.experience.uid", experience.uid),
        ],
        pagination: {
          page: 1,
          pageSize: 4,
        },
      }))) ||
    undefined;

  const imageGallerySlice = experience.data.slices.find(
    (slice) => slice.slice_type === "image_gallery",
  );
  const slices = experience.data.slices.filter(
    (slice) => slice.slice_type !== "image_gallery",
  );
  const location =
    (isFilled.contentRelationship(experience.data.location[0]?.name) &&
      (experience.data.location[0]?.name.uid as string)) ||
    undefined;

  return (
    <div className="mx-auto mt-0 p-2 px-4 md:mt-8 md:w-[1200px] md:p-0 md:px-0">
      <MetaTags
        title={experience.data.meta_title}
        description={experience.data.meta_description}
        image={experience.data.meta_image}
        pageUrl={
          process.env.NEXT_PUBLIC_BASE_URL! + "/experiences/" + experience.uid
        }
      />
      <h1 className="mb-3 text-3xl font-medium xl:text-6xl">
        {experience.data.title}
      </h1>
      {imageGallerySlice && (
        <SliceZone slices={[imageGallerySlice]} components={components} />
      )}
      <div className="mt-6 grid w-full grid-cols-12 gap-2 md:mt-8 md:gap-14">
        <div className="col-span-12 md:order-2 md:col-span-4">
          <div>
            <div className="md:border-1 mb-4 flex flex-col md:rounded-2xl md:border md:border-borderGray md:p-6">
              <div className="flex flex-row-reverse justify-between md:flex-col">
                {experience.data.offer && (
                  <p className="md:pb-4">
                    <span className="inline-block h-32 rounded-3xl bg-orangeTransparent px-[16px] text-xs font-semibold leading-8 tracking-mobLetterSpacing text-orange md:text-sm md:leading-8">
                      {experience.data.offer}
                    </span>
                  </p>
                )}
                <p className="pb-2 text-2xl font-semibold md:text-3xl">
                  {`From ${formatCurrency(experience.data.price as number, "USD")}`}
                  <span className="text-sm font-normal md:text-base">
                    {" "}
                    per person
                  </span>
                </p>
              </div>
              <p className="text-sm font-semibold tracking-letterSpacing024 text-darkGray underline decoration-darkGray">
                {experience.data.disclaimer}
              </p>
            </div>

            <div className="rounded-2xl">
              <BokunWidget bokunId={experience.data.bokun_id as string} />
            </div>
          </div>
        </div>
        <div className="col-span-12 pt-10 md:order-1 md:col-span-8 md:pt-0">
          <Overview overviewIcons={experience.data.icons} />
          <div className="mt-6 border-b border-borderGray pb-6 md:mt-10 md:pb-10">
            <PrismicRichText
              field={experience.data.subtitle}
              components={{
                paragraph: ({ children }) => (
                  <p className="text-base font-semibold">{children}</p>
                ),
              }}
            />
          </div>
          <SliceZone slices={slices} components={components} />
          <ExperienceInfo experience={experience} />
        </div>
      </div>
      <CarouselBlock
        title="Similar Activities"
        experiences={closeExperiences?.experiences}
      />
      <CarouselBlock
        title={`More attractions ${(location && "near " + formatUID(location)) || "nearby"}`}
        landmarks={experience.data.landmark}
      />
    </div>
  );
};

export default Experience;
