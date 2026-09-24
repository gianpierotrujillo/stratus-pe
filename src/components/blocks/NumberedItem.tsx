import type { ReactNode } from "react";

type NumberedItemProps = {
  index: number;
  title: ReactNode;
  children: ReactNode;
  as?: "h3" | "h4";
};

/** Ítem numerado (01, 02…) para valores, diferenciales y procesos. */
export function NumberedItem({ index, title, children, as: Heading = "h3" }: NumberedItemProps) {
  return (
    <div className="flex gap-6">
      <span
        aria-hidden
        className="flex size-12 shrink-0 items-center justify-center rounded-control border border-line text-small font-semibold text-accent-text"
      >
        {String(index).padStart(2, "0")}
      </span>
      <div>
        <Heading className="text-title">{title}</Heading>
        <div className="mt-3 text-body">{children}</div>
      </div>
    </div>
  );
}
