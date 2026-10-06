import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

interface SectionHeadingProps {
  eyebrow: string
  title: ReactNode
  description?: ReactNode
  align?: 'left' | 'center'
  tone?: 'dark' | 'light'
  className?: string
  id?: string
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  tone = 'dark',
  className,
  id,
}: SectionHeadingProps) {
  const light = tone === 'light'
  return (
    <div className={cn('max-w-3xl', align === 'center' && 'mx-auto text-center', className)}>
      <p
        className={cn(
          'eyebrow mb-4 inline-flex items-center gap-3',
          light ? 'text-ink/70' : 'text-volt',
        )}
      >
        <span aria-hidden="true" className={cn('h-px w-8', light ? 'bg-ink/40' : 'bg-volt')} />
        {eyebrow}
      </p>
      <h2
        id={id}
        className={cn(
          'display text-[2.75rem] sm:text-6xl lg:text-7xl',
          light ? 'text-ink' : 'text-bone',
        )}
      >
        {title}
      </h2>
      {description ? (
        <p className={cn('mt-5 text-lg', light ? 'text-ink/75' : 'text-mute')}>{description}</p>
      ) : null}
    </div>
  )
}
