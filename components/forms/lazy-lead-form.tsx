'use client'

import dynamic from 'next/dynamic'
import { useEffect, useRef, useState } from 'react'

/**
 * O formulário (React Hook Form + Zod) só é baixado quando a seção se aproxima da tela.
 * Mantém o JavaScript inicial da home enxuto (melhor TBT/INP). A altura mínima evita CLS.
 */
const LeadForm = dynamic(() => import('./lead-form').then((m) => m.LeadForm), {
  ssr: false,
  loading: () => <FormSkeleton />,
})

function FormSkeleton() {
  return (
    <div aria-hidden="true" className="min-h-[34rem] animate-pulse space-y-5">
      {[0, 1, 2].map((i) => (
        <div key={i} className="space-y-2">
          <div className="h-4 w-24 rounded bg-ink-3" />
          <div className="h-13 rounded-[var(--radius-md)] bg-ink-3" />
        </div>
      ))}
      <div className="h-14 rounded-full bg-ink-3" />
    </div>
  )
}

const PRELOAD_MARGIN = '600px'

export function LazyLeadForm({ modalityOptions }: { modalityOptions: string[] }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin: PRELOAD_MARGIN },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className="min-h-[34rem]">
      {visible ? <LeadForm modalityOptions={modalityOptions} /> : <FormSkeleton />}
    </div>
  )
}
