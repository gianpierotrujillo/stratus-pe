import type { Metadata } from "next";
import { site } from "@/config/site";
import { defaultOgImage, ogSize } from "./og-config";

type PageMeta = {
  /** Título de la página (se completa con " | Stratus Consulting"). */
  title: string;
  description: string;
  /** Ruta canónica, ej. "/equipo". */
  path: string;
  /** true = usar `title` tal cual, sin la plantilla (página de inicio). */
  absoluteTitle?: boolean;
  /** "profile" para perfiles de personas. */
  ogType?: "website" | "profile";
  /** true si la ruta tiene su propio opengraph-image.tsx (no usar la imagen general). */
  ownImage?: boolean;
};

/**
 * Metadatos estándar de una página: título, descripción, canonical, Open Graph y X.
 * La imagen para compartir la aportan los archivos opengraph-image.tsx de cada ruta
 * (o la general de la raíz).
 */
export function pageMetadata({
  title,
  description,
  path,
  absoluteTitle,
  ogType = "website",
  ownImage,
}: PageMeta): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} | ${site.name}`;
  // Imagen general, salvo en rutas con su propio opengraph-image.tsx.
  const images = ownImage ? undefined : [{ url: defaultOgImage, ...ogSize, alt: site.seoTitle }];
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: ogType,
      locale: site.locale,
      siteName: site.name,
      url: path,
      title: fullTitle,
      description,
      ...(images ? { images } : {}),
    },
    twitter: { card: "summary_large_image", title: fullTitle, description, ...(images ? { images } : {}) },
  };
}
