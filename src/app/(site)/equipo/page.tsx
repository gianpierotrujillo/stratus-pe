import { CtaBand } from "@/components/blocks/CtaBand";
import { PartnerCard } from "@/components/blocks/PartnerCard";
import { PageHeader } from "@/components/layout/PageHeader";
import { JsonLd } from "@/components/seo/JsonLd";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { ctas, teamPage } from "@/content/firm";
import { partners } from "@/content/partners";
import { partnerPath } from "@/lib/routes";
import { pageMetadata } from "@/lib/seo";
import { personSchema, webPageSchema } from "@/lib/structured-data";

const meta = {
  title: "Equipo",
  description:
    "Conozca a los socios de Stratus Consulting: Luis García Neyra y José Miguel Tay, abogados de la Universidad de Lima con más de 15 años de experiencia.",
  path: "/equipo",
};

export const metadata = pageMetadata(meta);

export default function TeamPage() {
  return (
    <>
      <JsonLd
        data={webPageSchema({
          type: "CollectionPage",
          name: meta.title,
          description: meta.description,
          path: meta.path,
        })}
      />
      {partners.map((p) => (
        <JsonLd key={p.slug} data={personSchema(p)} />
      ))}
      <PageHeader
        eyebrow={teamPage.hero.eyebrow}
        title={teamPage.hero.title}
        lead={teamPage.hero.lead}
        breadcrumbs={[{ label: "Equipo", href: "/equipo" }]}
      />

      <Section tone="light">
        <div className="flex flex-col gap-24 md:gap-32">
          {partners.map((p, i) => (
            <div key={p.slug} className={i > 0 ? "border-t border-line pt-24 md:pt-32" : undefined}>
              <PartnerCard partner={p}>
                <Button href={partnerPath(p.slug)} variant="link">
                  Ver perfil completo
                </Button>
              </PartnerCard>
            </div>
          ))}
        </div>
      </Section>

      <CtaBand
        title={ctas.workWithUs.title}
        text={ctas.workWithUs.text}
        cta={{ label: "Solicitar consulta", href: "/contacto", id: "solicitar_consulta" }}
      />
    </>
  );
}
