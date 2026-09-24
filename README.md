# stratus.pe — Sitio web de Stratus Consulting

Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · Vercel

## Requisitos

- Node.js 20.9 o superior (recomendado 22 LTS) — `node -v`
- VS Code con las extensiones recomendadas (se sugieren al abrir la carpeta)

## Comandos

| Comando              | Qué hace                                                                 |
| -------------------- | ------------------------------------------------------------------------ |
| `npm install`        | Instala dependencias (y genera los tokens)                               |
| `npm run dev`        | Servidor local en http://localhost:3000 — regenera tokens al guardarlos  |
| `npm run build`      | Compilación de producción (la misma que ejecuta Vercel)                  |
| `npm run check`      | Verifica valores hardcodeados + ESLint + TypeScript                      |
| `npm run pendientes` | Lista los datos que faltan que entreguen los socios                      |

## Fuentes únicas de verdad

| Qué cambiar                                  | Dónde                              |
| -------------------------------------------- | ---------------------------------- |
| Colores, tipografía, tamaños, espaciados     | `src/design/tokens.json`           |
| Familias tipográficas (archivos)             | `src/design/fonts.ts`              |
| Datos de la empresa (correo, dirección, RUC) | `src/config/site.ts`               |
| Menú y rutas publicadas                      | `src/config/navigation.ts`         |
| Logos y favicon                              | `public/brand/`, `src/config/brand-assets.ts`, `src/app/icon.svg` |
| Diccionario de eventos GA4                   | `src/config/analytics-events.ts`   |
| Textos de páginas (Fase 3)                   | `src/content/`                     |

### Tokens de color en dos niveles

1. **Primitivos** (`color`): la paleta de marca (`ink`, `navy`, `gold`, `mist`…).
2. **Semánticos** (`tone`): `surface`, `heading`, `body`, `accent`, `line`…
   Cada sección declara su tono con `data-tone="light" | "dark" | "navy"`
   y los componentes usan solo clases semánticas (`bg-surface`, `text-heading`, `text-accent`).

`src/styles/tokens.generated.css` se genera automáticamente: **no se edita a mano** ni se versiona.

### Regla del proyecto

Ningún color HEX, medida en px, correo, teléfono o dominio escrito fuera de
`src/design`, `src/config` o `src/content`. `npm run check:tokens` lo verifica.

## Variables de entorno

Ver `.env.example`. En Vercel: _Settings → Environment Variables_.

- `SITE_INDEXABLE=true` **solo** en Producción el día del lanzamiento. Mientras no lo esté,
  todo el sitio responde `noindex` y `robots.txt` bloquea a los buscadores.

## Flujo de ramas

- `main` → **Producción** (stratus.pe). Solo recibe cambios revisados.
- `develop` → **Vista previa** en Vercel (siempre `noindex`). Aquí se trabaja cada fase.

```bash
git checkout develop        # trabajar
git push                    # Vercel publica la vista previa
# cuando la fase está aprobada:
git checkout main && git merge develop && git push   # sale a producción
git checkout develop
```

En Producción, cualquier acceso por `*.vercel.app` redirige (308) a stratus.pe
cuando `SITE_INDEXABLE=true`.
