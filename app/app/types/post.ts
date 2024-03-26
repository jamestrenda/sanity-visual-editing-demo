import { z } from 'zod'
import { categoryZ } from './category'
import { seoZ } from './seo'
import { blockZ } from './block'
import { authorZ } from './author'
import { imageZ } from './image'

export const postBaseZ = z.object({
  _type: z.literal('post'),
  _id: z.string(),
  title: z.string(),
  publishedAt: z.string(),
  slug: z.string(),
  category: categoryZ,
  author: authorZ,
  featuredImage: imageZ,
})

export const postZ = postBaseZ.extend({
  seo: seoZ,
  sections: z.array(blockZ),
})

export const postListingZ = postBaseZ.extend({
  teaser: z.string(),
  body: z
    .array(
      z.object({
        teaser: z.string().nullable(),
      }),
    )
    .nullable(),
})
export const postsZ = z.array(postListingZ)

export const postsPageZ = z.object({
  count: z.number(),
  posts: z.array(postListingZ),
})

export type PostListing = z.infer<typeof postListingZ>

export type Post = z.infer<typeof postZ>

export type Posts = z.infer<typeof postsZ>

export type PostsPage = z.infer<typeof postsPageZ>
