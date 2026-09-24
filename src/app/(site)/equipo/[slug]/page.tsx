import { notFound } from "next/navigation";
import { AreaCard, AreaGrid } from "@/components/blocks/AreaCard";
import { CtaBand } from "@/components/blocks/CtaBand";
import { PartnerCard } from "@/components/blocks/PartnerCard";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { ViewMarker } from "@/components/seo/ViewMarker";
import { Section } from "@/components/ui/Section";
import { practiceAreas } from "@/content/areas";
import { ctas, partnerDetail } from "@/content/firm";
import { getPartner, partners } from "@/content/partners";
import { areaPath, partnerPath } from "@/lib/routes";
import { pageMetadata } from "@/lib/seo";
import { profilePageSchema } from "@/lib/structured-data";

export const dynamicParams = false;

export function generateStaticParams() {
  return partners.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/equipo/[slug]">) {
  const { slug } = await params;
  const partner = getPartner(slug);
  if (!partner) return {};
  return pageMetadata({
    title: `${partner.name} — ${partner.role}`,
    description: `${partner.credential}. ${partner.specialties.join(", ")}.`,
    path: partnerPath(partner.slug),
    ogType: "profile",
    ownImage: true,
  });
}

export default async function PartnerPage({ params }: PageProps<"/equipo/[slug]">) {
  const { slug } = await params;
  const partner = getPartner(slug);
  if (!partner) notFound();

  const areas = practiceAreas.filter((a) => a.leads.includes(partner.slug));

  return (
    <>
      <ViewMarker event="team_profile_view" params={{ partner_slug: partner.slug }} />
      <JsonLd data={profilePageSchema(partner)} />

      <Section tone="light">
        <Breadcrumbs
          items={[
            { label: "Equipo", href: "/equipo" },
            { label: partner.name, href: partnerPath(partner.slug) },
          ]}
        />
        <PartnerCard partner={partner} as="h1" />
      </Section>

      {areas.length > 0 && (
        <Section tone="light" className="border-t border-line">
          <h2 className="mb-12 text-display-3">{partnerDetail.areasTitle}</h2>
          <AreaGrid columns={areas.length >= 3 ? 3 : 2}>
            {areas.map((a) => (
              <AreaCard key={a.slug} area={a} href={areaPath(a.slug)} />
            ))}
          </AreaGrid>
        </Section>
      )}

      <CtaBand
        title={ctas.workWithUs.title}
        text={ctas.workWithUs.text}
        cta={{ label: "Solicitar consulta", href: "/contacto", id: `consulta_socio_${partner.slug}` }}
      />
    </>
  );
}
