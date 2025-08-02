import Button from "@/app/components/Button";
import BlogInfo from "@/app/components/blog/BlogInfo";
import BlogTags from "@/app/components/blog/BlogTags";
import { Content, isFilled } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Link from "next/link";

/**
 * Props for `CuratedContent`.
 */
export type CuratedContentProps =
  SliceComponentProps<Content.CuratedContentSlice>;

/**
 * Component for "CuratedContent" Slices.
 */
const CuratedContent = ({ slice }: CuratedContentProps): JSX.Element => {
  const PrimaryBlogpost =
    (isFilled.contentRelationship(slice.items[0].blog_post) &&
      (slice.items[0].blog_post as unknown as Content.BlogpostDocument)) ||
    undefined;
  if (!PrimaryBlogpost) return <></>;
  const PrimaryBlogpostData =
    PrimaryBlogpost.data as Content.BlogpostDocumentData;
  if (!PrimaryBlogpostData) return <></>;
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="lg:h-max[718px] mb-0 mt-10 bg-black px-4 py-10 lg:mt-32 lg:px-0 lg:py-32"
    >
      <div className="max-w-[1200px] lg:mx-auto lg:h-[718px]">
        <h2 className="text-2xl font-semibold md:font-medium text-white md:text-7xl lg:w-[792px]">
          {slice.primary.title}
        </h2>
        <div className=" text-gray-400 mt-3 mb-6 md:mt-6 md:mb-16 md:max-w-2xl ">
          <PrismicRichText field={slice.primary.subtitle} />
        </div>
        <div className="gap-6 lg:mb-16 lg:my-6 lg:grid lg:h-[448px] lg:grid-cols-2">
          <div
            className={`relative hidden overflow-hidden lg:block lg:h-[448px]`}
          >
            <PrismicNextImage
              field={PrimaryBlogpostData.image}
              className={`col-span-2 w-full rounded-xl object-cover lg:h-[448px]`}
              imgixParams={{
                fit: "crop",
                crop: "face",
              }}
              fallbackAlt=""
            />
            <div className="absolute inset-0 -top-5 flex items-end p-6">
              <div>
                <div className="w-2/3">
                  <BlogInfo blogPost={PrimaryBlogpost} variant="secondary" />
                </div>
                <Link href={`/blog/${PrimaryBlogpost.uid}`}>
                  <h3 className="Curated text-2xl font-semibold text-white hover:underline">
                    {PrimaryBlogpostData.title}
                  </h3>
                </Link>

                <div className="text-white_80 my-3 text-sm lg:text-base">
                  <PrismicRichText field={PrimaryBlogpostData.subtitle} />
                </div>

                <BlogTags tags={PrimaryBlogpostData.tag} variant="secondary" />
              </div>
            </div>
            <div className="mt-3 lg:mt-0"></div>
          </div>
          <div className="gap-6 lg:grid lg:h-[448px] lg:grid-rows-2">
            {slice.items.map((item, index) => {
              const blogpost =
                (isFilled.contentRelationship(item.blog_post) &&
                  (item.blog_post as unknown as Content.BlogpostDocument)) ||
                undefined;
              if (!blogpost) return;
              const blogpostData =
                blogpost.data as Content.BlogpostDocumentData;
              return (
                <div
                  key={index}
                  className={`${index === 0 && "lg:hidden"} gap-6 lg:row-span-1 lg:grid lg:grid-cols-2`}
                >
                  <div className="mb-3 mt-6 h-full overflow-hidden lg:my-0">
                    <PrismicNextImage
                      field={blogpostData.image}
                      className={`col-span-2 h-[220px] rounded-xl object-cover lg:col-span-1 lg:h-[212px]`}
                      imgixParams={{
                        fit: "crop",
                        crop: "face",
                      }}
                      fallbackAlt=""
                    />
                  </div>

                  <div className="col-span-2 my-3 h-full space-y-1 lg:col-span-1 lg:space-y-2">
                    <BlogInfo blogPost={blogpost} variant="secondary" />
                    <Link href={`/blog/${blogpost.uid}`}>
                      <h3 className="Curated text-base font-semibold text-white hover:underline md:text-2xl">
                        {blogpostData.title}
                      </h3>
                    </Link>

                    <div className="text-white_80 line-clamp-4 text-sm lg:text-base">
                      <PrismicRichText field={blogpostData.subtitle} />
                    </div>
                    <BlogTags tags={blogpostData.tag} variant="secondary" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <Button linkString={`/blog`} variant="primary">
          View All
        </Button>
      </div>
    </section>
  );
};

export default CuratedContent;
