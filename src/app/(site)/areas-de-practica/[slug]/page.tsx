import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AreaCard, AreaGrid } from "@/components/blocks/AreaCard";
import { CtaBand } from "@/components/blocks/CtaBand";
import { PageHeader } from "@/components/layout/PageHeader";
import { ViewMarker } from "@/components/seo/ViewMarker";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Pending, showField } from "@/components/ui/Pending";
import { Section } from "@/components/ui/Section";
import { primaryCta } from "@/config/navigation";
import { getArea, practiceAreas } from "@/content/areas";
import { areaDetail, ctas } from "@/content/firm";
import { getPartner, type Partner } from "@/content/partners";
import { areaPath, partnerPath } from "@/lib/routes";
import { pageMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return practiceAreas.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps<"/areas-de-practica/[slug]">) {
  const { slug } = await params;
  const area = getArea(slug);
  if (!area) return {};
  return pageMetadata({ title: area.title, description: area.summary, path: areaPath(area.slug) });
}

export default async function AreaPage({ params }: PageProps<"/areas-de-practica/[slug]">) {
  const { slug } = await params;
  const area = getArea(slug);
  if (!area) notFound();

  const leads = area.leads.map(getPartner).filter((p): p is Partner => Boolean(p));
  const others = practiceAreas.filter((a) => a.slug !== area.slug);
  const services = area.services.filter(showField);

  return (
    <>
      <ViewMarker event="practice_area_view" params={{ area_slug: area.slug }} />
      <PageHeader
        eyebrow={areaDetail.eyebrow(area.numeral)}
        title={area.title}
        lead={area.summary}
        breadcrumbs={[
          { label: "Áreas de práctica", href: "/areas-de-practica" },
          { label: area.shortTitle, href: areaPath(area.slug) },
        ]}
      />

      <Section tone="light">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-7">
            {showField(area.intro) && (
              <div className="text-lead">
                <Pending value={area.intro} />
              </div>
            )}

            {services.length > 0 && (
              <div className="mt-14">
                <h2 className="text-display-3">{areaDetail.servicesTitle}</h2>
                <ul className="mt-8 flex flex-col">
                  {services.map((s) => (
                    <li key={s} className="flex gap-5 border-t border-line py-5 last:border-b">
                      <span aria-hidden className="mt-3 h-px w-6 shrink-0 bg-accent" />
                      <span>
                        <Pending value={s} />
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <aside className="flex flex-col gap-10 lg:col-span-5">
            <div className="border border-line bg-surface-raised p-8 md:p-10">
              <Eyebrow>{areaDetail.leadsLabel(leads.length)}</Eyebrow>
              <ul className="mt-8 flex flex-col gap-6">
                {leads.map((p) => (
                  <li key={p.slug}>
                    <Link href={partnerPath(p.slug)} className="group flex items-center gap-5">
                      <span className="relative size-20 shrink-0 overflow-hidden bg-surface">
                        <Image src={p.photo.src} alt={p.photo.alt} fill sizes="5rem" className="object-cover" />
                      </span>
                      <span>
                        <span className="block font-display text-title text-heading group-hover:text-accent-text">
                          {p.name}
                        </span>
                        <span className="mt-1 block text-small text-muted">{p.credential}</span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div data-tone="dark" className="p-8 md:p-10">
              <p className="font-display text-title text-heading">{areaDetail.asideTitle(area.shortTitle)}</p>
              <p className="mt-4 text-small">{areaDetail.asideText}</p>
              <Button
                href={primaryCta.href}
                size="sm"
                arrow
                className="mt-8"
                track={{ event: "cta_click", location: "section", id: `consulta_area_${area.slug}` }}
              >
                {primaryCta.label}
              </Button>
            </div>
          </aside>
        </div>
      </Section>

      <Section tone="light" className="border-t border-line">
        <h2 className="mb-12 text-display-3">{areaDetail.othersTitle}</h2>
        <AreaGrid columns={3}>
          {others.map((a) => (
            <AreaCard key={a.slug} area={a} href={areaPath(a.slug)} />
          ))}
        </AreaGrid>
      </Section>

      <CtaBand title={ctas.challenge.title} text={ctas.challenge.text} />
    </>
  );
}
