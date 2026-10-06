import type { OpeningHoursRule } from '@/types/content'

/**
 * Dados centrais do negócio (NAP, horários, redes).
 * Fonte pública levantada em out/2026: perfil da academia no Wellhub + Instagram.
 * Itens entre [COLCHETES] precisam ser confirmados/preenchidos com o cliente.
 */
export const site = {
  name: 'Fitness Club Canoas',
  shortName: 'Fitness Club',
  legalName: '[RAZÃO SOCIAL]',
  cnpj: '[CNPJ]',
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.fitnessclubcanoas.com.br').replace(
    /\/$/,
    '',
  ),
  locale: 'pt_BR',
  tagline: 'Academia em Canoas',
  description:
    'Academia completa em Canoas, na Av. Boqueirão (Estância Velha): musculação, funcional, jump, fit dance, bike e ritmos, com nutricionista, área infantil e estacionamento.',

  phone: {
    display: '(51) 98906-4871',
    e164: '+5551989064871',
  },
  /** Número do WhatsApp (somente dígitos, com DDI). Confirmar se é o mesmo do telefone. */
  whatsappNumber: '5551989064871',
  whatsappDefaultMessage:
    'Olá! Vim pelo site da Fitness Club e gostaria de agendar uma aula experimental.',
  email: '[EMAIL DA ACADEMIA]',

  address: {
    street: 'Av. Boqueirão, 2151',
    neighborhood: 'Estância Velha',
    city: 'Canoas',
    state: 'RS',
    postalCode: '92032-420',
    country: 'BR',
  },
  mapsQuery: 'Av. Boqueirão, 2151 - Estância Velha, Canoas - RS, 92032-420',
  /** Link do perfil no Google Meu Negócio (substituir pelo link "Compartilhar" do perfil). */
  googleBusinessUrl:
    'https://www.google.com/maps/search/?api=1&query=Fitness+Club+Av.+Boqueir%C3%A3o+2151+Canoas',

  social: {
    instagram: 'https://www.instagram.com/fitnessclubcanoas/',
    instagramHandle: '@fitnessclubcanoas',
  },

  openingHours: [
    { days: [1, 2, 3, 4, 5], label: 'Segunda a sexta', opens: '05:00', closes: '23:00' },
    { days: [6], label: 'Sábado', opens: '09:00', closes: '16:00' },
    { days: [0], label: 'Domingo', opens: '09:00', closes: '12:00' },
  ] satisfies OpeningHoursRule[],
  holidayNote: 'Horários podem mudar em feriados. Confira no nosso Instagram.',

  /** Prova social pública. Conferir a nota atual antes de publicar. */
  rating: {
    value: '4,9',
    source: 'Wellhub',
    reviews: '200+ avaliações',
  },
  partnerships: ['Wellhub (Gympass) a partir do plano Silver'],

  /** Responsável técnico exigido pelo CREF. */
  technicalLead: {
    name: '[NOME DO RESPONSÁVEL TÉCNICO]',
    registry: 'CREF [000000-G/RS]',
  },

  trialCta: 'Agendar aula experimental',
} as const

export type Site = typeof site
