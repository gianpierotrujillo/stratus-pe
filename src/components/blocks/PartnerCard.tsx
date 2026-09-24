import Image from "next/image";
import Link from "next/link";
import { ArrowRight, LinkedInIcon } from "@/components/icons";
import { Tag } from "@/components/ui/Tag";
import { isPending } from "@/config/pending";
import type { Partner } from "@/content/partners";
import { trackAttrs } from "@/lib/analytics";
import { mq, sizes } from "@/design/media";
import { partnerPath } from "@/lib/routes";

type PartnerCardProps = {
  partner: Partner;
  /** "full" = perfil con biografía y especialidades · "compact" = foto + nombre + enlace. */
  variant?: "full" | "compact";
  href?: string;
  as?: "h1" | "h2" | "h3";
  /** Contenido adicional al final de la columna de texto (perfil completo). */
  children?: React.ReactNode;
};

export function PartnerCard({ partner, variant = "full", href, as: Heading = "h2", children }: PartnerCardProps) {
  const photo = (
    <div className="relative aspect-3/4 overflow-hidden bg-surface-raised">
      <Image
        src={partner.photo.src}
        alt={partner.photo.alt}
        fill
        sizes={sizes([
          [mq.lg, "30vw"],
          [mq.md, "40vw"],
        ])}
        className="object-cover transition-transform duration-(--motion-slow) ease-brand group-hover:scale-103"
      />
    </div>
  );

  if (variant === "compact") {
    return (
      <Link
        href={href ?? partnerPath(partner.slug)}
        className="group block"
        {...trackAttrs({ event: "cta_click", location: "card", id: `socio_${partner.slug}` })}
      >
        {photo}
        <p className="mt-6 text-eyebrow font-semibold uppercase tracking-eyebrow text-accent-text">{partner.role}</p>
        <Heading className="mt-2 text-display-3">{partner.name}</Heading>
        <p className="mt-2 text-small italic text-muted">{partner.credential}</p>
        <span className="mt-4 inline-flex items-center gap-2 text-small font-semibold text-accent-text">
          Ver perfil
          <ArrowRight className="size-4 transition-transform duration-(--motion-base) group-hover:translate-x-1" />
        </span>
      </Link>
    );
  }

  return (
    <article className="group grid gap-10 md:grid-cols-12 md:gap-16">
      <div className="md:col-span-5 lg:col-span-4">{photo}</div>
      <div className="md:col-span-7 lg:col-span-8">
        <p className="text-eyebrow font-semibold uppercase tracking-eyebrow text-accent-text">{partner.role}</p>
        <Heading className="mt-3 text-display-2">{partner.name}</Heading>
        <p className="mt-3 text-lead italic text-muted">{partner.credential}</p>
        <p className="mt-8 max-w-prose text-body">{partner.bio}</p>

        <p className="mt-10 text-eyebrow font-semibold uppercase tracking-eyebrow text-heading">Áreas de práctica</p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {partner.specialties.map((s) => (
            <li key={s}>
              <Tag>{s}</Tag>
            </li>
          ))}
        </ul>

        {!isPending(partner.linkedin) && (
          <a
            href={partner.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 text-small font-semibold text-accent-text hover:text-heading"
            {...trackAttrs({ event: "social_click", location: "team_profile", params: { partner_slug: partner.slug } })}
          >
            <LinkedInIcon className="size-5" /> LinkedIn
          </a>
        )}
        {children && <div className="mt-10">{children}</div>}
      </div>
    </article>
  );
}
