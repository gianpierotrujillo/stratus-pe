/**
 * Familias tipográficas de la marca, alojadas en el propio proyecto
 * (src/design/fonts, licencia SIL OFL). next/font las optimiza y las sirve
 * desde stratus.pe: sin dependencia de Google Fonts ni en el build ni en el navegador.
 *
 * Para cambiar una familia: se reemplazan los .woff2 y las rutas de abajo.
 * Los roles (display / sans) se asignan en tokens.json → "font".
 */
import localFont from "next/font/local";

export const playfair = localFont({
  variable: "--font-playfair",
  display: "swap",
  src: [
    { path: "./fonts/playfair-display-latin-wght-normal.woff2", weight: "400 900", style: "normal" },
    { path: "./fonts/playfair-display-latin-wght-italic.woff2", weight: "400 900", style: "italic" },
  ],
  fallback: ["Georgia", "Times New Roman", "serif"],
});

export const inter = localFont({
  variable: "--font-inter",
  display: "swap",
  src: [
    { path: "./fonts/inter-latin-wght-normal.woff2", weight: "100 900", style: "normal" },
    { path: "./fonts/inter-latin-wght-italic.woff2", weight: "100 900", style: "italic" },
  ],
  fallback: ["system-ui", "-apple-system", "Segoe UI", "sans-serif"],
});

export const fontVariables = `${playfair.variable} ${inter.variable}`;
