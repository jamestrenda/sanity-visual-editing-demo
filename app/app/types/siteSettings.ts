import { z } from 'zod'
import { sanityImageObjectExtendedZ } from './image'
import { addressZ } from './address'

export const siteSettingsZ = z.object({
  title: z.string().nullable(),
  siteTitle: z.string().nullable(),
  tagline: z.string().nullable(),
  siteUrl: z.string().url().nullable(),
  logo: sanityImageObjectExtendedZ.nullable(),
  favicon: sanityImageObjectExtendedZ.nullable(),
  address: addressZ.optional().nullable(),
  phone: z.string().optional().nullable(),
  email: z.string().email().optional().nullable(),
  googleSiteVerification: z.string().optional().nullable(),
  gtm: z.string().optional().nullable(),
})

export type SiteSettings = z.infer<typeof siteSettingsZ>
