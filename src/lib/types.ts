import { Content, RichTextField } from "@prismicio/client";
export type PrismicPaginationReponse = {
  page: number;
  results_per_page: number;
  results_size: number;
  total_results_size: number;
  total_pages: number;
  next_page: string | null;
  prev_page: string | null;
};

export type Pagination = {
  page: number;
  pageSize: number;
};

export type SiblingType =
  | Content.TypeDocument
  | Content.ViewDocument
  | Content.CategoryDocument
  | Content.SeasonDocument;

export type ArchiveResponse = {
  archive?: SiblingType;
  experiences?: Content.ExperienceDocument[];
};

export type ArchiveData = {
  title: string;
  subtitle: RichTextField;
  slices: Content.CuratedContentSlice[] | Content.AdvertisementSlice[];
};

export type SiblingData =
  | Content.SeasonDocumentDataSiblingsItem
  | Content.TypeDocumentDataSiblingsItem
  | Content.ViewDocumentDataSiblingsItem
  | Content.CategoryDocumentDataSiblingsItem;

export interface ContextType {
  view?: string;
}
