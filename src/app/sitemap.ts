import type { MetadataRoute } from "next";
import { env } from "@/config/env";
import { publicRoutes } from "@/lib/routes";

const buildDate = new Date();

export default function sitemap(): MetadataRoute.Sitemap {
  return publicRoutes.map(({ path, images }) => ({
    url: `${env.siteUrl}${path === "/" ? "" : path}`,
    lastModified: buildDate,
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : path.split("/").length > 2 ? 0.6 : 0.8,
    ...(images ? { images: images.map((i) => `${env.siteUrl}${i}`) } : {}),
  }));
}
