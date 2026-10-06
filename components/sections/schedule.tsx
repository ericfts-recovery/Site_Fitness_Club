import { ArrowUpRight } from 'lucide-react'
import { ButtonLink } from '@/components/ui/button-link'
import { Container } from '@/components/ui/container'
import { PhotoSlot } from '@/components/ui/photo-slot'
import { SectionHeading } from '@/components/ui/section-heading'
import { modalities } from '@/content/modalities'
import { site } from '@/content/site'
import { whatsappUrl } from '@/lib/whatsapp'
import { HoursTable } from './hours-table'

const groupClasses = modalities.filter((m) => m.slug !== 'musculacao')

export function Schedule() {
  return (
    <section id="horarios" aria-labelledby="horarios-title" className="py-20 sm:py-28">
      <Container className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <SectionHeading
            id="horarios-title"
            eyebrow="Horários"
            title="Aberto das 5h às 23h"
            description="Treine antes do trabalho, no almoço ou depois do expediente. Também abrimos aos fins de semana."
          />
          <div className="mt-10">
            <HoursTable />
            <p className="mt-4 text-sm text-mute">{site.holidayNote}</p>
          </div>
        </div>

        <div className="relative flex flex-col justify-between overflow-hidden rounded-[var(--radius-xl)] border border-line bg-ink-2 p-8 sm:p-10">
          <div
            aria-hidden="true"
            className="absolute -right-40 -bottom-40 size-[28rem] bg-[radial-gradient(circle,rgb(207_30_59/0.12),transparent_65%)]"
          />
          <div className="relative">
            <h3 className="display text-4xl sm:text-5xl">Aulas coletivas</h3>
            <p className="mt-4 text-mute">
              Turmas em diferentes horários ao longo da semana. Peça a grade atualizada e reserve
              sua vaga.
            </p>
            <ul className="mt-8 flex flex-wrap gap-2">
              {groupClasses.map((m) => (
                <li
                  key={m.slug}
                  className="rounded-full border border-line-strong px-4 py-2 text-sm font-semibold"
                >
                  {m.name}
                </li>
              ))}
            </ul>
          </div>
          <PhotoSlot
            image={null}
            hint="turma em aula coletiva · 1200×675"
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="relative mt-8 aspect-video rounded-[var(--radius-lg)]"
          />
          <ButtonLink
            href={whatsappUrl(
              'Olá! Vim pelo site e gostaria de receber a grade de horários das aulas coletivas.',
            )}
            event="cta_whatsapp_click"
            eventParams={{ location: 'schedule' }}
            className="relative mt-8 w-full sm:w-auto sm:self-start"
          >
            Pedir a grade no WhatsApp
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </ButtonLink>
        </div>
      </Container>
    </section>
  )
}
