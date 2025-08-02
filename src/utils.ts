import { Content, isFilled, GeoPointField } from "@prismicio/client";
import { SiblingData } from "./lib/types";

type LinkType = {
  link_type: string;
  url?: string;
  uid?: string;
  type?: string;
};

type SiblingType = {
  type: string;
  uid: string;
};
export const generateURL = (link: LinkType) => {
  if (link.link_type === "Web" && link.url) {
    return link.url;
  }
  if (link.link_type === "Document" && link.type && link.uid) {
    return `/${link.type}s/${link.uid}`;
  }
  return "/";
};

export const generateTimeString = (
  duration: Content.ExperienceDocumentDataDurationItem,
) => {
  if (!duration) return "";
  const decimalHours =
    (duration.hours || 0) + ((duration.minutes && duration.minutes / 60) || 0);
  const formattedHours = decimalHours.toFixed(1);
  const timeString = formattedHours + " hours";
  return timeString;
};
export type SeasonType = {
  name: Content.SeasonDocument;
};
export const generateSeasonString = (seasons: SeasonType[]) => {
  if (!seasons) return "";
  const seasonString = seasons.length > 1 ? "All year" : seasons[0].name.uid;
  return seasonString;
};

export const generateGeoPoint = (geoPoint: GeoPointField) => {
  if (!geoPoint) return;
  return {
    lat: geoPoint.latitude,
    lng: geoPoint.longitude,
  };
};

const sameObjects = (obj1: any, obj2: any) => {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
};
const isEmptyObject = (obj: any) => {
  return Object.keys(obj).length === 0;
};

export type infoMarkerType = {
  start?: string;
  end?: string;
};

export const generateInfoMarkers = (location: Content.LocationSlice) => {
  const info: infoMarkerType = {};
  if (!location) return info;
  const variation = location.variation;

  if (
    isEmptyObject(location.primary.end_geopoint) ||
    sameObjects(location.primary.start_geopoint, location.primary.end_geopoint)
  ) {
    info.start =
      variation === "default" ? "Meeting point" : "Pick up / Drop off point";
    return info;
  }
  info.start = variation === "default" ? "Start point" : "Pick up point";
  info.end = variation === "default" ? "End point" : "Drop off point";
  return info;
};

export const formatCurrency = (amount: number, currency: string) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(amount);
};

export const formatUID = (uid: string) => {
  return uid.charAt(0).toUpperCase() + uid.slice(1).replace(/-/g, " ");
};

function isSiblingData(obj: any): obj is SiblingData {
  return obj && typeof obj.link !== "undefined";
}

function isAllDocumentTypes(obj: any): obj is Content.AllDocumentTypes {
  return obj && typeof obj.data !== "undefined";
}
export const formatSiblings = (
  siblings: Content.AllDocumentTypes[] | SiblingData[],
) => {
  const formatted: SiblingType[] = [];
  siblings.forEach((sibling) => {
    if (isAllDocumentTypes(sibling)) {
      formatted.push({
        type: sibling.type,
        uid: sibling.uid,
      });
    } else if (isSiblingData(sibling)) {
      if (!isFilled.contentRelationship(sibling.link)) return null;
      formatted.push({
        type: sibling.link.type,
        uid: sibling.link.uid as string,
      });
    }
  });
  return formatted;
};

export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}
