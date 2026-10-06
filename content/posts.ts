import type { Post } from '@/types/content'

/**
 * Artigos do blog. Estrutura tipada pronta para migrar para MDX ou um CMS headless
 * (Sanity, Contentful) sem mudar as páginas: basta trocar as funções abaixo.
 * Pautas pensadas pela intenção de busca de quem procura academia em Canoas.
 */
export const posts: Post[] = [
  {
    slug: 'musculacao-para-iniciantes',
    title: 'Musculação para iniciantes: como começar do jeito certo',
    description:
      'Primeira vez na academia? Veja como começar a musculação com segurança: frequência, carga, descanso e os erros mais comuns de quem está começando.',
    publishedAt: '2026-10-06',
    readingMinutes: 5,
    category: 'Musculação',
    blocks: [
      {
        type: 'p',
        text: 'Começar a musculação pode parecer intimidador: aparelhos diferentes, gente que já treina há anos e a sensação de não saber por onde começar. A boa notícia é que todo mundo já foi iniciante, e os primeiros meses são justamente quando a evolução é mais perceptível.',
      },
      { type: 'h2', text: '1. Comece com orientação' },
      {
        type: 'p',
        text: 'Antes de pegar peso, peça ao professor para apresentar os aparelhos e montar um treino adequado ao seu momento. Aprender a execução correta desde o início evita lesões e torna o treino mais eficiente.',
      },
      { type: 'h2', text: '2. Frequência vale mais que intensidade' },
      {
        type: 'p',
        text: 'Para quem está começando, treinar de 2 a 4 vezes por semana com regularidade costuma ser mais produtivo do que treinar todos os dias por duas semanas e desistir. Crie o hábito primeiro; a intensidade vem depois.',
      },
      { type: 'h2', text: '3. Aumente a carga aos poucos' },
      {
        type: 'p',
        text: 'A progressão deve ser gradual. Quando você completar as repetições propostas com boa técnica e alguma folga, é sinal de que dá para aumentar um pouco a carga.',
      },
      { type: 'h2', text: 'Erros comuns de quem está começando' },
      {
        type: 'ul',
        items: [
          'Copiar o treino de outra pessoa sem orientação',
          'Priorizar carga em vez de execução',
          'Pular o aquecimento',
          'Não respeitar o descanso entre os treinos',
          'Esperar resultados em poucas semanas e desanimar',
        ],
      },
      {
        type: 'p',
        text: 'Na Fitness Club, em Canoas, a equipe acompanha quem está começando de perto. Se quiser dar o primeiro passo, agende uma aula experimental e venha conhecer a academia.',
      },
    ],
  },
  {
    slug: 'quantas-vezes-por-semana-treinar',
    title: 'Quantas vezes por semana devo treinar?',
    description:
      'Descubra quantos dias por semana treinar de acordo com seu objetivo e sua rotina, e por que o descanso também faz parte do resultado.',
    publishedAt: '2026-10-06',
    readingMinutes: 4,
    category: 'Rotina',
    blocks: [
      {
        type: 'p',
        text: 'Essa é uma das dúvidas mais comuns de quem entra na academia. A resposta depende do seu objetivo, do seu nível de condicionamento e, principalmente, da rotina que você consegue manter.',
      },
      { type: 'h2', text: 'O que dizem as recomendações gerais' },
      {
        type: 'p',
        text: 'A Organização Mundial da Saúde recomenda que adultos façam de 150 a 300 minutos de atividade física moderada por semana, além de exercícios de fortalecimento muscular em pelo menos dois dias. Isso pode ser distribuído do jeito que for melhor para você.',
      },
      { type: 'h2', text: 'Um ponto de partida prático' },
      {
        type: 'ul',
        items: [
          'Iniciantes: 2 a 3 treinos por semana, com um dia de descanso entre eles',
          'Intermediários: 3 a 5 treinos, alternando grupos musculares ou modalidades',
          'Avançados: frequência maior, com planejamento e recuperação bem definidos',
        ],
      },
      { type: 'h2', text: 'Descanso também é treino' },
      {
        type: 'p',
        text: 'É durante o descanso que o corpo se recupera e se adapta. Dormir bem e respeitar os intervalos entre treinos intensos faz parte do processo.',
      },
      {
        type: 'p',
        text: 'Com a Fitness Club aberta das 5h às 23h durante a semana, fica mais fácil encaixar o treino na sua rotina. Fale com a nossa equipe para montar a frequência ideal para você.',
      },
    ],
  },
]

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug)
}

export function getAllPosts(): Post[] {
  return [...posts].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
}
