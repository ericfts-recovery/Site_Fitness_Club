import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { PageHero } from '@/components/layout/page-hero'
import { JsonLd } from '@/components/seo/json-ld'
import { Container } from '@/components/ui/container'
import { getAllPosts } from '@/content/posts'
import { formatDate } from '@/lib/format'
import { breadcrumbJsonLd, buildMetadata } from '@/lib/seo'

const crumbs = [
  { name: 'Início', path: '/' },
  { name: 'Blog', path: '/blog' },
]

export const metadata = buildMetadata({
  title: 'Blog: dicas de treino e saúde',
  description:
    'Dicas de treino, rotina e qualidade de vida da equipe Fitness Club, academia em Canoas. Conteúdo prático para começar e evoluir na academia.',
  path: '/blog',
})

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <>
      <PageHero
        eyebrow="Blog"
        title="Treino, rotina e evolução"
        description="Conteúdo prático da nossa equipe para você treinar melhor, dentro e fora da academia."
        breadcrumbs={crumbs}
      />
      <section aria-label="Artigos" className="py-20 sm:py-28">
        <Container>
          {posts.length === 0 ? (
            <p className="text-mute">Em breve, novos artigos por aqui.</p>
          ) : (
            <ul className="grid gap-4 md:grid-cols-2">
              {posts.map((post) => (
                <li key={post.slug}>
                  <article className="group relative flex h-full flex-col rounded-[var(--radius-xl)] border border-line bg-ink-2 p-8 transition-colors hover:border-volt">
                    <p className="eyebrow text-volt">{post.category}</p>
                    <h2 className="mt-4 text-2xl font-extrabold sm:text-3xl">
                      <Link href={`/blog/${post.slug}`} className="after:absolute after:inset-0">
                        {post.title}
                      </Link>
                    </h2>
                    <p className="mt-3 flex-1 text-mute">{post.description}</p>
                    <p className="mt-6 flex items-center justify-between text-sm text-mute">
                      <span>
                        <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time> ·{' '}
                        {post.readingMinutes} min de leitura
                      </span>
                      <ArrowUpRight
                        className="size-5 text-bone transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                        aria-hidden="true"
                      />
                    </p>
                  </article>
                </li>
              ))}
            </ul>
          )}
        </Container>
      </section>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
    </>
  )
}
