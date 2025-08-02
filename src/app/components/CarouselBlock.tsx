import { Content, isFilled } from "@prismicio/client";
import { PrismicPaginationReponse } from "@/lib/types";
import ExperienceCard from "./experience/ExperienceCard";
import LandmarkCard from "./landmark/LandmarkCard";

type ExperienceGridProps = PrismicPaginationReponse & {
  results: Content.ExperienceDocument[];
};

export default function CarouselBlock({
  title,
  experiences,
  landmarks,
}: {
  title: string;
  experiences?: ExperienceGridProps;
  landmarks?: Content.ExperienceDocumentDataLandmarkItem[];
}) {
  if ((!experiences || !experiences.results.length) && !landmarks) {
    return "";
  }
  return (
    <div className="lg mx-auto mt-14 md:mt-28 grid w-full p-2 md:p-0">
      <h4 className="mb-6 text-center text-2xl font-medium md:mb-16 md:text-5xl">
        {title}
      </h4>
      <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
        {experiences?.results.map((experience: Content.ExperienceDocument) => (
          <ExperienceCard key={experience.id} experience={experience} />
        ))}
        {landmarks?.map(
          (
            landmark: Content.ExperienceDocumentDataLandmarkItem,
            index: number,
          ) => {
            return <LandmarkCard key={index} landmark={landmark.name} />;
          },
        )}
      </div>
    </div>
  );
}
