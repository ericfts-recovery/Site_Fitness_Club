import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowUpRight, Check, Gauge, Users } from 'lucide-react'
import { PageHero } from '@/components/layout/page-hero'
import { JsonLd } from '@/components/seo/json-ld'
import { Faq } from '@/components/sections/faq'
import { FinalCta } from '@/components/sections/final-cta'
import { ButtonLink } from '@/components/ui/button-link'
import { Container } from '@/components/ui/container'
import { PhotoSlot } from '@/components/ui/photo-slot'
import { getModality, modalities } from '@/content/modalities'
import { site } from '@/content/site'
import { breadcrumbJsonLd, buildMetadata, faqJsonLd, serviceJsonLd } from '@/lib/seo'
import { whatsappMessageForModality, whatsappUrl } from '@/lib/whatsapp'

interface ModalityPageProps {
  params: Promise<{ slug: string }>
}

export const dynamicParams = false

export function generateStaticParams() {
  return modalities.map((m) => ({ slug: m.slug }))
}

export async function generateMetadata({ params }: ModalityPageProps): Promise<Metadata> {
  const { slug } = await params
  const modality = getModality(slug)
  if (!modality) return {}
  return buildMetadata({
    title: modality.seo.title,
    description: modality.seo.description,
    path: `/modalidades/${modality.slug}`,
  })
}

export default async function ModalityPage({ params }: ModalityPageProps) {
  const { slug } = await params
  const modality = getModality(slug)
  if (!modality) notFound()

  const path = `/modalidades/${modality.slug}`
  const crumbs = [
    { name: 'Início', path: '/' },
    { name: 'Modalidades', path: '/modalidades' },
    { name: modality.name, path },
  ]
  const message = whatsappMessageForModality(modality.name)
  const others = modalities.filter((m) => m.slug !== modality.slug)

  return (
    <>
      <PageHero
        eyebrow={modality.tagline}
        title={
          <>
            {modality.name} <span className="text-outline text-volt">em Canoas</span>
          </>
        }
        description={modality.summary}
        breadcrumbs={crumbs}
      >
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <ButtonLink
            href={whatsappUrl(message)}
            size="lg"
            event="cta_trial_click"
            eventParams={{ location: 'modality_hero', modality: modality.slug }}
          >
            {site.trialCta}
            <ArrowUpRight className="size-5" aria-hidden="true" />
          </ButtonLink>
        </div>
      </PageHero>

      <section aria-labelledby="sobre-title" className="py-20 sm:py-28">
        <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <h2 id="sobre-title" className="display text-5xl sm:text-6xl">
              Como é a aula
            </h2>
            <div className="mt-6 space-y-5 text-lg text-mute">
              {modality.description.map((paragraph) => (
                <p key={paragraph.slice(0, 32)}>{paragraph}</p>
              ))}
            </div>

            <h3 className="mt-12 text-2xl font-extrabold">Benefícios</h3>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {modality.benefits.map((benefit) => (
                <li
                  key={benefit}
                  className="flex gap-3 rounded-[var(--radius-md)] border border-line bg-ink-2 p-4"
                >
                  <Check className="mt-0.5 size-5 shrink-0 text-volt" aria-hidden="true" />
                  {benefit}
                </li>
              ))}
            </ul>
          </div>

          <aside className="space-y-4 lg:col-span-5">
            <PhotoSlot
              image={modality.image}
              hint={`aula de ${modality.name.toLowerCase()} na Fitness Club · 1200×900`}
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="aspect-[4/3] rounded-[var(--radius-xl)] border border-line"
            />
            <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              <div className="rounded-[var(--radius-lg)] border border-line bg-ink-2 p-6">
                <dt className="flex items-center gap-2 text-sm text-mute">
                  <Gauge className="size-4 text-volt" aria-hidden="true" /> Intensidade
                </dt>
                <dd className="mt-2 font-display text-3xl uppercase">{modality.intensity}</dd>
              </div>
              <div className="rounded-[var(--radius-lg)] border border-line bg-ink-2 p-6">
                <dt className="flex items-center gap-2 text-sm text-mute">
                  <Users className="size-4 text-volt" aria-hidden="true" /> Para quem é
                </dt>
                <dd className="mt-2">{modality.forWho}</dd>
              </div>
            </dl>
            <p className="text-sm text-mute">
              Antes de iniciar qualquer atividade física, converse com a equipe sobre seu histórico
              de saúde. Em caso de condição médica, procure orientação do seu médico.
            </p>
          </aside>
        </Container>
      </section>

      <Faq items={modality.faq} title={`Dúvidas sobre ${modality.name.toLowerCase()}`} />

      <section aria-labelledby="outras-title" className="pb-20 sm:pb-28">
        <Container>
          <h2 id="outras-title" className="eyebrow text-volt">
            Outras modalidades
          </h2>
          <ul className="mt-6 flex flex-wrap gap-2.5">
            {others.map((m) => (
              <li key={m.slug}>
                <Link
                  href={`/modalidades/${m.slug}`}
                  className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line-strong px-5 font-semibold transition-colors hover:border-volt hover:text-volt"
                >
                  {m.name}
                  <ArrowUpRight className="size-4" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <FinalCta message={message} location={`modality_${modality.slug}`} />

      <JsonLd
        data={[
          breadcrumbJsonLd(crumbs),
          serviceJsonLd(modality.name, modality.seo.description, path),
          faqJsonLd(modality.faq),
        ]}
      />
    </>
  )
}
