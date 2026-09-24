/**
 * Marca un dato que deben proporcionar los socios.
 * Se muestra tal cual en el sitio para que sea visible durante la revisión
 * y `npm run pendientes` lista todos los que quedan.
 */
export const PENDIENTE = (descripcion: string) => `[PENDIENTE: ${descripcion}]` as const;

export const isPending = (value: unknown): boolean =>
  typeof value === "string" && value.startsWith("[PENDIENTE");
