/**
 * Generador de imágenes para compartir (Open Graph / WhatsApp / LinkedIn / X).
 * 1200×630, colores y tipografías de la marca desde tokens.json y src/design/fonts.
 */
/* eslint-disable @next/next/no-img-element -- ImageResponse (satori) requiere <img> */
import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { logoByTone } from "@/config/brand-assets";
import { site } from "@/config/site";
import { brandColor, toneColor } from "@/design/tokens";

import { ogSize } from "./og-config";

export { ogContentType, ogSize } from "./og-config";

const root = process.cwd();
const fromPublic = (p: string) => join(root, "public", p);

async function dataUri(publicPath: string, mime: string) {
  const buf = await readFile(fromPublic(publicPath));
  return `data:${mime};base64,${buf.toString("base64")}`;
}

async function fonts() {
  const dir = join(root, "src/design/fonts/og");
  const [display, sans, sansBold] = await Promise.all([
    readFile(join(dir, "playfair-display-latin-600-normal.woff")),
    readFile(join(dir, "inter-latin-400-normal.woff")),
    readFile(join(dir, "inter-latin-600-normal.woff")),
  ]);
  return [
    { name: "Display", data: display, weight: 600 as const, style: "normal" as const },
    { name: "Sans", data: sans, weight: 400 as const, style: "normal" as const },
    { name: "Sans", data: sansBold, weight: 600 as const, style: "normal" as const },
  ];
}

type OgCardProps = {
  eyebrow: string;
  title: string;
  subtitle?: string;
  /** Foto opcional a la derecha (ruta pública .jpg). */
  photo?: string;
};

export async function ogCard({ eyebrow, title, subtitle, photo }: OgCardProps) {
  const [logo, photoUri, fontData] = await Promise.all([
    dataUri(logoByTone.dark, "image/svg+xml"),
    photo ? dataUri(photo, "image/jpeg") : Promise.resolve(null),
    fonts(),
  ]);

  const ink = toneColor("dark", "surface");
  const heading = toneColor("dark", "heading");
  const body = toneColor("dark", "body");
  const gold = brandColor("gold");
  const titleSize = title.length > 48 ? 58 : title.length > 30 ? 68 : 80;

  return new ImageResponse(
    <div style={{ display: "flex", width: "100%", height: "100%", background: ink, fontFamily: "Sans" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          paddingTop: 64,
          paddingBottom: 64,
          paddingLeft: 72,
          paddingRight: 72,
          width: photoUri ? 780 : "100%",
          borderTopWidth: 8,
          borderTopStyle: "solid",
          borderTopColor: gold,
        }}
      >
        <img src={logo} width={300} height={80} alt="" />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18, marginBottom: 22 }}>
            <div style={{ width: 48, height: 2, background: gold }} />
            <div style={{ color: gold, fontSize: 22, fontWeight: 600, letterSpacing: 5, textTransform: "uppercase" }}>
              {eyebrow}
            </div>
          </div>
          <div style={{ color: heading, fontFamily: "Display", fontSize: titleSize, lineHeight: 1.08 }}>{title}</div>
          {subtitle && (
            <div style={{ color: body, fontSize: 28, lineHeight: 1.4, marginTop: 24, maxWidth: 960 }}>{subtitle}</div>
          )}
        </div>
        <div style={{ color: body, fontSize: 22, letterSpacing: 2 }}>{site.domain}</div>
      </div>
      {photoUri && (
        <div style={{ display: "flex", width: 420, height: "100%" }}>
          <img src={photoUri} width={420} height={630} alt="" style={{ objectFit: "cover" }} />
        </div>
      )}
    </div>,
    { ...ogSize, fonts: fontData },
  );
}
