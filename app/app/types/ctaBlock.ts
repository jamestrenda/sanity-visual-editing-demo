import { z } from 'zod'
import { badgeZ } from './badge'
import { sanityImageObjectExtendedZ } from './image'
import { videoZ } from './video'
import { linkZ } from './link'

export const ctaBlockZ = z.object({
  badge: badgeZ.nullable(),
  title: z.string().nullable(),
  subtitle: z.string().nullable(),
  image: sanityImageObjectExtendedZ.nullable(),
  style: z.object({
    fullHeight: z.boolean(),
  }),
  primaryCTA: linkZ.nullable(),
  secondaryCTA: linkZ.nullable(),
  anchor: z.string().nullable(),
})

export type CallToActionBlock = z.infer<typeof ctaBlockZ>
