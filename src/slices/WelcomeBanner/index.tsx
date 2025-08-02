import { Content, isFilled } from "@prismicio/client";
import Link from "next/link";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Button from "@/app/components/Button";

/**
 * Props for `WelcomeBanner`.
 */
export type WelcomeBannerProps =
  SliceComponentProps<Content.WelcomeBannerSlice>;

/**
 * Component for "WelcomeBanner" Slices.
 */

const WelcomeBanner = ({ slice }: WelcomeBannerProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="my-10 w-full text-center md:mx-auto md:my-20 md:max-w-[996px]"
    >
      <PrismicRichText
        field={slice.primary.message}
        components={{
          heading1: ({ children }) => (
            <h1 className="mb-3 text-3xl font-medium md:text-8xl">
              {children}
            </h1>
          ),
        }}
      />

      {isFilled.link(slice.primary.cta_link) && (
        <Button
          linkString={slice.primary.cta_link.url}
          className="m-6 text-xs md:text-base"
        >
          {slice.primary.cta_name}
        </Button>
      )}
    </section>
  );
};

export default WelcomeBanner;
