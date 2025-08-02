import type { Content } from "@prismicio/client";
import { PrismicPaginationReponse } from "@/lib/types";
import ExperienceCard from "./ExperienceCard";

type ExperienceGridProps = PrismicPaginationReponse & {
  results: Content.ExperienceDocument[];
};
export default function ExperienceGrid({
  experiences,
  showResultCount = true,
}: {
  experiences: ExperienceGridProps;
  showResultCount?: boolean;
}) {
  return (
    <div className="mx-auto mt-6 md:mt-16 grid w-full md:p-2 md:p-0 md:px-2">
      {showResultCount && (
        <p className="mb-3">{experiences.total_results_size} results</p>
      )}
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:gap-5 lg:grid-cols-4">
        {experiences.results.map((experience: Content.ExperienceDocument) => (
          <ExperienceCard key={experience.id} experience={experience} />
        ))}
      </div>
    </div>
  );
}
