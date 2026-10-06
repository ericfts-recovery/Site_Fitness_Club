'use server'

import { headers } from 'next/headers'
import { modalities } from '@/content/modalities'
import { site } from '@/content/site'
import { isRateLimited } from '@/lib/rate-limit'
import { leadSchema, UNDECIDED_MODALITY, type LeadFormInput } from '@/lib/validation/lead-schema'
import { escapeHtml, sendLeadEmail } from '@/services/email'

/** Envio em menos tempo que isso é tratado como bot. */
const MIN_FILL_TIME_MS = 2500

export type SubmitLeadResult =
  | { status: 'success'; firstName: string }
  | { status: 'error'; message: string; fieldErrors?: Partial<Record<keyof LeadFormInput, string>> }

const allowedModalities = new Set<string>([...modalities.map((m) => m.name), UNDECIDED_MODALITY])

function formatPhone(digits: string): string {
  return digits.length === 11
    ? `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`
    : `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`
}

export async function submitLead(input: LeadFormInput): Promise<SubmitLeadResult> {
  const requestHeaders = await headers()
  const ip = requestHeaders.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'

  if (isRateLimited(`lead:${ip}`)) {
    return {
      status: 'error',
      message: 'Muitas tentativas em pouco tempo. Tente novamente mais tarde ou chame no WhatsApp.',
    }
  }

  const parsed = leadSchema.safeParse(input)
  if (!parsed.success) {
    const fieldErrors: Partial<Record<keyof LeadFormInput, string>> = {}
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as keyof LeadFormInput | undefined
      if (key && !fieldErrors[key]) fieldErrors[key] = issue.message
    }
    return { status: 'error', message: 'Revise os campos destacados.', fieldErrors }
  }

  const data = parsed.data
  const isBot = Boolean(data.website) || Date.now() - data.startedAt < MIN_FILL_TIME_MS
  // Para bots respondemos sucesso sem enviar nada, para não ensinar a contornar a proteção.
  if (isBot) return { status: 'success', firstName: data.name.split(' ')[0] ?? '' }

  if (!allowedModalities.has(data.modality)) {
    return {
      status: 'error',
      message: 'Modalidade inválida.',
      fieldErrors: { modality: 'Escolha uma opção da lista.' },
    }
  }

  const phone = formatPhone(data.phone)
  const rows: [string, string][] = [
    ['Nome', data.name],
    ['WhatsApp', phone],
    ['Modalidade', data.modality],
    ['Melhor período', data.period],
  ]

  const result = await sendLeadEmail({
    subject: `Novo pedido de aula experimental: ${data.name} (${data.modality})`,
    text: `${rows.map(([k, v]) => `${k}: ${v}`).join('\n')}\n\nConsentimento LGPD: sim`,
    html: `<h2>Novo pedido de aula experimental · ${escapeHtml(site.name)}</h2>
      <table cellpadding="6">${rows
        .map(([k, v]) => `<tr><td><strong>${k}</strong></td><td>${escapeHtml(v)}</td></tr>`)
        .join('')}</table>
      <p><a href="https://wa.me/55${data.phone}">Responder no WhatsApp</a></p>
      <p style="color:#666;font-size:12px">O visitante consentiu com o contato (LGPD). Enviado pelo site.</p>`,
  })

  if (!result.ok) {
    return {
      status: 'error',
      message:
        'Não conseguimos enviar agora. Toque em "Falar no WhatsApp" abaixo para agendar direto com a recepção.',
    }
  }

  return { status: 'success', firstName: data.name.split(' ')[0] ?? '' }
}
