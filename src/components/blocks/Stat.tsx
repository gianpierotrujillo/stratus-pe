import type { ReactNode } from "react";
import { cx } from "@/lib/cx";

type StatProps = {
  value: ReactNode;
  label: ReactNode;
  /** "accent" pinta la cifra en dorado (bandas oscuras/azules). */
  emphasis?: "heading" | "accent";
};

/** Cifra destacada con línea dorada superior ("+15 años de experiencia"). */
export function Stat({ value, label, emphasis = "heading" }: StatProps) {
  return (
    <div className="border-t-2 border-accent pt-6">
      <p className={cx("font-display text-display-1", emphasis === "accent" ? "text-accent" : "text-heading")}>
        {value}
      </p>
      <p className="mt-2 text-small text-muted">{label}</p>
    </div>
  );
}
