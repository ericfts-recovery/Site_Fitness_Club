import { JsonLd } from '@/components/seo/json-ld'
import { Differentials } from '@/components/sections/differentials'
import { Faq } from '@/components/sections/faq'
import { FinalCta } from '@/components/sections/final-cta'
import { Hero } from '@/components/sections/hero'
import { LeadSection } from '@/components/sections/lead-section'
import { Location } from '@/components/sections/location'
import { Modalities } from '@/components/sections/modalities'
import { ModalitiesMarquee } from '@/components/sections/modalities-marquee'
import { Plans } from '@/components/sections/plans'
import { Schedule } from '@/components/sections/schedule'
import { Stats } from '@/components/sections/stats'
import { Structure } from '@/components/sections/structure'
import { Testimonials } from '@/components/sections/testimonials'
import { homeFaq } from '@/content/home'
import { buildMetadata, faqJsonLd } from '@/lib/seo'

export const metadata = buildMetadata({
  title: 'Academia em Canoas | Fitness Club – Av. Boqueirão',
  description:
    'Musculação, funcional, jump, fit dance e bike na Fitness Club, academia em Canoas (Estância Velha). Aberta das 5h às 23h. Agende sua aula experimental.',
  path: '/',
  absoluteTitle: true,
})

export default function HomePage() {
  return (
    <>
      <Hero />
      <ModalitiesMarquee />
      <Stats />
      <Differentials />
      <Modalities />
      <Structure />
      <Plans />
      <Testimonials />
      <Schedule />
      <LeadSection />
      <Faq items={homeFaq} />
      <Location />
      <FinalCta />
      <JsonLd data={faqJsonLd(homeFaq)} />
    </>
  )
}
