import { site } from '@/content/site'

export function whatsappUrl(message: string = site.whatsappDefaultMessage): string {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`
}

export function whatsappMessageForModality(modalityName: string): string {
  return `Olá! Vim pelo site da Fitness Club e quero agendar uma aula experimental de ${modalityName}.`
}

export const phoneUrl = `tel:${site.phone.e164}`

export const mapsDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(site.mapsQuery)}`

export const mapsEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(site.mapsQuery)}&z=16&output=embed`
