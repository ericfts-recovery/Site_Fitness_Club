'use client'

import { useSyncExternalStore } from 'react'
import { readConsent, subscribeConsent, type ConsentValue } from '@/lib/consent'

/** 'pending' no servidor/hidratação, null quando o visitante ainda não escolheu. */
export function useConsent(): ConsentValue | null | 'pending' {
  return useSyncExternalStore(subscribeConsent, readConsent, () => 'pending' as const)
}
