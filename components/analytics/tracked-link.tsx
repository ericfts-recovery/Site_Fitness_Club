'use client'

import Link from 'next/link'
import type { ComponentPropsWithoutRef } from 'react'
import { track, type AnalyticsEvent, type AnalyticsParams } from '@/lib/analytics'

type TrackedLinkProps = Omit<ComponentPropsWithoutRef<'a'>, 'href'> & {
  href: string
  event: AnalyticsEvent
  params?: AnalyticsParams
}

const isExternal = (href: string) => /^(https?:|tel:|mailto:)/.test(href)

/** Link que dispara um evento de analytics no clique (WhatsApp, telefone, CTAs). */
export function TrackedLink({
  href,
  event,
  params,
  onClick,
  children,
  ...props
}: TrackedLinkProps) {
  const handleClick: TrackedLinkProps['onClick'] = (e) => {
    track(event, { location: params?.location ?? 'unknown', ...params })
    onClick?.(e)
  }

  if (isExternal(href)) {
    const opensNewTab = href.startsWith('http')
    return (
      <a
        href={href}
        onClick={handleClick}
        {...(opensNewTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        {...props}
      >
        {children}
      </a>
    )
  }

  return (
    <Link href={href} onClick={handleClick} {...props}>
      {children}
    </Link>
  )
}
