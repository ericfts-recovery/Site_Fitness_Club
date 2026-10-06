import { Container } from '@/components/ui/container'
import { PhotoSlot } from '@/components/ui/photo-slot'
import { SectionHeading } from '@/components/ui/section-heading'
import { differentials } from '@/content/home'

export function Differentials() {
  return (
    <section aria-labelledby="diferenciais-title" className="bg-bone py-20 text-ink sm:py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
          <SectionHeading
            id="diferenciais-title"
            tone="light"
            eyebrow="Por que a Fitness Club"
            title={
              <>
                Muito além
                <br />
                dos aparelhos
              </>
            }
            description="Estrutura diferenciada na região, atenção de verdade e a melhor didática. Tudo para você criar o hábito e evoluir no seu ritmo."
            className="lg:col-span-7"
          />
          <PhotoSlot
            image={null}
            hint="professor orientando aluno · horizontal 1600×1000"
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="aspect-[16/10] rounded-[var(--radius-xl)] lg:col-span-5"
          />
        </div>

        <ul className="mt-14 grid gap-px overflow-hidden rounded-[var(--radius-xl)] border border-ink/10 bg-ink/10 sm:grid-cols-2 lg:grid-cols-4">
          {differentials.map(({ icon: Icon, title, text }) => (
            <li
              key={title}
              className="reveal group bg-bone p-7 transition-colors duration-300 hover:bg-white sm:p-8"
            >
              <span className="grid size-12 place-items-center rounded-full bg-ink text-volt transition-transform duration-300 group-hover:-rotate-12">
                <Icon className="size-6" aria-hidden="true" />
              </span>
              <h3 className="mt-6 text-xl font-extrabold">{title}</h3>
              <p className="mt-2 text-ink/70">{text}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
