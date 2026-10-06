import type { Metadata } from 'next'
import { site } from '@/content/site'
import type { FaqItem, Post } from '@/types/content'
import { SCHEMA_DAY_NAMES } from './hours'

export function absoluteUrl(path = '/'): string {
  return `${site.url}${path === '/' ? '' : path}`
}

interface PageMetadataInput {
  title: string
  description: string
  path: string
  /** Título exato, sem o sufixo do template (use na home). */
  absoluteTitle?: boolean
  type?: 'website' | 'article'
  publishedTime?: string
}

export function buildMetadata({
  title,
  description,
  path,
  absoluteTitle = false,
  type = 'website',
  publishedTime,
}: PageMetadataInput): Metadata {
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      url: path,
      title,
      description,
      siteName: site.name,
      locale: site.locale,
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: { card: 'summary_large_image', title, description },
  }
}

const businessId = `${site.url}/#academia`

export function gymJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ExerciseGym',
    '@id': businessId,
    name: site.name,
    description: site.description,
    url: site.url,
    telephone: site.phone.e164,
    image: absoluteUrl('/opengraph-image'),
    logo: absoluteUrl('/icon.svg'),
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.state,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    areaServed: { '@type': 'City', name: 'Canoas' },
    hasMap: site.googleBusinessUrl,
    sameAs: [site.social.instagram],
    openingHoursSpecification: site.openingHours.map((rule) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: rule.days.map((d) => SCHEMA_DAY_NAMES[d]),
      opens: rule.opens,
      closes: rule.closes,
    })),
    amenityFeature: [
      'Estacionamento',
      'Ar-condicionado',
      'Área infantil',
      'Vestiário',
      'Acessibilidade para cadeira de rodas',
      'Nutricionista',
    ].map((name) => ({ '@type': 'LocationFeatureSpecification', name, value: true })),
  }
}

export function faqJsonLd(items: FaqItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  }
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }
}

export function serviceJsonLd(name: string, description: string, path: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `${name} em Canoas`,
    serviceType: name,
    description,
    url: absoluteUrl(path),
    areaServed: { '@type': 'City', name: 'Canoas' },
    provider: { '@id': businessId },
  }
}

export function articleJsonLd(post: Post) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    url: absoluteUrl(`/blog/${post.slug}`),
    mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
    inLanguage: 'pt-BR',
    author: { '@type': 'Organization', name: site.name, url: site.url },
    publisher: { '@id': businessId },
  }
}
