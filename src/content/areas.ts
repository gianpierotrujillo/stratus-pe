/**
 * ÁREAS DE PRÁCTICA — fuente única.
 * `title` y `summary`: textos validados por los socios (GoDaddy).
 * `intro` y `services`: contenido ampliado que deben redactar los socios.
 */
import { PENDIENTE } from "@/config/pending";

export type PracticeArea = {
  slug: string;
  numeral: string;
  title: string;
  /** Título corto para menús y selectores. */
  shortTitle: string;
  summary: string;
  /** Párrafo introductorio de la página del área. */
  intro: string;
  /** Servicios concretos del área (lista). */
  services: readonly string[];
  /** Socios a cargo (slugs de partners.ts). */
  leads: readonly string[];
};

export const practiceAreas: readonly PracticeArea[] = [
  {
    slug: "derecho-ambiental-recursos-naturales",
    numeral: "I",
    title: "Derecho Ambiental y de los Recursos Naturales",
    shortTitle: "Derecho Ambiental",
    summary:
      "Asesoría integral en regulación ambiental, licencias, evaluaciones de impacto y gestión de recursos naturales para proyectos de inversión en el Perú.",
    intro: PENDIENTE("Introducción ampliada — Derecho Ambiental (2-3 párrafos)"),
    services: [PENDIENTE("Lista de servicios — Derecho Ambiental (5 a 8 ítems)")],
    leads: ["luis-garcia-neyra"],
  },
  {
    slug: "derecho-empresarial",
    numeral: "II",
    title: "Derecho Empresarial",
    shortTitle: "Derecho Empresarial",
    summary:
      "Estructuración corporativa, contratos, fusiones y adquisiciones, y cumplimiento normativo para empresas que operan en mercados complejos.",
    intro: PENDIENTE("Introducción ampliada — Derecho Empresarial (2-3 párrafos)"),
    services: [PENDIENTE("Lista de servicios — Derecho Empresarial (5 a 8 ítems)")],
    leads: ["jose-miguel-tay"],
  },
  {
    slug: "organizaciones-sin-fines-de-lucro",
    numeral: "III",
    title: "Asesoría para Organizaciones sin Fines de Lucro",
    shortTitle: "Organizaciones sin Fines de Lucro",
    summary:
      "Constitución, gobernanza, cumplimiento legal y estrategia jurídica para ONGs, fundaciones y asociaciones civiles en el Perú.",
    intro: PENDIENTE("Introducción ampliada — Organizaciones sin Fines de Lucro (2-3 párrafos)"),
    services: [PENDIENTE("Lista de servicios — Organizaciones sin Fines de Lucro (5 a 8 ítems)")],
    leads: ["luis-garcia-neyra"],
  },
  {
    slug: "fractional-legal-counsel",
    numeral: "IV",
    title: "Fractional Legal Counsel",
    shortTitle: "Fractional Legal Counsel",
    summary:
      "Asesoría jurídica de alto nivel bajo un modelo flexible y eficiente: el rigor de un equipo legal interno, sin los costos fijos que implica.",
    intro: PENDIENTE("Introducción ampliada — Fractional Legal Counsel (qué es, para quién, cómo funciona)"),
    services: [PENDIENTE("Lista de servicios / modalidades — Fractional Legal Counsel")],
    leads: ["luis-garcia-neyra", "jose-miguel-tay"],
  },
];

export const getArea = (slug: string) => practiceAreas.find((a) => a.slug === slug);
