import { MotionProps, m } from 'framer-motion'
// import type { PortableTextComponentProps } from '@portabletext/react'
import type { SanityImageSource } from '@sanity/asset-utils'
import { getImageDimensions } from '@sanity/asset-utils'
// import urlBuilder from '@sanity/image-url'

import { dataset, projectId } from '~/sanity/projectDetails'
import { cn } from '~/utils/misc'
import imageUrlBuilder from '@sanity/image-url'

import { client } from '~/sanity/client'
import { FitMode } from '@sanity/image-url/lib/types/types'

type SanityImageAssetWithAlt = SanityImageSource & {
  altText?: string | null
}

// const baseUrl = `https://cdn.sanity.io/images/${projectId}/${dataset}/`

const builder = imageUrlBuilder(client)

type Props = {
  source: SanityImageAssetWithAlt
  alt?: string | null
  fit?: FitMode | null
}

export default function Image(
  props: Props & MotionProps & React.ImgHTMLAttributes<HTMLImageElement>,
) {
  const { source, variants, className, width, height, alt, fit, ...rest } =
    props
  const { width: sourceWidth, height: sourceHeight } =
    getImageDimensions(source)

  return (
    <m.img
      className={cn(`h-auto w-full`, className)}
      src={builder
        .image(source)
        .width(width ? Number(width) : sourceWidth)
        .height(height ? Number(height) : sourceHeight)
        .auto('format')
        .url()}
      alt={alt ?? source.altText ?? ''}
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
