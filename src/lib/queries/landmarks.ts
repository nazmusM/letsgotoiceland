import { client } from "../prismicClient";
import { Content } from "@prismicio/client";
import { PrismicDocument } from "../enums";
import { isDebug } from "../environment";

const landmarkGraphQuery = `{
  landmark {
    name {
      title
      hero_image
      location
      slices {
        ... on image_gallery {
          variation {
            ... on default {
              items {
                image
              }
            }
          }
        }
        ... on paragraph {
          variation {
            ... on default {
              items {
                content
              }
              primary {
                title
              }
            }
          }
        }
      }
    }
  }
`;

export const getLandmarkByUid = async (uid: string) => {
  try {
    const landmark = await client.getByUID<Content.LandmarkDocument>(
      PrismicDocument.LANDMARK,
      uid,
    );

    return landmark;
  } catch (error) {
    isDebug() && console.error("Error fetching landmark:", error);
    return undefined;
  }
};
