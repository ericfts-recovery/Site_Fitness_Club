import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { Container } from '@/components/ui/container'
import { SectionHeading } from '@/components/ui/section-heading'
import { modalities } from '@/content/modalities'

export function Modalities() {
  return (
    <section id="modalidades" aria-labelledby="modalidades-title" className="py-20 sm:py-28">
      <Container>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            id="modalidades-title"
            eyebrow="Modalidades"
            title={
              <>
                Escolha seu jeito <span className="text-outline text-volt">de treinar</span>
              </>
            }
            description="Da musculação às aulas coletivas com música: combine modalidades e mantenha a motivação lá em cima."
          />
        </div>

        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {modalities.map((m, i) => {
            const Icon = m.icon
            return (
              <li key={m.slug} className="reveal">
                <Link
                  href={`/modalidades/${m.slug}`}
                  className="group relative flex h-full min-h-80 flex-col overflow-hidden rounded-[var(--radius-xl)] border border-line bg-ink-2 p-7 transition-all duration-500 ease-snap hover:-translate-y-1 hover:border-volt hover:bg-volt hover:text-ink sm:p-8"
                >
                  <div className="flex items-start justify-between">
                    <span className="grid size-14 place-items-center rounded-full border border-line-strong text-volt transition-colors duration-500 group-hover:border-ink/20 group-hover:text-ink">
                      <Icon className="size-6" aria-hidden="true" />
                    </span>
                    <span
                      aria-hidden="true"
                      className="font-display text-5xl text-ink-3 transition-colors duration-500 group-hover:text-ink/15"
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <div className="mt-auto pt-10">
                    <p className="text-xs font-bold tracking-[0.2em] text-volt uppercase transition-colors duration-500 group-hover:text-ink/60">
                      {m.tagline}
                    </p>
                    <h3 className="display mt-3 text-5xl">{m.name}</h3>
                    <p className="mt-3 text-mute transition-colors duration-500 group-hover:text-ink/75">
                      {m.summary}
                    </p>
                    <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold tracking-wide uppercase">
                      Saiba mais
                      <ArrowUpRight
                        className="size-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                        aria-hidden="true"
                      />
                    </span>
                  </div>
                </Link>
              </li>
            )
          })}
        </ul>
      </Container>
    </section>
  )
}
