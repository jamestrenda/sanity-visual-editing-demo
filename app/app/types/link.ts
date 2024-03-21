import { z } from 'zod'

const linkBaseZ = z.object({
  _key: z.string().optional(),
  linkText: z.string().optional().nullable(),
})

export const linkInternalZ = linkBaseZ.extend({
  _type: z.literal('linkInternal'),
  to: z.string(),
  anchor: z.string().nullable(),
  prefetch: z.enum(['intent', 'viewport', 'render', 'none']).optional(),
})

export const linkExternalZ = linkBaseZ.extend({
  _type: z.literal('linkExternal'),
  newWindow: z.boolean().optional().nullable(),
  href: z.string(),
})

export const linkTypesZ = z.enum(['linkInternal', 'linkExternal'])

export const linkZ = z.union([linkInternalZ, linkExternalZ])

export type LinkInternal = z.infer<typeof linkInternalZ>
export type LinkExternal = z.infer<typeof linkExternalZ>
export type LinkTypes = z.infer<typeof linkTypesZ>
export type Link = z.infer<typeof linkZ> & {
  children?: React.ReactNode
  className?: string
  //   theme?: 'primary' | 'secondary' | 'tertiary';
  //   replaceClassNames?: boolean;
}
