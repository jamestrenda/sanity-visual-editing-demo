import { z } from 'zod'
import { badgeZ } from './badge'
import { sanityImageObjectExtendedZ } from './image'

export const heroZ = z.object({
  badge: badgeZ,
  title: z.string(),
  subtitle: z.string(),
  image: sanityImageObjectExtendedZ,
  video: z.string().url().optional(),
})

export type Hero = z.infer<typeof heroZ>
