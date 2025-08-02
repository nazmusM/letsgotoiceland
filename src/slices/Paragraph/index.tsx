import { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { SliceComponentProps, PrismicRichText } from "@prismicio/react";
import { ImageField } from "@prismicio/client";
import { ContextType } from "@/lib/types";
import { ViewContext } from "@/lib/enums";

/**
 * Props for `Paragraph`.
 */
export type ParagraphProps = SliceComponentProps<Content.ParagraphSlice>;

/**
 * Component for "Paragraph" Slices.
 */

const Paragraph = ({ slice, context }: ParagraphProps): JSX.Element => {
  const contextSlice = context as ContextType;
  const BlogView: boolean = contextSlice?.view === ViewContext.BLOG_POST;

  return (
    <section
      className={`custom_pera_space custom_list mt-6  pb-6 md:mt-10 md:pb-10 ${(BlogView && "my-6 w-full md:mx-auto md:my-12 md:max-w-[792px]") || "border-b border-borderGray"}`}
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <PrismicRichText
        field={slice.primary.title}
        components={{
          paragraph: ({ children }) => (
            <h2 className={`mb-4 text-base font-semibold md:mb-6 md:text-3xl`}>
              {children}
            </h2>
          ),
        }}
      />
      {slice.items.map((item, index) => {
        return (
          <PrismicRichText
            key={index}
            field={item.content}
            components={{
              paragraph: ({ children, key }) => (
                <p
                  key={key}
                  className={`font-medium md:text-justify ${(BlogView && "my-6 w-full text-lg md:mx-auto md:my-12 md:max-w-[792px]") || "text-sm md:text-base"}`}
                >
                  {children}
                </p>
              ),
              listItem: ({ children, key }) => (
                <li key={key} className="list-disc pl-2">
                  {children}
                </li>
              ),
              preformatted: ({ node, key }) => <pre key={key}>{node.text}</pre>,
              image: ({ node }) => {
                return (
                  <PrismicNextImage
                    field={node as unknown as ImageField}
                    alt=""
                    className={`rounded-xl`}
                  />
                );
              },
            }}
          />
        );
      })}
    </section>
  );
};

export default Paragraph;
