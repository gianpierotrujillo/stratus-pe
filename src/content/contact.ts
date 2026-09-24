/** CONTACTO — textos de la página y del formulario. */
import { practiceAreas } from "./areas";

export const contactPage = {
  hero: {
    eyebrow: "Contacto",
    title: "Hablemos de su caso",
    lead: "Estamos disponibles para analizar su situación y proponer el camino más adecuado. Complete el formulario o contáctenos directamente.",
  },
  infoTitle: "Información de contacto",
  formTitle: "Iniciar una consulta",
} as const;

export const contactForm = {
  fields: {
    name: { label: "Nombre completo", placeholder: "Ej. María García" },
    email: { label: "Correo electrónico", placeholder: "correo@empresa.com" },
    company: { label: "Empresa u organización", placeholder: "Nombre de su empresa" },
    phone: { label: "Teléfono (opcional)", placeholder: "+51 …" },
    service: { label: "Servicio de interés", placeholder: "Seleccione una opción" },
    message: { label: "Describa brevemente su consulta", placeholder: "Cuéntenos su situación…" },
  },
  serviceOptions: [
    ...practiceAreas.map((a) => ({ value: a.slug, label: a.shortTitle })),
    { value: "otro", label: "Otro" },
  ],
  consent: {
    before: "He leído y acepto la",
    link: "política de privacidad",
    after: "y autorizo el tratamiento de mis datos personales para atender mi consulta.",
  },
  submit: "Enviar consulta",
  confidentiality: "Su información será tratada con estricta confidencialidad.",
} as const;
