import { z } from 'zod'
// import { BLOCK_TYPES_QUERY } from '~/sanity/querie'
import { globalContentZ } from './globalContent'
import { logoCloudZ } from './logoCloud'
// import { Props } from '~/components/PageSection'
import { textBlockZ } from './textBlock'
import { buttonZ } from './button'
import { imageZ } from './image'
import { badgeZ } from './badge'
import { faqsZ } from './faqsZ'

// export type BlockType = keyof typeof BLOCK_TYPES_QUERY
export type BlockType =
  | 'badge'
  | 'block'
  | 'button'
  | 'faq'
  | 'image'
  | 'logoCloud'

// can we infer the types from the union?
export const blockZ = z.union([
  badgeZ,
  buttonZ,
  faqsZ,
  imageZ,
  logoCloudZ,
  textBlockZ,
])

export type Block = z.infer<typeof blockZ>

export const blocksZ = z.union([
  globalContentZ,
  logoCloudZ,
  // portableTextZ,
])
