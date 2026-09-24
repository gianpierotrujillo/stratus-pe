import type { AnalyticsEventName } from "@/config/analytics-events";

/**
 * Marca la página con un evento de "vista" (practice_area_view, team_profile_view).
 * El listener de la Fase 5 lo detecta al cargar la página y lo envía a GA4.
 */
export function ViewMarker({ event, params }: { event: AnalyticsEventName; params: Record<string, string> }) {
  return <span hidden data-ga-view={event} data-ga-params={JSON.stringify(params)} />;
}
