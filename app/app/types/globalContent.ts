import { z } from 'zod'
import { logoCloudZ } from './logoCloud'
import { textBlockZ } from './textBlock'

export const globalContentZ = z.object({
  _type: z.literal('globalContent'),
  title: z.string(),
  block: z.union([logoCloudZ, textBlockZ]),
})

export type GlobalContent = z.infer<typeof globalContentZ>
