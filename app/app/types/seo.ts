import { z } from 'zod'

export const seoZ = z.object({
  _type: z.literal('seo'),
  title: z.string().optional(),
  metaDescription: z.string().optional(),
})

export type Seo = z.infer<typeof seoZ>
