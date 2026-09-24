/** Todas las rutas públicas del sitio (para sitemap y enlaces internos). */
import { legalNav, mainNav } from "@/config/navigation";
import { practiceAreas } from "@/content/areas";
import { partners } from "@/content/partners";

export const areaPath = (slug: string) => `/areas-de-practica/${slug}`;
export const partnerPath = (slug: string) => `/equipo/${slug}`;

export const publicRoutes: readonly string[] = [
  ...mainNav.map((n) => n.href),
  ...practiceAreas.map((a) => areaPath(a.slug)),
  ...partners.map((p) => partnerPath(p.slug)),
  ...legalNav.map((n) => n.href),
];
