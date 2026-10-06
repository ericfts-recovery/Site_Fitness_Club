'use client'

import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { useEffect, useId, useRef, useState } from 'react'
import { TrackedLink } from '@/components/analytics/tracked-link'
import { WhatsappIcon } from '@/components/ui/brand-icons'
import { navigation } from '@/content/home'
import { site } from '@/content/site'
import { whatsappUrl } from '@/lib/whatsapp'

export function MobileNav() {
  const [open, setOpen] = useState(false)
  const panelId = useId()
  const firstLinkRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    if (!open) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    firstLinkRef.current?.focus()
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? 'Fechar menu' : 'Abrir menu'}
        className="relative z-50 grid size-11 place-items-center rounded-full border border-line-strong text-bone"
      >
        {open ? (
          <X className="size-5" aria-hidden="true" />
        ) : (
          <Menu className="size-5" aria-hidden="true" />
        )}
      </button>

      <nav
        id={panelId}
        aria-label="Menu principal"
        hidden={!open}
        className="fixed inset-0 z-40 flex-col overflow-y-auto bg-ink/98 px-5 pt-24 pb-10 backdrop-blur-lg [&:not([hidden])]:flex"
      >
        <ul className="flex flex-col">
          {navigation.map((item, index) => (
            <li key={item.href} className="border-b border-line">
              <Link
                ref={index === 0 ? firstLinkRef : undefined}
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex min-h-16 items-center justify-between font-display text-4xl text-bone uppercase transition-colors hover:text-volt"
              >
                {item.label}
                <span aria-hidden="true" className="text-base text-mute">
                  0{index + 1}
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <TrackedLink
          href={whatsappUrl()}
          event="cta_trial_click"
          params={{ location: 'mobile_menu' }}
          className="mt-auto flex min-h-14 items-center justify-center gap-2 rounded-full bg-volt font-bold tracking-wide text-ink uppercase"
        >
          <WhatsappIcon className="size-5" />
          {site.trialCta}
        </TrackedLink>
      </nav>
    </div>
  )
}
