import { z } from 'zod'
import { linkZ } from './link'

export const badgeZ = z.object({
  _type: z.literal('badge'),
  _key: z.string().optional(),
  title: z.string().nullable().optional(),
  text: z.string().nullable().optional(),
  link: linkZ.nullable(),
})

export type Badge = z.infer<typeof badgeZ>
