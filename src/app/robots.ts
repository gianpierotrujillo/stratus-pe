import type { MetadataRoute } from "next";
import { env } from "@/config/env";

/** Bloquea todo mientras SITE_INDEXABLE no sea "true" (antes del lanzamiento). */
export default function robots(): MetadataRoute.Robots {
  if (!env.indexable) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${env.siteUrl}/sitemap.xml`,
    host: env.siteUrl,
  };
}
