import { Content, isFilled } from "@prismicio/client";

const TagStyle: Record<string, string> = {
  "highly-rated": "ml-2 rounded-full bg-[#FFDB58]",
  "likely-to-sell-out": "bg-[#FF2626] text-white",
  "most-popular": "ml-2 rounded-full bg-[#51E5DA]",
  trending: "ml-2 rounded-full bg-[#C0B6FF]",
};

export default function Tag({
  tags,
}: {
  tags: Content.ExperienceDocumentDataTagItem[];
}) {
  const tagToDisplay = tags.find((tag) => {
    if (!isFilled.contentRelationship(tag.name)) {
      return false;
    }
    const display = tag.name.data as Content.TagDocumentData;
    return display.badge === true;
  });
  const data =
    (isFilled.contentRelationship(tagToDisplay?.name) &&
      (tagToDisplay.name.data as Content.TagDocumentData)) ||
    undefined;
  const uid =
    (isFilled.contentRelationship(tagToDisplay?.name) &&
      (tagToDisplay.name.uid as string)) ||
    "";

  if (data) {
    return (
      <div className="absolute flex flex-row gap-2">
        <div
          className={`left-0 top-0 my-2 px-3 py-1 text-xs font-semibold ${TagStyle[uid] || ""}`}
        >
          {data.name}
        </div>
        
      </div>
      
    );
  }
}
