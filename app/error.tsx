'use client'

import { RotateCcw } from 'lucide-react'
import { useEffect } from 'react'
import { buttonBase } from '@/components/ui/button-link'
import { Container } from '@/components/ui/container'
import { cn } from '@/lib/cn'
import { whatsappUrl } from '@/lib/whatsapp'

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <section className="flex min-h-[80svh] items-center pt-[4.5rem]">
      <Container className="py-20">
        <p className="eyebrow text-ember">Erro inesperado</p>
        <h1 className="display mt-4 text-[clamp(3rem,12vw,8rem)]">Algo deu errado</h1>
        <p className="mt-6 max-w-lg text-lg text-mute">
          Tivemos um problema ao carregar esta página. Tente novamente ou fale direto com a gente.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={reset}
            className={cn(buttonBase, 'min-h-14 bg-volt px-7 text-on-volt hover:bg-bone hover:text-ink')}
          >
            <RotateCcw className="size-5" aria-hidden="true" />
            Tentar novamente
          </button>
          <a
            href={whatsappUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              buttonBase,
              'min-h-14 border border-line-strong px-7 text-bone hover:bg-bone hover:text-ink',
            )}
          >
            Falar no WhatsApp
          </a>
        </div>
      </Container>
    </section>
  )
}
