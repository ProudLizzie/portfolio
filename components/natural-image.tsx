import Image from 'next/image'
import { cn } from '@/lib/utils'
import { imageDimensions } from '@/lib/image-dimensions'

// Fallback ratio for images whose intrinsic size isn't known (e.g. a missing
// or placeholder file). Reserves a sensible box instead of collapsing to 0.
const FALLBACK = { width: 4, height: 3 }

/**
 * Renders a responsive image that always preserves its natural aspect ratio.
 *
 * Instead of forcing the image into a fixed-ratio frame with `fill` +
 * `object-cover` (which crops or squishes), this uses each image's real
 * intrinsic dimensions (from lib/image-dimensions.ts) so the frame reserves
 * the correct aspect-ratio box and the photo fills the available width while
 * keeping its natural proportions — never cropped, stretched, or collapsed.
 *
 * The surrounding container should size itself to the image (no fixed
 * `aspect-*`); this component fills width and derives height from the ratio.
 */
export function NaturalImage({
  src,
  alt,
  sizes = '100vw',
  className,
  priority,
}: {
  src: string
  alt: string
  sizes?: string
  className?: string
  priority?: boolean
}) {
  const resolved = src || '/placeholder.svg'
  const { width, height } = imageDimensions[resolved] ?? FALLBACK

  return (
    <Image
      src={resolved}
      alt={alt}
      width={width}
      height={height}
      sizes={sizes}
      priority={priority}
      // Real width/height reserve the correct ratio; the CSS renders it fluidly
      // at the container's width with height following the natural proportions.
      className={cn('h-auto w-full', className)}
    />
  )
}
