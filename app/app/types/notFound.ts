import { z } from 'zod'
import { sanityImageObjectExtendedZ } from './image'
import { linkZ } from './link'

export const notFoundZ = z.object({
  _id: z.string(),
  _type: z.literal('notFound'),
  title: z.string().optional().nullable(),
  text: z.array(z.string()).optional().nullable(),
  image: sanityImageObjectExtendedZ.optional().nullable(),
  quickLinks: z.array(linkZ).optional().nullable(),
})

export type NotFound = z.infer<typeof notFoundZ>
