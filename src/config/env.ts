/**
 * Variables de entorno (se definen en Vercel → Settings → Environment Variables
 * y, en local, en .env.local). Ver .env.example.
 */
import { site } from "./site";

const trimSlash = (url: string) => url.replace(/\/+$/, "");

export const env = {
  /** URL canónica. En producción: https://stratus.pe */
  siteUrl: trimSlash(process.env.NEXT_PUBLIC_SITE_URL ?? `https://${site.domain}`),

  /**
   * Solo cuando vale "true" el sitio permite ser indexado por Google.
   * Se activa el día del lanzamiento; mientras tanto, cualquier despliegue
   * (incluido *.vercel.app) queda como noindex.
   */
  indexable: process.env.SITE_INDEXABLE === "true",

  /** ID de medición GA4 (G-XXXXXXX). Vacío = analítica desactivada. */
  gaId: process.env.NEXT_PUBLIC_GA_ID ?? "",
} as const;
