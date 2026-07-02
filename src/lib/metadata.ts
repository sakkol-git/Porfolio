import type { Metadata } from "next";
import { SITE_URL, SITE_NAME } from "./constants";

export function buildPageMetadata(
  title: string,
  description: string,
  path: string,
): Metadata {
  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}${path}`,
    },
    openGraph: {
      title: `${title} — ${SITE_NAME}`,
      description,
      url: `${SITE_URL}${path}`,
      siteName: SITE_NAME,
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} — ${SITE_NAME}`,
      description,
    },
  };
}
