import type { ReactNode } from "react";

/** Cita destacada en tipografía display. */
export function Quote({ children, cite }: { children: ReactNode; cite?: ReactNode }) {
  return (
    <figure>
      <blockquote className="font-display text-display-3 font-semibold text-heading">
        <span aria-hidden className="text-accent">
          “
        </span>
        {children}
        <span aria-hidden className="text-accent">
          ”
        </span>
      </blockquote>
      {cite && <figcaption className="mt-6 text-small text-muted">— {cite}</figcaption>}
    </figure>
  );
}
