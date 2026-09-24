import { site } from "@/config/site";
import { getPartner, partners } from "@/content/partners";
import { ogCard, ogContentType, ogSize } from "@/lib/og";

export const alt = `Socio de ${site.name}`;
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return partners.map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const partner = getPartner(slug);
  return ogCard({
    eyebrow: `${partner?.role ?? "Socio"} · ${site.name}`,
    title: partner?.name ?? site.name,
    subtitle: partner?.credential,
    photo: partner?.photo.src,
  });
}
