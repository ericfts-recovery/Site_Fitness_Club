import Link from 'next/link'
import { Clock, MapPin, Phone } from 'lucide-react'
import { TrackedLink } from '@/components/analytics/tracked-link'
import { CookiePreferencesButton } from '@/components/analytics/cookie-preferences-button'
import { InstagramIcon, WhatsappIcon } from '@/components/ui/brand-icons'
import { Container } from '@/components/ui/container'
import { navigation } from '@/content/home'
import { modalities } from '@/content/modalities'
import { site } from '@/content/site'
import { formatHour } from '@/lib/hours'
import { mapsDirectionsUrl, phoneUrl, whatsappUrl } from '@/lib/whatsapp'
import { Logo } from './logo'

export function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-line bg-ink pb-28 md:pb-0">
      <Container className="grid grid-cols-2 gap-x-6 gap-y-12 py-16 lg:grid-cols-12 lg:py-20">
        <div className="col-span-2 lg:col-span-4">
          <Logo />
          <p className="mt-5 max-w-sm text-mute">{site.description}</p>
          <div className="mt-6 flex gap-3">
            <TrackedLink
              href={site.social.instagram}
              event="cta_instagram_click"
              params={{ location: 'footer' }}
              aria-label={`Instagram ${site.social.instagramHandle}`}
              className="grid size-11 place-items-center rounded-full border border-line-strong text-bone transition-colors hover:border-volt hover:text-volt"
            >
              <InstagramIcon className="size-5" />
            </TrackedLink>
            <TrackedLink
              href={whatsappUrl()}
              event="cta_whatsapp_click"
              params={{ location: 'footer' }}
              aria-label="WhatsApp da academia"
              className="grid size-11 place-items-center rounded-full border border-line-strong text-bone transition-colors hover:border-volt hover:text-volt"
            >
              <WhatsappIcon className="size-5" />
            </TrackedLink>
          </div>
        </div>

        <div className="lg:col-span-2">
          <h2 className="eyebrow text-bone">Navegação</h2>
          <ul className="mt-5 space-y-1">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="inline-flex min-h-11 items-center text-mute hover:text-volt"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-2">
          <h2 className="eyebrow text-bone">Modalidades</h2>
          <ul className="mt-5 space-y-1">
            {modalities.map((m) => (
              <li key={m.slug}>
                <Link
                  href={`/modalidades/${m.slug}`}
                  className="inline-flex min-h-11 items-center text-mute hover:text-volt"
                >
                  {m.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <address className="col-span-2 space-y-5 not-italic lg:col-span-4">
          <h2 className="eyebrow text-bone">Contato</h2>
          <TrackedLink
            href={mapsDirectionsUrl}
            event="cta_directions_click"
            params={{ location: 'footer' }}
            className="flex gap-3 text-mute hover:text-bone"
          >
            <MapPin className="mt-1 size-5 shrink-0 text-volt" aria-hidden="true" />
            <span>
              {site.address.street} · {site.address.neighborhood}
              <br />
              {site.address.city}/{site.address.state} · CEP {site.address.postalCode}
            </span>
          </TrackedLink>
          <TrackedLink
            href={phoneUrl}
            event="cta_phone_click"
            params={{ location: 'footer' }}
            className="flex min-h-11 items-center gap-3 text-mute hover:text-bone"
          >
            <Phone className="size-5 shrink-0 text-volt" aria-hidden="true" />
            {site.phone.display}
          </TrackedLink>
          <div className="flex gap-3 text-mute">
            <Clock className="mt-1 size-5 shrink-0 text-volt" aria-hidden="true" />
            <ul>
              {site.openingHours.map((rule) => (
                <li key={rule.label}>
                  {rule.label}: {formatHour(rule.opens)} às {formatHour(rule.closes)}
                </li>
              ))}
            </ul>
          </div>
        </address>
      </Container>

      <div className="border-t border-line">
        <Container className="flex flex-col gap-4 py-6 text-sm text-mute lg:flex-row lg:items-center lg:justify-between">
          <p>
            © {year} {site.name} · {site.legalName} · CNPJ {site.cnpj}
            <br className="sm:hidden" />
            <span className="hidden sm:inline"> · </span>
            Responsável técnico: {site.technicalLead.name} · {site.technicalLead.registry}
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-1">
            <Link
              href="/politica-de-privacidade"
              className="inline-flex min-h-11 items-center hover:text-volt"
            >
              Política de privacidade
            </Link>
            <CookiePreferencesButton />
          </div>
        </Container>
      </div>
    </footer>
  )
}
