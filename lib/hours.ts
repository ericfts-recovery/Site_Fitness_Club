import { site } from '@/content/site'
import type { OpeningHoursRule, Weekday } from '@/types/content'

const TIME_ZONE = 'America/Sao_Paulo'
const MINUTES_PER_HOUR = 60
const WEEKDAY_INDEX: Record<string, Weekday> = {
  Sun: 0,
  Mon: 1,
  Tue: 2,
  Wed: 3,
  Thu: 4,
  Fri: 5,
  Sat: 6,
}

export const SCHEMA_DAY_NAMES: Record<Weekday, string> = {
  0: 'Sunday',
  1: 'Monday',
  2: 'Tuesday',
  3: 'Wednesday',
  4: 'Thursday',
  5: 'Friday',
  6: 'Saturday',
}

function toMinutes(time: string): number {
  const [h = '0', m = '0'] = time.split(':')
  return Number(h) * MINUTES_PER_HOUR + Number(m)
}

/** "05:00" -> "5h", "09:30" -> "9h30" */
export function formatHour(time: string): string {
  const [h = '0', m = '00'] = time.split(':')
  return `${Number(h)}h${m === '00' ? '' : m}`
}

/** Dia da semana e minutos do dia no fuso da academia, independente do fuso do visitante. */
export function nowInGymTimezone(date: Date = new Date()): { weekday: Weekday; minutes: number } {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: TIME_ZONE,
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(date)
  const get = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((p) => p.type === type)?.value ?? ''
  return {
    weekday: WEEKDAY_INDEX[get('weekday')] ?? 0,
    minutes: Number(get('hour')) * MINUTES_PER_HOUR + Number(get('minute')),
  }
}

export function ruleForDay(
  day: Weekday,
  rules: readonly OpeningHoursRule[] = site.openingHours,
): OpeningHoursRule | undefined {
  return rules.find((r) => r.days.includes(day))
}

export type OpenStatus =
  { open: true; closesAt: string } | { open: false; opensAt: string | null; opensToday: boolean }

export function getOpenStatus(date: Date = new Date()): OpenStatus {
  const { weekday, minutes } = nowInGymTimezone(date)
  const today = ruleForDay(weekday)

  if (today && minutes >= toMinutes(today.opens) && minutes < toMinutes(today.closes)) {
    return { open: true, closesAt: formatHour(today.closes) }
  }
  if (today && minutes < toMinutes(today.opens)) {
    return { open: false, opensAt: formatHour(today.opens), opensToday: true }
  }
  const tomorrow = ruleForDay(((weekday + 1) % 7) as Weekday)
  return { open: false, opensAt: tomorrow ? formatHour(tomorrow.opens) : null, opensToday: false }
}
