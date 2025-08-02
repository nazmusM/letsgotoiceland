import { client } from "../prismicClient";
import { Content } from "@prismicio/client";
import { PrismicDocument } from "../enums";
import { Pagination } from "../types";
import { blogPostsDetailsGraphQuery, blogPostsListGraphQuery } from "./graphs";
import { isDebug } from "../environment";

export const getBlogPostByUid = async (uid: string) => {
  try {
    const blogPost = await client.getByUID<Content.BlogpostDocument>(
      PrismicDocument.BLOGPOST,
      uid,
      {
        graphQuery: blogPostsDetailsGraphQuery,
      },
    );

    return blogPost;
  } catch (error) {
    isDebug() && console.error("Error fetching blogPost:", error);
    return undefined;
  }
};

export const getAllBlogPosts = async ({
  pagination,
}: {
  pagination: Pagination;
}) => {
  try {
    const blogPosts = await client.getByType<Content.BlogpostDocument>(
      PrismicDocument.BLOGPOST,
      {
        graphQuery: blogPostsListGraphQuery,
      },
    );

    return blogPosts;
  } catch (error) {
    isDebug() && console.error("Error fetching all blogPosts:", error);
    throw error;
  }
};

export const getBlog = async () => {
  try {
    const blog =
      await client.getSingle<Content.BlogHomepageDocument>("blog_homepage");
    return blog;
  } catch (error) {
    isDebug() && console.error("Error fetching blog:", error);
    throw error;
  }
};
