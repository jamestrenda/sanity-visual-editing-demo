import { z } from 'zod'
import { heroZ } from './hero'
import { seoZ } from './seo'
// import { sectionsZ } from './pageBuilder'
import { blockZ, blocksZ } from './block'
import { postListingZ, postZ } from './post'

export const pageZ = z.object({
  _type: z.literal('page'),
  _id: z.string(),
  hero: heroZ,
  title: z.string(),
  seo: seoZ,
  sections: z.array(blockZ),
  slug: z.string(),
  isFrontpage: z.boolean(),
  isPostsPage: z.boolean(),
  posts: z.array(postListingZ).optional().nullable(),
})

export type Page = z.infer<typeof pageZ>
