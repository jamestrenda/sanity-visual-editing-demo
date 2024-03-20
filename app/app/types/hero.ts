import { z } from 'zod'
import { badgeZ } from './badge'
import { sanityImageObjectExtendedZ } from './image'
import { videoZ } from './video'
import { linkZ } from './link'

export const heroZ = z.object({
  badge: badgeZ.nullable().optional(),
  title: z.string().optional().nullable(),
  subtitle: z.string().optional().nullable(),
  image: sanityImageObjectExtendedZ.optional().nullable(),
  video: videoZ.optional().nullable(),
  style: z.object({
    fullHeight: z.boolean(),
  }),
  primaryCTA: linkZ.optional().nullable(),
  secondaryCTA: linkZ.optional().nullable(),
  hideHero: z.boolean(),
})

export type Hero = z.infer<typeof heroZ>
