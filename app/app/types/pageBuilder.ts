import { z } from 'zod'
import { blockZ } from './block'

export const sectionZ = z.object({
  _type: z.literal('section'),
  _key: z.string(),
  blocks: z.array(blockZ),
})
export const sectionsZ = z.array(sectionZ).optional().nullable()

export type PageSection = z.infer<typeof sectionZ>

export type PageBuilder = z.infer<typeof sectionsZ>
