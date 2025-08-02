import { Content, isFilled } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import AdvertisementBlock from "@/app/components/Advertisement";
import { ContextType } from "@/lib/types";
import { ViewContext } from "@/lib/enums";

/**
 * Props for `Advertisement`.
 */
export type AdvertisementProps =
  SliceComponentProps<Content.AdvertisementSlice>;

/**
 * Component for "Advertisement" Slices.
 */
const Advertisement = ({ slice, context }: AdvertisementProps): JSX.Element => {
  const contextSlice = context as ContextType;
  if (!isFilled.contentRelationship(slice.primary.advertisement)) return <></>;

  const advertisement = slice.primary.advertisement
    .data as Content.AdvertisementDocumentData;
  const secondAdvertisement =
    ((slice.variation === "double" &&
      isFilled.contentRelationship(slice.primary.advertisement2) &&
      slice.primary.advertisement2
        .data) as Content.AdvertisementDocumentData) || undefined;
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={`mt-6 w-full pb-6 md:mt-10 md:pb-10 ${(contextSlice.view === ViewContext.ARCHIVE && "px-3 md:mx-auto md:max-w-[1200px] md:px-0") || "border-b border-borderGray"}`}
    >
      <div
        className={`w-full gap-4 md:flex md:flex-1 ${(contextSlice.view === ViewContext.ARCHIVE && "space-y-3 md:space-y-0") || ""}`}
      >
        <AdvertisementBlock
          advertisement={advertisement}
          className={(slice.variation === "double" && "md:w-[588px]") || ""}
        />
        {secondAdvertisement && (
          <AdvertisementBlock
            advertisement={secondAdvertisement}
            className={(slice.variation === "double" && "md:w-[588px]") || ""}
          />
        )}
      </div>
    </section>
  );
};

export default Advertisement;
