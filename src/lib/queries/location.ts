import { client } from "../prismicClient";
import { Content } from "@prismicio/client";

import { locationGraphQuery } from "./graphs";
import { PrismicDocument } from ".././enums";
import { Pagination } from "../types";
import { isDebug } from "../environment";

export const getAllLocations = async ({
  pagination,
}: {
  pagination: Pagination;
}) => {
  try {
    const locations = await client.getByType<Content.LocationDocument>(
      PrismicDocument.LOCATION,
      {
        pageSize: pagination.pageSize,
        page: pagination.page,
        graphQuery: locationGraphQuery,
      },
    );
    return locations;
  } catch (error) {
    isDebug() && console.error("Error fetching all locations:", error);
    throw error;
  }
};
