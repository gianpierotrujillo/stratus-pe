import type { ReactNode } from "react";
import type { Tone } from "@/design/tokens";
import { cx } from "@/lib/cx";
import { Container } from "./Container";

type SectionProps = {
  children: ReactNode;
  /** Tono de la sección: define fondo, títulos, texto y acentos. */
  tone?: Tone;
  /** Espaciado vertical: "default" (escala section), "compact" o "none". */
  spacing?: "default" | "compact" | "none";
  /** false = sin Container (ancho completo). */
  contained?: boolean;
  id?: string;
  as?: "section" | "div" | "header" | "aside";
  className?: string;
  "aria-labelledby"?: string;
};

const spacingClass = {
  default: "py-section",
  compact: "py-16 md:py-20",
  none: "",
};

export function Section({
  children,
  tone = "light",
  spacing = "default",
  contained = true,
  id,
  as: Tag = "section",
  className,
  ...aria
}: SectionProps) {
  return (
    <Tag id={id} data-tone={tone} className={cx("relative", spacingClass[spacing], className)} {...aria}>
      {contained ? <Container>{children}</Container> : children}
    </Tag>
  );
}
