/**
 * PÁGINAS LEGALES — estructura según la Ley N.° 29733 (Protección de Datos
 * Personales) y su reglamento. El texto de cada apartado lo redactan los socios.
 */
import { PENDIENTE } from "@/config/pending";

export type LegalDoc = {
  slug: string;
  title: string;
  description: string;
  updated: string;
  sections: readonly { heading: string; body: string }[];
};

export const privacyPolicy: LegalDoc = {
  slug: "politica-de-privacidad",
  title: "Política de privacidad",
  description:
    "Cómo Stratus Consulting trata los datos personales que usted nos proporciona a través de este sitio web.",
  updated: PENDIENTE("Fecha de última actualización"),
  sections: [
    {
      heading: "Titular del banco de datos",
      body: PENDIENTE("Razón social, RUC, domicilio y datos de contacto del titular"),
    },
    {
      heading: "Datos que recopilamos",
      body: PENDIENTE("Datos del formulario de contacto: nombre, correo, empresa, teléfono, consulta"),
    },
    { heading: "Finalidad del tratamiento", body: PENDIENTE("Atender consultas, contacto comercial, etc.") },
    { heading: "Base legal y consentimiento", body: PENDIENTE("Consentimiento del titular al enviar el formulario") },
    { heading: "Plazo de conservación", body: PENDIENTE("Tiempo de conservación de los datos") },
    {
      heading: "Encargados y transferencias",
      body: PENDIENTE("Proveedores que procesan datos (hosting, correo, analítica) y transferencias internacionales"),
    },
    {
      heading: "Derechos del titular (ARCO)",
      body: PENDIENTE("Acceso, rectificación, cancelación y oposición: procedimiento y canal"),
    },
    { heading: "Seguridad", body: PENDIENTE("Medidas de seguridad aplicadas") },
    { heading: "Cambios a esta política", body: PENDIENTE("Cómo se comunican las actualizaciones") },
  ],
};

export const cookiePolicy: LegalDoc = {
  slug: "politica-de-cookies",
  title: "Política de cookies",
  description: "Qué cookies utiliza el sitio web de Stratus Consulting y cómo puede gestionarlas.",
  updated: PENDIENTE("Fecha de última actualización"),
  sections: [
    { heading: "¿Qué son las cookies?", body: PENDIENTE("Definición breve") },
    {
      heading: "Cookies que utilizamos",
      body: PENDIENTE("Técnicas (necesarias) y de analítica (Google Analytics 4) — se completará en la Fase 5"),
    },
    { heading: "Cómo gestionar su consentimiento", body: PENDIENTE("Banner de cookies y configuración del navegador") },
    { heading: "Contacto", body: PENDIENTE("Canal para consultas sobre cookies") },
  ],
};
