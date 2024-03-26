import { z } from 'zod'
import { imageZ } from './image'

export const authorZ = z.object({
  _type: z.literal('author'),
  _id: z.string(),
  name: z.string(),
  position: z.string(),
  image: imageZ.nullable(),
})
