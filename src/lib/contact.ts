import { site } from "@/config/site";

/** Enlace mailto con asunto predefinido (codificado para tildes y espacios). */
export function mailtoHref(subject: string = site.contact.emailSubject): string {
  return `mailto:${site.contact.email}?subject=${encodeURIComponent(subject)}`;
}
