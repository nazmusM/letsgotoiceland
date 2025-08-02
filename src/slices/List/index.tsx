import { Content } from "@prismicio/client";
import Image from "next/image";
import { SliceComponentProps, PrismicRichText } from "@prismicio/react";

/**
 * Props for `List`.
 */
export type ListProps = SliceComponentProps<Content.ListSlice>;

/**
 * Component for "List" Slices.
 */
const List = ({ slice }: ListProps): JSX.Element => {
  const multiColumn = slice.primary.multi_column;
  const iconType = slice.primary.icon_type;
  return (
    <section
      className="mt-6 border-b border-borderGray pb-6 md:mt-10 md:pb-10"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <PrismicRichText
        field={slice.primary.title}
        components={{
          paragraph: ({ children }) => (
            <h2 className="mb-4 text-base font-semibold md:mb-8 md:text-3xl">
              {children}
            </h2>
          ),
        }}
      />
      <ul className={(multiColumn && "grid md:grid-cols-2 md:gap-2") || ""}>
        {slice.items.map((item, index) => {
          return item.content.map((content, index2) => {
            return (
              <li key={index + index2}>
                <div className="mb-2 flex">
                  <span className="min-w-[30px]">
                    <Image
                      src={`/icons/list/${iconType}.svg`}
                      alt={iconType}
                      width={20}
                      height={20}
                    />
                  </span>
                  {content.type === "list-item" && (
                    <span className="text-sm md:text-base">
                      {content.text}
                    </span>
                  )}
                </div>
              </li>
            );
          });
        })}
      </ul>
    </section>
  );
};

export default List;
