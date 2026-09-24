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
   * Además, solo aplica a despliegues de Producción (rama main): las vistas
   * previas (rama develop, etc.) quedan siempre como noindex.
   */
  indexable:
    process.env.SITE_INDEXABLE === "true" &&
    (process.env.VERCEL_ENV === undefined || process.env.VERCEL_ENV === "production"),

  /** Opcional: código de verificación HTML de Google Search Console (si no se usa el registro DNS). */
  googleVerification: process.env.GOOGLE_SITE_VERIFICATION ?? "",

  /** ID de medición GA4 (G-XXXXXXX). Vacío = analítica desactivada. */
  gaId: process.env.NEXT_PUBLIC_GA_ID ?? "",
} as const;
