import { Container } from '@/components/ui/container'
import { PhotoSlot } from '@/components/ui/photo-slot'
import { SectionHeading } from '@/components/ui/section-heading'
import { amenities } from '@/content/home'

export function Structure() {
  return (
    <section
      id="estrutura"
      aria-labelledby="estrutura-title"
      className="border-y border-line bg-ink-2 py-20 sm:py-28"
    >
      <Container>
        <SectionHeading
          id="estrutura-title"
          eyebrow="Estrutura"
          title="Tudo o que você precisa, num só lugar"
          description="Ambiente climatizado, áreas separadas para cada tipo de treino e comodidades que facilitam a sua rotina."
        />

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-[16rem_16rem]">
          <PhotoSlot
            image={null}
            hint="visão geral do salão de musculação · 1600×1200"
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="reveal aspect-[4/3] rounded-[var(--radius-xl)] sm:col-span-2 lg:row-span-2 lg:aspect-auto"
          />
          <PhotoSlot
            image={null}
            hint="área de cardio · 1000×800"
            sizes="(min-width: 1024px) 25vw, 50vw"
            className="reveal aspect-[5/4] rounded-[var(--radius-xl)] lg:aspect-auto"
          />
          <PhotoSlot
            image={null}
            hint="sala de aulas coletivas · 1000×800"
            sizes="(min-width: 1024px) 25vw, 50vw"
            className="reveal aspect-[5/4] rounded-[var(--radius-xl)] lg:aspect-auto"
          />
          <PhotoSlot
            image={null}
            hint="área infantil · 1600×800"
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="reveal aspect-[2/1] rounded-[var(--radius-xl)] sm:col-span-2 lg:aspect-auto"
          />
        </div>

        <ul className="mt-10 flex flex-wrap gap-2.5">
          {amenities.map(({ icon: Icon, label }) => (
            <li
              key={label}
              className="inline-flex min-h-11 items-center gap-2.5 rounded-full border border-line-strong bg-ink px-4 text-sm font-semibold"
            >
              <Icon className="size-4 text-volt" aria-hidden="true" />
              {label}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
