import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { PageHero } from '@/components/layout/page-hero'
import { JsonLd } from '@/components/seo/json-ld'
import { FinalCta } from '@/components/sections/final-cta'
import { Container } from '@/components/ui/container'
import { getPost, posts } from '@/content/posts'
import { formatDate } from '@/lib/format'
import { articleJsonLd, breadcrumbJsonLd, buildMetadata } from '@/lib/seo'
import type { PostBlock } from '@/types/content'

interface PostPageProps {
  params: Promise<{ slug: string }>
}

export const dynamicParams = false

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) return {}
  return buildMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
    type: 'article',
    publishedTime: post.publishedAt,
  })
}

function Block({ block }: { block: PostBlock }) {
  switch (block.type) {
    case 'h2':
      return <h2 className="display pt-6 text-4xl text-bone sm:text-5xl">{block.text}</h2>
    case 'ul':
      return (
        <ul className="list-disc space-y-2 pl-6 marker:text-volt">
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )
    case 'p':
      return <p>{block.text}</p>
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) notFound()

  const crumbs = [
    { name: 'Início', path: '/' },
    { name: 'Blog', path: '/blog' },
    { name: post.title, path: `/blog/${post.slug}` },
  ]

  return (
    <>
      <PageHero eyebrow={post.category} title={post.title} breadcrumbs={crumbs} size="md">
        <p className="mt-6 text-sm text-mute">
          <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time> ·{' '}
          {post.readingMinutes} min de leitura
        </p>
      </PageHero>

      <article className="py-16 sm:py-24">
        <Container className="max-w-3xl">
          <p className="text-xl font-medium text-bone">{post.description}</p>
          <div className="mt-10 space-y-6 text-lg text-mute">
            {post.blocks.map((block, i) => (
              <Block key={i} block={block} />
            ))}
          </div>
          <p className="mt-14 rounded-[var(--radius-md)] border border-line bg-ink-2 p-5 text-sm text-mute">
            Este conteúdo é informativo e não substitui a orientação individual de um profissional
            de educação física ou de saúde.
          </p>
        </Container>
      </article>

      <FinalCta location={`blog_${post.slug}`} />
      <JsonLd data={[breadcrumbJsonLd(crumbs), articleJsonLd(post)]} />
    </>
  )
}
