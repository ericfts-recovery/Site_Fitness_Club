import type { MetadataRoute } from 'next'
import { modalities } from '@/content/modalities'
import { getAllPosts } from '@/content/posts'
import { absoluteUrl } from '@/lib/seo'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  return [
    { url: absoluteUrl('/'), lastModified: now, changeFrequency: 'weekly', priority: 1 },
    {
      url: absoluteUrl('/modalidades'),
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    ...modalities.map((m) => ({
      url: absoluteUrl(`/modalidades/${m.slug}`),
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    { url: absoluteUrl('/blog'), lastModified: now, changeFrequency: 'weekly', priority: 0.6 },
    ...getAllPosts().map((p) => ({
      url: absoluteUrl(`/blog/${p.slug}`),
      lastModified: new Date(p.publishedAt),
      changeFrequency: 'yearly' as const,
      priority: 0.5,
    })),
    {
      url: absoluteUrl('/politica-de-privacidade'),
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.2,
    },
  ]
}
