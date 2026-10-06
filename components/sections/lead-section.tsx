import { CalendarCheck, MessageCircle, Sparkles } from 'lucide-react'
import { LazyLeadForm } from '@/components/forms/lazy-lead-form'
import { Container } from '@/components/ui/container'
import { SectionHeading } from '@/components/ui/section-heading'
import { modalities } from '@/content/modalities'

const steps = [
  { icon: MessageCircle, title: 'Você deixa seu contato', text: 'Leva menos de 30 segundos.' },
  {
    icon: CalendarCheck,
    title: 'A recepção te chama',
    text: 'Combinamos dia, horário e modalidade.',
  },
  { icon: Sparkles, title: 'Você vem treinar', text: 'Conhece a estrutura, a equipe e a turma.' },
]

export function LeadSection() {
  return (
    <section
      id="contato"
      aria-labelledby="contato-title"
      className="grain relative isolate overflow-hidden border-y border-line bg-ink-2 py-20 sm:py-28"
    >
      <div
        aria-hidden="true"
        className="absolute -top-80 -right-80 -z-10 size-[64rem] bg-[radial-gradient(circle,rgb(207_30_59/0.1),transparent_65%)]"
      />
      <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <SectionHeading
            id="contato-title"
            eyebrow="Aula experimental"
            title={
              <>
                Venha <span className="text-outline text-volt">sentir</span> a energia
              </>
            }
            description="Agende uma aula experimental e descubra por que tanta gente escolheu treinar na Fitness Club."
          />
          <ol className="mt-10 space-y-6">
            {steps.map(({ icon: Icon, title, text }, i) => (
              <li key={title} className="flex gap-4">
                <span className="grid size-12 shrink-0 place-items-center rounded-full border border-line-strong text-volt">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <span>
                  <span className="block font-bold">
                    <span className="text-volt">{i + 1}.</span> {title}
                  </span>
                  <span className="text-mute">{text}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>

        <div className="rounded-[var(--radius-xl)] border border-line-strong bg-ink p-6 sm:p-10 lg:col-span-7">
          <LazyLeadForm modalityOptions={modalities.map((m) => m.name)} />
        </div>
      </Container>
    </section>
  )
}
