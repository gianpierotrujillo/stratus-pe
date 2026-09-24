import type { ReactNode } from "react";
import { ContactForm } from "@/components/forms/ContactForm";
import { MailIcon, PhoneIcon, PinIcon } from "@/components/icons";
import { PageHeader } from "@/components/layout/PageHeader";
import { Pending, showField } from "@/components/ui/Pending";
import { Section } from "@/components/ui/Section";
import { legalNav } from "@/config/navigation";
import { site } from "@/config/site";
import { contactPage } from "@/content/contact";
import { images } from "@/content/images";
import { trackAttrs } from "@/lib/analytics";
import { mailtoHref } from "@/lib/contact";
import { pageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { legalServiceSchema, webPageSchema } from "@/lib/structured-data";

const meta = {
  title: "Contacto",
  description:
    "Contacte a Stratus Consulting, estudio de abogados en Lima. Cuéntenos su caso y le responderemos en un plazo máximo de 24 horas hábiles.",
  path: "/contacto",
};

export const metadata = pageMetadata(meta);

function InfoItem({ icon, label, children }: { icon: ReactNode; label: string; children: ReactNode }) {
  return (
    <div className="flex gap-5 border-b border-line py-6 last:border-b-0">
      <span className="mt-0.5 text-accent">{icon}</span>
      <div>
        <p className="text-eyebrow font-semibold uppercase tracking-eyebrow text-accent-text">{label}</p>
        <div className="mt-2 text-body text-heading">{children}</div>
      </div>
    </div>
  );
}

export default function ContactPage() {
  const { contact } = site;
  const privacyHref = legalNav[0].href;

  return (
    <>
      <JsonLd
        data={webPageSchema({ type: "ContactPage", name: meta.title, description: meta.description, path: meta.path })}
      />
      <JsonLd data={legalServiceSchema()} />
      <PageHeader
        eyebrow={contactPage.hero.eyebrow}
        title={contactPage.hero.title}
        lead={contactPage.hero.lead}
        breadcrumbs={[{ label: "Contacto", href: "/contacto" }]}
        image={images.contact}
      />

      <Section tone="light">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-20">
          <aside data-tone="dark" className="self-start p-8 md:p-10 lg:col-span-4">
            <h2 className="text-display-3">{contactPage.infoTitle}</h2>
            <div className="mt-6">
              <InfoItem icon={<PinIcon className="size-5" />} label="Ubicación">
                {showField(contact.address.street) && (
                  <>
                    <Pending value={contact.address.street} />
                    <br />
                  </>
                )}
                {showField(contact.address.district) && (
                  <>
                    <Pending value={contact.address.district} />,{" "}
                  </>
                )}
                {contact.address.city}, {contact.address.countryName}
              </InfoItem>
              <InfoItem icon={<MailIcon className="size-5" />} label="Correo electrónico">
                <a
                  href={mailtoHref()}
                  className="hover:text-accent"
                  {...trackAttrs({ event: "contact_click", location: "contact_page", params: { method: "email" } })}
                >
                  {contact.email}
                </a>
              </InfoItem>
              {showField(contact.phone) && (
                <InfoItem icon={<PhoneIcon className="size-5" />} label="Teléfono">
                  <Pending value={contact.phone}>
                    <a
                      href={`tel:${contact.phone}`}
                      className="hover:text-accent"
                      {...trackAttrs({ event: "contact_click", location: "contact_page", params: { method: "phone" } })}
                    >
                      {contact.phone}
                    </a>
                  </Pending>
                </InfoItem>
              )}
              {showField(contact.hours) && (
                <InfoItem icon={<span aria-hidden className="block size-5" />} label="Horario">
                  <Pending value={contact.hours} />
                </InfoItem>
              )}
            </div>
          </aside>

          <div className="lg:col-span-8">
            <h2 className="text-display-2">{contactPage.formTitle}</h2>
            <p className="mt-4 text-lead">{contact.responseTime}</p>
            <div className="mt-12">
              <ContactForm privacyHref={privacyHref} />
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
