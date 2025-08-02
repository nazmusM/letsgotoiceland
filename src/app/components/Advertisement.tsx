import { Content } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import Button from "@/app/components/Button";

const Style: Record<Variant, Record<string, string>> = {
  default: {
    imageContainer: "",
    image: "h-[220px] md:h-[314px] rounded-xl object-cover",
    textContainer: "col-span-2 shrink md:col-span-1 md:w-[400px] space-y-3",
    title: "text-lg md:text-5xl font-medium",
    text: "text-black text-sm md:text-lg font-medium",
  },
  triptych: {
    imageContainer: "overflow-hidden rounded-xl shrink-0 relative",
    image:
      "rounded-xl object-cover md:hover:scale-110 md:transition-transform md:duration-1000",
    textContainer: "md:my-3 space-y-1 md:space-y-3",
    title: "text-sm md:text-2xl font-semibold",
    text: "text-black sm:text-base md:text-3xl",
  },
};

type Variant = "default" | "triptych";

const AdvertisementBlock = ({
  advertisement,
  variant = "default",
  className = "",
}: {
  advertisement: Content.AdvertisementDocumentData;
  variant?: Variant;
  className?: string;
}): JSX.Element => {
  const invertedTextColor = advertisement.inverted_text_color;

  return (
    <div
      className={
        (variant === "default" &&
          "relative w-full overflow-hidden md:h-[314px]") ||
        "flex flex-row gap-3 p-2 md:flex-col"
      }
    >
      <div className={`relative ${className} ${Style[variant].imageContainer}`}>
        <PrismicNextImage
          field={advertisement.background}
          className={`h-full w-full ${Style[variant].image}`}
          imgixParams={{
            fit: "crop",
            crop: "face",
          }}
          fallbackAlt=""
        />
        {variant === "default" && invertedTextColor && (
          <div className="absolute inset-0 rounded-xl bg-gradient-to-l from-transparent to-black opacity-80" />
        )}
      </div>
      <div
        id="content"
        className={
          (variant === "default" &&
            "absolute inset-0 grid w-full grid-cols-2 items-center p-7 md:-top-2 md:p-12") ||
          ""
        }
      >
        <div
          className={`${variant === "default" && invertedTextColor ? "text-white" : "text-black"} ${Style[variant].textContainer}`}
        >
          <PrismicRichText
            field={advertisement.content}
            components={{
              heading2: ({ children, key }) => (
                <h2 key={key} className={Style[variant].title}>
                  {children}
                </h2>
              ),
              paragraph: ({ children, key }) => (
                <p key={key} className={`text-sm  md:text-base ${variant === "default" && invertedTextColor ? "text-white" : "text-black_333" }`}>
                  {children}
                </p>
              ),
              preformatted: ({ node, key }) => <pre key={key}>{node.text}</pre>,
            }}
          />
        </div>
        <div className="col-span-2 mt-3 shrink self-center md:mt-6">
          <Button
            variant={
              (variant === "default" && !invertedTextColor && "primary") ||
              "secondary"
            }
            link={advertisement.cta_link}
            className="font-semibold"
          >
            {advertisement.cta_label}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdvertisementBlock;
