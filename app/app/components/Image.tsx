import { MotionProps, m } from 'framer-motion'
import { getDefaultHotspot, getImageDimensions } from '@sanity/asset-utils'

import { cn } from '~/utils/misc'
import imageUrlBuilder from '@sanity/image-url'

import { client } from '~/sanity/client'
import { FitMode } from '@sanity/image-url/lib/types/types'
import { SanityImageObjectExtended } from '~/types/image'

// const baseUrl = `https://cdn.sanity.io/images/${projectId}/${dataset}/`

const builder = imageUrlBuilder(client)

export type ImageProps = {
  source: SanityImageObjectExtended
  alt?: string
  fit?: FitMode
  q?: number
}

export default function Image(
  props: ImageProps & MotionProps & React.ImgHTMLAttributes<HTMLImageElement>,
) {
  const {
    source,
    variants,
    className,
    width,
    height,
    alt,
    q,
    fit = 'crop',
    ...rest
  } = props

  const { asset, hotspot, crop } = source

  const { width: sourceWidth, height: sourceHeight } = asset
    ? getImageDimensions(asset)
    : { width: 0, height: 0 }

  const focalpoint = hotspot ?? getDefaultHotspot()

  if (!asset) return null

  const src = builder.image(asset).withOptions({
    w: width ? Number(width) : undefined,
    h: height ? Number(height) : undefined,
    fit: fit ?? 'crop',
    crop: 'focalpoint',
    focalPoint: {
      x: focalpoint.x,
      y: focalpoint.y,
    },
    q: q ?? 80,
    auto: 'format',
  })

  return (
    <m.img
      className={cn(`h-auto w-full`, className)}
      src={src.url()}
      alt={alt ?? asset.altText ?? ''}
      loading="lazy"
      variants={variants}
      initial="initial"
      whileInView="visible"
      viewport={{ once: true }}
      style={{
        // Display alongside text if image appears inside a block text span
        // display: isInline ? 'inline-block' : 'block',

        // Avoid jumping around with aspect-ratio CSS property
        aspectRatio: sourceWidth / sourceHeight,
      }}
      {...rest}
    />
  )
}
