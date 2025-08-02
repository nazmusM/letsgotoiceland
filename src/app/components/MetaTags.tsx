import React from "react";
import Head from "next/head";
import { KeyTextField, ImageField } from "@prismicio/client";

type MetaTagsProps = {
  title: KeyTextField;
  description: KeyTextField;
  image: ImageField;
  pageUrl: string;
};

export const MetaTags: React.FC<MetaTagsProps> = ({
  title,
  description,
  image,
  pageUrl,
}) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description || undefined} />

      {/* OpenGraph Meta Tags */}
      <meta property="og:title" content={title || undefined} />
      <meta property="og:description" content={description || undefined} />
      <meta property="og:image" content={image.url || undefined} />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:type" content="website" />

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:title" content={title || undefined} />
      <meta name="twitter:description" content={description || undefined} />
      <meta name="twitter:image" content={image.url || undefined} />
    </Head>
  );
};
