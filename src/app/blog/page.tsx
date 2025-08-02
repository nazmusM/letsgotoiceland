import QUERIES from "@/lib/queries";
import { components } from "@/slices";
import BlogGrid from "../components/blog/BlogGrid";
import { PrismicRichText } from "@prismicio/react";
import { Content } from "@prismicio/client";

type Params = { uid: string };

export default async function Blog() {
  const blog = await QUERIES.blog.get();
  const data = blog.data as Content.BlogHomepageDocumentData;
  const blogPosts = await QUERIES.blogPost.getList({
    pagination: { page: 1, pageSize: 10 },
  });

  return (
    <div className="mx-auto max-w-[1200px] px-2 md:px-0">
      <div className="mb-3 pl-2 pr-2 md:p-0">
        <h1 className="text-2xl mb-3 md:text-7xl font-semibold md:mb-10">{blog.data.title}</h1>
        <div className="text-l md:text-xl md:w-[792px]"><PrismicRichText field={data.subtitle} /></div>
      </div>

      <BlogGrid blogPosts={blogPosts} />
    </div>
  );
}

// export async function generateMetadata({
//   params,
// }: {
//   params: Params;
// }): Promise<Metadata> {
//   const client = createClient();
//   const page = await client
//     .getByUID("blog", params.uid)
//     .catch(() => notFound());

//   return {
//     title: page.data.meta_title,
//     description: page.data.meta_description,
//   };
// }

// export async function generateStaticParams() {
//   const client = createClient();
//   const pages = await client.getAllByType("blog");

//   return pages.map((page) => {
//     return { uid: page.uid };
//   });
// }
