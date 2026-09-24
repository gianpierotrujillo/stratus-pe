"use client";

/**
 * Formulario de consulta — interfaz (Fase 3).
 * El envío real (servidor, correo, antispam y evento generate_lead) se conecta en la Fase 4.
 */
import Link from "next/link";
import { useState, type FormEvent } from "react";
import { ArrowRight } from "@/components/icons";
import { contactForm } from "@/content/contact";
import { cx } from "@/lib/cx";

const field =
  "w-full rounded-control border border-line bg-surface-raised px-4 py-3.5 text-body text-heading placeholder:text-muted transition-colors duration-(--motion-base) focus:border-accent focus:outline-none";
const label = "mb-2 block text-eyebrow font-semibold uppercase tracking-eyebrow text-heading";

export function ContactForm({ privacyHref }: { privacyHref: string }) {
  const [notice, setNotice] = useState(false);
  const f = contactForm.fields;

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!e.currentTarget.reportValidity()) return;
    setNotice(true);
  };

  return (
    <form onSubmit={onSubmit} noValidate={false} className="grid gap-6 md:grid-cols-2" data-ga-form="contacto">
      <div>
        <label htmlFor="cf-name" className={label}>
          {f.name.label}
        </label>
        <input
          id="cf-name"
          name="name"
          required
          autoComplete="name"
          placeholder={f.name.placeholder}
          className={field}
        />
      </div>
      <div>
        <label htmlFor="cf-email" className={label}>
          {f.email.label}
        </label>
        <input
          id="cf-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder={f.email.placeholder}
          className={field}
        />
      </div>
      <div>
        <label htmlFor="cf-company" className={label}>
          {f.company.label}
        </label>
        <input
          id="cf-company"
          name="company"
          autoComplete="organization"
          placeholder={f.company.placeholder}
          className={field}
        />
      </div>
      <div>
        <label htmlFor="cf-phone" className={label}>
          {f.phone.label}
        </label>
        <input
          id="cf-phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          placeholder={f.phone.placeholder}
          className={field}
        />
      </div>
      <div className="md:col-span-2">
        <label htmlFor="cf-service" className={label}>
          {f.service.label}
        </label>
        <select id="cf-service" name="service" required defaultValue="" className={cx(field, "appearance-none")}>
          <option value="" disabled>
            {f.service.placeholder}
          </option>
          {contactForm.serviceOptions.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>
      <div className="md:col-span-2">
        <label htmlFor="cf-message" className={label}>
          {f.message.label}
        </label>
        <textarea
          id="cf-message"
          name="message"
          required
          rows={6}
          placeholder={f.message.placeholder}
          className={cx(field, "resize-y")}
        />
      </div>

      {/* Trampa antispam (invisible para personas) */}
      <div aria-hidden className="hidden">
        <label htmlFor="cf-website">Website</label>
        <input id="cf-website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <label className="flex items-start gap-3 text-small md:col-span-2">
        <input type="checkbox" name="consent" required className="mt-1 size-4 shrink-0 accent-(--color-accent)" />
        <span>
          {contactForm.consent.before}{" "}
          <Link href={privacyHref} className="text-accent-text underline underline-offset-4">
            {contactForm.consent.link}
          </Link>{" "}
          {contactForm.consent.after}
        </span>
      </label>

      <div className="flex flex-col gap-4 md:col-span-2 md:flex-row md:items-center md:justify-between">
        <button
          type="submit"
          className="group inline-flex min-h-14 items-center justify-center gap-3 rounded-control border border-accent bg-accent px-8 text-small font-semibold tracking-wide text-on-accent transition-colors duration-(--motion-base) ease-brand hover:bg-transparent hover:text-accent-text"
        >
          {contactForm.submit}
          <ArrowRight className="size-4 transition-transform duration-(--motion-base) group-hover:translate-x-1" />
        </button>
        <p className="text-small text-muted">{contactForm.confidentiality}</p>
      </div>

      {notice && (
        <p
          role="status"
          className="rounded-control border border-dashed border-accent p-4 text-small text-accent-text md:col-span-2"
        >
          Vista previa: el envío del formulario se habilitará en la Fase 4.
        </p>
      )}
    </form>
  );
}
