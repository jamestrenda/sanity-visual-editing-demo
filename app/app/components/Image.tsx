import { MotionProps, m } from 'framer-motion'
// import type { PortableTextComponentProps } from '@portabletext/react'
import type {
  SanityImageAsset,
  SanityImageObjectStub,
  SanityImageSource,
} from '@sanity/asset-utils'
import {
  getDefaultHotspot,
  getImageAsset,
  getImageDimensions,
} from '@sanity/asset-utils'
// import urlBuilder from '@sanity/image-url'

import { dataset, projectId } from '~/sanity/projectDetails'
import { cn } from '~/utils/misc'
import imageUrlBuilder from '@sanity/image-url'

import { client } from '~/sanity/client'
import { FitMode } from '@sanity/image-url/lib/types/types'
import { ImageObject, SanityImageObjectExtended } from '~/types/image'

// type SanityImageAssetWithAlt = SanityImageSource & {
//   altText?: string | null
// }

// const baseUrl = `https://cdn.sanity.io/images/${projectId}/${dataset}/`

const builder = imageUrlBuilder(client)

export type ImageProps = {
  source: SanityImageObjectExtended
  alt?: string | null
  fit?: FitMode | null
}

export default function Image(
  props: ImageProps & MotionProps & React.ImgHTMLAttributes<HTMLImageElement>,
) {
  // return <> </>
  const { source, variants, className, width, height, alt, fit, ...rest } =
    props

  const { asset, hotspot, crop } = source

  const { width: sourceWidth, height: sourceHeight } = asset
    ? getImageDimensions(asset)
    : { width: 0, height: 0 }

  // console.log({ asset, hotspot, crop })
  // console.log({ source })
  const focalpoint = hotspot ?? getDefaultHotspot()

  // console.log({ focalpoint })
  // const MotionImage = m(SanityImage)

  // return asset ? (
  // <m.div

  // >
  //   <MotionImage
  //     baseUrl={baseUrl}
  //     id={asset._id}
  //     alt={alt ?? asset.altText ?? ''}
  //     width={Number(width) ?? sourceWidth}
  //     height={Number(height) ?? sourceHeight}
  //     loading="eager"
  //     //   height={500}
  //     queryParams={{ q: 100, fm: 'webp' }}
  //     crop={crop ?? undefined}
  //     hotspot={hotspot ?? undefined}
  //     // preview={asset.metadata?.lqip ?? ''}
  //     className={cn(`h-auto w-full`, className)}
  //     sizes="(min-width: 768px) 96vw, 100vw"
  //     initial="initial"
  //     whileInView="visible"
  //     viewport={{ once: true }}
  //     variants={variants}
  //   />
  // ) : // </m.div>
  // null

  return asset ? (
    <m.img
      className={cn(`h-auto w-full`, className)}
      src={builder
        .image(asset)
        .width(width ? Number(width) : sourceWidth)
        .height(height ? Number(height) : sourceHeight)
        .fit(fit ?? 'crop')
        .crop('focalpoint')
        .focalPoint(focalpoint.x, focalpoint.y)
        .auto('format')
        .url()}
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
  ) : null
}

// const Image = (
//   props: { id: string } & Omit<
//     React.ComponentProps<typeof SanityImage>,
//     'baseUrl' | 'dataset' | 'projectId'
//   >,
// ) => {
//   const MotionImage = m(React.forwardRef(SanityImage))
//   return (
//     <MotionImage
//       {...props}
//       baseUrl={baseUrl}
//       initial="initial"
//       animate="visible"
//       viewport={{ once: true }}
//     />
//   )
// }

// export default Image
