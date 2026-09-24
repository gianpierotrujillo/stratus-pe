import { cx } from "@/lib/cx";

/**
 * Motivo gráfico derivado del isotipo: tres líneas escalonadas.
 * Toma los colores del tono de la sección (acento, apagado, título).
 */
export function StratusLines({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cx("flex w-40 flex-col items-end gap-2.5", className)}>
      <span className="h-0.5 w-1/2 bg-accent" />
      <span className="h-0.5 w-3/4 bg-muted" />
      <span className="h-0.5 w-full bg-heading" />
    </div>
  );
}
