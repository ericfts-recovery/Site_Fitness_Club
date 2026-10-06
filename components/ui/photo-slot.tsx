import Image from 'next/image'
import { Camera } from 'lucide-react'
import { cn } from '@/lib/cn'
import type { ImageAsset } from '@/types/content'

interface PhotoSlotProps {
  image: ImageAsset | null
  /** Descrição da foto que deve entrar aqui (aparece no placeholder). */
  hint: string
  className?: string
  sizes?: string
  priority?: boolean
}

/**
 * Exibe a foto real quando fornecida; senão, um placeholder com a indicação
 * da foto necessária. Ao receber as fotos do cliente, basta preencher `image`
 * no arquivo de conteúdo. O contêiner reserva o espaço (sem CLS).
 */
export function PhotoSlot({
  image,
  hint,
  className,
  sizes = '100vw',
  priority = false,
}: PhotoSlotProps) {
  return (
    <div className={cn('relative overflow-hidden bg-ink-3', className)}>
      {image ? (
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      ) : (
        <div className="stripes absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgb(207_30_59/0.14),transparent_60%)]" />
          <Camera className="relative size-7 text-mute" aria-hidden="true" />
          <p className="relative max-w-56 text-xs font-semibold tracking-wider text-mute uppercase">
            [Foto: {hint}]
          </p>
        </div>
      )}
    </div>
  )
}
