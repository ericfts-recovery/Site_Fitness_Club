import type { LucideIcon } from 'lucide-react'

/** 0 = domingo … 6 = sábado (mesma convenção de Date#getDay). */
export type Weekday = 0 | 1 | 2 | 3 | 4 | 5 | 6

export interface OpeningHoursRule {
  days: Weekday[]
  label: string
  /** Formato HH:mm, fuso America/Sao_Paulo */
  opens: string
  closes: string
}

export interface ImageAsset {
  src: string
  alt: string
  width: number
  height: number
}

export interface FaqItem {
  question: string
  answer: string
}

export interface Modality {
  slug: string
  name: string
  icon: LucideIcon
  tagline: string
  summary: string
  intensity: 'Leve a moderada' | 'Moderada' | 'Moderada a alta' | 'Adaptável'
  description: string[]
  benefits: string[]
  forWho: string
  seo: { title: string; description: string }
  faq: FaqItem[]
  image: ImageAsset | null
}

export interface Amenity {
  label: string
  icon: LucideIcon
}

export interface Differential {
  title: string
  text: string
  icon: LucideIcon
}

export interface Plan {
  id: string
  name: string
  /** Preço exibido. Use placeholder até o cliente confirmar. */
  price: string
  period: string
  highlight?: string
  features: string[]
}

export interface Testimonial {
  name: string
  detail: string
  quote: string
}

export interface Stat {
  value: string
  label: string
}

export type PostBlock =
  { type: 'p'; text: string } | { type: 'h2'; text: string } | { type: 'ul'; items: string[] }

export interface Post {
  slug: string
  title: string
  description: string
  publishedAt: string
  readingMinutes: number
  category: string
  blocks: PostBlock[]
}
