import Image from 'next/image'

import { cn } from '@/lib/cn'

import { BRAND_ASSETS, type BrandAsset } from './assets'

export interface LogoProps {
  variant?: Exclude<BrandAsset, 'oGold'>
  /** Rendered height in px; width follows the asset's aspect ratio */
  height?: number
  priority?: boolean
  className?: string
}

export function Logo({ variant = 'wordIvory', height = 28, priority, className }: LogoProps) {
  const asset = BRAND_ASSETS[variant]
  const width = Math.round((asset.width / asset.height) * height)
  return (
    <Image
      src={asset.src}
      width={width}
      height={height}
      alt="EOPAR"
      priority={priority}
      className={cn('block h-auto max-w-full', className)}
      style={{ width, height: 'auto' }}
    />
  )
}
