import {
  getExperienceByUid,
  getFilteredExperiences,
  getAllExperiences,
} from "./experiences";
import { getBlogPostByUid, getAllBlogPosts, getBlog } from "./blog";
import { getLandmarkByUid } from "./landmarks";
import { getDocumentListByType } from "./global";
import { getHomepage } from "./homepage";
import { PrismicDocumentTypeValues } from ".././enums";
import { Pagination } from "../types";
import { getMessageBanner } from "./messageBanner";
import { getAllLocations } from "./location";
import { getAllCategories } from "./category";

const QUERIES = {
  experience: {
    getByUID: (uid: string) => getExperienceByUid(uid),
    getList: ({ pagination }: { pagination: Pagination }) =>
      getAllExperiences({ pagination }),
    getFilteredList: ({
      type,
      slug,
      filters = [],
      pagination,
    }: {
      type?: PrismicDocumentTypeValues;
      slug?: string;
      filters: any[];
      pagination: Pagination;
    }) => getFilteredExperiences({ type, slug, filters, pagination }),
  },
  homepage: {
    get: () => getHomepage(),
  },
  landmark: {
    getByUID: (uid: string) => getLandmarkByUid(uid),
  },
  common: {
    getSiblingDocuments: (type: PrismicDocumentTypeValues) => {
      return getDocumentListByType(type);
    },
    getSiblingNamesByType: (type: PrismicDocumentTypeValues) => {
      return getDocumentListByType(type).then((response) => {
        return response.results.map((result) => result.uid);
      });
    },
  },
  blogPost: {
    getByUID: (uid: string) => getBlogPostByUid(uid),
    getList: ({ pagination }: { pagination: Pagination }) =>
      getAllBlogPosts({ pagination }),
  },
  blog: {
    get: () => getBlog(),
  },
  messageBanner: {
    get: () => getMessageBanner(),
  },
  location: {
    getList: ({ pagination }: { pagination: Pagination }) =>
      getAllLocations({ pagination }),
  },
  category: {
    getList: ({ pagination }: { pagination: Pagination }) =>
      getAllCategories({ pagination }),
  },
};

export default QUERIES;
