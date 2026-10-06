import type { Metadata, Viewport } from 'next'
import localFont from 'next/font/local'
import type { ReactNode } from 'react'
import { Analytics } from '@/components/analytics/analytics'
import { CookieBanner } from '@/components/analytics/cookie-banner'
import { MobileActionBar } from '@/components/layout/mobile-action-bar'
import { SiteFooter } from '@/components/layout/site-footer'
import { SiteHeader } from '@/components/layout/site-header'
import { JsonLd } from '@/components/seo/json-ld'
import { site } from '@/content/site'
import { gymJsonLd } from '@/lib/seo'
import './globals.css'

/* Subconjunto latin (cobre todos os acentos do português). Fontes auto-hospedadas (sem requisição a terceiros no build nem no runtime, melhor para LGPD e LCP). */
const anton = localFont({
  src: './fonts/anton-latin.woff2',
  weight: '400',
  style: 'normal',
  variable: '--font-anton',
  display: 'swap',
  fallback: ['Arial Narrow', 'Impact', 'sans-serif'],
})

const manrope = localFont({
  src: './fonts/manrope-latin.woff2',
  weight: '200 800',
  style: 'normal',
  variable: '--font-manrope',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: 'Academia em Canoas | Fitness Club – Av. Boqueirão',
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    'academia em Canoas',
    'academia Estância Velha',
    'academia Av. Boqueirão',
    'musculação Canoas',
    'jump Canoas',
    'fit dance Canoas',
    'funcional Canoas',
  ],
  authors: [{ name: site.name }],
  formatDetection: { telephone: false },
  openGraph: { siteName: site.name, locale: site.locale, type: 'website' },
  twitter: { card: 'summary_large_image' },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
}

export const viewport: Viewport = {
  themeColor: '#0a0a0b',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR" className={`${anton.variable} ${manrope.variable}`}>
      <body>
        <a
          href="#conteudo"
          className="sr-only z-[100] rounded-full bg-volt px-5 py-3 font-bold text-on-volt focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Pular para o conteúdo
        </a>
        <SiteHeader />
        <main id="conteudo">{children}</main>
        <SiteFooter />
        <MobileActionBar />
        <CookieBanner />
        <Analytics />
        <JsonLd data={gymJsonLd()} />
      </body>
    </html>
  )
}
