import { z } from 'zod'
import { BLOCK_TYPES_QUERY } from '~/sanity/queries'
// import { schemaForType } from './schemaForType';
import { globalContentZ } from './globalContent'
import { logoCloudZ } from './logoCloud'
import { Props } from '~/components/PageSection'
import { textBlockZ } from './textBlock'

export type BlockType = keyof typeof BLOCK_TYPES_QUERY

type Blocks = Props['component']

// export const blockTypes = [
//   ...Object.keys(BLOCK_TYPES_QUERY).map((key) => z.literal(key as Blocks)),
// ]

export const blockZ = z.union([logoCloudZ, textBlockZ])

export type Block = z.infer<typeof blockZ>

// not sure how to load these in dynamically, so for now we'll just have to do it manually
export const blocksZ = z.union([
  globalContentZ,
  logoCloudZ,
  // portableTextZ,
])

// export const modulesBaseZ = schemaForType<ModuleBase>()(ModuleProps['component']);

// export const modulesZ = z.union(
