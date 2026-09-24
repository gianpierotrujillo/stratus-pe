import { AreaCard, AreaGrid } from "@/components/blocks/AreaCard";
import { CtaBand } from "@/components/blocks/CtaBand";
import { NumberedItem } from "@/components/blocks/NumberedItem";
import { PageHeader } from "@/components/layout/PageHeader";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { practiceAreas } from "@/content/areas";
import { approach, areasPage, ctas } from "@/content/firm";
import { areaPath } from "@/lib/routes";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Áreas de práctica",
  description:
    "Derecho ambiental y de los recursos naturales, derecho empresarial, asesoría para organizaciones sin fines de lucro y Fractional Legal Counsel en Lima, Perú.",
  path: "/areas-de-practica",
});

export default function AreasPage() {
  return (
    <>
      <PageHeader
        eyebrow={areasPage.hero.eyebrow}
        title={areasPage.hero.title}
        lead={areasPage.hero.lead}
        breadcrumbs={[{ label: "Áreas de práctica", href: "/areas-de-practica" }]}
      />

      <Section tone="light">
        <AreaGrid>
          {practiceAreas.map((a) => (
            <AreaCard key={a.slug} area={a} href={areaPath(a.slug)} as="h2" />
          ))}
        </AreaGrid>
      </Section>

      <Section tone="light" className="border-t border-line">
        <SectionHeader eyebrow={areasPage.approach.eyebrow} title={areasPage.approach.title} />
        <div className="mt-14 grid gap-12 md:grid-cols-3">
          {approach.map((item, i) => (
            <NumberedItem key={item.title} index={i + 1} title={item.title}>
              {item.text}
            </NumberedItem>
          ))}
        </div>
      </Section>

      <CtaBand title={ctas.challenge.title} text={ctas.challenge.text} />
    </>
  );
}
