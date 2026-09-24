/**
 * DATOS DE LA EMPRESA — fuente única.
 * Cabecera, pie, contacto, SEO, datos estructurados y formulario leen de aquí.
 * Los valores con PENDIENTE(...) deben completarlos los socios.
 */
import { PENDIENTE } from "./pending";

export const site = {
  name: "Stratus Consulting",
  shortName: "Stratus",
  legalName: PENDIENTE("Razón social"),
  ruc: PENDIENTE("RUC"),
  foundingYear: PENDIENTE("Año de fundación"),

  domain: "stratus.pe",
  locale: "es_PE",
  lang: "es-PE",

  tagline: "Estrategia. Derecho. Resultados.",
  description:
    "Estudio de abogados en Lima. Asesoría legal en derecho ambiental y recursos naturales, derecho empresarial, organizaciones sin fines de lucro y Fractional Legal Counsel.",

  contact: {
    email: "contacto@stratus.pe",
    emailSubject: "Consulta desde stratus.pe",
    phone: PENDIENTE("Teléfono"),
    whatsapp: PENDIENTE("WhatsApp (formato 51XXXXXXXXX)"),
    responseTime: "Responderemos en un plazo máximo de 24 horas hábiles.",
    address: {
      street: PENDIENTE("Dirección de oficina"),
      district: PENDIENTE("Distrito"),
      city: "Lima",
      region: "Lima",
      country: "PE",
      countryName: "Perú",
    },
    hours: PENDIENTE("Horario de atención"),
  },

  social: {
    linkedin: PENDIENTE("LinkedIn de la firma"),
  },
} as const;

export type Site = typeof site;
