import type { Metadata } from "next";
import { site } from "@/config/site";

type PageMeta = {
  title: string;
  description: string;
  /** Ruta canónica, ej. "/equipo". */
  path: string;
  /** Imagen para redes (ruta pública). */
  image?: string;
};

/** Metadatos estándar de una página: título, descripción, canonical y Open Graph. */
export function pageMetadata({ title, description, path, image }: PageMeta): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: site.locale,
      siteName: site.name,
      url: path,
      title: `${title} | ${site.name}`,
      description,
      ...(image ? { images: [{ url: image }] } : {}),
    },
  };
}
