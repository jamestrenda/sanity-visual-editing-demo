import { z } from 'zod'
import { imageZ, sanityImageObjectExtendedZ } from './image'
import { badgeZ } from './badge'

export const logoCloudZ = z.object({
  _type: z.literal('logoCloud'),
  _key: z.string().optional(),
  badge: badgeZ.optional(),
  title: z.string(),
  text: z.any(), // TOOD: add portable text type
  logos: z.array(imageZ),
})

export type LogoCloud = z.infer<typeof logoCloudZ>
