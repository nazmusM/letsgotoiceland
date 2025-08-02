import { Content, isFilled } from "@prismicio/client";

const Style: Record<string, string> = {
  default: "bg-neutral-200 text-black_333",
  secondary: "text-white_80 bg-white bg-opacity-10",
};

type Variant = "default" | "secondary";

export default function BlogTags({
  tags,
  className,
  variant = "default",
}: {
  tags: Content.BlogpostDocumentDataTagItem[];
  className?: string;
  variant?: Variant;
}) {
  return (
    <div className={`flex flex-wrap gap-2 ${className || ""}`}>
      {tags.map((tag, index) => {
        const tagData =
          (isFilled.contentRelationship(tag.name) &&
            (tag.name.data as Content.TagDocumentData)) ||
          undefined;
        if (!tagData) return null;
        return (
          <div
            key={index}
            className={`rounded-full text-sm px-4 py-1 ${Style[variant]}`}
          >
            {tagData.name}
          </div>
        );
      })}
    </div>
  );
}
