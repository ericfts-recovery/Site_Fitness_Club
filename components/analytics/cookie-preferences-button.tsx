'use client'

import { resetConsent } from '@/lib/consent'

/** Permite revogar/alterar o consentimento a qualquer momento (LGPD, art. 8º, §5º). */
export function CookiePreferencesButton() {
  return (
    <button
      type="button"
      onClick={resetConsent}
      className="inline-flex min-h-11 items-center hover:text-volt"
    >
      Preferências de cookies
    </button>
  )
}
