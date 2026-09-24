/**
 * Marcado declarativo de eventos. Los componentes solo declaran QUÉ evento
 * representan (data-ga-*); el envío a GA4 se conecta en la Fase 5 con un único
 * listener global, sin tocar los componentes.
 */
import type { AnalyticsEventName, EventLocation } from "@/config/analytics-events";

export type Track = {
  event: AnalyticsEventName;
  /** Zona de la página desde donde se dispara. */
  location: EventLocation;
  /** Identificador estable del elemento (ej. "consultar_ahora"). */
  id?: string;
  params?: Record<string, string>;
};

export function trackAttrs(track?: Track): Record<string, string> {
  if (!track) return {};
  return {
    "data-ga-event": track.event,
    "data-ga-location": track.location,
    ...(track.id ? { "data-ga-id": track.id } : {}),
    ...(track.params ? { "data-ga-params": JSON.stringify(track.params) } : {}),
  };
}
