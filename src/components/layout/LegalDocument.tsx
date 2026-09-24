import { Pending, showField } from "@/components/ui/Pending";
import { Section } from "@/components/ui/Section";
import type { LegalDoc } from "@/content/legal";
import { PageHeader } from "./PageHeader";

/** Plantilla de página legal: cabecera + apartados numerados. */
export function LegalDocument({ doc }: { doc: LegalDoc }) {
  const sections = doc.sections.filter((s) => showField(s.body));
  return (
    <>
      <PageHeader
        eyebrow="Información legal"
        title={doc.title}
        lead={doc.description}
        breadcrumbs={[{ label: doc.title, href: `/${doc.slug}` }]}
      />
      <Section tone="light">
        <div className="mx-auto max-w-prose">
          {showField(doc.updated) && (
            <p className="mb-12 text-small text-muted">
              Última actualización: <Pending value={doc.updated} />
            </p>
          )}
          <ol className="flex flex-col gap-12">
            {sections.map((s, i) => (
              <li key={s.heading}>
                <h2 className="text-display-3">
                  <span className="mr-3 text-accent">{i + 1}.</span>
                  {s.heading}
                </h2>
                <div className="mt-4 whitespace-pre-line">
                  <Pending value={s.body} />
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Section>
    </>
  );
}
