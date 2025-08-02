import type { Content } from "@prismicio/client";
import { PrismicPaginationReponse } from "@/lib/types";
import BlogCard from "./BlogCard";

type BlogGridProps = PrismicPaginationReponse & {
  results: Content.BlogpostDocument[];
};
export default function BlogGrid({ blogPosts }: { blogPosts: BlogGridProps }) {
  return (
    <div className="lg mx-auto md:mt-8 w-full p-2 md:p-0">
      <div className="">
        {blogPosts.results.map((blog: Content.BlogpostDocument) => {
          return (
            <div key={blog.id} className="my-4 md:my-14">
              <BlogCard blog={blog} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
