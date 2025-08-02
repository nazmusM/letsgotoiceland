import { Content, isFilled } from "@prismicio/client";
import Link from "next/link";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";
import BlogInfo from "./BlogInfo";
import BlogTags from "./BlogTags";

export default function BlogCard({ blog }: { blog: Content.BlogpostDocument }) {
  const data = blog.data as Content.BlogpostDocumentData;

  const author =
    ((isFilled.contentRelationship(data.author) &&
      data.author.data) as Content.AuthorDocumentData) || undefined;
  const image = data.image;
  return (
    <Link className="w-full" href={`/blog/${blog.uid}`}>
      <div className=" bg-white md:flex">
        <div className="flex-none md:w-[441px]">
          <PrismicNextImage
            field={image}
            placeholder="empty"
            imgixParams={{
              fit: "crop",
              crop: "face",
              q: 50,
              w: 441,
              ar: "4:3",
            }}
            sizes="(max-width: 640px) 50vw, 33vw"
            className="overflow-hidden rounded-xl md:w-[441px]"
            fallbackAlt=""
          />
        </div>
        <div className="grow content-center p-2 md:p-6">
          <BlogInfo blogPost={blog} />
          <h2 className="text-4xl mb-2 md:text-6xl font-medium  md:mb-4">{blog.data.title}</h2>
          <div className="text-black_333 mb-4"><PrismicRichText field={data.subtitle} /></div>
          <BlogTags tags={data.tag} className="mt-3" />
        </div>
      </div>
    </Link>
  );
}
