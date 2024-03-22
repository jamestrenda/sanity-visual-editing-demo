import { z } from 'zod'
import { sanityImageObjectExtendedZ } from './image'
import { badgeZ } from './badge'

export const statZ = z.object({
  _key: z.string(),
  _type: z.literal('stat'),
  name: z.string().nullable(),
  value: z.number().nullable(),
  prefix: z.string().nullable(),
  suffix: z.string().nullable(),
})

export const statsZ = z.object({
  _key: z.string(),
  _type: z.literal('statsBlock'),
  badge: badgeZ,
  title: z.string().nullable(),
  text: z.any().nullable(), // PortableTextBlock
  image: sanityImageObjectExtendedZ,
  stats: z.array(statZ).nullable(),
})

export type Stat = z.infer<typeof statZ>
export type Stats = z.infer<typeof statsZ>
