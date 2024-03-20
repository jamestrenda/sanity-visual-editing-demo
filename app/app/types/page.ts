import { z } from 'zod'
import { heroZ } from './hero'
import { seoZ } from './seo'
import { sectionsZ } from './pageBuilder'

export const pageZ = z.object({
  _type: z.literal('page'),
  _id: z.string(),
  hero: heroZ,
  title: z.string(),
  seo: seoZ,
  sections: sectionsZ,
  slug: z.string(),
  isFrontpage: z.boolean(),
  isPostsPage: z.boolean(),
})

export type Page = z.infer<typeof pageZ>
