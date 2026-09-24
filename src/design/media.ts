/**
 * Puntos de quiebre para usos fuera de CSS (atributo `sizes` de imágenes).
 * Coinciden con los breakpoints por defecto de Tailwind v4 (sm 40rem, md 48rem, lg 64rem, xl 80rem).
 */
export const mq = {
  sm: "(min-width: 40rem)",
  md: "(min-width: 48rem)",
  lg: "(min-width: 64rem)",
  xl: "(min-width: 80rem)",
} as const;

/** Construye el atributo `sizes`: sizes([[mq.lg, "30vw"], [mq.md, "40vw"]], "100vw") */
export const sizes = (rules: ReadonlyArray<readonly [string, string]>, fallback = "100vw") =>
  [...rules.map(([q, w]) => `${q} ${w}`), fallback].join(", ");
