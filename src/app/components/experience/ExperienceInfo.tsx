import { Content, isFilled } from "@prismicio/client";
import { generateTimeString } from "@/utils";

export default function ExperienceInfo({
  experience,
}: {
  experience: Content.ExperienceDocument;
}) {
  const ageData =
    (isFilled.contentRelationship(experience.data.age[0]?.name) &&
      (experience.data.age[0]?.name.data as Content.AgeDocumentData)) ||
    undefined;
  const groupSizeData =
    (isFilled.contentRelationship(experience.data.group_size[0]?.name) &&
      (experience.data.group_size[0]?.name
        .data as Content.GroupSizeDocumentData)) ||
    undefined;

  return (
    <div className="mt-6 grid grid-cols-4 flex-row md:items-center divide-gray-200 border-b border-borderGray divide-borderGray pb-6 md:mt-6 md:divide-x md:pb-6">
      <div className={`col-span-2 md:col-span-1 md:pb-0 pb-2`}>
        <p className="font-semibold">Duration:</p>
        <p className="md:text-base text-sm">
          {generateTimeString(
            experience.data
              .duration[0] as Content.ExperienceDocumentDataDurationItem,
          )}
        </p>
      </div>
      <div className={`col-span-2 md:pl-10 md:col-span-1 md:pb-0 pb-2`}>
        <p className="font-semibold">Suitable for:</p>
        <p className="md:text-base text-sm">{ageData?.name}</p>
      </div>
      <div className={`col-span-2 md:pl-10 md:col-span-1`}>
        <p className="font-semibold">Difficulty:</p>
        <p className="md:text-base text-sm">{experience.data.physical_difficulty}</p>
      </div>
      <div className={`col-span-2 md:pl-10 md:col-span-1`}>
        <p className="font-semibold">Group size:</p>
        <p className="md:text-base text-sm">{groupSizeData?.name}</p>
      </div>
    </div>
  );
}
