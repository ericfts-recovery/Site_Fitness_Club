'use client'

import { useTodayWeekday } from '@/hooks/use-open-status'
import { site } from '@/content/site'
import { formatHour } from '@/lib/hours'
import { cn } from '@/lib/cn'

/** Tabela de horários com destaque para o dia de hoje (calculado no cliente). */
export function HoursTable() {
  const today = useTodayWeekday()

  return (
    <table className="w-full text-left">
      <caption className="sr-only">Horário de funcionamento</caption>
      <tbody>
        {site.openingHours.map((rule) => {
          const isToday = today !== null && (rule.days as readonly number[]).includes(today)
          return (
            <tr key={rule.label} className={cn('border-b border-line', isToday && 'text-volt')}>
              <th scope="row" className="py-5 pr-4 font-semibold">
                {rule.label}
                {isToday ? (
                  <span className="ml-3 rounded-full bg-volt px-2.5 py-1 text-[0.65rem] font-bold tracking-widest text-ink uppercase">
                    Hoje
                  </span>
                ) : null}
              </th>
              <td className="py-5 text-right font-display text-3xl tracking-wide sm:text-4xl">
                {formatHour(rule.opens)} — {formatHour(rule.closes)}
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
