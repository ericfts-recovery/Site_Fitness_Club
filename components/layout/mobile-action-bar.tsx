import { Phone } from 'lucide-react'
import { TrackedLink } from '@/components/analytics/tracked-link'
import { WhatsappIcon } from '@/components/ui/brand-icons'
import { phoneUrl, whatsappUrl } from '@/lib/whatsapp'

/**
 * Barra fixa de conversão no mobile (WhatsApp + ligar) e botão flutuante no desktop.
 * O espaço inferior é compensado no rodapé para não cobrir conteúdo.
 */
export function MobileActionBar() {
  return (
    <>
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-ink/90 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-xl md:hidden">
        <div className="grid grid-cols-[1fr_auto] gap-2">
          <TrackedLink
            href={whatsappUrl()}
            event="cta_whatsapp_click"
            params={{ location: 'mobile_bar' }}
            className="flex min-h-12 items-center justify-center gap-2 rounded-full bg-volt text-sm font-bold tracking-wide text-on-volt uppercase"
          >
            <WhatsappIcon className="size-5" />
            Agendar pelo WhatsApp
          </TrackedLink>
          <TrackedLink
            href={phoneUrl}
            event="cta_phone_click"
            params={{ location: 'mobile_bar' }}
            aria-label="Ligar para a academia"
            className="grid size-12 place-items-center rounded-full border border-line-strong text-bone"
          >
            <Phone className="size-5" aria-hidden="true" />
          </TrackedLink>
        </div>
      </div>

      <TrackedLink
        href={whatsappUrl()}
        event="cta_whatsapp_click"
        params={{ location: 'floating_button' }}
        aria-label="Falar com a Fitness Club no WhatsApp"
        className="fixed right-6 bottom-6 z-40 hidden size-16 place-items-center rounded-full bg-volt text-on-volt shadow-[0_12px_40px_-8px_rgb(207_30_59/0.55)] transition-transform duration-300 hover:scale-105 md:grid"
      >
        <WhatsappIcon className="size-7" />
      </TrackedLink>
    </>
  )
}
