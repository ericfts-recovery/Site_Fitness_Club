import { z } from 'zod'

export const PERIOD_OPTIONS = ['Manhã', 'Tarde', 'Noite'] as const
export const UNDECIDED_MODALITY = 'Ainda não sei'

const NAME_MIN = 2
const NAME_MAX = 80
const PHONE_DIGITS_MIN = 10
const PHONE_DIGITS_MAX = 11

/** Schema compartilhado entre o formulário (cliente) e a Server Action (servidor). */
export const leadSchema = z.object({
  name: z
    .string()
    .trim()
    .min(NAME_MIN, 'Informe seu nome.')
    .max(NAME_MAX, 'Nome muito longo.')
    .regex(/^[\p{L}\s'.-]+$/u, 'Use apenas letras no nome.'),
  phone: z
    .string()
    .trim()
    .transform((value) => value.replace(/\D/g, ''))
    .refine(
      (digits) => digits.length >= PHONE_DIGITS_MIN && digits.length <= PHONE_DIGITS_MAX,
      'Informe um WhatsApp válido com DDD.',
    ),
  modality: z.string().trim().min(1, 'Escolha uma opção.').max(40),
  period: z.enum(PERIOD_OPTIONS, { message: 'Escolha um período.' }),
  consent: z.literal(true, { message: 'Precisamos do seu consentimento para entrar em contato.' }),
  /** Honeypot: humanos não veem este campo. */
  website: z.string().max(0).optional(),
  /** Timestamp de quando o formulário foi exibido (anti-bot). */
  startedAt: z.number().int().positive(),
})

export type LeadFormInput = z.input<typeof leadSchema>
export type LeadData = z.output<typeof leadSchema>
