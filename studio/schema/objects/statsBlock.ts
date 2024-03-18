import { defineField, defineType } from 'sanity'
import { IconStats } from '~/icons/stats'
import anchor from './anchor'

export default defineType({
  name: 'statsBlock',
  title: 'Stats',
  type: 'object',
  icon: IconStats,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'text',
      title: 'Text',
      type: 'portableText',
    }),
    defineField({
      name: 'stats',
      title: 'Stats',
      type: 'array',
      of: [{ type: 'stat' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Background Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    anchor,
  ],
})
