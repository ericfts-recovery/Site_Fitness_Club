import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { ImageResponse } from 'next/og'
import { site } from '@/content/site'

export const alt = `${site.name}: academia em Canoas, Av. Boqueirão`
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OpengraphImage() {
  const anton = await readFile(join(process.cwd(), 'assets/fonts/anton.woff'))

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 72,
        background: '#0a0a0b',
        color: '#f3f1ea',
        fontFamily: 'Anton',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: 12,
            background: '#cf1e3b',
            color: '#f3f1ea',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 44,
          }}
        >
          F
        </div>
        <div style={{ fontSize: 40, letterSpacing: 2 }}>FITNESS CLUB CANOAS</div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', fontSize: 132, lineHeight: 0.9 }}>
        <span>TREINE FORTE.</span>
        <span style={{ color: '#cf1e3b' }}>EVOLUA DE VERDADE.</span>
      </div>
      <div style={{ fontSize: 30, color: '#a6a6ad', letterSpacing: 1 }}>
        AV. BOQUEIRÃO, 2151 · ESTÂNCIA VELHA · SEG–SEX 5H ÀS 23H
      </div>
    </div>,
    { ...size, fonts: [{ name: 'Anton', data: anton, style: 'normal', weight: 400 }] },
  )
}
