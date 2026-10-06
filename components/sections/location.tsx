import { Navigation, Phone } from 'lucide-react'
import { ButtonLink } from '@/components/ui/button-link'
import { Container } from '@/components/ui/container'
import { SectionHeading } from '@/components/ui/section-heading'
import { site } from '@/content/site'
import { mapsDirectionsUrl, mapsEmbedUrl, phoneUrl } from '@/lib/whatsapp'

export function Location() {
  return (
    <section id="localizacao" aria-labelledby="localizacao-title" className="pb-20 sm:pb-28">
      <Container>
        <div className="grid overflow-hidden rounded-[var(--radius-xl)] border border-line lg:grid-cols-12">
          <div className="flex flex-col justify-between gap-10 bg-ink-2 p-8 sm:p-10 lg:col-span-5">
            <div>
              <SectionHeading
                id="localizacao-title"
                eyebrow="Localização"
                title="Fácil de chegar"
              />
              <address className="mt-8 text-lg not-italic">
                <strong className="block text-bone">{site.name}</strong>
                <span className="text-mute">
                  {site.address.street}
                  <br />
                  {site.address.neighborhood}, {site.address.city}/{site.address.state}
                  <br />
                  CEP {site.address.postalCode}
                </span>
              </address>
              <p className="mt-5 text-mute">Estacionamento no local para alunos.</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
              <ButtonLink
                href={mapsDirectionsUrl}
                event="cta_directions_click"
                eventParams={{ location: 'location' }}
              >
                <Navigation className="size-4" aria-hidden="true" />
                Como chegar
              </ButtonLink>
              <ButtonLink
                href={phoneUrl}
                variant="secondary"
                event="cta_phone_click"
                eventParams={{ location: 'location' }}
              >
                <Phone className="size-4" aria-hidden="true" />
                {site.phone.display}
              </ButtonLink>
            </div>
          </div>
          <div className="relative aspect-[4/3] bg-ink-3 lg:col-span-7 lg:aspect-auto lg:min-h-[28rem]">
            <iframe
              src={mapsEmbedUrl}
              title={`Mapa: ${site.name}, ${site.address.street}, ${site.address.city}`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 h-full w-full border-0 contrast-[0.9] grayscale-[0.9] hue-rotate-180 invert-[0.92]"
            />
          </div>
        </div>
      </Container>
    </section>
  )
}
