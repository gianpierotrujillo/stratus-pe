import Image from "next/image";
import { logoByTone, logoMono, logoRatio } from "@/config/brand-assets";
import { site } from "@/config/site";
import type { Tone } from "@/design/tokens";

type LogoProps = {
  /** Tono de la sección donde va el logo (elige la versión de color). */
  tone?: Tone;
  /** Versión monocroma: sobre fotografías o impresión. */
  mono?: keyof typeof logoMono;
  className?: string;
  priority?: boolean;
};

export function Logo({ tone = "light", mono, className, priority }: LogoProps) {
  const src = mono ? logoMono[mono] : logoByTone[tone];
  return (
    <Image
      src={src}
      alt={`${site.name} — Estudio de abogados`}
      width={logoRatio.width}
      height={logoRatio.height}
      priority={priority}
      unoptimized
      className={className}
    />
  );
}
