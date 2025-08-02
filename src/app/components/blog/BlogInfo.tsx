import { Content, isFilled } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";

const Style: Record<string, string> = {
  default: "text-darkGray",
  secondary: "text-gray-300",
};

type Variant = "default" | "secondary";

export default function BlogInfo({
  blogPost,
  variant = "default",
}: {
  blogPost?: Content.BlogpostDocument;
  variant?: Variant;
}) {
  if (!blogPost) return null;

  const textColor = Style[variant];
  const data = blogPost.data as Content.BlogpostDocumentData;
  const author =
    ((isFilled.contentRelationship(data.author) &&
      data.author.data) as Content.AuthorDocumentData) || undefined;
  const image = data.image;
  return (
    <div className={`mb-1 md:mb-3 flex w-full flex-wrap space-x-2 ${textColor}`}>
      <PrismicNextImage
        field={author.image}
        imgixParams={{ w: 20 }}
        className="w-[20px] rounded-full"
      />

      <span className="text-sm text-white/opacity-80">{author?.name}</span>
      <span>•</span>

      <span className="text-sm text-white/opacity-80">
        {new Date(blogPost.first_publication_date).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        })}
      </span>
      <span>•</span>
      <span className="text-sm text-white/opacity-80">{data.read_time}</span>
    </div>
  );
}
