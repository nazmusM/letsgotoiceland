import { Content } from "@prismicio/client";
import Image from "next/image";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `AppBlock`.
 */
export type AppBlockProps = SliceComponentProps<Content.AppBlockSlice>;

/**
 * Component for "AppBlock" Slices.
 */
const AppBlock = ({ slice }: AppBlockProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={`my-10 m-4 flex md:w-screen max-w-[1200px] flex-col rounded-xl bg-black p-4 md:mx-auto md:my-36 md:flex-row md:py-16 md:px-20 md:gap-20`}
    >
      <div className="mx-auto md:order-2">
        <h3 className="mb-6 md:my-6 text-center text-2xl font-medium text-white md:hidden">
          {slice.primary.title}
        </h3>
        <PrismicNextImage
          field={slice.primary.image}
          className="mx-auto h-auto w-3/4 md:w-[356px] mb-6 md:mb-0"
          imgixParams={{
            fit: "crop",
            crop: "faces",
          }}
          fallbackAlt=""
        />
      </div>
      <div>
        <h3 className="mt-4 mb-12 text-7xl font-semibold md:font-medium text-white max-md:hidden">
          {slice.primary.title}
        </h3>
        <ul className="md:mt-4 flex flex-col md:justify-between">
          {slice.items?.map((item, index) => {
            return (
              <li key={index} className="flex space-x-4 pb-4 md:pb-8">
                <div
                  dangerouslySetInnerHTML={{ __html: item.svg as string }}
                  className="flex-shrink-0"
                />
                <div>
                  <h4 className="text-sm font-semibold text-white md:text-2xl md:mb-3">
                    {item.title}
                  </h4>
                  <p className="text-xs text-white_60 md:text-base">
                    {item.description}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
        <div className="flex h-[40px] w-auto flex-1 justify-center gap-3 md:mt-2 md:h-[54px] md:justify-start">
          <PrismicNextLink field={slice.primary.app_store_link}>
            <PrismicNextImage
              field={slice.primary.app_store_icon}
              className="h-[40px] w-auto md:h-[54px]"
              imgixParams={{
                fit: "crop",
                crop: "faces",
              }}
              fallbackAlt=""
            />
          </PrismicNextLink>
          <PrismicNextLink field={slice.primary.google_play_link}>
            <PrismicNextImage
              field={slice.primary.google_play_icon}
              className="h-[40px] w-auto md:h-[54px]"
              imgixParams={{
                fit: "crop",
                crop: "faces",
              }}
              fallbackAlt=""
            />
          </PrismicNextLink>
        </div>
      </div>
    </section>
  );
};

export default AppBlock;
