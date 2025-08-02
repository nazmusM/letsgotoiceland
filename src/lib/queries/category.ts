import { client } from "../prismicClient";
import { Content } from "@prismicio/client";

import { categoryGraphQuery } from "./graphs";
import { PrismicDocument } from "../enums";
import { Pagination } from "../types";
import { isDebug } from "../environment";

export const getAllCategories = async ({
  pagination,
}: {
  pagination: Pagination;
}) => {
  try {
    const categories = await client.getByType<Content.CategoryDocument>(
      PrismicDocument.CATEGORY,
      {
        pageSize: pagination.pageSize,
        page: pagination.page,
        graphQuery: categoryGraphQuery,
      },
    );
    return categories;
  } catch (error) {
    isDebug() && console.error("Error fetching all categories:", error);
    throw error;
  }
};
