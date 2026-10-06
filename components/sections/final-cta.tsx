import { ArrowUpRight } from 'lucide-react'
import { ButtonLink } from '@/components/ui/button-link'
import { Container } from '@/components/ui/container'
import { site } from '@/content/site'
import { whatsappUrl } from '@/lib/whatsapp'

export function FinalCta({
  message,
  location = 'final_cta',
}: {
  message?: string
  location?: string
}) {
  return (
    <section
      aria-labelledby="cta-final-title"
      className="relative overflow-hidden bg-volt py-20 text-on-volt sm:py-28"
    >
      <span
        aria-hidden="true"
        className="display pointer-events-none absolute -right-6 -bottom-10 text-[12rem] whitespace-nowrap text-on-volt/[0.06] sm:text-[20rem]"
      >
        Fitness Club
      </span>
      <Container className="relative">
        <h2 id="cta-final-title" className="display max-w-4xl text-[clamp(3.25rem,13vw,9rem)]">
          Bora treinar?
        </h2>
        <p className="mt-6 max-w-xl text-lg font-medium text-on-volt/80">
          Seu próximo nível começa com uma decisão. Agende sua aula experimental e venha conhecer a
          Fitness Club.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <ButtonLink
            href={whatsappUrl(message)}
            variant="dark"
            size="lg"
            event="cta_trial_click"
            eventParams={{ location }}
          >
            {site.trialCta}
            <ArrowUpRight className="size-5" aria-hidden="true" />
          </ButtonLink>
          <ButtonLink href="/#planos" variant="light" size="lg">
            Ver planos
          </ButtonLink>
        </div>
      </Container>
    </section>
  )
}
