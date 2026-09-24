import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/structured-data";

export type Crumb = { label: string; href: string };

/** Migas de pan visibles + datos estructurados BreadcrumbList. */
export function Breadcrumbs({ items }: { items: readonly Crumb[] }) {
  const all = [{ label: "Inicio", href: "/" }, ...items];
  return (
    <nav aria-label="Ruta de navegación" className="mb-10">
      <JsonLd data={breadcrumbSchema(all)} />
      <ol className="flex flex-wrap items-center gap-x-3 gap-y-1 text-small text-muted">
        {all.map((c, i) => {
          const last = i === all.length - 1;
          return (
            <li key={c.href} className="flex items-center gap-3">
              {last ? (
                <span aria-current="page" className="text-body">
                  {c.label}
                </span>
              ) : (
                <>
                  <Link href={c.href} className="hover:text-heading">
                    {c.label}
                  </Link>
                  <span aria-hidden className="text-accent">
                    /
                  </span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
