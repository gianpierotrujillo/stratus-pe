#!/usr/bin/env node
/**
 * Verifica que ningún componente tenga valores "hardcodeados".
 * Colores, tamaños y datos de la empresa solo pueden vivir en:
 *   src/design/**, src/config/**, src/content/** y el CSS generado.
 *
 *   npm run check:tokens   → falla (exit 1) si encuentra infracciones.
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative, resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const SRC = join(root, "src");

const ALLOWED_DIRS = ["src/design", "src/config", "src/content"];
const ALLOWED_FILES = ["src/styles/tokens.generated.css"];
const EXTENSIONS = /\.(tsx?|css|mjs|js)$/;

const RULES = [
  { name: "Color HEX", re: /#[0-9a-fA-F]{3,8}\b/ },
  { name: "Color rgb()/hsl()", re: /\b(rgba?|hsla?)\(/ },
  { name: "Medida en px", re: /\b\d+(\.\d+)?px\b/ },
  { name: "Valor arbitrario Tailwind", re: /\[(#|\d+(\.\d+)?(px|rem|em|vw|vh)\b)/ },
  { name: "Correo escrito a mano", re: /[\w.+-]+@[\w-]+\.[a-z]{2,}/i },
  { name: "Dominio escrito a mano", re: /stratus\.pe\b/i },
  { name: "Teléfono escrito a mano", re: /\+?51[\s-]?9\d{2}/ },
];

const walk = (dir) =>
  readdirSync(dir).flatMap((name) => {
    const full = join(dir, name);
    return statSync(full).isDirectory() ? walk(full) : [full];
  });

const isComment = (line) => /^\s*(\/\/|\/?\*)/.test(line);

const problems = [];
for (const file of walk(SRC)) {
  const rel = relative(root, file);
  if (!EXTENSIONS.test(rel)) continue;
  if (ALLOWED_FILES.includes(rel) || ALLOWED_DIRS.some((d) => rel.startsWith(d + "/"))) continue;

  readFileSync(file, "utf8")
    .split("\n")
    .forEach((line, i) => {
      if (isComment(line)) return;
      for (const rule of RULES) {
        if (rule.re.test(line)) problems.push(`${rel}:${i + 1}  ${rule.name}  →  ${line.trim()}`);
      }
    });
}

if (problems.length) {
  console.error(`✗ ${problems.length} valor(es) hardcodeado(s). Muévalos a tokens.json, config/ o content/:\n`);
  console.error(problems.map((p) => "  " + p).join("\n"));
  process.exit(1);
}
console.log("✓ check:tokens — sin valores hardcodeados.");
