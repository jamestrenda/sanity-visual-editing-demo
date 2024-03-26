import { z } from 'zod'
import { linkZ } from './link'

export const badgeZ = z.object({
  _type: z.literal('badge').optional(),
  _key: z.string().optional(),
  title: z.string().nullable().optional(),
  text: z.string().nullable().optional(),
  link: linkZ.nullable().optional(),
})

export type Badge = z.infer<typeof badgeZ>
