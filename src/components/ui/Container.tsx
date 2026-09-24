import type { ReactNode } from "react";
import { cx } from "@/lib/cx";

type ContainerProps = {
  children: ReactNode;
  /** "site" = ancho general; "prose" = columna de lectura. */
  width?: "site" | "prose";
  className?: string;
};

export function Container({ children, width = "site", className }: ContainerProps) {
  return (
    <div className={cx("mx-auto w-full px-gutter", width === "site" ? "max-w-site" : "max-w-prose", className)}>
      {children}
    </div>
  );
}
