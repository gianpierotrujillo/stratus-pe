/**
 * ÁREAS DE PRÁCTICA — fuente única (textos validados por los socios en GoDaddy).
 * Se usan en la página temporal, el pie, el menú de servicios del formulario,
 * las páginas individuales (Fase 3) y los datos estructurados.
 */
export type PracticeArea = {
  slug: string;
  numeral: string;
  title: string;
  summary: string;
};

export const practiceAreas: readonly PracticeArea[] = [
  {
    slug: "derecho-ambiental-recursos-naturales",
    numeral: "I",
    title: "Derecho Ambiental y de los Recursos Naturales",
    summary:
      "Asesoría integral en regulación ambiental, licencias, evaluaciones de impacto y gestión de recursos naturales para proyectos de inversión en el Perú.",
  },
  {
    slug: "derecho-empresarial",
    numeral: "II",
    title: "Derecho Empresarial",
    summary:
      "Estructuración corporativa, contratos, fusiones y adquisiciones, y cumplimiento normativo para empresas que operan en mercados complejos.",
  },
  {
    slug: "organizaciones-sin-fines-de-lucro",
    numeral: "III",
    title: "Asesoría para Organizaciones sin Fines de Lucro",
    summary:
      "Constitución, gobernanza, cumplimiento legal y estrategia jurídica para ONGs, fundaciones y asociaciones civiles en el Perú.",
  },
  {
    slug: "fractional-legal-counsel",
    numeral: "IV",
    title: "Fractional Legal Counsel",
    summary:
      "Asesoría jurídica de alto nivel bajo un modelo flexible y eficiente: el rigor de un equipo legal interno, sin los costos fijos que implica.",
  },
];
