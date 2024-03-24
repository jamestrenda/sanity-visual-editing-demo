import { z } from 'zod'
import { sanityImageObjectExtendedZ } from './image'
import { menuZ } from './menu'

export const headerZ = z.object({
  email: z.string().nullable(),
  phone: z.string().nullable(),
  logo: sanityImageObjectExtendedZ.nullable(),
  logoMobile: sanityImageObjectExtendedZ.nullable(),
  menu: menuZ.nullable(),
})

export type Header = z.infer<typeof headerZ>
