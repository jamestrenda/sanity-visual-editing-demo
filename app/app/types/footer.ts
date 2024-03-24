import { z } from 'zod'
import { sanityImageObjectExtendedZ } from './image'
import { addressZ } from './address'
import { menuZ } from './menu'
import { socialMediaZ } from './company'

export const footerZ = z.object({
  siteTitle: z.string(),
  tagline: z.string().nullable(),
  address: addressZ.nullable(),
  socialMedia: socialMediaZ.nullable(),
  logo: sanityImageObjectExtendedZ.nullable(),
  menus: z.array(menuZ).nullable(),
})

export type Footer = z.infer<typeof footerZ>
