import { ArrowDown, ArrowUpRight, Clock, Star } from 'lucide-react'
import { ButtonLink } from '@/components/ui/button-link'
import { Container } from '@/components/ui/container'
import { PhotoSlot } from '@/components/ui/photo-slot'
import { heroContent } from '@/content/home'
import { site } from '@/content/site'
import { formatHour, ruleForDay } from '@/lib/hours'
import { whatsappUrl } from '@/lib/whatsapp'
import { OpenStatusBadge } from './open-status-badge'

const MONDAY = 1
const weekdayRule = ruleForDay(MONDAY)
const weekdayHours = weekdayRule
  ? `${weekdayRule.label}: ${formatHour(weekdayRule.opens)} às ${formatHour(weekdayRule.closes)}`
  : site.holidayNote

export function Hero() {
  const [line1, line2, line3] = heroContent.titleLines

  return (
    <section
      aria-labelledby="hero-title"
      className="grain relative isolate overflow-hidden pt-[4.5rem]"
    >
      <div
        aria-hidden="true"
        className="bg-grid absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_top_left,black_10%,transparent_70%)]"
      />
      <div
        aria-hidden="true"
        className="absolute -top-72 -left-72 -z-10 size-[60rem] bg-[radial-gradient(circle,rgb(207_30_59/0.16),transparent_65%)]"
      />

      <Container className="grid items-center gap-12 pt-10 pb-16 sm:pt-16 lg:grid-cols-12 lg:gap-8 lg:pt-20 lg:pb-24">
        <div className="lg:col-span-7">
          <OpenStatusBadge fallback={weekdayHours} className="mb-7" />

          <h1 id="hero-title">
            <span className="eyebrow mb-5 block text-volt">{heroContent.eyebrow}</span>
            <span className="display block text-[clamp(3.1rem,16.5vw,7rem)] lg:text-[5.6rem] xl:text-[7rem]">
              {line1}
            </span>
            <span className="display text-outline block text-[clamp(3.1rem,16.5vw,7rem)] text-volt lg:text-[5.6rem] xl:text-[7rem]">
              {line2}
            </span>
            <span className="display block text-[clamp(3.1rem,16.5vw,7rem)] lg:text-[5.6rem] xl:text-[7rem]">
              {line3}
            </span>
          </h1>

          <p className="mt-7 max-w-xl text-lg text-mute sm:text-xl">{heroContent.subtitle}</p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ButtonLink
              href={whatsappUrl()}
              size="lg"
              event="cta_trial_click"
              eventParams={{ location: 'hero' }}
            >
              {site.trialCta}
              <ArrowUpRight
                className="size-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </ButtonLink>
            <ButtonLink href="#modalidades" size="lg" variant="secondary">
              Ver modalidades
              <ArrowDown
                className="size-5 transition-transform group-hover:translate-y-0.5"
                aria-hidden="true"
              />
            </ButtonLink>
          </div>

          <ul className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-mute">
            <li className="flex items-center gap-2">
              <span className="flex text-volt" aria-hidden="true">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star key={i} className="size-4 fill-current" />
                ))}
              </span>
              <span>
                <strong className="text-bone">{site.rating.value}</strong> no {site.rating.source} ·{' '}
                {site.rating.reviews}
              </span>
            </li>
            <li className="flex items-center gap-2">
              <span aria-hidden="true" className="size-1.5 rounded-full bg-mute-dark" />
              Aceitamos Wellhub
            </li>
            <li className="flex items-center gap-2">
              <span aria-hidden="true" className="size-1.5 rounded-full bg-mute-dark" />
              Estacionamento próprio
            </li>
          </ul>
        </div>

        <div className="relative lg:col-span-5">
          <PhotoSlot
            image={null}
            hint="aluno treinando na área de musculação · vertical 1200×1500"
            priority
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="aspect-[4/5] rounded-[var(--radius-xl)] border border-line"
          />
          {weekdayRule ? (
            <div className="absolute -bottom-5 left-4 flex items-center gap-3 rounded-[var(--radius-md)] border border-line-strong bg-ink-2 p-4 shadow-2xl sm:-left-6">
              <span className="grid size-11 place-items-center rounded-full bg-volt text-ink">
                <Clock className="size-5" aria-hidden="true" />
              </span>
              <span className="leading-tight">
                <span className="block font-display text-2xl tracking-wide uppercase">
                  {formatHour(weekdayRule.opens)} — {formatHour(weekdayRule.closes)}
                </span>
                <span className="text-xs text-mute">{weekdayRule.label}</span>
              </span>
            </div>
          ) : null}
          <div className="absolute top-5 right-4 rotate-3 rounded-full bg-ember px-4 py-2 text-xs font-bold tracking-widest text-ink uppercase shadow-xl sm:-right-4">
            Nutricionista no local
          </div>
        </div>
      </Container>
    </section>
  )
}
