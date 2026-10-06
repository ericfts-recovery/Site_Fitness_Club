import { Quote, Star } from 'lucide-react'
import { TrackedLink } from '@/components/analytics/tracked-link'
import { Container } from '@/components/ui/container'
import { SectionHeading } from '@/components/ui/section-heading'
import { testimonials } from '@/content/home'
import { site } from '@/content/site'

export function Testimonials() {
  if (testimonials.length === 0) return null

  return (
    <section aria-labelledby="depoimentos-title" className="bg-bone py-20 text-ink sm:py-28">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <SectionHeading
            id="depoimentos-title"
            tone="light"
            eyebrow="Quem treina, recomenda"
            title="A palavra de quem faz parte"
            className="lg:col-span-8"
          />
          <div className="flex items-center gap-5 lg:col-span-4 lg:justify-end">
            <span className="display text-8xl">{site.rating.value}</span>
            <span>
              <span className="flex text-ink" aria-hidden="true">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star key={i} className="size-5 fill-current" />
                ))}
              </span>
              <span className="mt-1 block text-sm text-ink/70">
                Nota no {site.rating.source}
                <br />
                {site.rating.reviews}
              </span>
            </span>
          </div>
        </div>

        <ul className="mt-14 grid gap-4 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <li
              key={`${t.name}-${i}`}
              className="reveal flex flex-col rounded-[var(--radius-xl)] bg-white p-8"
            >
              <Quote className="size-8 text-ink/20" aria-hidden="true" />
              <blockquote className="mt-5 flex-1 text-lg font-medium">“{t.quote}”</blockquote>
              <footer className="mt-8 border-t border-ink/10 pt-5">
                <p className="font-extrabold">{t.name}</p>
                <p className="text-sm text-ink/60">{t.detail}</p>
              </footer>
            </li>
          ))}
        </ul>

        <p className="mt-10 text-center">
          <TrackedLink
            href={site.googleBusinessUrl}
            event="cta_directions_click"
            params={{ location: 'testimonials_reviews' }}
            className="inline-flex min-h-11 items-center font-bold underline underline-offset-4 hover:text-ink/70"
          >
            Ver avaliações no Google
          </TrackedLink>
        </p>
      </Container>
    </section>
  )
}
