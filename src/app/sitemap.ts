import type { MetadataRoute } from "next";
import { env } from "@/config/env";
import { publishedRoutes } from "@/config/navigation";

export default function sitemap(): MetadataRoute.Sitemap {
  return publishedRoutes.map((path) => ({
    url: `${env.siteUrl}${path === "/" ? "" : path}`,
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : 0.8,
  }));
}
