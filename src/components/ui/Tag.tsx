import type { ReactNode } from "react";

/** Etiqueta de especialidad (ej. "Derecho Corporativo"). */
export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-control border border-line px-3 py-1.5 text-small text-body">
      {children}
    </span>
  );
}
