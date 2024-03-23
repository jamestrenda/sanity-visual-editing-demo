import { z } from 'zod'
import { linkZ } from './link'

export const buttonZ = z.object({
  _type: z.literal('button'),
  _key: z.string().optional(),
  link: linkZ,
})

export type Button = z.infer<typeof buttonZ>
