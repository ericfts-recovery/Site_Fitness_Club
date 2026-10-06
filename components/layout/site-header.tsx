import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { ButtonLink } from '@/components/ui/button-link'
import { Container } from '@/components/ui/container'
import { navigation } from '@/content/home'
import { site } from '@/content/site'
import { whatsappUrl } from '@/lib/whatsapp'
import { Logo } from './logo'
import { MobileNav } from './mobile-nav'

export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Fundo com blur em camada própria: backdrop-filter no <header> prenderia o menu mobile (position: fixed) dentro dele. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 border-b border-line bg-ink/80 backdrop-blur-xl"
      />
      <Container className="relative flex h-[4.5rem] items-center justify-between gap-6">
        <Logo className="relative z-50" />

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="rounded-full px-4 py-2.5 text-sm font-semibold text-mute transition-colors hover:text-bone"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <ButtonLink
            href={whatsappUrl()}
            event="cta_trial_click"
            eventParams={{ location: 'header' }}
            className="hidden sm:inline-flex"
          >
            {site.trialCta}
            <ArrowUpRight
              className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </ButtonLink>
          <MobileNav />
        </div>
      </Container>
    </header>
  )
}
