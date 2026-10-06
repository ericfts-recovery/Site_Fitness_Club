import type { ReactNode } from 'react'
import { Breadcrumbs, type Crumb } from '@/components/ui/breadcrumbs'
import { Container } from '@/components/ui/container'

interface PageHeroProps {
  eyebrow: string
  title: ReactNode
  description?: ReactNode
  breadcrumbs: Crumb[]
  children?: ReactNode
  size?: 'lg' | 'md'
}

/** Cabeçalho padrão das páginas internas (contém o único H1 da página). */
export function PageHero({
  eyebrow,
  title,
  description,
  breadcrumbs,
  children,
  size = 'lg',
}: PageHeroProps) {
  return (
    <section className="grain relative isolate overflow-hidden border-b border-line pt-[4.5rem]">
      <div
        aria-hidden="true"
        className="bg-grid absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_top_left,black_5%,transparent_65%)]"
      />
      <div
        aria-hidden="true"
        className="absolute -top-80 -left-80 -z-10 size-[56rem] bg-[radial-gradient(circle,rgb(212_255_58/0.14),transparent_65%)]"
      />
      <Container className="pt-8 pb-16 sm:pb-20">
        <Breadcrumbs items={breadcrumbs} />
        <p className="eyebrow mt-10 text-volt">{eyebrow}</p>
        <h1
          className={`display mt-4 max-w-5xl ${size === 'lg' ? 'text-[clamp(3rem,12vw,8rem)]' : 'text-[clamp(2.6rem,9vw,5.5rem)]'}`}
        >
          {title}
        </h1>
        {description ? (
          <p className="mt-6 max-w-2xl text-lg text-mute sm:text-xl">{description}</p>
        ) : null}
        {children}
      </Container>
    </section>
  )
}
