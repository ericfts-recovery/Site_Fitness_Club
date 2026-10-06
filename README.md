# Fitness Club Canoas · Site institucional

Site da **Fitness Club Canoas** (academia na Av. Boqueirão, 2151 · Estância Velha · Canoas/RS), construído com Next.js 16 (App Router), TypeScript estrito e Tailwind CSS 4.

**Objetivo principal de conversão:** agendamento de aula experimental (WhatsApp e formulário).

## Stack

| Camada     | Escolha                                                          |
| ---------- | ---------------------------------------------------------------- |
| Framework  | Next.js 16 (App Router, Server Components, Server Actions)       |
| Linguagem  | TypeScript (`strict` + `noUncheckedIndexedAccess`)               |
| Estilo     | Tailwind CSS 4 com design tokens em `app/globals.css` (`@theme`) |
| Formulário | React Hook Form + Zod (schema único no cliente e no servidor)    |
| E-mail     | Resend via API REST (sem SDK)                                    |
| Fontes     | Anton + Manrope auto-hospedadas com `next/font/local`            |
| Ícones     | lucide-react (+ SVGs próprios para WhatsApp/Instagram)           |
| Deploy     | Vercel                                                           |

> **Por que `next/font/local` em vez de `next/font/google`?** As fontes ficam no repositório (subconjunto latin, ~43 KB no total), o build não depende de rede externa e nenhum dado do visitante vai para servidores do Google (LGPD).

## Começando

```bash
npm install
cp .env.example .env.local   # preencha as variáveis
npm run dev                  # http://localhost:3000
```

Scripts:

```bash
npm run build       # build de produção
npm run start       # serve o build
npm run lint        # ESLint (core-web-vitals + typescript)
npm run typecheck   # tsc --noEmit
npm run format      # Prettier (+ ordenação de classes Tailwind)
```

## Variáveis de ambiente

| Variável               | Obrigatória             | Descrição                                                                |
| ---------------------- | ----------------------- | ------------------------------------------------------------------------ |
| `NEXT_PUBLIC_SITE_URL` | Sim                     | URL pública, sem barra final. Usada em canonical, sitemap, OG e JSON-LD. |
| `NEXT_PUBLIC_GA_ID`    | Não                     | ID do GA4 (`G-XXXX`). Só carrega após o consentimento de cookies.        |
| `RESEND_API_KEY`       | Sim (para o formulário) | Chave secreta do Resend. Nunca usar prefixo `NEXT_PUBLIC_`.              |
| `LEAD_TO_EMAIL`        | Sim (para o formulário) | E-mail da recepção que recebe os pedidos.                                |
| `LEAD_FROM_EMAIL`      | Sim (para o formulário) | Remetente com domínio verificado no Resend.                              |

Sem as variáveis do Resend, o formulário mostra uma mensagem de erro amigável e direciona o visitante ao WhatsApp, para nenhum lead se perder em silêncio.

## Estrutura

```
app/                      Rotas (App Router)
  page.tsx                Home
  modalidades/            Índice + página por modalidade (SSG)
  blog/                   Índice + artigos (SSG)
  politica-de-privacidade/
  sitemap.ts robots.ts manifest.ts opengraph-image.tsx
  not-found.tsx error.tsx global-error.tsx
components/
  ui/                     Primitivos (botões, container, títulos, photo slot)
  layout/                 Header, footer, menu mobile, barra de ação mobile
  sections/               Seções da home e páginas internas
  forms/                  Formulário de aula experimental (carregado sob demanda)
  analytics/              Links rastreados, GA4, banner de cookies
  seo/                    JSON-LD
content/                  TODO o conteúdo editável (dados da academia, modalidades, planos, FAQ, blog)
lib/                      Utilitários (SEO, horários, WhatsApp, analytics, validação, rate limit)
lib/actions/              Server Actions
services/                 Integrações externas (e-mail)
hooks/                    Hooks de cliente
types/                    Tipos de conteúdo
```

**Para reaproveitar em outro cliente**, troque `content/*`, os tokens de `app/globals.css` e as fontes em `app/fonts/`.

## Conteúdo pendente do cliente

Tudo que está entre `[COLCHETES]` precisa ser preenchido/confirmado antes de publicar:

- [ ] **Fotos reais** (salão, cardio, aulas, área infantil, equipe). Preencha `image` nas seções/modalidades. Formato sugerido: JPG/PNG grande, o `next/image` converte para AVIF/WebP.
- [ ] **Logo oficial** em SVG (substituir `components/layout/logo.tsx` e `app/icon.svg`).
- [ ] **Cores da marca**, se forem diferentes do volt/carvão (só trocar os tokens).
- [ ] **Preços e condições dos planos** (`content/home.ts`).
- [ ] **Depoimentos reais** com autorização de uso (`content/home.ts`).
- [ ] **Grade de horários** das aulas coletivas.
- [ ] Confirmar se oferecem **aula experimental** e como funciona.
- [ ] Confirmar se o **WhatsApp** é o mesmo número do telefone `(51) 98906-4871`.
- [ ] **Razão social, CNPJ, e-mail** e **responsável técnico com CREF** (exigência do CREF2/RS).
- [ ] Link do **Google Meu Negócio** (`googleBusinessUrl`).
- [ ] Revisão jurídica da **política de privacidade** (encarregado/DPO e prazo de retenção).
- [ ] Conferir a **nota no Wellhub** antes de publicar (dado público que muda com o tempo).

## SEO

- Metadata por página (title, description, canonical, Open Graph, Twitter) via `lib/seo.ts`.
- `sitemap.xml`, `robots.txt`, `manifest.webmanifest` e imagem OG gerados pelo Next.
- JSON-LD: `ExerciseGym` (NAP, horários, comodidades), `FAQPage`, `BreadcrumbList`, `Service` (modalidades) e `BlogPosting`.
- SEO local: NAP idêntico em todo o site, mapa incorporado, páginas "Modalidade em Canoas".
- Um único `<h1>` por página, HTML semântico e URLs em português.

## Conversão e analytics

Eventos disparados (`lib/analytics.ts`), prontos para marcar como conversão no GA4:

`cta_whatsapp_click`, `cta_phone_click`, `cta_trial_click`, `cta_directions_click`, `cta_instagram_click`, `lead_form_submit`, `lead_form_error` (todos com o parâmetro `location`).

## Segurança e LGPD

- Cabeçalhos de segurança (CSP, HSTS, X-Frame-Options, Referrer-Policy, Permissions-Policy) em `next.config.ts`.
- Formulário: validação Zod no cliente e no servidor, honeypot, armadilha de tempo e rate limit por IP.
- O rate limit atual é em memória; com muito tráfego, troque por Upstash Redis (`lib/rate-limit.ts`). Se aparecer spam, adicione Cloudflare Turnstile.
- Coleta mínima (nome, WhatsApp, modalidade, período), sem dados de saúde, com consentimento explícito.
- GA4 só carrega após o aceite; o visitante pode mudar a escolha em "Preferências de cookies" no rodapé.

## Deploy (Vercel)

1. Suba o repositório no GitHub e importe na Vercel.
2. Configure as variáveis de ambiente (Production e Preview).
3. Aponte o domínio e confirme `NEXT_PUBLIC_SITE_URL`.
4. Após publicar: envie o sitemap no Google Search Console, coloque o link do site no Google Meu Negócio e na bio do Instagram, e rode o PageSpeed Insights na URL de produção.
