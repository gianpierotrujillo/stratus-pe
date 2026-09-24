/** Todas las rutas públicas del sitio (para sitemap y enlaces internos). */
import { mainNav } from "@/config/navigation";
import { practiceAreas } from "@/content/areas";
import { isLegalDocReady, legalDocs } from "@/content/legal";
import { partners } from "@/content/partners";

export const areaPath = (slug: string) => `/areas-de-practica/${slug}`;
export const partnerPath = (slug: string) => `/equipo/${slug}`;

export type RouteEntry = { path: string; images?: readonly string[] };

export const publicRoutes: readonly RouteEntry[] = [
  ...mainNav.map((n) => ({ path: n.href })),
  ...practiceAreas.map((a) => ({ path: areaPath(a.slug) })),
  ...partners.map((p) => ({ path: partnerPath(p.slug), images: [p.photo.src] })),
  // Las páginas legales entran al sitemap cuando su texto esté completo.
  ...legalDocs.filter(isLegalDocReady).map((d) => ({ path: `/${d.slug}` })),
];
