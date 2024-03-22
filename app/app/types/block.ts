import { z } from 'zod'
// import { BLOCK_TYPES_QUERY } from '~/sanity/querie'
import { globalContentZ } from './globalContent'
import { logoCloudZ } from './logoCloud'
// import { Props } from '~/components/PageSection'
import { textBlockZ } from './textBlock'
import { buttonZ } from './button'
import { imageZ } from './image'
import { badgeZ } from './badge'
import { faqsZ } from './faqs'
import { ctaBlockZ } from './ctaBlock'
import { checklistZ } from './checklist'

// export type BlockType = keyof typeof BLOCK_TYPES_QUERY
export type BlockType =
  | 'badge'
  | 'block'
  | 'button'
  | 'checklist'
  | 'ctaBlock'
  | 'faq'
  | 'image'
  | 'logoCloud'

// can we infer the types from the union?
export const blockZ = z.union([
  badgeZ,
  buttonZ,
  ctaBlockZ,
  checklistZ,
  faqsZ,
  imageZ,
  logoCloudZ,
  textBlockZ,
])

export type Block = z.infer<typeof blockZ>

// TODO: am i still using this?
export const blocksZ = z.union([
  globalContentZ,
  logoCloudZ,
  // portableTextZ,
])
