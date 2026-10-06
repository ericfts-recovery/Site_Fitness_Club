import { modalities } from '@/content/modalities'

const items = [...modalities.map((m) => m.name), 'Cardio', 'Alongamento']

function Row({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {items.map((item) => (
        <li key={item} className="flex items-center">
          <span className="px-6 font-display text-3xl tracking-wide uppercase sm:text-4xl">
            {item}
          </span>
          <span aria-hidden="true" className="text-2xl">
            ✦
          </span>
        </li>
      ))}
    </ul>
  )
}

/** Faixa de modalidades em movimento (pausa em prefers-reduced-motion via CSS global). */
export function ModalitiesMarquee() {
  return (
    <div
      aria-label="Modalidades"
      role="region"
      className="relative z-10 -my-2 overflow-hidden py-2"
    >
      <div className="-rotate-[1.5deg] bg-volt py-4 text-ink">
        <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
          <Row />
          <Row hidden />
        </div>
      </div>
    </div>
  )
}
