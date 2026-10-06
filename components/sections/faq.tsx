import { Plus } from 'lucide-react'
import { Container } from '@/components/ui/container'
import { SectionHeading } from '@/components/ui/section-heading'
import type { FaqItem } from '@/types/content'

interface FaqProps {
  items: FaqItem[]
  title?: string
  eyebrow?: string
}

/** Acordeão nativo (<details>), acessível e sem JavaScript. */
export function Faq({ items, title = 'Perguntas frequentes', eyebrow = 'Dúvidas' }: FaqProps) {
  return (
    <section aria-labelledby="faq-title" className="py-20 sm:py-28">
      <Container className="grid gap-12 lg:grid-cols-12">
        <SectionHeading id="faq-title" eyebrow={eyebrow} title={title} className="lg:col-span-4" />
        <div className="divide-y divide-line border-y border-line lg:col-span-8">
          {items.map((item) => (
            <details key={item.question} className="group">
              <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-6 py-5 text-lg font-bold transition-colors hover:text-volt [&::-webkit-details-marker]:hidden">
                {item.question}
                <span className="grid size-9 shrink-0 place-items-center rounded-full border border-line-strong transition-transform duration-300 group-open:rotate-45 group-open:border-volt group-open:bg-volt group-open:text-ink">
                  <Plus className="size-4" aria-hidden="true" />
                </span>
              </summary>
              <p className="pr-12 pb-6 text-mute">{item.answer}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  )
}
