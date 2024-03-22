import { z } from 'zod'
import { sanityImageObjectExtendedZ } from './image'
import { socialMediaZ } from './company'
import { badgeZ } from './badge'

export const teamMemberZ = z.object({
  _key: z.string(),
  _type: z.literal('team'),
  _id: z.string(),
  firstName: z.string().nullable(),
  lastName: z.string().nullable(),
  position: z.string().nullable(),
  image: sanityImageObjectExtendedZ,
  socialMedia: socialMediaZ,
})

export const teamZ = z.object({
  _key: z.string(),
  _type: z.literal('teamGrid'),
  badge: badgeZ,
  title: z.string().nullable(),
  text: z.any().nullable(), // PortableTextBlock
  members: z.array(teamMemberZ).nullable(),
})

export type TeamMember = z.infer<typeof teamMemberZ>
export type Team = z.infer<typeof teamZ>
