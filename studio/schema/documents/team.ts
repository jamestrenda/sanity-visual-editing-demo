import { defineField, defineType } from 'sanity'
import { IconUserCircle } from '~/icons/userCircle'
import { portableTextBlocks } from '../objects/portableText'

export default defineType({
  title: 'Team',
  name: 'team',
  icon: IconUserCircle,
  type: 'document',
  preview: {
    select: {
      firstName: 'firstName',
      lastName: 'lastName',
      subtitle: 'position',
      media: 'image.image',
    },
    prepare({ firstName, lastName, subtitle, media }) {
      const title = `${firstName} ${lastName}`
      return {
        title,
        subtitle,
        media,
      }
    },
  },
  fields: [
    defineField({
      title: 'First Name',
      name: 'firstName',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      title: 'Last Name',
      name: 'lastName',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      title: 'Email',
      name: 'email',
      type: 'string',
    }),
    // defineField({
    //   title: 'Phone',
    //   name: 'phone',
    //   type: 'string',
    // }),
    defineField({
      title: 'Position',
      name: 'position',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    // defineField({
    //   title: 'Role',
    //   name: 'role',
    //   type: 'string',
    // }),
    defineField({
      title: 'Bio',
      name: 'bio',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [],
          marks: portableTextBlocks.marks,
          lists: portableTextBlocks.lists,
        },
      ],
    }),
    defineField({
      title: 'Image',
      name: 'image',
      type: 'imageObject',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      title: 'Social Media',
      name: 'socialMedia',
      type: 'socialMedia',
    }),
    // TODO: slug, seo, etc.
  ],
})
