#!/usr/bin/env node
/**
 * Lista todos los datos marcados como PENDIENTE("...") que deben
 * proporcionar los socios.   →   npm run pendientes
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative, resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const walk = (dir) =>
  readdirSync(dir).flatMap((n) => {
    const f = join(dir, n);
    return statSync(f).isDirectory() ? walk(f) : [f];
  });

const found = [];
for (const file of walk(join(root, "src")).filter((f) => /\.tsx?$/.test(f))) {
  readFileSync(file, "utf8")
    .split("\n")
    .forEach((line, i) => {
      for (const m of line.matchAll(/PENDIENTE\(\s*["'`](.+?)["'`]\s*\)/g)) {
        found.push({ file: relative(root, file), line: i + 1, what: m[1] });
      }
    });
}

if (!found.length) {
  console.log("✓ No hay datos pendientes.");
} else {
  console.log(`Datos pendientes (${found.length}):\n`);
  for (const p of found) console.log(`  • ${p.what.padEnd(40)} ${p.file}:${p.line}`);
}
