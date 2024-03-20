import { z } from 'zod'
import { sanityImageObjectExtendedZ } from './image'

const addressZ = z.object({
  _type: z.literal('address'),
  street: z.string().nullable(),
  city: z.string().nullable(),
  state: z.string().nullable(),
  zip: z.string().nullable(),
  country: z.string().nullable(),
})

export const socialMediaZ = z.object({
  // _type: z.literal('socialMedia'),
  facebook: z.string().optional().nullable(),
  x: z.string().optional().nullable(),
  instagram: z.string().optional().nullable(),
  linkedin: z.string().optional().nullable(),
  youtube: z.string().optional().nullable(),
})

export const companyZ = z.object({
  name: z.string().nullable(),
  tagline: z.string().nullable(),
  logo: sanityImageObjectExtendedZ,
  address: addressZ.nullable(),
  phone: z.string().nullable(),
  email: z.string().email().nullable(),
  socialMedia: socialMediaZ.nullable(),
})

export type Company = z.infer<typeof companyZ>
