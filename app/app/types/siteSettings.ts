import { z } from 'zod'
import { sanityImageObjectExtendedZ } from './image'
import { redirectsZ } from './redirect'
import { companyZ } from './company'
import { menuZ } from './menu'
import { notFoundZ } from './notFound'

export const siteSettingsZ = z.object({
  // general: z.object({
  // _id: z.string(),
  // _type: z.literal('siteSettings'),
  siteTitle: z.string().nullable(),
  siteUrl: z.string().url().nullable(),
  favicon: z.string().nullable(),
  // faviconUrl: z.string().url().nullable(),
  headerMenu: menuZ.nullable(),
  footerMenus: z.array(menuZ).nullable(),
  googleSiteVerification: z.string().nullable(),
  gtm: z.string().nullable(),
  maintenanceMode: z.boolean(),
  frontpage: z
    .object({
      slug: z.string(),
    })
    .optional()
    .nullable(),
  postsPage: z
    .object({
      slug: z.string(),
    })
    .optional()
    .nullable(),
  // postsPerPage: z.number().optional(),
  // }),
  company: companyZ,
})

export type SiteSettings = z.infer<typeof siteSettingsZ>
