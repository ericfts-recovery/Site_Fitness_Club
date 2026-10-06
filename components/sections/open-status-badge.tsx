'use client'

import { useOpenStatus } from '@/hooks/use-open-status'
import { cn } from '@/lib/cn'

/** Selo "Aberto agora" calculado no fuso da academia. Antes de hidratar, mostra o horário fixo. */
export function OpenStatusBadge({ fallback, className }: { fallback: string; className?: string }) {
  const status = useOpenStatus()

  let label = fallback
  let isOpen: boolean | null = null
  if (status?.open) {
    label = `Aberto agora · fecha às ${status.closesAt}`
    isOpen = true
  } else if (status && !status.open) {
    label = status.opensAt
      ? `Fechado agora · abre ${status.opensToday ? 'hoje' : 'amanhã'} às ${status.opensAt}`
      : 'Fechado agora'
    isOpen = false
  }

  return (
    <p
      className={cn(
        'inline-flex min-h-9 items-center gap-2.5 rounded-full border border-line-strong bg-ink-2 px-4 text-xs font-semibold tracking-wide text-bone',
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          'size-2 rounded-full',
          isOpen === false ? 'bg-ember' : 'animate-pulse-dot bg-volt',
        )}
      />
      <span aria-live="polite">{label}</span>
    </p>
  )
}
