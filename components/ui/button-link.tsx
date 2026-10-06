import Link from 'next/link'
import type { ReactNode } from 'react'
import { TrackedLink } from '@/components/analytics/tracked-link'
import type { AnalyticsEvent, AnalyticsParams } from '@/lib/analytics'
import { cn } from '@/lib/cn'

const variants = {
  primary:
    'bg-volt text-ink hover:bg-bone shadow-[0_0_0_0_rgb(207_30_59/0)] hover:shadow-[0_10px_40px_-10px_rgb(207_30_59/0.6)]',
  secondary: 'border border-line-strong text-bone hover:border-bone hover:bg-bone hover:text-ink',
  dark: 'bg-ink text-bone hover:bg-ink-3',
  light: 'border border-ink/20 text-ink hover:bg-ink hover:text-bone',
} as const

const sizes = {
  md: 'min-h-12 px-6 text-sm',
  lg: 'min-h-14 px-7 text-base',
} as const

export interface ButtonLinkProps {
  href: string
  children: ReactNode
  variant?: keyof typeof variants
  size?: keyof typeof sizes
  className?: string
  event?: AnalyticsEvent
  eventParams?: AnalyticsParams
  ariaLabel?: string
}

export const buttonBase =
  'group inline-flex items-center justify-center gap-2.5 rounded-full font-bold tracking-wide uppercase transition-all duration-300 ease-snap active:scale-[0.98]'

export function ButtonLink({
  href,
  children,
  variant = 'primary',
  size = 'md',
  className,
  event,
  eventParams,
  ariaLabel,
}: ButtonLinkProps) {
  const classes = cn(buttonBase, variants[variant], sizes[size], className)

  if (event) {
    return (
      <TrackedLink
        href={href}
        event={event}
        params={eventParams}
        className={classes}
        aria-label={ariaLabel}
      >
        {children}
      </TrackedLink>
    )
  }
  return (
    <Link href={href} className={classes} aria-label={ariaLabel}>
      {children}
    </Link>
  )
}
