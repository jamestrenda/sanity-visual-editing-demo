import { z } from 'zod'
import { heroZ } from './hero'

export const homeZ = z.object({
  hero: heroZ,
})

export type Home = z.infer<typeof homeZ>
