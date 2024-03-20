import { z } from 'zod'

import { sanityImageObjectExtendedZ } from './image'

export const videoZ = z.object({
  mp4: z.string().url().optional(),
  webm: z.string().url().optional(),
  image: sanityImageObjectExtendedZ.optional().nullable(),
})

export type Video = z.infer<typeof videoZ>
