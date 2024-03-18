import { defineField, defineType } from 'sanity'
import { IconLogos } from '~/icons/logos'
import anchor from './anchor'

export default defineType({
  title: 'Logo Cloud',
  name: 'logoCloud',
  type: 'object',
  icon: IconLogos,
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        title: title || 'Logo Cloud',
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
      title: 'Logos',
      name: 'logos',
      type: 'array',
      of: [
        {
          type: 'imageObject',
        },
      ],
    }),
    anchor,
  ],
})
