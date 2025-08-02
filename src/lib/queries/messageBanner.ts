import { isDebug } from "../environment";
import { client } from "../prismicClient";

export const getMessageBanner = async () => {
  try {
    const messageBanner = await client.getSingle("messagebanner");
    return messageBanner;
  } catch (error) {
    isDebug() && console.error("Error fetching messageBanner:", error);
    throw error;
  }
};
