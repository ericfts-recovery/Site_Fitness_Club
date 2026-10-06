/**
 * Eventos de conversão rastreados. Nomes estáveis para usar como conversões no GA4/Ads.
 */
export type AnalyticsEvent =
  | 'cta_whatsapp_click'
  | 'cta_phone_click'
  | 'cta_trial_click'
  | 'cta_directions_click'
  | 'cta_instagram_click'
  | 'lead_form_submit'
  | 'lead_form_error'

export type AnalyticsParams = Record<string, string | number | boolean>

type Gtag = (command: 'event', name: string, params?: AnalyticsParams) => void

declare global {
  interface Window {
    gtag?: Gtag
    dataLayer?: unknown[]
  }
}

export function track(event: AnalyticsEvent, params: AnalyticsParams = {}): void {
  if (typeof window === 'undefined') return
  // Sem consentimento o gtag não é carregado e o evento é simplesmente descartado.
  window.gtag?.('event', event, params)
}
