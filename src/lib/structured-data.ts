/**
 * Datos estructurados (schema.org) generados desde la configuración.
 * Los campos PENDIENTE se omiten automáticamente hasta que existan.
 */
import { site } from "@/config/site";
import { env } from "@/config/env";
import { isPending } from "@/config/pending";
import { brandAssets } from "@/config/brand-assets";
import { practiceAreas } from "@/content/areas";
import type { Partner } from "@/content/partners";
import { partnerPath } from "@/lib/routes";

const clean = <T extends Record<string, unknown>>(obj: T) =>
  Object.fromEntries(Object.entries(obj).filter(([, v]) => v !== undefined && !isPending(v)));

export function legalServiceSchema() {
  const { address, email, phone } = site.contact;
  return {
    "@context": "https://schema.org",
    "@type": "LegalService",
    "@id": `${env.siteUrl}/#organizacion`,
    ...clean({
      name: site.name,
      legalName: site.legalName,
      description: site.description,
      url: env.siteUrl,
      logo: `${env.siteUrl}${brandAssets.logoRaster}`,
      image: `${env.siteUrl}${brandAssets.logoRaster}`,
      email,
      telephone: phone,
      foundingDate: site.foundingYear,
      sameAs: isPending(site.social.linkedin) ? undefined : [site.social.linkedin],
    }),
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
    knowsAbout: practiceAreas.map((a) => a.title),
  };
}

export function breadcrumbSchema(items: readonly { label: string; href: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      item: `${env.siteUrl}${c.href === "/" ? "" : c.href}`,
    })),
  };
}

export function personSchema(p: Partner) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: p.name,
    jobTitle: p.role,
    description: p.bio,
    image: `${env.siteUrl}${p.photo.src}`,
    url: `${env.siteUrl}${partnerPath(p.slug)}`,
    worksFor: { "@id": `${env.siteUrl}/#organizacion` },
    alumniOf: { "@type": "CollegeOrUniversity", name: p.education },
    knowsAbout: p.specialties,
    ...(isPending(p.linkedin) ? {} : { sameAs: [p.linkedin] }),
  };
}
