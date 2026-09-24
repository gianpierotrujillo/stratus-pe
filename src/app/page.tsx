/**
 * Página temporal ("en construcción") publicada en stratus.pe.
 * Contiene texto real e indexable. Se reemplaza por Inicio en la Fase 3.
 */
import { Logo } from "@/components/brand/Logo";
import { JsonLd } from "@/components/seo/JsonLd";
import { site } from "@/config/site";
import { practiceAreas } from "@/content/areas";
import { mailtoHref } from "@/lib/contact";
import { legalServiceSchema } from "@/lib/structured-data";

export default function Home() {
  const [first, second, third] = site.tagline.split(" ");

  return (
    <main data-tone="dark" className="flex flex-1 flex-col">
      <JsonLd data={legalServiceSchema()} />

      <div className="mx-auto flex w-full max-w-site flex-1 flex-col gap-16 px-gutter py-section md:gap-24">
        <Logo tone="dark" priority className="h-auto w-44 md:w-56" />

        <section>
          <p className="mb-8 flex items-center gap-4 text-eyebrow font-semibold uppercase tracking-eyebrow text-accent-text">
            <span aria-hidden className="h-px w-12 shrink-0 bg-accent" />
            Estudio de abogados · {site.contact.address.city}, {site.contact.address.countryName}
          </p>
          <h1 className="text-hero">
            <span className="sr-only">{site.name}: </span>
            {first}
            <br />
            {second}
            <br />
            <span className="text-accent">{third}</span>
          </h1>
          <p className="mt-10 max-w-prose text-lead">{site.description}</p>
        </section>

        <section aria-labelledby="areas-title">
          <h2 id="areas-title" className="mb-10 text-display-3">
            Áreas de práctica
          </h2>
          <ul className="grid gap-px bg-line md:grid-cols-2">
            {practiceAreas.map((area) => (
              <li key={area.slug} className="bg-surface py-8 md:p-10">
                <span aria-hidden className="font-display text-display-3 text-muted">
                  {area.numeral}
                </span>
                <h3 className="mt-4 text-title">{area.title}</h3>
                <span aria-hidden className="mt-4 block h-px w-12 bg-accent" />
                <p className="mt-4 text-small">{area.summary}</p>
              </li>
            ))}
          </ul>
        </section>

        <footer className="border-t border-line pt-10">
          <p className="max-w-prose text-lead">
            Nuestro nuevo sitio está en construcción. Para consultas, escríbanos a{" "}
            <a
              href={mailtoHref()}
              className="text-heading underline decoration-accent underline-offset-4 transition-colors duration-(--motion-base) ease-brand hover:text-accent"
            >
              {site.contact.email}
            </a>
            .
          </p>
        </footer>
      </div>
    </main>
  );
}
