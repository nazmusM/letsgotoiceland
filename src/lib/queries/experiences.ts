import { client } from "../prismicClient";
import { Content } from "@prismicio/client";
import { filter } from "@prismicio/client";
import { getDocumentByUID } from "./global";
import {
  archiveGraphQuery,
  experienceGraphQuery,
  experiencesListGraphQuery,
  experienceTypeSchema,
} from "./graphs";
import { PrismicDocument, PrismicDocumentTypeValues } from ".././enums";
import { ArchiveResponse, Pagination, SiblingType } from "../types";
import { isDebug } from "../environment";

export const getExperienceByUid = async (uid: string) => {
  try {
    const experience = await client.getByUID<Content.ExperienceDocument>(
      PrismicDocument.EXPERIENCE,
      uid,
      {
        graphQuery: experienceGraphQuery,
      },
    );

    return experience;
  } catch (error) {
    isDebug() && console.error("Error fetching experience:", error);
    return undefined;
  }
};

export const getAllExperiences = async ({
  pagination,
}: {
  pagination: Pagination;
}) => {
  try {
    const experiences = await client.getByType<Content.ExperienceDocument>(
      PrismicDocument.EXPERIENCE,
      {
        pageSize: pagination.pageSize,
        page: pagination.page,
        graphQuery: experiencesListGraphQuery(),
      },
    );
    return experiences;
  } catch (error) {
    isDebug() && console.error("Error fetching all experiences:", error);
    throw error;
  }
};

export const getFilteredExperiences = async ({
  type,
  slug,
  filters = [],
  pagination,
}: {
  type?: PrismicDocumentTypeValues;
  slug?: string;
  filters: any[];
  pagination: Pagination;
}, withSlice: boolean = true) => {
  const result: ArchiveResponse = {};

  try {
    if (type && slug) {
      const archive = await getDocumentByUID(
        type,
        slug,
        archiveGraphQuery(type, withSlice),
      );
      result.archive = archive as SiblingType;
      filters = [
        ...filters,
        filter.any(`my.experience.${type}.name`, [archive.id]),
      ];
    }
    const experienceList = await client.getByType<Content.ExperienceDocument>(
      PrismicDocument.EXPERIENCE,
      {
        pageSize: pagination.pageSize,
        page: pagination.page,
        filters,
        graphQuery: experiencesListGraphQuery(withSlice),
      },
    );
    return { ...result, experiences: experienceList };
  } catch (error) {
    isDebug() && console.error("Error fetching experience list:", error);
    throw error;
  }
};
