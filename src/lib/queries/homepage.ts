import { isDebug } from "../environment";
import { client } from "../prismicClient";
import { homepageGraphQuery } from "./graphs";

export const getHomepage = async () => {
  try {
    const homepage = await client.getSingle("homepage", {
      graphQuery: homepageGraphQuery,
    });
    return homepage;
  } catch (error) {
    isDebug() && console.error("Error fetching homepage:", error);
    throw error;
  }
};
