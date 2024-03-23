import { z } from 'zod'
import { sanityImageObjectExtendedZ } from './image'
import { badgeZ } from './badge'

export const statZ = z.object({
  _key: z.string().optional(),
  _type: z.literal('stat').optional(),
  name: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  value: z.number().optional().nullable(),
  prefix: z.string().optional().nullable(),
  suffix: z.string().optional().nullable(),
})

export const statsZ = z.object({
  _key: z.string(),
  _type: z.literal('statsBlock'),
  badge: badgeZ,
  title: z.string().nullable(),
  text: z.any().nullable(), // PortableTextBlock
  image: sanityImageObjectExtendedZ,
  stats: z.array(statZ).nullable(),
  anchor: z.string().nullable(),
})

export type Stat = z.infer<typeof statZ>
export type Stats = z.infer<typeof statsZ>
