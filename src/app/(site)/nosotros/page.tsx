import { CtaBand } from "@/components/blocks/CtaBand";
import { NumberedItem } from "@/components/blocks/NumberedItem";
import { Stat } from "@/components/blocks/Stat";
import { PageHeader } from "@/components/layout/PageHeader";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { about, ctas, firmStats } from "@/content/firm";
import { images } from "@/content/images";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Nosotros",
  description:
    "Stratus Consulting es un estudio de abogados en Lima que combina rigor técnico y visión estratégica para acompañar a empresas, entidades públicas y organizaciones en sus decisiones críticas.",
  path: "/nosotros",
  image: images.partnersTogether.src,
});

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="Nosotros"
        title={about.hero.title}
        lead={about.hero.lead}
        breadcrumbs={[{ label: "Nosotros", href: "/nosotros" }]}
        image={images.partnersTogether}
      />

      {/* Cifras */}
      <Section tone="navy" spacing="compact" aria-label="La firma en cifras">
        <div className="grid grid-cols-2 gap-10 lg:grid-cols-4">
          {firmStats.map((s) => (
            <Stat key={s.label} value={s.value} label={s.label} emphasis="accent" />
          ))}
        </div>
      </Section>

      {/* Historia */}
      <Section tone="light">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-20">
          <SectionHeader className="lg:col-span-5" eyebrow={about.history.eyebrow} title={about.history.title} />
          <div className="flex flex-col gap-6 text-lead lg:col-span-7 lg:pt-14">
            {about.history.paragraphs.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
        </div>
      </Section>

      {/* Valores */}
      <Section tone="light" className="border-t border-line">
        <SectionHeader eyebrow={about.values.eyebrow} title={about.values.title} />
        <div className="mt-16 grid gap-px border border-line bg-line md:grid-cols-2">
          {about.values.items.map((v, i) => (
            <div key={v.title} className="bg-surface p-8 md:p-12">
              <NumberedItem index={i + 1} title={v.title}>
                {v.text}
              </NumberedItem>
            </div>
          ))}
        </div>
      </Section>

      <CtaBand title={ctas.challenge.title} text={ctas.challenge.text} />
    </>
  );
}
