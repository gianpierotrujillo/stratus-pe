import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { StratusLines } from "@/components/ui/StratusLines";
import { primaryCta } from "@/config/navigation";

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main id="contenido" className="flex flex-1 flex-col pt-header">
        <Section tone="dark" className="flex flex-1 items-center">
          <SectionHeader
            as="h1"
            size="display-1"
            eyebrow="Error 404"
            title="No encontramos la página que busca"
            lead="Es posible que la dirección haya cambiado o ya no exista. Le invitamos a continuar desde el inicio o a escribirnos directamente."
          />
          <div className="mt-12 flex flex-wrap gap-4">
            <Button href="/">Ir al inicio</Button>
            <Button href={primaryCta.href} variant="outline">
              {primaryCta.label}
            </Button>
          </div>
          <StratusLines className="mt-16 w-32" />
        </Section>
      </main>
      <SiteFooter />
    </>
  );
}
