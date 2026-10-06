'use client'

import Link from 'next/link'
import { useConsent } from '@/hooks/use-consent'
import { writeConsent } from '@/lib/consent'

export function CookieBanner() {
  const consent = useConsent()
  if (consent !== null) return null

  return (
    <section
      aria-label="Aviso de cookies"
      className="fixed inset-x-3 bottom-[5.5rem] z-50 mx-auto max-w-xl rounded-[var(--radius-lg)] border border-line-strong bg-ink-2/95 p-5 shadow-2xl backdrop-blur-xl md:bottom-6 md:left-6 md:mx-0"
    >
      <p className="text-sm text-mute">
        Usamos cookies essenciais para o site funcionar e, com a sua permissão, cookies de análise
        para entender como melhorar a sua experiência. Saiba mais na nossa{' '}
        <Link
          href="/politica-de-privacidade"
          className="font-semibold text-bone underline underline-offset-4"
        >
          política de privacidade
        </Link>
        .
      </p>
      <div className="mt-4 grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => writeConsent('denied')}
          className="min-h-11 rounded-full border border-line-strong px-4 text-sm font-bold text-bone hover:bg-ink-3"
        >
          Só essenciais
        </button>
        <button
          type="button"
          onClick={() => writeConsent('granted')}
          className="min-h-11 rounded-full bg-volt px-4 text-sm font-bold text-ink hover:bg-bone"
        >
          Aceitar todos
        </button>
      </div>
    </section>
  )
}
