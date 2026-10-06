import {
  Accessibility,
  Apple,
  Baby,
  Car,
  Droplets,
  HeartPulse,
  Lock,
  ShoppingBag,
  ShowerHead,
  Snowflake,
  StretchHorizontal,
  Users,
  Wifi,
  Wind,
} from 'lucide-react'
import type { Amenity, Differential, FaqItem, Plan, Stat, Testimonial } from '@/types/content'
import { modalities } from './modalities'
import { site } from './site'

export const navigation = [
  { label: 'Modalidades', href: '/#modalidades' },
  { label: 'Estrutura', href: '/#estrutura' },
  { label: 'Planos', href: '/#planos' },
  { label: 'Horários', href: '/#horarios' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contato', href: '/#contato' },
] as const

export const heroContent = {
  eyebrow: `${site.tagline} · ${site.address.neighborhood}`,
  titleLines: ['Treine forte.', 'Evolua', 'de verdade.'],
  subtitle:
    'Estrutura completa, atenção de verdade e a melhor didática para você treinar com segurança, da primeira aula ao seu próximo nível.',
}

/** Números derivados de dados reais (horários, modalidades e nota pública). */
export const stats: Stat[] = [
  { value: '18h', label: 'abertos por dia, de segunda a sexta' },
  { value: '7', label: 'dias por semana para você treinar' },
  { value: `${modalities.length}+`, label: 'modalidades entre musculação e aulas' },
  { value: site.rating.value, label: `de nota no ${site.rating.source}` },
]

export const differentials: Differential[] = [
  {
    icon: Users,
    title: 'Atenção de verdade',
    text: 'Equipe presente no salão para corrigir, orientar e ajustar seu treino. Ninguém fica perdido aqui.',
  },
  {
    icon: Apple,
    title: 'Nutricionista no local',
    text: 'Treino e alimentação caminham juntos. Converse com a nutricionista sem sair da academia.',
  },
  {
    icon: Baby,
    title: 'Área infantil',
    text: 'Traga as crianças: enquanto você treina, elas ficam em um espaço pensado para elas.',
  },
  {
    icon: Accessibility,
    title: 'Acessível para todos',
    text: 'Banheiro acessível, portas e espaços adaptados para cadeira de rodas.',
  },
]

export const amenities: Amenity[] = [
  { icon: Snowflake, label: 'Ar-condicionado' },
  { icon: HeartPulse, label: 'Área de cardio' },
  { icon: StretchHorizontal, label: 'Área de alongamento' },
  { icon: Car, label: 'Estacionamento' },
  { icon: ShowerHead, label: 'Vestiário com chuveiro' },
  { icon: Wind, label: 'Secador de cabelo' },
  { icon: Lock, label: 'Armários' },
  { icon: Droplets, label: 'Bebedouro' },
  { icon: Wifi, label: 'Wi-Fi' },
  { icon: ShoppingBag, label: 'Loja de artigos esportivos' },
]

/**
 * PLANOS: valores e condições a confirmar com o cliente.
 * Os preços abaixo são placeholders e precisam ser substituídos antes da publicação.
 */
export const plans: Plan[] = [
  {
    id: 'mensal',
    name: 'Mensal',
    price: '[R$ 000]',
    period: '/mês',
    features: [
      'Musculação e área de cardio',
      'Todas as aulas coletivas',
      'Sem fidelidade [CONFIRMAR]',
    ],
  },
  {
    id: 'semestral',
    name: 'Semestral',
    price: '[R$ 000]',
    period: '/mês',
    highlight: 'Mais escolhido',
    features: [
      'Tudo do plano mensal',
      'Avaliação física [CONFIRMAR]',
      'Melhor custo-benefício [CONFIRMAR]',
    ],
  },
  {
    id: 'anual',
    name: 'Anual',
    price: '[R$ 000]',
    period: '/mês',
    features: ['Tudo do plano semestral', 'Menor valor mensal', '[BENEFÍCIO EXTRA]'],
  },
]

/**
 * DEPOIMENTOS: substituir por depoimentos reais e autorizados de alunos
 * (ou avaliações públicas do Google, com o nome como aparece lá).
 */
export const testimonials: Testimonial[] = [
  {
    name: '[NOME DO ALUNO]',
    detail: '[Aluno(a) há X anos · Musculação]',
    quote: '[DEPOIMENTO REAL DO ALUNO, COM AUTORIZAÇÃO PARA USO NO SITE.]',
  },
  {
    name: '[NOME DA ALUNA]',
    detail: '[Aluna há X meses · Jump e Fit Dance]',
    quote: '[DEPOIMENTO REAL DA ALUNA, COM AUTORIZAÇÃO PARA USO NO SITE.]',
  },
  {
    name: '[NOME DO ALUNO]',
    detail: '[Aluno há X anos · Funcional]',
    quote: '[DEPOIMENTO REAL DO ALUNO, COM AUTORIZAÇÃO PARA USO NO SITE.]',
  },
]

export const homeFaq: FaqItem[] = [
  {
    question: 'Qual o horário de funcionamento da Fitness Club?',
    answer:
      'De segunda a sexta, das 5h às 23h. Aos sábados, das 9h às 16h, e aos domingos, das 9h às 12h. Em feriados os horários podem mudar.',
  },
  {
    question: 'Onde fica a academia?',
    answer: `Na ${site.address.street}, bairro ${site.address.neighborhood}, em ${site.address.city}/${site.address.state}. Temos estacionamento para alunos.`,
  },
  {
    question: 'Vocês aceitam Wellhub (Gympass)?',
    answer:
      'Sim. A Fitness Club é parceira do Wellhub e está disponível a partir do plano Silver. É só fazer o check-in pelo app.',
  },
  {
    question: 'Posso levar meu filho enquanto treino?',
    answer: 'Sim! Temos área infantil para as crianças ficarem enquanto você treina.',
  },
  {
    question: 'Nunca treinei. A academia é para mim?',
    answer:
      'Com certeza. Nossa equipe acompanha os iniciantes, explica os exercícios e ajuda a montar um treino adequado ao seu momento.',
  },
  {
    question: 'Como funciona a aula experimental?',
    answer:
      '[CONFIRMAR COM A ACADEMIA] Agende pelo WhatsApp ou pelo formulário, escolha a modalidade e venha conhecer a estrutura e a equipe.',
  },
]
