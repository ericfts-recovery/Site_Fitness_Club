import { JsonLd } from '@/components/seo/json-ld'
import { PageHero } from '@/components/layout/page-hero'
import { FinalCta } from '@/components/sections/final-cta'
import { Modalities } from '@/components/sections/modalities'
import { breadcrumbJsonLd, buildMetadata } from '@/lib/seo'

const crumbs = [
  { name: 'Início', path: '/' },
  { name: 'Modalidades', path: '/modalidades' },
]

export const metadata = buildMetadata({
  title: 'Modalidades: musculação, jump, funcional e mais',
  description:
    'Conheça as modalidades da Fitness Club em Canoas: musculação, funcional, jump, fit dance, bike indoor e ritmos. Escolha a sua e agende uma aula experimental.',
  path: '/modalidades',
})

export default function ModalitiesPage() {
  return (
    <>
      <PageHero
        eyebrow="Modalidades"
        title="Treinos para todos os estilos"
        description="Musculação com acompanhamento e aulas coletivas cheias de energia. Combine modalidades e nunca caia na rotina."
        breadcrumbs={crumbs}
      />
      <Modalities />
      <FinalCta location="modalities_index" />
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
    </>
  )
}
