import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { ArrowRight } from "@/components/icons";
import { Container } from "@/components/ui/Container";
import { Pending, showField } from "@/components/ui/Pending";
import { legalNav, mainNav, primaryCta } from "@/config/navigation";
import { site } from "@/config/site";
import { practiceAreas } from "@/content/areas";
import { trackAttrs } from "@/lib/analytics";
import { mailtoHref } from "@/lib/contact";
import { areaPath } from "@/lib/routes";

const colTitle = "mb-6 font-display text-eyebrow font-semibold uppercase tracking-eyebrow text-accent-text";
const link = "text-small text-body transition-colors duration-(--motion-base) ease-brand hover:text-heading";

export function SiteFooter() {
  const { contact } = site;
  const year = new Date().getFullYear();
  const showLegalName = showField(site.legalName);

  return (
    <footer data-tone="dark" className="border-t border-line">
      <Container className="grid gap-14 py-20 md:grid-cols-12 md:gap-10">
        {/* Marca */}
        <div className="md:col-span-5">
          <Logo tone="dark" className="h-auto w-44" />
          <p className="mt-8 max-w-sm text-small">{site.description}</p>
        </div>

        {/* Áreas */}
        <nav aria-label="Áreas de práctica" className="md:col-span-3">
          <p className={colTitle}>Áreas de práctica</p>
          <ul className="flex flex-col gap-3">
            {practiceAreas.map((area) => (
              <li key={area.slug}>
                <Link href={areaPath(area.slug)} className={link}>
                  {area.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Firma */}
        <nav aria-label="Secciones" className="md:col-span-2">
          <p className={colTitle}>Firma</p>
          <ul className="flex flex-col gap-3">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={link}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Contacto */}
        <div className="md:col-span-2">
          <p className={colTitle}>Contacto</p>
          <ul className="flex flex-col gap-3 text-small">
            <li>
              {contact.address.city}, {contact.address.countryName}
            </li>
            <li>
              <a
                href={mailtoHref()}
                className={link}
                {...trackAttrs({ event: "contact_click", location: "footer", params: { method: "email" } })}
              >
                {contact.email}
              </a>
            </li>
            {showField(contact.phone) && (
              <li>
                <Pending value={contact.phone}>
                  <a
                    href={`tel:${contact.phone}`}
                    className={link}
                    {...trackAttrs({ event: "contact_click", location: "footer", params: { method: "phone" } })}
                  >
                    {contact.phone}
                  </a>
                </Pending>
              </li>
            )}
            <li className="pt-2">
              <Link
                href={primaryCta.href}
                className="group inline-flex items-center gap-2 font-semibold text-accent-text hover:text-heading"
                {...trackAttrs({ event: "cta_click", location: "footer", id: "consultar_ahora" })}
              >
                {primaryCta.label}
                <ArrowRight className="size-4 transition-transform duration-(--motion-base) group-hover:translate-x-1" />
              </Link>
            </li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-line">
        <Container className="flex flex-col gap-4 py-8 text-small text-muted md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {site.name}
            {showLegalName && (
              <>
                {" · "}
                <Pending value={site.legalName} /> · RUC <Pending value={site.ruc} />
              </>
            )}
          </p>
          <ul className="flex flex-wrap gap-x-8 gap-y-2">
            {legalNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-heading">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </div>
    </footer>
  );
}
