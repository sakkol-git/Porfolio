import type { MetadataRoute } from "next";
import { SITE_URL, ROUTES } from "@/lib/constants";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = Object.values(ROUTES).map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date().toISOString().split("T")[0],
    changeFrequency: "weekly" as const,
    priority: route === "/" ? 1 : 0.8,
  }));

  return routes;
}
