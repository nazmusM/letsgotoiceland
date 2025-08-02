export enum PrismicDocument {
  EXPERIENCE = "experience",
  BLOGPOST = "blogpost",
  LANDMARK = "landmark",
  SEASON = "season",
  HOMEPAGE = "homepage",
  CATEGORY = "category",
  VIEW = "view",
  TYPE = "type",
  AGE = "age",
  LOCATION = "location",
}

export enum ArchiveDocument {
  SEASON = "season",
  CATEGORY = "category",
  VIEW = "view",
  TYPE = "type",
}

export enum ViewContext {
  HOMEPAGE = "homepage",
  ARCHIVE = "archive",
  BLOG_POST = "blog_post",
  EXPERIENCE = "experience",
}

export type PrismicDocumentTypeKeys = keyof typeof PrismicDocument;
export type PrismicDocumentTypeValues =
  (typeof PrismicDocument)[PrismicDocumentTypeKeys];

export type ArchiveDocumentTypeKeys = keyof typeof ArchiveDocument;
export type ArchiveDocumentTypeValues =
  (typeof ArchiveDocument)[ArchiveDocumentTypeKeys];
