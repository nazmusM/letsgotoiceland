import { Content, ContentRelationshipField, isFilled } from "@prismicio/client";
import Link from "next/link";
import { PrismicNextImage } from "@prismicio/next";

export default function LandmarkCard({
  landmark,
  className,
}: {
  landmark: ContentRelationshipField<Content.LandmarkDocument>;
  className?: string;
}) {
  if (!isFilled.contentRelationship(landmark)) {
    return null;
  }
  const { data } = landmark as unknown as Content.LandmarkDocument;
  const image = data.hero_image;

  return (
    <div
      className={`bg-white relative flex h-[200px] overflow-hidden rounded-xl shadow md:h-[400px] ${className}`}
    >
      <Link href={`/landmarks/${landmark.uid}`}>
        <div className="bg-lightGray inline-block h-[200px] overflow-hidden md:h-[400px]">
          {image && (
            <PrismicNextImage
              field={image}
              placeholder="empty"
              fill={true}
              imgixParams={{
                fit: "crop",
                crop: "face",
                q: 50,
                h: 400,
              }}
              sizes="(max-width: 640px) 50vw, 33vw"
              className="h-[200px] object-cover md:h-[400px] md:transition-transform md:duration-1000 md:hover:scale-110"
              fallbackAlt=""
            />
          )}
        </div>
        <div className="absolute bottom-0 left-0 p-4 text-white">
          <h2 className="row-span-1 mb-2 text-sm font-semibold md:text-base">
            {data.title}
            <p className="text-xs md:text-sm font-normal">
              {isFilled.contentRelationship(data.location) && data.location.uid}
            </p>
          </h2>
        </div>
      </Link>
    </div>
  );
}
