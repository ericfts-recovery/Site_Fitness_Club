'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { CircleAlert, CircleCheck, LoaderCircle } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useId, useRef, useState, type ChangeEvent, type ReactNode } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { TrackedLink } from '@/components/analytics/tracked-link'
import { WhatsappIcon } from '@/components/ui/brand-icons'
import { submitLead } from '@/lib/actions/submit-lead'
import { track } from '@/lib/analytics'
import { cn } from '@/lib/cn'
import {
  leadSchema,
  PERIOD_OPTIONS,
  UNDECIDED_MODALITY,
  type LeadData,
  type LeadFormInput,
} from '@/lib/validation/lead-schema'
import { whatsappUrl } from '@/lib/whatsapp'

type Status =
  { kind: 'idle' } | { kind: 'success'; firstName: string } | { kind: 'error'; message: string }

function maskPhone(value: string): string {
  const d = value.replace(/\D/g, '').slice(0, 11)
  if (d.length <= 2) return d.length ? `(${d}` : ''
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`
}

const inputClass =
  'block w-full min-h-13 rounded-[var(--radius-md)] border border-line-strong bg-ink px-4 py-3 text-base text-bone placeholder:text-mute-dark transition-colors focus:border-volt focus:outline-none aria-[invalid=true]:border-ember'

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string
  label: string
  error?: string
  children: ReactNode
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-semibold">
        {label}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} role="alert" className="mt-2 text-sm text-ember">
          {error}
        </p>
      ) : null}
    </div>
  )
}

export function LeadForm({ modalityOptions }: { modalityOptions: string[] }) {
  const formId = useId()
  const startedAtRef = useRef(0)
  const [status, setStatus] = useState<Status>({ kind: 'idle' })

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    control,
    formState: { errors, isSubmitting },
  } = useForm<LeadFormInput, unknown, LeadData>({
    resolver: zodResolver(leadSchema),
    defaultValues: { name: '', phone: '', modality: '', website: '', startedAt: 1 },
  })

  useEffect(() => {
    startedAtRef.current = Date.now()
  }, [])

  const selectedModality = useWatch({ control, name: 'modality' })
  const nameValue = useWatch({ control, name: 'name' })
  const continueMessage = `Olá! Me chamo ${nameValue || '[seu nome]'} e acabei de pedir uma aula experimental pelo site${
    selectedModality && selectedModality !== UNDECIDED_MODALITY ? ` (${selectedModality})` : ''
  }.`

  const onValid = async (data: LeadData) => {
    setStatus({ kind: 'idle' })
    const result = await submitLead({ ...data, startedAt: startedAtRef.current })

    if (result.status === 'success') {
      track('lead_form_submit', { location: 'lead_section', modality: data.modality })
      setStatus({ kind: 'success', firstName: result.firstName })
      return
    }

    track('lead_form_error', { location: 'lead_section' })
    for (const [field, message] of Object.entries(result.fieldErrors ?? {})) {
      if (message) setError(field as keyof LeadFormInput, { message })
    }
    setStatus({ kind: 'error', message: result.message })
  }

  if (status.kind === 'success') {
    return (
      <div role="status" className="flex flex-col items-start gap-5 py-6">
        <CircleCheck className="size-12 text-volt" aria-hidden="true" />
        <h3 className="display text-4xl">
          Pedido enviado{status.firstName ? `, ${status.firstName}` : ''}!
        </h3>
        <p className="text-mute">
          Nossa recepção vai entrar em contato pelo WhatsApp para confirmar o melhor dia e horário.
          Quer agilizar?
        </p>
        <TrackedLink
          href={whatsappUrl(continueMessage)}
          event="cta_whatsapp_click"
          params={{ location: 'lead_success' }}
          className="inline-flex min-h-12 items-center gap-2 rounded-full bg-volt px-6 text-sm font-bold tracking-wide text-on-volt uppercase"
        >
          <WhatsappIcon className="size-5" />
          Continuar no WhatsApp
        </TrackedLink>
      </div>
    )
  }

  const describe = (field: keyof LeadFormInput) =>
    errors[field]
      ? { 'aria-invalid': true as const, 'aria-describedby': `${formId}-${field}-error` }
      : {}

  return (
    <form
      onSubmit={(event) => void handleSubmit(onValid)(event)}
      noValidate
      className="space-y-5"
      aria-describedby={`${formId}-privacy`}
    >
      <Field id={`${formId}-name`} label="Nome" error={errors.name?.message}>
        <input
          id={`${formId}-name`}
          type="text"
          autoComplete="given-name"
          placeholder="Como podemos te chamar?"
          className={inputClass}
          {...describe('name')}
          {...register('name')}
        />
      </Field>

      <Field id={`${formId}-phone`} label="WhatsApp" error={errors.phone?.message}>
        <input
          id={`${formId}-phone`}
          type="tel"
          inputMode="numeric"
          autoComplete="tel-national"
          placeholder="(51) 90000-0000"
          className={inputClass}
          {...describe('phone')}
          {...register('phone', {
            onChange: (e: ChangeEvent<HTMLInputElement>) =>
              setValue('phone', maskPhone(e.target.value)),
          })}
        />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          id={`${formId}-modality`}
          label="Modalidade de interesse"
          error={errors.modality?.message}
        >
          <select
            id={`${formId}-modality`}
            className={inputClass}
            {...describe('modality')}
            {...register('modality')}
          >
            <option value="" disabled>
              Selecione
            </option>
            {modalityOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
            <option value={UNDECIDED_MODALITY}>{UNDECIDED_MODALITY}</option>
          </select>
        </Field>

        <fieldset>
          <legend className="mb-2 block text-sm font-semibold">Melhor período</legend>
          <div className="grid grid-cols-3 gap-2">
            {PERIOD_OPTIONS.map((period) => (
              <label key={period} className="relative">
                <input
                  type="radio"
                  value={period}
                  className="peer sr-only"
                  {...register('period')}
                />
                <span className="flex min-h-13 cursor-pointer items-center justify-center rounded-[var(--radius-md)] border border-line-strong text-sm font-semibold transition-colors peer-checked:border-volt peer-checked:bg-volt peer-checked:text-on-volt peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-volt">
                  {period}
                </span>
              </label>
            ))}
          </div>
          {errors.period ? (
            <p role="alert" className="mt-2 text-sm text-ember">
              {errors.period.message}
            </p>
          ) : null}
        </fieldset>
      </div>

      {/* Honeypot: invisível para pessoas, preenchido por bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor={`${formId}-website`}>Não preencha este campo</label>
        <input
          id={`${formId}-website`}
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register('website')}
        />
      </div>

      <div>
        <label className="flex cursor-pointer gap-3 text-sm text-mute">
          <input
            type="checkbox"
            className="mt-0.5 size-5 shrink-0 accent-[var(--color-volt)]"
            {...describe('consent')}
            {...register('consent')}
          />
          <span id={`${formId}-privacy`}>
            Autorizo a Fitness Club a entrar em contato comigo pelo WhatsApp sobre a aula
            experimental, conforme a{' '}
            <Link
              href="/politica-de-privacidade"
              className="font-semibold text-bone underline underline-offset-4"
            >
              política de privacidade
            </Link>
            .
          </span>
        </label>
        {errors.consent ? (
          <p id={`${formId}-consent-error`} role="alert" className="mt-2 text-sm text-ember">
            {errors.consent.message}
          </p>
        ) : null}
      </div>

      {status.kind === 'error' ? (
        <div
          role="alert"
          className="flex gap-3 rounded-[var(--radius-md)] border border-ember/40 bg-ember/10 p-4 text-sm"
        >
          <CircleAlert className="size-5 shrink-0 text-ember" aria-hidden="true" />
          <span>{status.message}</span>
        </div>
      ) : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className={cn(
          'inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-full bg-volt px-7 font-bold tracking-wide text-on-volt uppercase transition-colors hover:bg-bone hover:text-ink disabled:cursor-wait disabled:opacity-70',
        )}
      >
        {isSubmitting ? (
          <>
            <LoaderCircle className="size-5 animate-spin" aria-hidden="true" />
            Enviando…
          </>
        ) : (
          'Quero agendar minha aula'
        )}
      </button>

      <p className="text-center text-sm text-mute">
        Prefere conversar agora?{' '}
        <TrackedLink
          href={whatsappUrl()}
          event="cta_whatsapp_click"
          params={{ location: 'lead_form_alt' }}
          className="font-semibold text-bone underline underline-offset-4"
        >
          Falar no WhatsApp
        </TrackedLink>
      </p>
    </form>
  )
}
