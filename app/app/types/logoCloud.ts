import { z } from 'zod'
import { sanityImageObjectExtendedZ } from './image'
import { badgeZ } from './badge'

export const logoCloudZ = z.object({
  _type: z.literal('logoCloud'),
  _key: z.string(),
  badge: badgeZ.optional(),
  title: z.string(),
  text: z.any(), // TOOD: add portable text type
  logos: z.array(sanityImageObjectExtendedZ),
})

export type LogoCloud = z.infer<typeof logoCloudZ>
