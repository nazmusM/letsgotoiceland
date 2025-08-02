import CarAnimation from "@/app/components/CarAnimation";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";

/**
 * Props for `StepsBlock`.
 */
export type StepsBlockProps = SliceComponentProps<Content.StepsBlockSlice>;

/**
 * Component for "StepsBlock" Slices.
 */
const StepsBlock = ({ slice }: StepsBlockProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={`mb-6 mt-10 w-screen max-w-[1200px] border-b border-neutral-200 px-4 pb-6 md:mx-auto md:mb-20 md:mt-28 md:flex-row md:px-12 md:pb-20`}
    >
      <div className="custom_font_size_14 md:custom_font_size_18 mb-6 text-center md:mb-16 md:px-28">
        <h3 className="mb-3 mt-2 text-center text-2xl font-semibold md:mb-6 md:text-7xl md:font-medium">
          {slice.primary.title}
        </h3>
        <PrismicRichText field={slice.primary.description} />
      </div>
      <div
        id="car-animation-container"
        className="relative flex flex-row gap-4 scroll-smooth md:gap-6"
      >
        <div className="hidden md:block">
          <CarAnimation />
        </div>
        {slice.items?.map((item, index) => {
          return (
            <div
              key={index}
              className="z-10 flex-1 flex-col text-center md:flex"
            >
              <div
                dangerouslySetInnerHTML={{ __html: item.svg as string }}
                className="mx-auto mb-3 inline-block md:mb-8"
              />

              <div>
                <h4 className="text-primary mb-1 text-sm font-semibold md:mb-4 md:text-2xl">
                  {item.title}
                </h4>
              </div>
              <div className="text-black_333 text-xs md:text-base">
                {item.description}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default StepsBlock;
