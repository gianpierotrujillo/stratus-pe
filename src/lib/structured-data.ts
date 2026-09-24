/**
 * Datos estructurados (schema.org / JSON-LD) generados desde la configuración.
 * Forman un grafo enlazado por @id: WebSite → LegalService ← Person / Service / WebPage.
 * Los campos PENDIENTE se omiten automáticamente hasta que existan.
 */
import { site } from "@/config/site";
import { env } from "@/config/env";
import { isPending } from "@/config/pending";
import { brandAssets } from "@/config/brand-assets";
import { practiceAreas, type PracticeArea } from "@/content/areas";
import { partners, type Partner } from "@/content/partners";
import { areaPath, partnerPath } from "@/lib/routes";

const url = (path = "/") => `${env.siteUrl}${path === "/" ? "" : path}`;

/** Identificadores estables del grafo. */
export const ids = {
  website: `${env.siteUrl}/#sitio`,
  organization: `${env.siteUrl}/#organizacion`,
  logo: `${env.siteUrl}/#logo`,
  person: (slug: string) => `${url(partnerPath(slug))}#persona`,
  service: (slug: string) => `${url(areaPath(slug))}#servicio`,
  page: (path: string) => `${url(path)}#pagina`,
};

const clean = <T extends Record<string, unknown>>(obj: T) =>
  Object.fromEntries(Object.entries(obj).filter(([, v]) => v !== undefined && !isPending(v)));

const ctx = { "@context": "https://schema.org" };

/** Sitio web (solo en Inicio). */
export function webSiteSchema() {
  return {
    ...ctx,
    "@type": "WebSite",
    "@id": ids.website,
    url: url(),
    name: site.name,
    description: site.description,
    inLanguage: site.lang,
    publisher: { "@id": ids.organization },
  };
}

/** La firma: LegalService (subtipo de LocalBusiness / Organization). */
export function legalServiceSchema() {
  const { address, email, phone } = site.contact;
  const linkedin = isPending(site.social.linkedin) ? [] : [site.social.linkedin];
  return {
    ...ctx,
    "@type": "LegalService",
    "@id": ids.organization,
    ...clean({
      name: site.name,
      legalName: site.legalName,
      description: site.description,
      slogan: site.tagline,
      url: url(),
      email,
      telephone: phone,
      foundingDate: site.foundingYear,
      taxID: site.ruc,
    }),
    logo: {
      "@type": "ImageObject",
      "@id": ids.logo,
      url: url(brandAssets.logoRaster),
      contentUrl: url(brandAssets.logoRaster),
      caption: site.name,
    },
    image: { "@id": ids.logo },
    address: {
      "@type": "PostalAddress",
      ...clean({
        streetAddress: address.street,
        addressLocality: address.city,
        addressRegion: address.region,
        addressCountry: address.country,
      }),
    },
    areaServed: { "@type": "Country", name: address.countryName },
    knowsLanguage: ["es", "en"],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      ...clean({ email, telephone: phone }),
      availableLanguage: ["Spanish", "English"],
      areaServed: address.country,
    },
    employee: partners.map((p) => ({ "@id": ids.person(p.slug) })),
    knowsAbout: practiceAreas.map((a) => a.title),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Áreas de práctica",
      itemListElement: practiceAreas.map((a) => ({
        "@type": "Offer",
        itemOffered: { "@id": ids.service(a.slug), "@type": "Service", name: a.title, url: url(areaPath(a.slug)) },
      })),
    },
    ...(linkedin.length ? { sameAs: linkedin } : {}),
  };
}

/** Un área de práctica como Service. */
export function serviceSchema(a: PracticeArea) {
  return {
    ...ctx,
    "@type": "Service",
    "@id": ids.service(a.slug),
    name: a.title,
    serviceType: a.title,
    description: a.summary,
    url: url(areaPath(a.slug)),
    provider: { "@id": ids.organization },
    areaServed: { "@type": "Country", name: site.contact.address.countryName },
    availableLanguage: ["Spanish", "English"],
  };
}

/** Un socio como Person. */
export function personSchema(p: Partner) {
  return {
    ...ctx,
    "@type": "Person",
    "@id": ids.person(p.slug),
    name: p.name,
    jobTitle: p.role,
    description: p.bio,
    image: url(p.photo.src),
    url: url(partnerPath(p.slug)),
    worksFor: { "@id": ids.organization },
    alumniOf: { "@type": "CollegeOrUniversity", name: p.education },
    knowsAbout: p.specialties,
    knowsLanguage: ["es", "en"],
    ...(isPending(p.linkedin) ? {} : { sameAs: [p.linkedin] }),
  };
}

/** Página de perfil (Google: ProfilePage). */
export function profilePageSchema(p: Partner) {
  return {
    ...ctx,
    "@type": "ProfilePage",
    "@id": ids.page(partnerPath(p.slug)),
    url: url(partnerPath(p.slug)),
    name: p.name,
    inLanguage: site.lang,
    isPartOf: { "@id": ids.website },
    mainEntity: personSchema(p),
  };
}

type WebPageType = "WebPage" | "AboutPage" | "ContactPage" | "CollectionPage";

/** Página genérica enlazada al sitio y a la firma. */
export function webPageSchema({
  type = "WebPage",
  name,
  description,
  path,
}: {
  type?: WebPageType;
  name: string;
  description: string;
  path: string;
}) {
  return {
    ...ctx,
    "@type": type,
    "@id": ids.page(path),
    url: url(path),
    name,
    description,
    inLanguage: site.lang,
    isPartOf: { "@id": ids.website },
    about: { "@id": ids.organization },
  };
}

export function breadcrumbSchema(items: readonly { label: string; href: string }[]) {
  return {
    ...ctx,
    "@type": "BreadcrumbList",
    itemListElement: items.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      item: url(c.href),
    })),
  };
}
