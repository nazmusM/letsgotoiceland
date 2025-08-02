import { Content, isFilled } from "@prismicio/client";
import Link from "next/link";
import { formatCurrency, generateTimeString } from "@/utils";
import { PrismicNextImage } from "@prismicio/next";
import Tag from "../Tag";

type ExperienceCardProps = Content.ExperienceDocument;

export default function ExperienceCard({
  experience,
}: {
  experience: ExperienceCardProps;
}) {
  const image = experience.data.slices[0]
    ?.items[0] as Content.ImageGallerySliceDefaultItem;

  const location =
    (isFilled.contentRelationship(experience.data.location[0]?.name) &&
      (experience.data.location[0]?.name
        ?.data as Content.LocationDocumentData)) ||
    undefined;
  return (
    <div className="flex h-[311px] overflow-hidden rounded-xl bg-white object-contain border-borderGray border md:h-[402px]">
      <Link href={`/experiences/${experience.uid}`}>
        <Tag tags={experience.data.tag} />
        <div className="h-[124px] bg-lightGray md:h-[212px]">
          {experience.data.slices[0] &&
            experience.data.slices[0].variation === "default" && (
              <PrismicNextImage
                field={image.image}
                placeholder="empty"
                imgixParams={{
                  fit: "crop",
                  crop: "face",
                  q: 50,
                  h: 212,
                  ar: "4:3",
                }}
                sizes="(max-width: 640px) 50vw, 33vw"
                className="h-[124px] md:h-[212px]"
                fallbackAlt=""
              />
            )}
        </div>

        <div className="grid h-[187px] p-2 md:h-[190px] md:p-4">
          <h2 className="row-span-1 mb-2 text-sm font-semibold md:text-lg overflow-hidden overflow-ellipsis max-h-[2.8rem] line-clamp-2">
            {experience.data.title}
          </h2>
          <div className="text-xs md:mb-2 text-darkGray">{location?.title}</div>
          <div className="md:row-span-1 flex flex-col justify-between gap-1 md:gap-2 md:pt-2 md:pt-0">
            <div className="-mt-px flex flex-col md:flex-row md:divide-x md:divide-borderGray">
              <div className="flex w-fit md:flex-1 md:flex-wrap">
                <div className="flex flex-row md:flex-col">
                  <p className="text-black text-xs">Difficulty:</p>
                  <p className="ml-1 md:ml-0 text-xs text-darkGray">
                    {experience.data.physical_difficulty}
                  </p>
                </div>
              </div>
              <div className="flex w-fit md:flex-1 md:flex-wrap md:pl-3">
                <div className="flex flex-row md:flex-col ">
                  <p className="text-black text-xs">Duration:</p>
                  <p className="ml-1 md:ml-0 text-xs text-darkGray">
                    {generateTimeString(
                      experience.data
                        .duration[0] as Content.ExperienceDocumentDataDurationItem,
                    )}
                  </p>
                </div>
              </div>
            </div>
            <div className="justify-self-end text-sm font-semibold md:text-base">
              From {formatCurrency(experience.data.price as number, "USD")}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
