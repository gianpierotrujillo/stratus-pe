#!/usr/bin/env node
/**
 * Genera src/styles/tokens.generated.css a partir de src/design/tokens.json.
 *
 *   node scripts/build-tokens.mjs          → genera una vez
 *   node scripts/build-tokens.mjs --watch  → regenera al guardar tokens.json
 *
 * Se ejecuta solo en postinstall, predev y prebuild. No editar el CSS generado.
 */
import { readFileSync, writeFileSync, mkdirSync, watch } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const SRC = resolve(root, "src/design/tokens.json");
const OUT = resolve(root, "src/styles/tokens.generated.css");

/** "{color.ink}" → "var(--color-ink)" */
const refs = (value) =>
  String(value).replace(/\{([a-z-]+)\.([a-z0-9-]+)\}/gi, (_, group, key) => `var(--${group}-${key})`);

const entries = (obj) => Object.entries(obj ?? {}).filter(([k]) => !k.startsWith("$"));

function build() {
  const t = JSON.parse(readFileSync(SRC, "utf8"));
  const theme = [];
  const push = (name, value) => theme.push(`  --${name}: ${refs(value)};`);

  // Paleta exclusiva de marca: se eliminan los colores por defecto de Tailwind.
  theme.push("  --color-*: initial;");
  for (const [k, v] of entries(t.color)) push(`color-${k}`, v);

  // Tono por defecto (light) disponible en :root.
  const tones = entries(t.tone);
  const [, defaultTone] = tones.find(([name]) => name === "light") ?? tones[0];
  for (const [k, v] of entries(defaultTone)) push(`color-${k}`, v);

  for (const [k, v] of entries(t.font)) push(`font-${k}`, v);
  for (const [k, [size, lh]] of entries(t.text)) {
    push(`text-${k}`, size);
    if (lh) push(`text-${k}--line-height`, lh);
  }
  for (const [k, v] of entries(t.tracking)) push(`tracking-${k}`, v);
  push("container-site", t.layout.container);
  push("container-prose", t.layout.prose);
  push("spacing-gutter", t.layout.gutter);
  push("spacing-section", t.layout.section);
  push("spacing-header", t.layout.header);
  for (const [k, v] of entries(t.radius)) push(`radius-${k}`, v);
  push("ease-brand", t.motion.ease);

  const motion = [
    ...["fast", "base", "slow"].map((k) => `  --motion-${k}: ${t.motion[k]};`),
    ...entries(t.focus).map(([k, v]) => `  --focus-${k}: ${v};`),
  ];

  const toneBlocks = tones.map(([name, vals]) => {
    const lines = entries(vals).map(([k, v]) => `  --color-${k}: ${refs(v)};`);
    const scheme = name === "light" ? "light" : "dark";
    return `[data-tone="${name}"] {\n${lines.join("\n")}\n  color-scheme: ${scheme};\n}`;
  });

  const css = [
    "/* ⚠️  ARCHIVO AUTO-GENERADO desde src/design/tokens.json — NO EDITAR A MANO. */",
    "",
    "@theme {",
    ...theme,
    "}",
    "",
    ":root {",
    ...motion,
    "}",
    "",
    ...toneBlocks,
    "",
  ].join("\n");

  mkdirSync(dirname(OUT), { recursive: true });
  writeFileSync(OUT, css);
  console.log(`✓ tokens → ${OUT.replace(root + "/", "")}`);
}

build();

if (process.argv.includes("--watch")) {
  let timer;
  watch(SRC, () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      try {
        build();
      } catch (err) {
        console.error("✗ tokens.json inválido:", err.message);
      }
    }, 100);
  });
  console.log("… observando src/design/tokens.json");
}
