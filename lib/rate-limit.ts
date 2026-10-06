/**
 * Rate limit em memória (janela deslizante simples).
 * Suficiente para um site institucional; em produção com tráfego alto,
 * troque por um store compartilhado (ex.: Upstash Redis + @upstash/ratelimit),
 * já que instâncias serverless não compartilham memória.
 */
const WINDOW_MS = 10 * 60 * 1000
const MAX_REQUESTS = 5
const hits = new Map<string, number[]>()

export function isRateLimited(key: string, now: number = Date.now()): boolean {
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS)
  recent.push(now)
  hits.set(key, recent)
  return recent.length > MAX_REQUESTS
}
