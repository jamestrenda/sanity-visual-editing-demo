import { z } from 'zod'

export const postZ = z.object({
  _type: z.literal('post'),
  _id: z.string(),
  title: z.string(),
})

export type Page = z.infer<typeof postZ>
