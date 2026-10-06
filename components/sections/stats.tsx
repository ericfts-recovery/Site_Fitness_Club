import { Container } from '@/components/ui/container'
import { stats } from '@/content/home'

export function Stats() {
  return (
    <section aria-label="A Fitness Club em números" className="py-16 sm:py-24">
      <Container>
        <dl className="grid grid-cols-2 overflow-hidden rounded-[var(--radius-xl)] border border-line lg:grid-cols-4">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`reveal flex flex-col-reverse justify-end gap-2 border-line p-6 sm:p-10 ${i % 2 === 0 ? 'border-r' : ''} ${i < 2 ? 'border-b lg:border-b-0' : ''} ${i === 1 ? 'lg:border-r' : ''}`}
            >
              <dt className="text-sm text-mute sm:text-base">{stat.label}</dt>
              <dd className="display text-6xl text-volt sm:text-7xl lg:text-8xl">{stat.value}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  )
}
