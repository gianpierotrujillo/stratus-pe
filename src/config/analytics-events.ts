/**
 * DICCIONARIO DE EVENTOS GA4 — fuente única.
 *
 * Regla: GA4 ya mide por sí solo page_view, scroll (90%), clics salientes,
 * descargas y búsquedas (Medición mejorada). NUNCA se envían eventos con esos
 * nombres desde el código para no duplicar métricas.
 *
 * Nombres reservados/automáticos que no se deben usar:
 * page_view, scroll, click, file_download, form_start, form_submit,
 * view_search_results, video_start, video_progress, video_complete,
 * first_visit, session_start, user_engagement.
 */

/** Zonas de la página desde donde se dispara una acción. */
export const locations = [
  "header",
  "mobile_menu",
  "hero",
  "section",
  "card",
  "team_profile",
  "cta_band",
  "contact_page",
  "footer",
] as const;
export type EventLocation = (typeof locations)[number];

export const analyticsEvents = {
  generate_lead: {
    descripcion: "Formulario de consulta enviado con éxito (marcar como Evento clave en GA4).",
    params: ["service_interest", "form_location"],
  },
  cta_click: {
    descripcion: "Clic en un llamado a la acción (Consultar ahora, Iniciar consulta, etc.).",
    params: ["cta_id", "cta_location", "page_type"],
  },
  contact_click: {
    descripcion: "Clic en correo, teléfono o WhatsApp.",
    params: ["method", "link_location"],
  },
  practice_area_view: {
    descripcion: "Visita a la página de un área de práctica.",
    params: ["area_slug"],
  },
  team_profile_view: {
    descripcion: "Visita al perfil de un socio.",
    params: ["partner_slug"],
  },
  social_click: {
    descripcion: "Clic en un perfil de LinkedIn.",
    params: ["partner_slug", "link_location"],
  },
} as const;

export type AnalyticsEventName = keyof typeof analyticsEvents;
