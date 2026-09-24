import { site } from "@/config/site";
import { getArea, practiceAreas } from "@/content/areas";
import { ogCard, ogContentType, ogSize } from "@/lib/og";

export const alt = `Área de práctica — ${site.name}`;
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return practiceAreas.map((a) => ({ slug: a.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const area = getArea(slug);
  return ogCard({
    eyebrow: `Área de práctica ${area?.numeral ?? ""}`,
    title: area?.title ?? site.name,
    subtitle: area?.summary,
  });
}
