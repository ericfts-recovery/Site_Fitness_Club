import { Check } from 'lucide-react'
import { ButtonLink } from '@/components/ui/button-link'
import { Container } from '@/components/ui/container'
import { SectionHeading } from '@/components/ui/section-heading'
import { plans } from '@/content/home'
import { cn } from '@/lib/cn'
import { whatsappUrl } from '@/lib/whatsapp'

export function Plans() {
  return (
    <section id="planos" aria-labelledby="planos-title" className="py-20 sm:py-28">
      <Container>
        <SectionHeading
          id="planos-title"
          align="center"
          eyebrow="Planos"
          title="Um plano para cada rotina"
          description="Escolha o período que combina com você. Tire suas dúvidas com a recepção pelo WhatsApp."
        />

        <ul className="mt-14 grid gap-4 lg:grid-cols-3 lg:items-stretch">
          {plans.map((plan) => {
            const featured = Boolean(plan.highlight)
            return (
              <li
                key={plan.id}
                className={cn(
                  'reveal relative flex flex-col rounded-[var(--radius-xl)] border p-8 sm:p-10',
                  featured
                    ? 'border-volt bg-volt text-on-volt lg:-my-4 lg:py-14'
                    : 'border-line bg-ink-2',
                )}
              >
                {plan.highlight ? (
                  <span className="absolute -top-3.5 left-8 rounded-full bg-ink px-4 py-1.5 text-xs font-bold tracking-widest text-volt uppercase">
                    {plan.highlight}
                  </span>
                ) : null}
                <h3 className="eyebrow">{plan.name}</h3>
                <p className="mt-5 flex items-baseline gap-1">
                  <span className="display text-6xl">{plan.price}</span>
                  <span className={featured ? 'text-on-volt/70' : 'text-mute'}>{plan.period}</span>
                </p>
                <ul className="mt-8 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex gap-3">
                      <Check
                        className={cn(
                          'mt-0.5 size-5 shrink-0',
                          featured ? 'text-on-volt' : 'text-volt',
                        )}
                        aria-hidden="true"
                      />
                      <span className={featured ? 'text-on-volt/85' : 'text-mute'}>{feature}</span>
                    </li>
                  ))}
                </ul>
                <ButtonLink
                  href={whatsappUrl(
                    `Olá! Vim pelo site e quero saber mais sobre o plano ${plan.name} da Fitness Club.`,
                  )}
                  variant={featured ? 'dark' : 'secondary'}
                  event="cta_whatsapp_click"
                  eventParams={{ location: 'plans', plan: plan.id }}
                  className="mt-10 w-full"
                >
                  Quero o plano {plan.name}
                </ButtonLink>
              </li>
            )
          })}
        </ul>

        <p className="mt-10 text-center text-mute">
          Tem <strong className="text-bone">Wellhub (Gympass)</strong>? Você já pode treinar aqui a
          partir do plano Silver.
        </p>
      </Container>
    </section>
  )
}
