/**
 * Acceso tipado a los tokens para código TypeScript que necesita valores
 * literales (manifest, imágenes OG, correos, datos estructurados).
 * Los componentes NO usan este archivo: usan las clases de Tailwind
 * generadas desde el mismo tokens.json.
 */
import tokens from "./tokens.json";

type Palette = Omit<typeof tokens.color, "$description">;
export type BrandColor = keyof Palette;
export type Tone = Exclude<keyof typeof tokens.tone, "$description">;

const palette = tokens.color as Palette;

/** Devuelve el HEX de un color primitivo. */
export function brandColor(name: BrandColor): string {
  return palette[name];
}

/** Devuelve el valor de un color semántico en un tono, resolviendo {color.x}. */
export function toneColor(tone: Tone, name: keyof (typeof tokens.tone)["light"]): string {
  const raw = (tokens.tone[tone] as Record<string, string>)[name];
  return raw.replace(/\{color\.([a-z0-9-]+)\}/gi, (_, key: BrandColor) => palette[key]);
}

export { tokens };
