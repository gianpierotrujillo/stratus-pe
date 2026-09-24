import Image from "next/image";
import { AreaCard, AreaGrid } from "@/components/blocks/AreaCard";
import { CtaBand } from "@/components/blocks/CtaBand";
import { NumberedItem } from "@/components/blocks/NumberedItem";
import { PartnerCard } from "@/components/blocks/PartnerCard";
import { Quote } from "@/components/blocks/Quote";
import { Stat } from "@/components/blocks/Stat";
import { JsonLd } from "@/components/seo/JsonLd";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { primaryCta } from "@/config/navigation";
import { site } from "@/config/site";
import { mq, sizes } from "@/design/media";
import { practiceAreas } from "@/content/areas";
import { ctas, differentiators, firmQuote, firmStats, home } from "@/content/firm";
import { images } from "@/content/images";
import { partners } from "@/content/partners";
import { areaPath } from "@/lib/routes";
import { pageMetadata } from "@/lib/seo";
import { legalServiceSchema, webSiteSchema } from "@/lib/structured-data";

export const metadata = pageMetadata({
  title: site.seoTitle,
  absoluteTitle: true,
  description: site.description,
  path: "/",
});

export default function HomePage() {
  const [first, second, third] = site.tagline.split(" ");

  return (
    <>
      <JsonLd data={webSiteSchema()} />
      <JsonLd data={legalServiceSchema()} />

      {/* Hero */}
      <Section tone="dark" as="header" className="overflow-hidden">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Eyebrow className="mb-8">
              {site.name} · {site.contact.address.city}, {site.contact.address.countryName}
            </Eyebrow>
            <h1 className="text-hero">
              <span className="sr-only">{site.name}, estudio de abogados en Lima: </span>
              {first}
              <br />
              {second}
              <br />
              <span className="text-accent">{third}</span>
            </h1>
            <p className="mt-10 max-w-prose text-lead">{home.hero.lead}</p>
            <div className="mt-12 flex flex-wrap gap-4">
              <Button
                href="/areas-de-practica"
                track={{ event: "cta_click", location: "hero", id: "conocer_servicios" }}
              >
                {home.hero.primary}
              </Button>
              <Button
                href={primaryCta.href}
                variant="outline"
                track={{ event: "cta_click", location: "hero", id: "consultar_ahora" }}
              >
                {primaryCta.label}
              </Button>
            </div>
          </div>

          <div className="relative lg:col-span-5">
            <div aria-hidden className="absolute -right-4 -bottom-4 hidden size-full border border-accent md:block" />
            <div className="relative aspect-4/5 overflow-hidden bg-surface-raised">
              <Image
                src={images.partnersTogether.src}
                alt={images.partnersTogether.alt}
                fill
                priority
                sizes={sizes([[mq.lg, "40vw"]])}
                className="object-cover object-top"
              />
            </div>
          </div>
        </div>
      </Section>

      {/* Por qué Stratus */}
      <Section tone="light" aria-labelledby="por-que-titulo">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-6">
            <Eyebrow className="mb-8">{home.why.eyebrow}</Eyebrow>
            <h2 id="por-que-titulo" className="sr-only">
              {home.why.srTitle}
            </h2>
            <Quote>{firmQuote}</Quote>
            <div className="mt-14 grid gap-8 sm:grid-cols-3">
              {firmStats
                .filter((s) => s.label !== "clientes")
                .map((s) => (
                  <Stat key={s.label} value={s.value} label={s.label} />
                ))}
            </div>
          </div>
          <div className="flex flex-col justify-center gap-12 lg:col-span-6">
            {differentiators.map((d, i) => (
              <NumberedItem key={d.title} index={i + 1} title={d.title}>
                {d.text}
              </NumberedItem>
            ))}
          </div>
        </div>
      </Section>

      {/* Áreas */}
      <Section tone="light" className="border-t border-line" aria-labelledby="areas-titulo">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeader eyebrow={home.areas.eyebrow} title={home.areas.title} titleId="areas-titulo" />
          <Button href="/areas-de-practica" variant="link" className="shrink-0">
            {home.areas.link}
          </Button>
        </div>
        <div className="mt-14">
          <AreaGrid>
            {practiceAreas.map((a) => (
              <AreaCard key={a.slug} area={a} href={areaPath(a.slug)} />
            ))}
          </AreaGrid>
        </div>
      </Section>

      {/* Equipo */}
      <Section tone="navy" aria-labelledby="equipo-titulo">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <SectionHeader
              eyebrow={home.team.eyebrow}
              title={home.team.title}
              titleId="equipo-titulo"
              lead={home.team.lead}
            />
            <Button href="/equipo" variant="link" className="mt-10">
              {home.team.link}
            </Button>
          </div>
          <div className="grid gap-12 sm:grid-cols-2 lg:col-span-8">
            {partners.map((p) => (
              <PartnerCard key={p.slug} partner={p} variant="compact" as="h3" />
            ))}
          </div>
        </div>
      </Section>

      <CtaBand title={ctas.challenge.title} text={ctas.challenge.text} />
    </>
  );
}
