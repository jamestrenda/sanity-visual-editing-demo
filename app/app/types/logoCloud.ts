import { z } from 'zod'
import { sanityImageObjectExtendedZ } from './image'

export const logoCloudZ = z.object({
  _type: z.literal('logoCloud'),
  _key: z.string(),
  logos: z.array(sanityImageObjectExtendedZ),
})

export type LogoCloud = z.infer<typeof logoCloudZ>
