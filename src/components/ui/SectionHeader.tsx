import type { ReactNode } from "react";
import { cx } from "@/lib/cx";
import { Eyebrow } from "./Eyebrow";

type SectionHeaderProps = {
  eyebrow?: ReactNode;
  title: ReactNode;
  lead?: ReactNode;
  /** Nivel semántico del título. */
  as?: "h1" | "h2" | "h3";
  /** Tamaño visual (independiente del nivel semántico). */
  size?: "hero" | "display-1" | "display-2" | "display-3";
  align?: "left" | "center";
  className?: string;
  titleId?: string;
};

const sizeClass = {
  hero: "text-hero",
  "display-1": "text-display-1",
  "display-2": "text-display-2",
  "display-3": "text-display-3",
};

export function SectionHeader({
  eyebrow,
  title,
  lead,
  as: Heading = "h2",
  size = "display-2",
  align = "left",
  className,
  titleId,
}: SectionHeaderProps) {
  return (
    <div className={cx("max-w-4xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && <Eyebrow className={cx("mb-6", align === "center" && "justify-center")}>{eyebrow}</Eyebrow>}
      <Heading id={titleId} className={sizeClass[size]}>
        {title}
      </Heading>
      {lead && <p className={cx("mt-6 max-w-prose text-lead", align === "center" && "mx-auto")}>{lead}</p>}
    </div>
  );
}
