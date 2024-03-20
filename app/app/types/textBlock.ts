import { type PortableTextBlock } from '@sanity/types'
import { schemaForType } from './schemaForType'
import { z } from 'zod'

export type TextBlock = PortableTextBlock

export const textBlockZ = schemaForType<TextBlock>()(
  z.object({
    _type: z.literal('block'),
    _key: z.string(),
    markDefs: z.array(z.unknown()),
    style: z.string(),
    children: z.array(
      z.object({
        _type: z.literal('span'),
        _key: z.string(),
        marks: z.array(z.unknown()),
        text: z.string(),
      }),
    ),
  }),
)
