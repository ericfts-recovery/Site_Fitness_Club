'use client'

import { useSyncExternalStore } from 'react'
import { getOpenStatus, nowInGymTimezone, type OpenStatus } from '@/lib/hours'

const REFRESH_MS = 60_000

function subscribe(callback: () => void): () => void {
  const id = window.setInterval(callback, REFRESH_MS)
  return () => window.clearInterval(id)
}

// Snapshot precisa ser estável entre chamadas: cacheamos por minuto.
let cachedKey = ''
let cachedStatus: OpenStatus | null = null

function getSnapshot(): OpenStatus {
  const { weekday, minutes } = nowInGymTimezone()
  const key = `${weekday}-${minutes}`
  if (key !== cachedKey || !cachedStatus) {
    cachedKey = key
    cachedStatus = getOpenStatus()
  }
  return cachedStatus
}

/** Calculado só no cliente para não gerar divergência de hidratação em páginas estáticas. */
export function useOpenStatus(): OpenStatus | null {
  return useSyncExternalStore(subscribe, getSnapshot, () => null)
}

/** Dia da semana atual no fuso da academia (para destacar "hoje" na tabela de horários). */
export function useTodayWeekday(): number | null {
  return useSyncExternalStore(
    subscribe,
    () => nowInGymTimezone().weekday,
    () => null,
  )
}
