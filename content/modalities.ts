import { Bike, Dumbbell, Flame, Music, PersonStanding, Zap } from 'lucide-react'
import type { Modality } from '@/types/content'

/**
 * Modalidades listadas publicamente pela academia.
 * A grade de horários das aulas coletivas deve ser fornecida pelo cliente.
 * Textos evitam promessa de resultado (Código de Ética CONFEF/CREF).
 */
export const modalities: Modality[] = [
  {
    slug: 'musculacao',
    name: 'Musculação',
    icon: Dumbbell,
    tagline: 'Força, postura e confiança',
    summary:
      'Área ampla de musculação com acompanhamento para você treinar com técnica e segurança.',
    intensity: 'Adaptável',
    description: [
      'A musculação é a base de qualquer rotina de treino: fortalece músculos e articulações, melhora a postura e dá mais disposição para o dia a dia. Na Fitness Club, você treina em uma área ampla e climatizada, com equipamentos para todos os grupos musculares.',
      'Nossa equipe orienta a execução dos exercícios e ajuda a montar um treino coerente com o seu objetivo e o seu momento, seja você iniciante ou alguém que já treina há anos.',
    ],
    benefits: [
      'Ganho de força e resistência muscular',
      'Mais estabilidade para as articulações',
      'Melhora da postura e da composição corporal',
      'Treino ajustado ao seu nível e objetivo',
    ],
    forWho:
      'Para todas as idades e níveis. Quem está começando recebe orientação sobre execução e progressão de carga.',
    seo: {
      title: 'Musculação em Canoas',
      description:
        'Musculação em Canoas na Fitness Club (Av. Boqueirão): área ampla, climatizada e com orientação da equipe. Aberta das 5h às 23h. Agende sua aula experimental.',
    },
    faq: [
      {
        question: 'Nunca fiz musculação. Consigo começar?',
        answer:
          'Sim. A equipe apresenta os aparelhos, orienta a execução e indica um treino adequado para quem está começando.',
      },
      {
        question: 'Qual o melhor horário para treinar?',
        answer:
          'O melhor horário é aquele que você consegue manter. Abrimos de segunda a sexta das 5h às 23h, o que facilita encaixar o treino antes ou depois do trabalho.',
      },
    ],
    image: null,
  },
  {
    slug: 'funcional',
    name: 'Funcional',
    icon: Flame,
    tagline: 'Movimento que vira disposição',
    summary: 'Treinos dinâmicos que trabalham o corpo todo com movimentos do dia a dia.',
    intensity: 'Moderada a alta',
    description: [
      'O treino funcional combina força, equilíbrio, coordenação e condicionamento em exercícios que imitam movimentos naturais: agachar, empurrar, puxar, saltar e girar.',
      'As aulas são em grupo, com energia lá em cima e exercícios que podem ser adaptados para cada aluno. É uma ótima forma de sair da rotina e treinar com motivação.',
    ],
    benefits: [
      'Condicionamento físico e cardiorrespiratório',
      'Mais equilíbrio e coordenação motora',
      'Fortalecimento do core',
      'Aulas dinâmicas, sem monotonia',
    ],
    forWho:
      'Para quem quer treinar em grupo, com dinamismo. Exercícios adaptáveis a diferentes níveis.',
    seo: {
      title: 'Treino Funcional em Canoas',
      description:
        'Aulas de treino funcional em Canoas na Fitness Club: condicionamento, força e equilíbrio em aulas dinâmicas e adaptáveis. Agende uma aula experimental.',
    },
    faq: [
      {
        question: 'Preciso ter condicionamento para fazer funcional?',
        answer:
          'Não. Os exercícios são adaptados conforme o nível de cada aluno, e o professor indica variações mais leves ou mais intensas.',
      },
      {
        question: 'Funcional substitui a musculação?',
        answer:
          'São complementares. Muitos alunos combinam as duas modalidades para trabalhar força e condicionamento.',
      },
    ],
    image: null,
  },
  {
    slug: 'jump',
    name: 'Jump',
    icon: Zap,
    tagline: 'Cardio em alta energia',
    summary: 'Aula aeróbica no mini trampolim, com música e muita energia.',
    intensity: 'Moderada a alta',
    description: [
      'O jump é uma aula aeróbica realizada sobre um mini trampolim, com coreografias simples ao ritmo de músicas animadas. É intenso, divertido e passa voando.',
      'Por ser feito sobre uma superfície que absorve parte do impacto, é uma opção interessante para quem quer um cardio intenso de forma dinâmica.',
    ],
    benefits: [
      'Melhora do condicionamento cardiovascular',
      'Trabalho de pernas, glúteos e core',
      'Coordenação e ritmo',
      'Gasto energético em clima de festa',
    ],
    forWho:
      'Para quem gosta de música e de treinos animados. Quem tem restrições articulares deve conversar com o professor antes.',
    seo: {
      title: 'Aula de Jump em Canoas',
      description:
        'Aulas de jump em Canoas na Fitness Club: cardio no mini trampolim, com música e muita energia. Conheça a grade e agende sua aula experimental.',
    },
    faq: [
      {
        question: 'Jump é indicado para iniciantes?',
        answer:
          'Sim. Os movimentos básicos são simples e o professor ajusta a intensidade. Nas primeiras aulas, vá no seu ritmo.',
      },
      {
        question: 'Preciso levar algo para a aula?',
        answer: 'Roupa confortável, tênis, toalha e garrafinha de água. O trampolim é da academia.',
      },
    ],
    image: null,
  },
  {
    slug: 'fit-dance',
    name: 'Fit Dance',
    icon: Music,
    tagline: 'Dance, sue e se divirta',
    summary: 'Coreografias com os hits do momento para treinar sem perceber.',
    intensity: 'Moderada',
    description: [
      'No Fit Dance, o treino vira dança: coreografias com músicas atuais, passos fáceis de acompanhar e uma turma animada. Você se exercita e nem percebe o tempo passar.',
      'Não é preciso saber dançar. O objetivo é se movimentar, se divertir e criar o hábito de treinar com prazer.',
    ],
    benefits: [
      'Exercício aeróbico divertido',
      'Coordenação, ritmo e expressão corporal',
      'Alívio do estresse do dia',
      'Ambiente leve e acolhedor',
    ],
    forWho: 'Para todos que gostam de música, mesmo quem nunca dançou.',
    seo: {
      title: 'Fit Dance em Canoas',
      description:
        'Aulas de Fit Dance em Canoas na Fitness Club: coreografias com os hits do momento, exercício divertido e turma animada. Agende sua aula experimental.',
    },
    faq: [
      {
        question: 'Preciso saber dançar?',
        answer:
          'Não. Os passos são simples e repetidos ao longo da aula, para todo mundo acompanhar.',
      },
      {
        question: 'Qual a diferença entre Fit Dance e Ritmos?',
        answer:
          'O Fit Dance usa coreografias de músicas atuais; a aula de ritmos passeia por estilos variados, como samba, forró e axé.',
      },
    ],
    image: null,
  },
  {
    slug: 'bike-indoor',
    name: 'Bike Indoor',
    icon: Bike,
    tagline: 'Pedale no ritmo da música',
    summary: 'Aulas de ciclismo indoor com variações de ritmo e intensidade.',
    intensity: 'Adaptável',
    description: [
      'A bike indoor simula subidas, sprints e trechos de resistência em uma aula guiada pelo professor e pela música. Cada aluno controla a carga da própria bike.',
      'É um cardio de baixo impacto nas articulações e muito motivante, porque a turma pedala junta, no mesmo ritmo.',
    ],
    benefits: [
      'Condicionamento cardiovascular',
      'Baixo impacto nas articulações',
      'Fortalecimento de pernas e glúteos',
      'Intensidade controlada por você',
    ],
    forWho: 'Para todos os níveis: você ajusta a carga conforme o seu condicionamento.',
    seo: {
      title: 'Bike Indoor em Canoas',
      description:
        'Aulas de bike indoor em Canoas na Fitness Club: cardio de baixo impacto, guiado por música e com intensidade ajustável. Agende sua aula experimental.',
    },
    faq: [
      {
        question: 'Bike indoor é muito puxado?',
        answer:
          'Você controla a carga da bike o tempo todo. Iniciantes começam com menos resistência e evoluem aos poucos.',
      },
      {
        question: 'Preciso de sapatilha específica?',
        answer: 'Não. Um tênis com sola firme é suficiente.',
      },
    ],
    image: null,
  },
  {
    slug: 'ritmos',
    name: 'Ritmos',
    icon: PersonStanding,
    tagline: 'Do samba ao axé',
    summary: 'Aula aeróbica com estilos musicais variados e muita alegria.',
    intensity: 'Leve a moderada',
    description: [
      'A aula de ritmos mistura estilos como samba, forró, axé, funk e pop em sequências animadas. Cada música traz um novo desafio de coordenação.',
      'É uma ótima porta de entrada para quem quer começar a se exercitar de forma leve e social.',
    ],
    benefits: [
      'Exercício aeróbico leve a moderado',
      'Coordenação e memória motora',
      'Socialização e bem-estar',
      'Variedade a cada aula',
    ],
    forWho: 'Para quem quer começar de forma leve e para quem ama dançar.',
    seo: {
      title: 'Aula de Ritmos em Canoas',
      description:
        'Aulas de ritmos em Canoas na Fitness Club: samba, forró, axé e pop em uma aula aeróbica leve e divertida. Agende sua aula experimental.',
    },
    faq: [
      {
        question: 'A aula de ritmos é cansativa?',
        answer:
          'A intensidade é de leve a moderada, ideal para quem está começando a se exercitar.',
      },
      {
        question: 'Homens também fazem a aula?',
        answer: 'Claro! A aula é para todo mundo que quer se movimentar com música.',
      },
    ],
    image: null,
  },
]

export function getModality(slug: string): Modality | undefined {
  return modalities.find((m) => m.slug === slug)
}
