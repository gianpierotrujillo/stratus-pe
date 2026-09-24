import type { ReactNode } from "react";
import { env } from "@/config/env";
import { isPending } from "@/config/pending";

/**
 * Muestra un dato de configuración/contenido.
 * - Si está PENDIENTE: en vista previa aparece resaltado para revisión;
 *   en producción no se renderiza (ni el bloque que lo envuelve si se usa `children`).
 */
export function Pending({ value, children }: { value: unknown; children?: ReactNode }) {
  if (!isPending(value)) return <>{children ?? String(value)}</>;
  if (env.indexable) return null;
  return (
    <span className="rounded-control border border-dashed border-accent px-1.5 text-accent-text">{String(value)}</span>
  );
}

/** true si el campo debe mostrarse (tiene valor, o estamos en vista previa). */
export const showField = (value: unknown) => !isPending(value) || !env.indexable;
