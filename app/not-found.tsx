import type { Metadata } from 'next'
import { ArrowLeft } from 'lucide-react'
import { ButtonLink } from '@/components/ui/button-link'
import { Container } from '@/components/ui/container'
import { whatsappUrl } from '@/lib/whatsapp'

export const metadata: Metadata = {
  title: 'Página não encontrada',
  robots: { index: false },
}

export default function NotFound() {
  return (
    <section className="grain relative isolate flex min-h-[80svh] items-center overflow-hidden pt-[4.5rem]">
      <Container className="py-20">
        <p className="eyebrow text-volt">Erro 404</p>
        <h1 className="display mt-4 text-[clamp(3.5rem,15vw,10rem)]">
          Saiu da <span className="text-outline text-volt">série</span>
        </h1>
        <p className="mt-6 max-w-lg text-lg text-mute">
          A página que você procura não existe ou mudou de endereço. Bora voltar para o treino?
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/" size="lg">
            <ArrowLeft className="size-5" aria-hidden="true" />
            Voltar ao início
          </ButtonLink>
          <ButtonLink
            href={whatsappUrl()}
            size="lg"
            variant="secondary"
            event="cta_whatsapp_click"
            eventParams={{ location: '404' }}
          >
            Falar no WhatsApp
          </ButtonLink>
        </div>
      </Container>
    </section>
  )
}
