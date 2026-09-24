/**
 * Página temporal de la Fase 1: valida despliegue, tokens, fuentes y marca.
 * Se reemplaza por la página de Inicio en la Fase 3.
 */
import { Logo } from "@/components/brand/Logo";
import { site } from "@/config/site";

export default function Home() {
  const [first, second, third] = site.tagline.split(" ");

  return (
    <main data-tone="dark" className="flex flex-1 flex-col">
      <div className="mx-auto flex w-full max-w-site flex-1 flex-col justify-between gap-16 px-gutter py-section">
        <Logo tone="dark" priority className="h-auto w-44 md:w-56" />

        <div>
          <p className="mb-8 flex items-center gap-4 text-eyebrow font-semibold uppercase tracking-eyebrow text-accent-text">
            <span aria-hidden className="h-px w-12 shrink-0 bg-accent" />
            {site.name} · {site.contact.address.city}, {site.contact.address.countryName}
          </p>
          <h1 className="text-hero">
            {first}
            <br />
            {second}
            <br />
            <span className="text-accent">{third}</span>
          </h1>
        </div>

        <p className="max-w-prose text-lead">
          Nuestro sitio está en construcción. Para consultas, escríbanos a{" "}
          <a
            href={`mailto:${site.contact.email}`}
            className="text-heading underline decoration-accent underline-offset-4 transition-colors duration-(--motion-base) ease-brand hover:text-accent"
          >
            {site.contact.email}
          </a>
          .
        </p>
      </div>
    </main>
  );
}
