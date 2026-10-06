import 'server-only'

const RESEND_ENDPOINT = 'https://api.resend.com/emails'

interface SendEmailInput {
  subject: string
  html: string
  text: string
}

export type SendEmailResult =
  { ok: true } | { ok: false; reason: 'not_configured' | 'provider_error' }

/** Envia e-mail transacional via API REST do Resend (sem SDK, para manter o bundle enxuto). */
export async function sendLeadEmail({
  subject,
  html,
  text,
}: SendEmailInput): Promise<SendEmailResult> {
  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.LEAD_TO_EMAIL
  const from = process.env.LEAD_FROM_EMAIL

  if (!apiKey || !to || !from) return { ok: false, reason: 'not_configured' }

  try {
    const response = await fetch(RESEND_ENDPOINT, {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from, to: [to], subject, html, text }),
      cache: 'no-store',
    })
    if (!response.ok) {
      console.error('[lead] Resend respondeu com status', response.status)
      return { ok: false, reason: 'provider_error' }
    }
    return { ok: true }
  } catch (error) {
    console.error('[lead] Falha ao enviar e-mail', error)
    return { ok: false, reason: 'provider_error' }
  }
}

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}
