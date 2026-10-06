export type ConsentValue = 'granted' | 'denied'

const STORAGE_KEY = 'fc-cookie-consent'
const CHANGE_EVENT = 'fc-consent-change'

export function readConsent(): ConsentValue | null {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY)
    return value === 'granted' || value === 'denied' ? value : null
  } catch {
    return null
  }
}

export function writeConsent(value: ConsentValue): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, value)
  } catch {
    // Navegação privada: segue só na sessão atual via evento.
  }
  window.dispatchEvent(new CustomEvent(CHANGE_EVENT))
}

export function resetConsent(): void {
  try {
    window.localStorage.removeItem(STORAGE_KEY)
  } catch {
    // ignore
  }
  window.dispatchEvent(new CustomEvent(CHANGE_EVENT))
}

export function subscribeConsent(callback: () => void): () => void {
  window.addEventListener(CHANGE_EVENT, callback)
  window.addEventListener('storage', callback)
  return () => {
    window.removeEventListener(CHANGE_EVENT, callback)
    window.removeEventListener('storage', callback)
  }
}
