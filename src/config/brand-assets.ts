/**
 * Archivos de marca (en /public/brand). Cambiar un logo = reemplazar el archivo
 * o apuntar aquí a uno nuevo.
 */
import type { Tone } from "@/design/tokens";

const dir = "/brand";

/** Logo horizontal según el tono de la sección donde se coloca. */
export const logoByTone: Record<Tone, string> = {
  light: `${dir}/stratus-consulting-logo-horizontal-fondo-claro.svg`,
  dark: `${dir}/stratus-consulting-logo-horizontal-fondo-oscuro.svg`,
  navy: `${dir}/stratus-consulting-logo-horizontal-fondo-azul.svg`,
};

export const logoMono = {
  white: `${dir}/stratus-consulting-logo-horizontal-monocromo-blanco.svg`,
  ink: `${dir}/stratus-consulting-logo-horizontal-monocromo-azul.svg`,
};

/** Proporción del logo horizontal (ancho / alto del viewBox). */
export const logoRatio = { width: 1266, height: 337 } as const;

export const appIcons = {
  icon192: `${dir}/icon-192.png`,
  icon512: `${dir}/icon-512.png`,
  maskable512: `${dir}/icon-maskable-512.png`,
};
