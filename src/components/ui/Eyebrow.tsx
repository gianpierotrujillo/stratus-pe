import type { ReactNode } from "react";
import { cx } from "@/lib/cx";

/** Antetítulo en versalitas con línea dorada ("—— NOSOTROS"). */
export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p
      className={cx(
        "flex items-center gap-4 text-eyebrow font-semibold uppercase tracking-eyebrow text-accent-text",
        className,
      )}
    >
      <span aria-hidden className="h-px w-10 shrink-0 bg-accent" />
      <span>{children}</span>
    </p>
  );
}
