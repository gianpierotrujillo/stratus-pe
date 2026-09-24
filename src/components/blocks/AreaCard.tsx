import Link from "next/link";
import { ArrowRight } from "@/components/icons";
import type { PracticeArea } from "@/content/areas";
import { trackAttrs } from "@/lib/analytics";

type AreaCardProps = {
  area: PracticeArea;
  /** Si se indica, la tarjeta completa es un enlace a la página del área. */
  href?: string;
  as?: "h2" | "h3";
};

/** Tarjeta de área de práctica con numeral romano. Pensada para grillas con separadores. */
export function AreaCard({ area, href, as: Heading = "h3" }: AreaCardProps) {
  const body = (
    <>
      <span aria-hidden className="font-display text-display-1 text-muted opacity-60">
        {area.numeral}
      </span>
      <Heading className="mt-6 text-display-3">{area.title}</Heading>
      <span aria-hidden className="mt-6 block h-px w-12 bg-accent" />
      <p className="mt-6 text-body">{area.summary}</p>
      {href && (
        <span className="mt-8 inline-flex items-center gap-2 text-small font-semibold text-accent-text">
          Conocer más
          <ArrowRight className="size-4 transition-transform duration-(--motion-base) ease-brand group-hover:translate-x-1" />
        </span>
      )}
    </>
  );

  const classes =
    "group flex h-full flex-col bg-surface p-8 md:p-12 transition-colors duration-(--motion-base) ease-brand";

  return href ? (
    <Link
      href={href}
      className={`${classes} hover:bg-surface-raised`}
      {...trackAttrs({ event: "cta_click", location: "card", id: `area_${area.slug}` })}
    >
      {body}
    </Link>
  ) : (
    <div className={classes}>{body}</div>
  );
}

/** Grilla con líneas divisorias finas entre tarjetas. */
export function AreaGrid({ children }: { children: React.ReactNode }) {
  return <div className="grid gap-px border border-line bg-line md:grid-cols-2">{children}</div>;
}
