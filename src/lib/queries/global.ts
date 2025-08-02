import { PrismicDocumentTypeValues } from "../enums";
import { isDebug } from "../environment";
import { client } from "../prismicClient";

export const getDocumentByUID = async (
  type: PrismicDocumentTypeValues,
  uid: string,
  graphQuery?: string,
) => {
  try {
    const document = await client.getByUID(
      type,
      uid,
      (graphQuery && { graphQuery }) || undefined,
    );
    return document;
  } catch (error) {
    isDebug() && console.error("Error fetching document by UID:", error);
    throw error;
  }
};

export const getDocumentListByType = async (
  type: PrismicDocumentTypeValues,
) => {
  try {
    const document = await client.getByType(type);
    return document;
  } catch (error) {
    isDebug() && console.error("Error fetching document by type:", error);
    throw error;
  }
};
