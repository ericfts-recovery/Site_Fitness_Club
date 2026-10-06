'use client'

import './globals.css'

/** Fallback quando o próprio layout raiz falha (500). Sem dependências do layout. */
export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="pt-BR">
      <body className="flex min-h-svh items-center justify-center bg-ink p-6 text-bone">
        <main className="max-w-md text-center">
          <p className="text-sm font-bold tracking-[0.2em] text-volt uppercase">Erro 500</p>
          <h1 className="mt-4 text-4xl font-extrabold">O site está passando por instabilidade</h1>
          <p className="mt-4 text-mute">Tente novamente em instantes.</p>
          <button
            type="button"
            onClick={reset}
            className="mt-8 min-h-12 rounded-full bg-volt px-6 font-bold text-ink"
          >
            Recarregar
          </button>
        </main>
      </body>
    </html>
  )
}
