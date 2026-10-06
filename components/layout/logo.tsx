import Link from 'next/link'
import { cn } from '@/lib/cn'

/** Wordmark provisório. Substituir pelo logo oficial (SVG) quando o cliente enviar. */
export function Logo({
  className,
  tone = 'dark',
}: {
  className?: string
  tone?: 'dark' | 'light'
}) {
  return (
    <Link href="/" className={cn('group inline-flex min-h-11 items-center gap-2.5', className)}>
      <span
        aria-hidden="true"
        className="grid size-9 place-items-center rounded-md bg-volt font-display text-xl text-ink transition-transform duration-300 group-hover:-rotate-6"
      >
        F
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            'font-display text-xl tracking-wide uppercase',
            tone === 'light' ? 'text-ink' : 'text-bone',
          )}
        >
          Fitness Club
        </span>{' '}
        <span
          className={cn(
            'text-[0.65rem] font-bold tracking-[0.35em] uppercase',
            tone === 'light' ? 'text-ink/60' : 'text-mute',
          )}
        >
          Canoas
        </span>
      </span>
    </Link>
  )
}
