import { z } from 'zod'

export const categoryZ = z.object({
  _type: z.literal('category'),
  _id: z.string(),
  name: z.string().nullable(),
  slug: z.string().nullable(),
  description: z.string().optional().nullable(),
})

export type Category = z.infer<typeof categoryZ>
