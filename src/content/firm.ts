/**
 * CONTENIDO INSTITUCIONAL — textos validados por los socios (GoDaddy),
 * con ajustes de consistencia. Cifras: un único juego para todo el sitio.
 */
import { practiceAreas } from "./areas";

/** Cifras de la firma. ⚠️ Validar con los socios antes del lanzamiento. */
export const firmStats = [
  { value: "+15", label: "años de experiencia" },
  { value: "200+", label: "casos atendidos" },
  { value: "50+", label: "clientes" },
  { value: String(practiceAreas.length), label: "áreas de práctica" },
] as const;

export const firmQuote =
  "La diferencia entre una decisión correcta y una decisión estratégica es el asesor que la acompaña.";

/** "Por qué Stratus" (Inicio). */
export const differentiators = [
  {
    title: "Enfoque multidisciplinario",
    text: "Integramos perspectivas legales, empresariales e institucionales para ofrecer soluciones completas, no parciales.",
  },
  {
    title: "Conocimiento del entorno peruano",
    text: "Profundo entendimiento del marco regulatorio, institucional y político del Perú y sus dinámicas sectoriales.",
  },
  {
    title: "Compromiso con el resultado",
    text: "No solo asesoramos: acompañamos cada proceso hasta alcanzar los objetivos definidos con nuestros clientes.",
  },
] as const;

/** "Más que asesoría legal. Estrategia." (Áreas de práctica). */
export const approach = [
  {
    title: "Enfoque estratégico",
    text: "No solo interpretamos la norma: analizamos el contexto, anticipamos riesgos y diseñamos soluciones que crean valor real para su organización.",
  },
  {
    title: "Sectores especializados",
    text: "Profundo conocimiento en derecho ambiental, corporativo y del tercer sector. Experiencia que no se improvisa.",
  },
  {
    title: "Modelo Fractional",
    text: "Acceso a asesoría jurídica de primer nivel con la flexibilidad que su negocio necesita. Escalable, eficiente y alineado a sus objetivos.",
  },
] as const;

/** Nosotros. */
export const about = {
  hero: {
    title: "Una firma construida sobre confianza y resultados",
    lead: "Stratus Consulting nació de la convicción de que el mejor asesoramiento combina rigor técnico con comprensión profunda del entorno. Somos un equipo multidisciplinario comprometido con cada mandato.",
  },
  history: {
    eyebrow: "Nuestra historia",
    title: "Más de una década acompañando decisiones críticas",
    paragraphs: [
      "Stratus Consulting fue fundada en Lima con el propósito de ofrecer a entidades públicas y privadas un asesoramiento que va más allá del consejo técnico: un acompañamiento estratégico real, con presencia en cada etapa del proceso.",
      "A lo largo de los años hemos consolidado una práctica multidisciplinaria que integra el derecho, la estrategia empresarial y la gestión de relaciones institucionales. Esta visión integral nos permite abordar los desafíos de nuestros clientes con una perspectiva que pocas firmas pueden ofrecer.",
      "Hoy somos referentes en el mercado peruano para organizaciones que enfrentan decisiones de alto impacto y necesitan un socio de confianza a su lado.",
    ],
  },
  values: {
    eyebrow: "Nuestros valores",
    title: "Los principios que definen cómo trabajamos",
    items: [
      {
        title: "Integridad",
        text: "Actuamos con transparencia y honestidad en cada interacción. La confianza de nuestros clientes es nuestro activo más valioso.",
      },
      {
        title: "Excelencia técnica",
        text: "Mantenemos los más altos estándares de calidad en cada análisis, documento y recomendación que entregamos.",
      },
      {
        title: "Compromiso real",
        text: "No somos consultores de escritorio. Nos involucramos en cada proceso y permanecemos hasta que el objetivo esté cumplido.",
      },
      {
        title: "Visión estratégica",
        text: "Miramos más allá del problema inmediato para identificar oportunidades y riesgos que otros no ven.",
      },
    ],
  },
} as const;

/** Llamados a la acción reutilizables. */
export const ctas = {
  challenge: {
    title: "¿Tiene un desafío estratégico que resolver?",
    text: "Conversemos. Nuestro equipo está disponible para analizar su situación y proponer el camino más adecuado.",
  },
  workWithUs: {
    title: "¿Listo para trabajar con nosotros?",
    text: "Contáctenos para una consulta inicial.",
  },
} as const;

/** Inicio. */
export const home = {
  hero: {
    lead: "Acompañamos a entidades públicas y privadas en sus decisiones más críticas. Asesoría legal, consultoría empresarial y gestión de intereses con rigor, experiencia y visión estratégica.",
    primary: "Conocer nuestros servicios",
  },
  why: { eyebrow: "Por qué Stratus", srTitle: "Por qué elegir Stratus Consulting" },
  areas: {
    eyebrow: "Áreas de práctica",
    title: "Especialización que marca la diferencia",
    link: "Ver todas las áreas",
  },
  team: {
    eyebrow: "Nuestro equipo",
    title: "Los socios",
    lead: "Profesionales con trayectoria comprobada, comprometidos con resultados concretos para cada cliente.",
    link: "Conocer al equipo",
  },
} as const;

/** Áreas de práctica (listado). */
export const areasPage = {
  hero: {
    eyebrow: "Áreas de práctica",
    title: "Especialización que marca la diferencia",
    lead: "Asesoría jurídica y estratégica para empresas, entidades públicas y organizaciones sin fines de lucro que operan en el Perú.",
  },
  approach: { eyebrow: "Por qué Stratus", title: "Más que asesoría legal. Estrategia." },
} as const;

/** Equipo (listado). */
export const teamPage = {
  hero: {
    eyebrow: "Nuestro equipo",
    title: "Los socios",
    lead: "Profesionales con trayectoria comprobada, comprometidos con resultados concretos para cada cliente.",
  },
} as const;

/** Página de detalle de un área. */
export const areaDetail = {
  eyebrow: (numeral: string) => `Área de práctica ${numeral}`,
  servicesTitle: "Cómo le ayudamos",
  leadsLabel: (n: number) => (n > 1 ? "Socios a cargo" : "Socio a cargo"),
  asideTitle: (area: string) => `¿Necesita asesoría en ${area.toLowerCase()}?`,
  asideText: "Cuéntenos su caso y le responderemos en un plazo máximo de 24 horas hábiles.",
  othersTitle: "Otras áreas de práctica",
} as const;

/** Perfil individual de socio. */
export const partnerDetail = {
  areasTitle: "Áreas de práctica en las que participa",
} as const;
