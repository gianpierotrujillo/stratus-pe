import { site } from "@/config/site";
import { home } from "@/content/firm";
import { ogCard, ogContentType, ogSize } from "@/lib/og";

export const alt = `${site.name} — Estudio de abogados en Lima`;
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogCard({
    eyebrow: `Estudio de abogados · ${site.contact.address.city}, ${site.contact.address.countryName}`,
    title: site.tagline,
    subtitle: home.share,
  });
}
