import type { ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { StratusLines } from "@/components/ui/StratusLines";
import type { Tone } from "@/design/tokens";
import { primaryCta } from "@/config/navigation";

type CtaBandProps = {
  title: ReactNode;
  text?: ReactNode;
  cta?: { label: string; href: string; id: string };
  tone?: Tone;
};

/** Banda de llamado a la acción ("¿Tiene un desafío estratégico que resolver?"). */
export function CtaBand({
  title,
  text,
  cta = { label: "Iniciar una consulta", href: primaryCta.href, id: "iniciar_consulta" },
  tone = "dark",
}: CtaBandProps) {
  return (
    <Section tone={tone} className="overflow-hidden border-t border-line">
      <div className="grid items-center gap-10 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-7">
          <h2 className="text-display-2">{title}</h2>
          <StratusLines className="mt-10 w-32" />
        </div>
        <div className="md:col-span-5">
          {text && <p className="text-lead">{text}</p>}
          <Button
            href={cta.href}
            arrow
            className="mt-8"
            track={{ event: "cta_click", location: "cta_band", id: cta.id }}
          >
            {cta.label}
          </Button>
        </div>
      </div>
    </Section>
  );
}
