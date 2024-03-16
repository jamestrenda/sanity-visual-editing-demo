import { z } from 'zod'
import { badgeZ } from './badge'
import { sanityImageObjectExtendedZ } from './image'
import { videoZ } from './video'

export const heroZ = z.object({
  badge: badgeZ,
  title: z.string(),
  subtitle: z.string(),
  image: sanityImageObjectExtendedZ,
  video: videoZ.optional().nullable(),
})

export type Hero = z.infer<typeof heroZ>
