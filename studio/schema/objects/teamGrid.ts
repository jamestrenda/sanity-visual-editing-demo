import { defineField, defineType } from 'sanity'
import { IconUserCircle } from '~/icons/userCircle'
import anchor from './anchor'

export default defineType({
  title: 'Team Grid',
  name: 'teamGrid',
  type: 'object',
  icon: IconUserCircle,
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        title: title || 'Team Grid',
      }
    },
  },
  fields: [
    defineField({
      title: 'Badge',
      name: 'badge',
      type: 'badge',
    }),
    defineField({
      title: 'Title',
      name: 'title',
      type: 'string',
    }),
    defineField({
      title: 'Text',
      name: 'text',
      type: 'portableText',
    }),
    defineField({
      title: 'Team Members',
      name: 'members',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'team' }],
        },
      ],
    }),
    anchor,
  ],
})
