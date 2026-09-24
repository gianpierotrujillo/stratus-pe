/**
 * Layout del sitio completo (cabecera + pie). Las páginas nuevas viven dentro
 * de (site)/. La página "en construcción" (app/page.tsx) queda fuera de este
 * grupo y no se ve afectada hasta que Inicio la reemplace en la Fase 3.
 */
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-60 focus:bg-accent focus:px-4 focus:py-2 focus:text-on-accent"
      >
        Saltar al contenido
      </a>
      <SiteHeader />
      <main id="contenido" className="flex-1 pt-header">
        {children}
      </main>
      <SiteFooter />
    </>
  );
}
