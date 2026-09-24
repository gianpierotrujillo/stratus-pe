/**
 * Menú principal y rutas del sitio (orden aprobado).
 * Agregar o reordenar aquí actualiza cabecera, pie y sitemap.
 */
export const mainNav = [
  { label: "Inicio", href: "/" },
  { label: "Áreas de Práctica", href: "/areas-de-practica" },
  { label: "Equipo", href: "/equipo" },
  { label: "Nosotros", href: "/nosotros" },
  { label: "Contacto", href: "/contacto" },
] as const;

export const primaryCta = { label: "Consultar ahora", href: "/contacto" } as const;

export const legalNav = [
  { label: "Política de privacidad", href: "/politica-de-privacidad" },
  { label: "Política de cookies", href: "/politica-de-cookies" },
] as const;

/**
 * Rutas publicadas. Se amplía en cada fase conforme existan las páginas;
 * el sitemap solo incluye las que figuran aquí.
 */
export const publishedRoutes: readonly string[] = ["/"];
