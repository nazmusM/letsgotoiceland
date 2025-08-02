import { PrismicRichText, SliceZone } from "@prismicio/react";
import { components } from "@/slices";
import BlogInfo from "@/app/components/blog/BlogInfo";
import QUERIES from "@/lib/queries";
import { PrismicNextImage } from "@prismicio/next";
import BlogTags from "@/app/components/blog/BlogTags";
import { ViewContext } from "@/lib/enums";

type Params = { uid: string };

export default async function BlogPost({ params }: { params: Params }) {
  const blogPost = await QUERIES.blogPost.getByUID(params.uid);
  if (!blogPost) {
    return null;
  }
  return (
    <div className="mx-auto mt-8 w-full p-2 md:max-w-[1200px] md:p-0">
      <div className="text-center">
        <div className="flex justify-center">
          <BlogInfo blogPost={blogPost} />
        </div>
        <p className="text-blogPostTitle md:text-7xl font-semibold">
          {blogPost.data.title}
        </p>
        <div className="my-3 w-full md:mx-auto md:my-6 md:w-[792px]">
          <PrismicRichText field={blogPost.data.subtitle} />
          <div className="my-3 flex justify-center md:my-6 md:mb-12">
            <BlogTags tags={blogPost.data.tag} />
          </div>
        </div>
      </div>
      <PrismicNextImage
        field={blogPost.data.image}
        className="w-full max-w-[1200px] rounded-xl"
        fallbackAlt=""
      />
      <SliceZone
        slices={blogPost.data.slices}
        components={components}
        context={{ view: ViewContext.BLOG_POST }}
      />
    </div>
  );
}
