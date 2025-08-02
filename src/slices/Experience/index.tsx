import { Content, isFilled } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { generateTimeString } from "@/utils";
import { PrismicNextImage } from "@prismicio/next";
import Button from "@/app/components/Button";

/**
 * Props for `Experience`.
 */
export type ExperienceProps = SliceComponentProps<Content.ExperienceSlice>;

/**
 * Component for "Experience" Slices.
 */
const Experience = ({ slice }: ExperienceProps): JSX.Element => {
  const experience =
    (isFilled.contentRelationship(slice.primary.experience) &&
      (slice.primary.experience as unknown as Content.ExperienceDocument)) ||
    undefined;
  if (!experience) return <></>;
  const discountCode = slice.primary.discount_code;

  const image = experience.data.slices[0]
    ?.items[0] as Content.ImageGallerySliceDefaultItem;
  const location =
    (isFilled.contentRelationship(experience.data.location[0]?.name) &&
      (experience.data.location[0]?.name
        ?.data as Content.LocationDocumentData)) ||
    undefined;

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div className=" bg-white w-full max-w-[1200px] md:grid md:grid-cols-12">
        <div className="flex-none md:col-span-8">
          <PrismicNextImage
            field={image.image}
            placeholder="empty"
            imgixParams={{
              fit: "crop",
              crop: "face",
              q: 50,
              w: 441,
              ar: "4:3",
            }}
            sizes="(max-width: 792px) 50vw, 33vw"
            className="h-full w-full overflow-hidden rounded-xl"
            fallbackAlt=""
          />
        </div>
        <div className="border-1 border-gray-200 mt-3 flex grow flex-col justify-between rounded-xl border p-2 md:col-span-4 md:ml-6 md:mt-0 md:p-6">
          <div className="">
            <h2 className="text-adTitle row-span-1 mb-2 font-medium">
              {experience.data.title}
            </h2>
            <div className="flex flex-1 justify-between md:mt-12 md:h-52 md:flex-col">
              <div>
                <p className="font-semibold">Location:</p>
                <p>{location?.title}</p>
              </div>
              <div>
                <p className="font-semibold">Difficulty:</p>
                {experience.data.physical_difficulty}
              </div>
              <div>
                <p className="font-semibold">Duration:</p>
                <p>
                  {experience.data.duration &&
                    generateTimeString(
                      experience.data
                        ?.duration[0] as Content.ExperienceDocumentDataDurationItem,
                    )}
                </p>
              </div>
            </div>
          </div>

          <div className="md:divide-gray-200 md:border-gray-200 mt-3 flex flex-row justify-between md:mt-0 md:border-t md:pt-6">
            <Button
              linkString={`/experiences/${experience.uid}`}
              className="py-3"
            >
              Book Now
            </Button>
            {discountCode && (
              <div>
                <div>Use discount code:</div>
                <div className="font-semibold">{discountCode}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
