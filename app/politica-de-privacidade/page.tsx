import { PageHero } from '@/components/layout/page-hero'
import { JsonLd } from '@/components/seo/json-ld'
import { Container } from '@/components/ui/container'
import { site } from '@/content/site'
import { breadcrumbJsonLd, buildMetadata } from '@/lib/seo'

const crumbs = [
  { name: 'Início', path: '/' },
  { name: 'Política de privacidade', path: '/politica-de-privacidade' },
]

const LAST_UPDATE = '6 de outubro de 2026'

export const metadata = buildMetadata({
  title: 'Política de privacidade',
  description: `Saiba como a ${site.name} coleta, usa e protege seus dados pessoais, em conformidade com a LGPD (Lei 13.709/2018).`,
  path: '/politica-de-privacidade',
})

/**
 * Modelo-base em linguagem simples. DEVE ser revisado pelo jurídico/cliente antes da publicação,
 * especialmente controlador, encarregado (DPO) e prazos de retenção.
 */
const sections: { title: string; body: string[] }[] = [
  {
    title: '1. Quem somos',
    body: [
      `${site.name} (${site.legalName}, CNPJ ${site.cnpj}), com sede na ${site.address.street}, ${site.address.neighborhood}, ${site.address.city}/${site.address.state}, é a controladora dos dados pessoais tratados neste site.`,
    ],
  },
  {
    title: '2. Quais dados coletamos',
    body: [
      'Formulário de aula experimental: nome, número de WhatsApp, modalidade de interesse e melhor período para contato. Não pedimos informações de saúde pelo site.',
      'Navegação: com o seu consentimento, cookies de análise (Google Analytics) coletam dados de uso de forma agregada, como páginas visitadas e tipo de dispositivo.',
    ],
  },
  {
    title: '3. Para que usamos',
    body: [
      'Entrar em contato para agendar a aula experimental e responder às suas dúvidas (base legal: consentimento, art. 7º, I, da LGPD).',
      'Entender como o site é usado para melhorá-lo, apenas se você aceitar os cookies de análise.',
    ],
  },
  {
    title: '4. Compartilhamento',
    body: [
      'Não vendemos seus dados. Eles podem ser processados por fornecedores que nos ajudam a operar o site (hospedagem, envio de e-mail e análise de acesso), sempre com obrigação de confidencialidade e segurança.',
    ],
  },
  {
    title: '5. Por quanto tempo guardamos',
    body: [
      'Os dados do formulário são mantidos pelo tempo necessário para o atendimento do seu pedido e, depois, excluídos ou anonimizados, salvo obrigação legal. [CONFIRMAR PRAZO COM A ACADEMIA]',
    ],
  },
  {
    title: '6. Seus direitos',
    body: [
      'Você pode, a qualquer momento, solicitar acesso, correção, exclusão ou portabilidade dos seus dados, além de revogar o consentimento. Basta entrar em contato pelos canais abaixo.',
      'As preferências de cookies podem ser alteradas no rodapé do site, em "Preferências de cookies".',
    ],
  },
  {
    title: '7. Segurança',
    body: [
      'Usamos conexão segura (HTTPS), validação dos dados no servidor e acesso restrito às informações recebidas.',
    ],
  },
  {
    title: '8. Contato e encarregado (DPO)',
    body: [
      `Encarregado: [NOME DO ENCARREGADO]. E-mail: ${site.email}. Telefone: ${site.phone.display}.`,
    ],
  },
]

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="LGPD"
        title="Política de privacidade"
        description={`Última atualização: ${LAST_UPDATE}.`}
        breadcrumbs={crumbs}
        size="md"
      />
      <section className="py-16 sm:py-24">
        <Container className="max-w-3xl space-y-10">
          {sections.map((section) => (
            <div key={section.title}>
              <h2 className="text-2xl font-extrabold">{section.title}</h2>
              <div className="mt-3 space-y-3 text-mute">
                {section.body.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                ))}
              </div>
            </div>
          ))}
        </Container>
      </section>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
    </>
  )
}
